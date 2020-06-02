using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using MathWorks.xPCTarget.FrameWork;

namespace ConsoleApp1
{
    // 首先引入xPCFramework.dll。
    // 然后要把xpcapi.dll (x64)的放到.exe的文件夹下；把xpcapi.dll (x86) 的放到解决方案下
    class Program
    {

        void demo()
        {
            // xPCTargetPC设置IP和端口
            xPCTargetPC xPCTarget = new xPCTargetPC();
            xPCTarget.TcpIpTargetAddress = "192.168.88.189";
            xPCTarget.TcpIpTargetPort = "22222";
            try
            {
                // 建立连接
                xPCTarget.Connect();
                if (xPCTarget.IsConnected == true)
                {
                    Console.WriteLine(true);
                    // 装载模型，并获取target机的应用
                    xPCApplication application = xPCTarget.Load("C:\\Users\\Closer\\Desktop\\matlab\\xpctank1.dlm");
                    xPCTargetScopeCollection tScopes = application.Scopes.TargetScopes;
                    tScopes.Refresh();

                    // 指定参数
                    xPCParameters param = xPCTarget.Application.Parameters;
                    // 先清空参数
                    param.Refresh();
                    // 获取参数的坐标和参数名
                    xPCParameter p = param["SetPoint", "Value"];
                    Double[] values = new Double[] { 5.0 };
                    // 指定参数值
                    p.SetParam(values);

                    // 设置采样时间
                    application.SampleTime = 0.01;
                    // 设置结束时间 单位秒  -1是永不停止
                    application.StopTime = 60;
                    // target机开始运行
                    application.Start();
                }
                else
                {
                    //Call the Disconnect methods to close the communication channel with the target PC.
                    xPCTarget.Disconnect();

                }

            }
            catch (xPCException ex)
            {
                Console.WriteLine(ex.Message);
            }
        }


        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new Form1());
        }
    }
}
