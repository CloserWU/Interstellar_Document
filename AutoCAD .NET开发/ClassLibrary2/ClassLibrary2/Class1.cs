using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Autodesk.AutoCAD.ApplicationServices;
using Autodesk.AutoCAD.EditorInput;
using Autodesk.AutoCAD.Runtime;
using Autodesk.AutoCAD.DatabaseServices;
using Autodesk.AutoCAD.Geometry;
using DotNetARX;

namespace ClassLibrary2
{
    public class Modal
    {
        [CommandMethod("Hello")]
        public void Hello()
        {
            Form1 form = new Form1();
            //Application.ShowModalDialog(form);
            Application.ShowModelessDialog(form);
        }

    }
}
