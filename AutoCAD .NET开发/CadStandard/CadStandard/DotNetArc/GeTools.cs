using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Autodesk.AutoCAD.Geometry;

namespace CadStandard
{
    public static class GeTools
    {
        //计算向量与x轴正半轴的弧度值
        public static double AngleFromXAxis(this Point3d pt1, Point3d pt2)
        {
            //构建从第一个点到第二个点确定的向量
            Vector2d vector = new Vector2d(pt1.X - pt2.X, pt1.Y - pt2.Y);
            //返回该矢量和X轴正半轴的角度（弧度）
            return vector.Angle;
        }
    }
}
