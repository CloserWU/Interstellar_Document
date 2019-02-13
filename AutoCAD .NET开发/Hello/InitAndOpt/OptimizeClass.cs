using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Autodesk.AutoCAD.ApplicationServices;
using Autodesk.AutoCAD.EditorInput;
using Autodesk.AutoCAD.Runtime;

namespace InitAndOpt
{
    public class OptimizeClass
    {
        [CommandMethod("OptCommand")]
        public void OptCommand()
        {
            Editor ed = Application.DocumentManager.MdiActiveDocument.Editor;
            string fileName1 = "C:\\Users\\Closer\\Desktop\\工作文件\\AutoCAD\\Hello\\Hello\\bin\\Debug\\Hello.dll";
            string fileName2 = "C:\\Users\\Closer\\Desktop\\工作文件\\AutoCAD\\DotNetARX\\DotNetARX\\bin\\Debug\\DotNetARX.dll";
            ExtensionLoader.Load(fileName1);
            ExtensionLoader.Load(fileName2);
            ed.WriteMessage("\n"+ fileName1 +" "+ fileName2 +"被载入,请输入Hello进行测试!!!!!!");
        }
    }
}
