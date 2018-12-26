# ubuntu源码编译opencv(3.2.0)到python3(anaconda)环境下
  
## 1.下载opencv源码包  

`wget https://github.com/opencv/opencv/archive/3.2.0.zip`  
`wget https://github.com/opencv/opencv_contrib/archive/3.2.0.zip`  
解压`opencv-3.2.0`，然后将opencv_contrib解压出来，并重命名为`opencv_contrib`，放到opencv-3.2.0文件夹下 
 
## 2.下载编译opencv所需文件包

`sudo apt-get install build-essential`  
`sudo apt-get install cmake git libgtk2.0-dev pkg-config libavcodec-dev libavformat-dev libswscale-dev`  
`sudo apt-get install python-dev python-numpy libtbb2 libtbb-dev libjpeg-dev libpng-dev libtiff-dev libjasper-dev libdc1394-22-dev # 处理图像所需的包`  
`sudo apt-get install libavcodec-dev libavformat-dev libswscale-dev libv4l-dev liblapacke-dev`  
`sudo apt-get install libxvidcore-dev libx264-dev # 处理视频所需的包`  
`sudo apt-get install libatlas-base-dev gfortran # 优化opencv功能`  
`sudo apt-get install ffmpeg`  

## 3.cmake(无CUDA版本)

cd到opencv-3.2.0文件夹下，`mkdir build`然后`cd build`  
输入
> 
cmake -D WITH\_TBB=ON \   
-D BUILD\_NEW\_PYTHON_SUPPORT=ON \  
-D CMAKE\_INSTALL\_PREFIX=/usr/local \  
-D WITH\_V4L=ON \  
-D WITH\_OPENGL=ON \  
-D WITH\_VTK=ON \  
-D CMAKE\_BUILD\_TYPE=RELEASE \  
-D OPENCV\_EXTRA\_MODULES_PATH=/home/wushuai/opencv-3.2.0/opencv\_contrib/modules \  
-D WITH\_IPP=OFF \  
-D WITH\_CUDA=OFF \  
-D PYTHON\_DEFAULT\_EXECUTABLE=$(which python3) \  
-D BUILD\_opencv\_python3=ON \  
-D BUILD\_opencv\_python2=OFF \  
-D PYTHON3\_PACKAGES\_PATH=/home/wushuai/anaconda3/lib/  python3.7/site-packages \  
-D PYTHON3\_EXCUTABLE=/home/wushuai/anaconda3/bin/python3.7m \  
-D PYTHON3\_INCLUDE\_DIR=/home/wushuai/anaconda3/include/python3.7m \  
-D PYTHON3\_LIBRARY=/usr/lib/x86_64-linux-gnu/libpython3.7m.so.1 \  
-D PYTHON3\_NUMPY\_PATH=/home/wushuai/anaconda3/lib/python3.7/site-packages \  
-D BUILD\_EXAMPLES=ON \  
-D BUILD\_LIBPROTOBUF\_FROM\_SOURCES=ON \  
-D BUILD\_opencv_hdf=OFF \  
..

<font color='red'>

	**务必熟悉上面cmake的每一条指令**  

</font>

 - `-D OPENCV_EXTRA_MODULES_PATH=/home/wushuai/opencv-3.2.0/opencv_contrib/modules`是contrib包所在的位置  
 - `-D WITH_CUDA=OFF`是否链接CUDA  
 - `-D PYTHON_DEFAULT_EXECUTABLE=$(which python3)`根据环境变量确定Python3编译器的位置  
 - `-D PYTHON3_LIBRARY=/usr/lib/x86_64-linux-gnu/libpython3.7m.so.1`软连接，不同电脑架构不同，对应的文件夹有所不同，本台电脑x86_64  
 - 其他的python的都为anaconda文件夹下的相关内容，根据情况更改   

最后cmake完成后应为这样，python3那一块为主解释器，这样make后才能在anaconda环境下使用  

![cmake_sucess!](https://github.com/CloserWU/Interstellar_Document/raw/master/image/cmake.png)   

## 3.make

cmake完成后，如果不报错，则可进行下一步  
`make -j4`4线程开始编译，99%的问题都会在这一步出现，看运气，一些问题可以自己尝试根据错误提示更改，比如某个cpp文件中有些地方错误，char* 和const char*  
编译完成后，  
`sudo make install`进行安装，然后  
`sudo ldconfig`结束  
到此，opencv源码编译安装完成

## 4.检验

打开python  
输入`import cv2`
输入`print(cv2.__version__)`没有报错即为安装成功  

![make_sucess!](https://github.com/CloserWU/Interstellar_Document/raw/master/image/sucess.png)  

Lucky man！
