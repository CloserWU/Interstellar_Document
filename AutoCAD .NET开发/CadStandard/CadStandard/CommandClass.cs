using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Autodesk.AutoCAD.ApplicationServices;
using Autodesk.AutoCAD.EditorInput;
using Autodesk.AutoCAD.Runtime;


namespace CadStandard
{
    public class CommandClass
    {
        // 通过加载dll，然后以命令的形式画出样板
        [CommandMethod("InitializeCommand")]
        public void InitializeCommand()
        {
            Editor ed = Application.DocumentManager.MdiActiveDocument.Editor;
            // 全部模块都集合到CadStandard中，所以就算再装载一遍CadZtandard.dll，还是只能扫描CommandClass下的Command。
            // string fileName1 = "C:\\Users\\Closer\\Desktop\\工作文件\\AutoCAD\\CadStandard\\CadStandard\\bin\\Debug\\CadStandard.dll";
            // ExtensionLoader.Load(fileName1);
            // ed.WriteMessage("\n" + fileName1 + "被载入,请输入Hello进行测试!!!!!!");
        }

        // 点击鼠标画出样板
        [CommandMethod("InitializeFromWindow")]
        public void Hello()
        {
            Form1 form = new Form1();
            //Application.ShowModalDialog(form);
            Application.ShowModelessDialog(form);
        }
    }
}