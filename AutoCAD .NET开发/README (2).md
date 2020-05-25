# AutoCAD二次开发步骤

源文件详见`CadStandard`文件夹。

## 构建项目

新建项目，选择`Visual C#` ->  `Windows桌面`，点击`控制台应用`，选择合适的`.NET Framework`（AutoCAD2018对应4.6）

然后，打开项目属性，在应用程序选项卡中选择输出类型为 类库；在调试选项卡中选择启动外部程序，选择`C:\Program Files\Autodesk\AutoCAD 2018\acad.exe`。

然后引入AutoCAD依赖，右键点击引用，点击添加引用，点击浏览，在AutoCAD根目录下，选择`accoremgd.dll` `acdbmgd.dll` `acmgd.dll`着三个依赖加入项目，若需连接MySQL数据库，则到官网上下载适配.NET的dll，选择`MySql.data` `MySql.Web`加入依赖项，注意MySql的版本最好为8.0+，并且要选择好适配的.NET版本，不要高于项目本身的.NET版本。

然后在文件中，加入依赖

```c#
// 这三个using包含操作AutoCAD的大部分操作
using Autodesk.AutoCAD.ApplicationServices;
using Autodesk.AutoCAD.EditorInput;
using Autodesk.AutoCAD.Runtime;
```



##　开发

AutoCAD二次开发分为两种操作

第一种是AutoCAD的控制台操作

第二种是AutoCAD的GUI操作

`CadStandard`中`SkirtAutoGen.cs`是第一种方案，文件中每个方法上有一个注解`[CommandMethod("xxx")]`这个xxx就是可以在AutoCAD中运行的命令。

`Form1.cs`是第二种方案，实际上就是将`SkirtAutoGen.cs`中的一些画图方法转移到按钮的监听器上，即可。

在`CommandClass.cs`中，有两个方法，`[CommandMethod("InitializeCommand")]`通过加载dll，然后以命令的形式画出样板，对应第一种方式。`[CommandMethod("InitializeFromWindow")]`通过加载dll，然后以GUI的形式画出样板，对应第二种方式。

在`Program.cs`中，`[assembly: CommandClass(typeof(CadStandard.CommandClass))]`意思是AutoCAD扫描CadStandard项目中CommandClass文件下的CommandMethod。其他文件下的命令注解不会生效。这个按需使用即可。

`Peogram.cs`是项目入口文件，`CommandClass.cs`是项目控制文件，`SkirtAutoGen.cs`，`Form1.cs`是项目逻辑实现文件,DotNetArc文件夹下是一些工具文件。

## 生成

右键点击项目，点击生成，将会产生一个dll文件，打开AutoCAD，在CMD中运行netload命令，选择这个dll，然后即可输入开发过程中所编写的一些列命令了。



