using Autodesk.AutoCAD.DatabaseServices;
using Autodesk.AutoCAD.Geometry;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CadStandard
{
    public static class ArcTools
    {
        //根据三点创建圆弧
        public static void CreateArc(this Arc arc, Point3d startPoint, Point3d pointOnArc, Point3d endPoint)
        {
            //创建一个几何类的圆弧对象
            CircularArc3d geArc = new CircularArc3d(startPoint, pointOnArc, endPoint);
            //将几何类圆弧对象的圆心和半径赋值给圆弧
            Point3d centerPoint = geArc.Center;
            arc.Center = centerPoint;
            arc.Radius = geArc.Radius;
            //计算起始和终止角度
            arc.StartAngle = startPoint.AngleFromXAxis(centerPoint);
            arc.EndAngle = endPoint.AngleFromXAxis(centerPoint);
        }
    }
}
