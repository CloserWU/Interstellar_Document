# win10修改darknet(yolov3)源代码令其裁剪出bbox并保存到本地
1.修改image.c中`draw_detections_v3`函数
----
首先添加一个函数 
    


    IplImage* image_to_iplImage(image p,IplImage* disp){
	// 将image结构体中存放的一维数组转换成二维图像。 maybe
		image copy = copy_image(p);
		if(p.c == 3) rgbgr_image(copy);
		int x,y,k;
		disp = cvCreateImage(cvSize(p.w,p.h), IPL_DEPTH_8U, p.c);
		int step = disp->widthStep;
		for(y = 0; y < p.h; ++y){
			for(x = 0; x < p.w; ++x){
				for(k= 0; k < p.c; ++k){
					disp->imageData[y*step + x*p.c + k] = (unsigned char)(get_pixel(copy,x,y,k)*255);
				}
			}
		}
		return disp;}

并在`demo.c`中添加函数声明`IplImage* Image_to_iplimage(image im, IplImage* img);`  
这个函数是用来修改`iamge im`的格式  
源代码中image结构体对图片的保存时一维的，需要修改成为图片格式转为`IplImage`用于opencv输出    
然后就是修改image.c代码了  
<code>void draw_detections_v3(image im, detection *dets, int num, float thresh, char **names, image **alphabet, int classes, int ext_output){</code></br>
<code>int selected_detections_num;</code></br>
<code>detection_with_class* selected_detections = get_actual_detections(dets, num, thresh, &selected_detections_num);</code></br>

    // text output
    qsort(selected_detections, selected_detections_num, sizeof(*selected_detections), compare_by_lefts);
    int i;
    for (i = 0; i < selected_detections_num; ++i) {
        const int best_class = selected_detections[i].best_class;
        printf("%s: %.0f%%", names[best_class], selected_detections[i].det.prob[best_class] * 100);
        if (ext_output)
            printf("\t(left_x: %4.0f   top_y: %4.0f   width: %4.0f   height: %4.0f)\n",
            (selected_detections[i].det.bbox.x - selected_detections[i].det.bbox.w / 2)*im.w,
                (selected_detections[i].det.bbox.y - selected_detections[i].det.bbox.h / 2)*im.h,
                selected_detections[i].det.bbox.w*im.w, selected_detections[i].det.bbox.h*im.h);
        else
            printf("\n");
        int j;
        for (j = 0; j < classes; ++j) {
            if (selected_detections[i].det.prob[j] > thresh && j != best_class) {
                printf("%s: %.0f%%\n", names[j], selected_detections[i].det.prob[j] * 100);
            }
        }
    }
    printf("$$$$$$$$$$$$$$\n");
    // image output
    qsort(selected_detections, selected_detections_num, sizeof(*selected_detections), compare_by_probs);
    for (i = 0; i < selected_detections_num; ++i) {
        int width = im.h * .006;
        if (width < 1)
            width = 1;

        /*
        if(0){
        width = pow(prob, 1./2.)*10+1;
        alphabet = 0;
        }
        */

        //printf("%d %s: %.0f%%\n", i, names[selected_detections[i].best_class], prob*100);
        int offset = selected_detections[i].best_class * 123457 % classes;
        float red = get_color(2, offset, classes);
        float green = get_color(1, offset, classes);
        float blue = get_color(0, offset, classes);
        float rgb[3];

        //width = prob*20+2;

        rgb[0] = red;
        rgb[1] = green;
        rgb[2] = blue;
        box b = selected_detections[i].det.bbox;
        //printf("%f %f %f %f\n", b.x, b.y, b.w, b.h);

        int left = (b.x - b.w / 2.)*im.w;
        int right = (b.x + b.w / 2.)*im.w;
        int top = (b.y - b.h / 2.)*im.h;
        int bot = (b.y + b.h / 2.)*im.h;

        if (left < 0) left = 0;
        if (right > im.w - 1) right = im.w - 1;
        if (top < 0) top = 0;
        if (bot > im.h - 1) bot = im.h - 1;

        //int b_x_center = (left + right) / 2;
        //int b_y_center = (top + bot) / 2;
        //int b_width = right - left;
        //int b_height = bot - top;
        //sprintf(labelstr, "%d x %d - w: %d, h: %d", b_x_center, b_y_center, b_width, b_height);
        bool is_person;

        if (alphabet) {
            char labelstr[4096] = { 0 };
            strcat(labelstr, names[selected_detections[i].best_class]);
            int j;
            for (j = 0; j < classes; ++j) {
                if (selected_detections[i].det.prob[j] > thresh && j != selected_detections[i].best_class) {
                    strcat(labelstr, ", ");
                    strcat(labelstr, names[j]);
                }
            }
            is_person = !strcmp(labelstr, "person");
            if (is_person) {
                IplImage* src = NULL;
                src = image_to_iplImage(im, src);
                //cvShowImage("src", src);
                int x = left;
                int y = top;
                int w = right - left;
                int h = bot - top;
                cvSetImageROI(src, cvRect(left, top, right - left, bot - top));
                IplImage* crop = cvCreateImage(cvSize(w, h), IPL_DEPTH_8U, src->nChannels);
                cvCopy(src, crop, 0);
                cvResetImageROI(src);
                save_image(im, "test");
                //src = image_to_iplImage(im,src);
                //cvShowImage("src_bbox",src);
                //cvShowImage("crop",crop);
                time_t t;
                t = time(NULL);
                int i = time(&t);
                char path[] = "crops\\";
                char p[] = "0";
                _itoa(i, p, 10);
                strcat(path, p);
                strcat(path, ".jpg");
                cvSaveImage(path, crop, 0);
                //cvSaveImage("crops\\crop.jpg", crop, 0);
            }

            /*image label = get_label_v3(alphabet, labelstr, (im.h*.03));//写出每个物体的label
            draw_label(im, top + width, left, label, rgb);
            free_image(label);*/
        }
        /*if (im.c == 1) {//标出每个物体的框
            draw_box_width_bw(im, left, top, right, bot, width, 0.8);    // 1 channel Black-White
        }
        else {
            draw_box_width(im, left, top, right, bot, width, red, green, blue); // 3 channels RGB
        }*/
        if (selected_detections[i].det.mask) {
            image mask = float_to_image(14, 14, 1, selected_detections[i].det.mask);
            image resized_mask = resize_image(mask, b.w*im.w, b.h*im.h);
            image tmask = threshold_image(resized_mask, .5);
            embed_image(tmask, im, left, top);
            free_image(mask);
            free_image(resized_mask);
            free_image(tmask);
        }
    }
    free(selected_detections);}
需要修改的部分用`commit`标记

到此为止，已经能够用`darknet_coco.cmd`这个脚本运行单张图片并得到crop后的图片了，图保存在当前文件夹crops文件夹下  

2.修改`draw_detections_cv_v3`函数
----
如下  

    void draw_detections_cv_v3(IplImage* show_img, detection *dets, int num, float thresh, char **names, image **alphabet, int classes, int ext_output)
    {
    int i, j;
    if (!show_img) return;
    static int frame_id = 0;
    frame_id++;

    for (i = 0; i < num; ++i) {//num是每个image的候选框个数
        char labelstr[4096] = { 0 };
        int class_id = -1;
        int class_id_person = -1;
        bool class_person = false;
        for (j = 0; j < classes; ++j) {//查看这个框是不是81（classes）类中的其中一个。
            if (dets[i].prob[j] > thresh) {
                /*if (strcmp(names[j], "person")) {
                    class_id_person = j;
                    class_person = true;
                }*/
                if (class_id < 0) {
                    strcat(labelstr, names[j]);
                    if (!strcmp(labelstr, "person")) {
                        class_person = true;
                    }
                    class_id = j;
                }
                else {
                    strcat(labelstr, ", ");
                    strcat(labelstr, names[j]);
                }
                printf("%s: %.0f%% ", names[j], dets[i].prob[j] * 100);
            }
        }
        if (class_id >= 0) {
            int width = show_img->height * .006;

            //if(0){
            //width = pow(prob, 1./2.)*10+1;
            //alphabet = 0;
            //}

            //printf("%d %s: %.0f%%\n", i, names[class_id], prob*100);
            int offset = class_id * 123457 % classes;
            float red = get_color(2, offset, classes);
            float green = get_color(1, offset, classes);
            float blue = get_color(0, offset, classes);
            float rgb[3];
			printf("!!!!!!!!!");
            //width = prob*20+2;

            rgb[0] = red;
            rgb[1] = green;
            rgb[2] = blue;
            box b = dets[i].bbox;
            b.w = (b.w < 1) ? b.w : 1;
            b.h = (b.h < 1) ? b.h : 1;
            b.x = (b.x < 1) ? b.x : 1;
            b.y = (b.y < 1) ? b.y : 1;
            //printf("%f %f %f %f\n", b.x, b.y, b.w, b.h);

            int left = (b.x - b.w / 2.)*show_img->width;
            int right = (b.x + b.w / 2.)*show_img->width;
            int top = (b.y - b.h / 2.)*show_img->height;
            int bot = (b.y + b.h / 2.)*show_img->height;

            if (left < 0) left = 0;
            if (right > show_img->width - 1) right = show_img->width - 1;
            if (top < 0) top = 0;
            if (bot > show_img->height - 1) bot = show_img->height - 1;

            //int b_x_center = (left + right) / 2;
            //int b_y_center = (top + bot) / 2;
            //int b_width = right - left;
            //int b_height = bot - top;
            //sprintf(labelstr, "%d x %d - w: %d, h: %d", b_x_center, b_y_center, b_width, b_height);

            if (class_person) {
                printf("()()()()()()()()\n");
                IplImage* src = show_img;
                int x = left;
                int y = top;
                int w = right - left;
                int h = bot - top;
                cvSetImageROI(src, cvRect(left, top, right - left, bot - top));
                IplImage* crop = cvCreateImage(cvSize(w, h), IPL_DEPTH_8U, src->nChannels);
                cvCopy(src, crop, 0);
                cvResetImageROI(src);
                time_t t;
                t = time(NULL);
                int i = time(&t);
                char path[] = "crops\\";
                char p[] = "0";
                _itoa(i, p, 10);
                strcat(path, p);
                strcat(path, ".jpg");
                cvSaveImage(path, crop, 0);
            }

            float const font_size = show_img->height / 1000.F;
            CvPoint pt1, pt2, pt_text, pt_text_bg1, pt_text_bg2;
            pt1.x = left;
            pt1.y = top;
            pt2.x = right;
            pt2.y = bot;
            pt_text.x = left;
            pt_text.y = top - 12;
            pt_text_bg1.x = left;
            pt_text_bg1.y = top - (10 + 25 * font_size);
            pt_text_bg2.x = right;
            pt_text_bg2.y = top;
            CvScalar color;
            color.val[0] = red * 256;
            color.val[1] = green * 256;
            color.val[2] = blue * 256;

            // you should create directory: result_img
            //static int copied_frame_id = -1;
            //static IplImage* copy_img = NULL;
            //if (copied_frame_id != frame_id) {
            //    copied_frame_id = frame_id;
            //    if(copy_img == NULL) copy_img = cvCreateImage(cvSize(show_img->width, show_img->height), show_img->depth, show_img->nChannels);
            //    cvCopy(show_img, copy_img, 0);
            //}
            //static int img_id = 0;
            //img_id++;
            //char image_name[1024];
            //sprintf(image_name, "result_img/img_%d_%d_%d.jpg", frame_id, img_id, class_id);
            //CvRect rect = cvRect(pt1.x, pt1.y, pt2.x - pt1.x, pt2.y - pt1.y);
            //cvSetImageROI(copy_img, rect);
            //cvSaveImage(image_name, copy_img, 0);
            //cvResetImageROI(copy_img);

            //cvRectangle(show_img, pt1, pt2, color, width, 8, 0);
            if (ext_output)
                printf("\t(left_x: %4.0f   top_y: %4.0f   width: %4.0f   height: %4.0f)\n",
                    (float)left, (float)top, b.w*show_img->width, b.h*show_img->height);
            else
                printf("\n");

            /*cvRectangle(show_img, pt_text_bg1, pt_text_bg2, color, width, 8, 0);
            cvRectangle(show_img, pt_text_bg1, pt_text_bg2, color, CV_FILLED, 8, 0);    // filled
            CvScalar black_color;
            black_color.val[0] = 0;
            CvFont font;
            cvInitFont(&font, CV_FONT_HERSHEY_SIMPLEX, font_size, font_size, 0, font_size * 3, 8);
            cvPutText(show_img, labelstr, pt_text, &font, black_color);*/
        }
    }
    if (ext_output) {
        fflush(stdout);
    }
    }

修改部分为`commit`和`//(空)`部分  
意在找到能识别人的框，让裁剪输出，并且取消输出包围框和标签  
然后运行`darknet_demo_coco.cmd`即可得到裁剪的图片
