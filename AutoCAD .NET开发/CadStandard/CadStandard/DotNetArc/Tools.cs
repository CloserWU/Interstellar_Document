using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Autodesk.AutoCAD.DatabaseServices;
using Autodesk.AutoCAD.Geometry;

namespace CadStandard
{
    public static class EntTools
    {

        //将实体对象添加到当前模型空间
        public static ObjectId AddToModelSpace(this Database db, Entity ent)
        {
            ObjectId entId; //用于返回添加到模型空间中的实体ObjectId
            //定义一个指向当前数据库的事务处理
            using (Transaction trans = db.TransactionManager.StartTransaction())
            {
                //以读的方式打开块表       
                BlockTable bt = (BlockTable)trans.GetObject(db.BlockTableId, OpenMode.ForRead);
                //以写方式打开模型空间块表记录
                BlockTableRecord btr = (BlockTableRecord)trans.GetObject(bt[BlockTableRecord.ModelSpace], OpenMode.ForWrite);
                //将图形对象的信息添加到块表记录中
                entId = btr.AppendEntity(ent);
                //把对象添加到事务处理中
                trans.AddNewlyCreatedDBObject(ent, true);
                //提交事务处理
                try
                {
                    trans.Commit(); //提交事务处理，保存改变
                }
                catch
                {
                    trans.Abort();//如果有异常，则撤销改变
                }

            }
            return entId;
        }
        //重载函数，可一次添加多个实体到模型空间
        public static void AddToModelSpace(this Database db, params Entity[] ents)
        {
            ObjectId entId; //用于返回添加到模型空间中的实体ObjectId
            //定义一个指向当前数据库的事务处理
            using (Transaction trans = db.TransactionManager.StartTransaction())
            {
                //以读的方式打开块表       
                BlockTable bt = (BlockTable)trans.GetObject(db.BlockTableId, OpenMode.ForRead);
                //以写方式打开模型空间块表记录
                BlockTableRecord btr = (BlockTableRecord)trans.GetObject(bt[BlockTableRecord.ModelSpace], OpenMode.ForWrite);
                foreach (Entity ent in ents)
                {
                    //将图形对象的信息添加到块表记录中
                    entId = btr.AppendEntity(ent);
                    //把对象添加到事务处理中
                    trans.AddNewlyCreatedDBObject(ent, true);
                }
                //提交事务处理
                try
                {
                    trans.Commit(); //提交事务处理，保存改变
                }
                catch
                {
                    trans.Abort();//如果有异常，则撤销改变
                }
            }
        }

        //三维点转二维点
        public static Point2d Point3To2(this Point3d point)
        {
            return new Point2d(point.X, point.Y);
        }
        //二维点转三维点
        public static Point3d Point2To3(this Point2d point)
        {
            return new Point3d(point.X, point.Y, 0);
        }

        //对实体进行移动
        public static void Move(this ObjectId id, Point3d sourcePt, Point3d targetPt)
        {
            //构建用于移动实体的矩阵
            Vector3d vector = targetPt.GetVectorTo(sourcePt);
            Matrix3d mt = Matrix3d.Displacement(vector);
            //以写的方式打开id表示的实体对象
            Entity ent = (Entity)id.GetObject(OpenMode.ForWrite);
            ent.TransformBy(mt);    //对实体实施移动
            ent.DowngradeOpen();    //为防止错误，切换实体为读的状态
        }

        //重载Move函数，ent表示需要移动的实体，sourcePt表示移动的源点，targetPt表示移动的目标点
        public static void Move(this Entity ent, Point3d sourcePt, Point3d targetPt)
        {
            if (ent.IsNewObject)//如果还是未被添加到数据库中的新实体
            {
                //构建用于移动实体的矩阵
                Vector3d vector = targetPt.GetVectorTo(sourcePt);
                Matrix3d mt = Matrix3d.Displacement(vector);
                ent.TransformBy(mt);    //对实体实施移动
            }
            else
            {
                ent.ObjectId.Move(sourcePt, targetPt);
            }
        }

        //用于旋转，basePt表示旋转的基点，angle表示旋转的角度
        public static void Rotate(this ObjectId id, Point3d basePt, double angle)
        {
            Matrix3d mt = Matrix3d.Rotation(angle, Vector3d.ZAxis, basePt); //参数分别为，旋转角度，旋转轴，旋转中心
            Entity ent = (Entity)id.GetObject(OpenMode.ForWrite);
            ent.TransformBy(mt);
            ent.DowngradeOpen();
        }

        //重载Rotate函数,basePt表示旋转的基点，angle表示旋转的角度
        public static void Rotate(this Entity ent, Point3d basePt, double angle)
        {
            if (ent.IsNewObject)//如果还是未被添加到数据库中的新实体
            {
                Matrix3d mt = Matrix3d.Rotation(angle, Vector3d.ZAxis, basePt);
                ent.TransformBy(mt);
            }
            else
            {
                ent.ObjectId.Rotate(basePt, angle);
            }

            ent.DowngradeOpen();
        }

        //Mirror 用于镜像命令，mirrorPt1,mirrorPt2分别表示镜像轴的第一点和第二点，eraseSourceObject表示是否删除源对象
        public static ObjectId Mirror(this ObjectId id, Point3d mirrorPt1, Point3d mirrorPt2, bool eraseSourceObject)
        {
            Line3d miLine = new Line3d(mirrorPt1, mirrorPt2);//镜像线
            Matrix3d mt = Matrix3d.Mirroring(miLine);//镜像矩阵
            ObjectId mirrorId = id;
            Entity ent = (Entity)id.GetObject(OpenMode.ForWrite);
            //如果删除源对象，则直接对源对象实行镜像变换
            if (eraseSourceObject == true)
                ent.TransformBy(mt);
            else
            {
                Entity entCopy = ent.GetTransformedCopy(mt);
                mirrorId = id.Database.AddToModelSpace(entCopy);
            }
            return mirrorId;
        }

    }
}
