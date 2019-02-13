using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Autodesk.AutoCAD.DatabaseServices;
using Autodesk.AutoCAD.Geometry;

namespace DotNetARX
{
    public static class PolylineTools
    {
        //通过二维点集合创建多段线
        public static void CreatePloyline(this Polyline pline, Point2dCollection pts)
        {
            for(int i = 0; i < pts.Count; i++)
            {
                //添加多段线的顶点
                pline.AddVertexAt(i, pts[i], 0, 0, 0);
            }
        }

        //重载CreatePoline函数，使其能接受不固定的二维点,这样在调用该函数时就不需要生成一个二维点集合了
        public static void CreatePloyline(this Polyline pline, params Point2d[] pts)
        {
            pline.CreatePloyline(new Point2dCollection(pts));            
        }

        //根据两个角点创建矩形
        public static void CreateRectangle(this Polyline pline, Point2d pt1, Point2d pt2)
        {
            //设置矩形的四个顶点
            double minX = Math.Min(pt1.X, pt2.X);
            double maxX = Math.Max(pt1.X, pt2.X);
            double minY = Math.Min(pt1.Y, pt2.Y);
            double maxY = Math.Max(pt1.Y, pt2.Y);
            Point2dCollection pts = new Point2dCollection();
            pts.Add(new Point2d(minX, minY));
            pts.Add(new Point2d(minX, maxY));
            pts.Add(new Point2d(maxX, maxY));
            pts.Add(new Point2d(maxX, minY));
            pline.CreatePloyline(pts);
            pline.Closed = true;    //闭合多段线以形成矩形
        }

        //添加有个CreatePolygon,用于根据中心点、边数和外接圆半径来创建正多边形
        public static void CreatePolygon(this Polyline pline, Point2d centerPoint, int number, double radius)
        {
            Point2dCollection pts = new Point2dCollection(number);
            double angle = 2 * Math.PI / number;    //计算每条边对应的角度
            //计算多边形的顶点
            for(int i = 0; i < number; i++)
            {
                Point2d pt = new Point2d(centerPoint.X + radius * Math.Cos(i * angle), centerPoint.Y + radius * Math.Sin(i * angle));
                pts.Add(pt);
            }
            pline.CreatePloyline(pts);
            pline.Closed = true;    //闭合多段线以形成多边形
        }
    }
}
