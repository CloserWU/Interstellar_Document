using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Autodesk.AutoCAD.ApplicationServices;
using Autodesk.AutoCAD.EditorInput;
using Autodesk.AutoCAD.Runtime;
//定义InitClass类为程序的入口点
[assembly:ExtensionApplication(typeof(InitAndOpt.InitClass))]
//让AutoCAD只会执行OptimizeClass类中定义的命令
[assembly:CommandClass(typeof(InitAndOpt.OptimizeClass))]
namespace InitAndOpt
{
    public class InitClass : IExtensionApplication
    {
        public void Initialize()
        {
            Editor ed = Application.DocumentManager.MdiActiveDocument.Editor;
            //在autoCAD命令行上显示一些信息，他会在程序载入时被显示
            ed.WriteMessage("程序开始初始化");
        }

        public void Terminate()
        {
            System.Diagnostics.Debug.WriteLine("程序结束，你可以在内做一些程序的清理工作，如关闭AutoCAD文档");
        }

        //程序并没有设定InitClass类为CommandClass类，因此AutoCAD不会执行该类中的命令
        [CommandMethod("InitCommand")]
        public void InitCommand()
        {
            Editor ed = Application.DocumentManager.MdiActiveDocument.Editor;
            ed.WriteMessage("test");
        }
    }
}
