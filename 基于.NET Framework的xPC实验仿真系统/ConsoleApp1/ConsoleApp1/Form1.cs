using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using MathWorks.xPCTarget.FrameWork;

namespace ConsoleApp1
{
    public partial class Form1 : Form
    {
        xPCTargetPC xPCTarget;
        xPCApplication application;
        xPCHostScope refSc;


        public Form1()
        {
            xPCTarget = new xPCTargetPC();
            InitializeComponent();
        }

        private void ConnectButton_Click(object sender, EventArgs e)
        {
            if (IPText.Text != "" && PortText.Text != "")
            {
                xPCTarget.TcpIpTargetAddress = IPText.Text;
                xPCTarget.TcpIpTargetPort = PortText.Text;
                try
                {
                    xPCTarget.Connect();
                    if (xPCTarget.IsConnected == true)
                    {
                        Console.WriteLine("connect successfully");
                    }
                    else
                    {
                        Console.WriteLine("can't connect");
                        //Call the Disconnect methods to close the communication channel with the target PC.
                        xPCTarget.Disconnect();

                    }
                }
                catch (xPCException ex)
                {
                    Console.WriteLine(ex.Message);
                    MessageBox.Show(ex.Message);
                }
            }
        }

        private void LoadButton_Click(object sender, EventArgs e)
        {
            if (xPCTarget.IsConnected == true)
            {
                try
                {
                    application = xPCTarget.Load("C:\\Users\\Closer\\Desktop\\matlab\\xpctank1.dlm");
                    
                    // 设置hostScope来获取xPCTarget的信号信息
                    SetAppHostScopes();
       
                    xPCScopes scopes = application.Scopes;
                    xPCHostScopeCollection hScopes = scopes.HostScopes;
                    xPCTargetScopeCollection tScopes = scopes.TargetScopes;

                    // 指定参数
                    xPCParameters param = xPCTarget.Application.Parameters;
                    // 先清空参数
                    param.Refresh();
                    // 获取参数的坐标和参数名
                    xPCParameter p = param["SetPoint", "Value"];
                    Double[] values = new Double[1];
                    //values[0] = Double.Parse(ParaText.Text);
                    values[0] = 5.0;
                    // 指定参数值
                    p.SetParam(values);

                    // 设置采样时间
                    application.SampleTime = 0.01;
                    // 设置结束时间 单位秒  -1是永不停止
                    application.StopTime = 360;
                    tScopes.StartAll();
                    hScopes.StartAll();
                    Console.WriteLine("load successfully");
                }
                catch (xPCException ex)
                {
                    Console.WriteLine(ex.Message);
                    MessageBox.Show(ex.Message);
                }
            }
            else
            {
                Console.WriteLine("please connect first");
                //Call the Disconnect methods to close the communication channel with the target PC.
                xPCTarget.Disconnect();
            }
        }


        private void SetAppHostScopes()
        {
            try
            {
                // Initialize scopes.
                xPCApplication app = xPCTarget.Application;
                
                if (app.Status == xPCAppStatus.Running)
                {
                    app.Stop();
                }

                // Refresh all scopes.
                xPCScopes scopes = app.Scopes;
                scopes.RefreshAll();

                // Delete any existing host scopes.
                xPCHostScopeCollection hScopes = scopes.HostScopes;
                hScopes.Remove();

                // Add a host scope to capture data for signal display.
                this.refSc = hScopes.Add();
                // NumSamples是采样的数量，10000即采样10000次
                // application.StopTime = 360;运行360s
                // 每次采样间隔0.01s，采样5000次需要50s
                this.refSc.DataTimeObject.NumSamples = 5000;
                refSc.NumSamples = 5000;
                refSc.Signals.Add("SetPoint");
                refSc.Signals.Add("TankLevel");
                Console.WriteLine("in0");
                
            }
            catch (xPCException ex)
            {
                MessageBox.Show(ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }


        private void RunButton_Click(object sender, EventArgs e)
        {
            try
            {
                application.Start();
                Console.WriteLine("run succesfully");
            }
            catch (xPCException ex)
            {
                xPCTarget.Disconnect();
                Console.WriteLine(ex.Message);
                MessageBox.Show(ex.Message);
            }
        }

        private void StopButton_Click(object sender, EventArgs e)
        {
            try
            {
                xPCTarget.Application.Stop();
                Console.WriteLine("stop succesfully");
            }
            catch (xPCException ex)
            {
                Console.WriteLine(ex.Message);
                MessageBox.Show(ex.Message);
            }
        }

        private void DisplayButton_Click(object sender, EventArgs e)
        {
            try
            {
                // 获取单个信息
                xPCParameters param = xPCTarget.Application.Parameters;
                xPCParameter p = param["SetPoint", "Value"];
                Double[] para = p.GetParam();
                Console.WriteLine(para[0]);
                Console.WriteLine();
                xPCSignals signal =  xPCTarget.Application.Signals;
                xPCSignal s = signal["TankLevel"];
                Console.WriteLine(s.GetValue());
                Console.WriteLine("display succesfully");


                // 获取集合信息
                // xPCTarge在运行时才能采样
                if (xPCTarget.Application.Status == xPCAppStatus.Running)
                {
                    Console.WriteLine("in1");
                    xPCScopes scopes = xPCTarget.Application.Scopes;
                    scopes.RefreshAll();

                    xPCHostScopeCollection hScopes = scopes.HostScopes;
                    xPCHostScope sc = hScopes[refSc.ScopeId];
                    // SCSTATUS.FINISHED是指采样结束，SetAppHostScopes()中设置的采样间隔*采样数=100s，即50s才能获取到采样信息
                    // xPCHostScope的状态为SCSTATUS.FINISHED是指采样结束
                    if (sc.Status == SCSTATUS.FINISHED)
                    {
                        
                        Console.WriteLine("in2");
                        xPCDataHostScSignalObject scDataObj = sc.DataTimeObject;
                        Double[] Time = scDataObj.GetData();

                        Double[] data1 = sc.Signals["TankLevel"].HostScopeSignalDataObject.GetData();
                        Double[] data2 = sc.Signals["SetPoint"].HostScopeSignalDataObject.GetData();
                        Chart.Series[0].ChartType = System.Windows.Forms.DataVisualization.Charting.SeriesChartType.Point;
                        Chart.Series[1].ChartType = System.Windows.Forms.DataVisualization.Charting.SeriesChartType.Point;
                        Chart.Series[0].Points.Clear();
                        Chart.Series[1].Points.Clear();
                        for (int pointIndex = 0; pointIndex < data1.Length; pointIndex++)
                        {
                            Chart.Series[0].Points.AddXY(Time[pointIndex], data1[pointIndex]);
                            Chart.Series[1].Points.AddXY(Time[pointIndex], data2[pointIndex]);
                            Console.WriteLine(Time[pointIndex] + " : " + data2[pointIndex]);
                        }
                        
                    }
                }
                    
                   
            }
            catch (xPCException ex)
            {
                Console.WriteLine(ex.Message);
                MessageBox.Show(ex.Message);
            }
        }

        private void DisconnectButton_Click(object sender, EventArgs e)
        {
            try
            {
                xPCTarget.Disconnect();
                Console.WriteLine("disconnect succesfully");
            }
            catch (xPCException ex)
            {
                Console.WriteLine(ex.Message);
                MessageBox.Show(ex.Message);
            }
        }

        private void UnloadButton_Click(object sender, EventArgs e)
        {
            try
            {
                xPCTarget.Unload();
                Console.WriteLine("unload succesfully");
            }
            catch (xPCException ex)
            {
                Console.WriteLine(ex.Message);
                MessageBox.Show(ex.Message);
            }
        }

      
    }
}
