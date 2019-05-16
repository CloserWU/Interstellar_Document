# 在服务器上安装tensorflow-gpu版本及其使用 #
##### 本文档是在服务器上，不要su权限，全部命令行下载安装配置教程 <br />



**系统 Centos7**
**所需文件**

- cuda9.0（一定是要9.0版本，9.2，10.0都是坑，亲测无效！）
- cudnn（一定要与cuda版本匹配，NVIDIA官网具体下载时要注意）
- Anaconda （本人下载的是5.4版本，其他版本只要不太低，应该也可以）



## 步骤 

1.安装cuda
========
到NVIDIA官方网站下载cuda9.0。https://developer.nvidia.com/cuda-90-download-archive?target_os=Linux&target_arch=x86_64&target_distro=CentOS&target_version=7&target_type=runfilelocal
可以在本地打开网址查看，下载runfile(local)。
    
![cuda](https://github.com/CloserWU/tf-gpu/raw/master/image/cuda.png)

服务器上具体命令：`wget -c https://developer.nvidia.com/compute/cuda/9.0/Prod/local_installers/cuda_9.0.176_384.81_linux-run`
下载成功后，安装

- 安装过程中刚开始会出现一大堆类似文档的东西，疯狂空格就行
- Do you accept the previously read EULA? 
- accept/decline/quit: accept（没什么好说的了直接敲accept）
- Install NVIDIA Accelerated Graphics Driver for Linux-x86_64 396.26?  **这里是说是否安装显卡驱动，一定要选no！**
- Do you want to install the OpenGL libraries? 这是nvidia自己的opencv 没有用的,要用就用直接的opencv官网安装也很简单，所以这n
- Install the CUDA 9.2 Toolkit? 是否安装，当然yes
- Enter Toolkit Location 
- default is /usr/local/cuda-9.2 :  **这个一定不要用默认的，因为没有su权限，目录选到自己home下 例如：/home/wushuai/**
然后开始安装<br />

命令： <code>sh cuda_9.0.176_384.81_linux-run</code><br />
配置环境变量：<br />
我不知道 .bashrc 和 .bash_profile 有什么区别，索性都配上。<br />
进入home下，命令： <code>vim .bashrc</code></p><br />
在文件尾部添加<br />
<p><code>export PATH=/home/path/to/your/cuda/bin${PATH:+:${PATH}}
export LD_LIBRARY_PATH=/home/path/to/your/cuda/lib64${LD_LIBRARY_PATH:+:${LD_LIBRARY_PATH}}
export CUDA_HOME=/home/path/to/your/cuda
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/home/path/to/your/cuda/extras/CUPTI/lib64</code></p><br />
同样，在.bashrc_profile中添加。<br />
到此，cuda安装成功。<br />
验证方法， 命令： <code>nvcc -V</code><br />

2.下载cudnn<br />
====

![cudnn](https://github.com/CloserWU/tf-gpu/raw/master/image/cudnn.png)<br />

命令： <code>wget -c --http-user=XXX --http-passwd=XXX https://developer.nvidia.com/compute/machine-learning/cudnn/secure/v7.3.0/prod/9.0_2018920/cudnn-9.0-linux-x64-v7.3.0.29</code><br />
因为下载cudnn需要注册NVIDIA的账号，所以下载时要利用wget 并加上你的用户名和密码。<br />
如果出现403 Forbidden，则表示不能下载。<br />
这时换另一个命令。<br />
命令： <code>wget http://developer.download.nvidia.com/compute/redist/cudnn/v7.3.0/cudnn-9.0-linux-x64-v7.3.0.29.tgz</code><br />
即可下载，下载时下载到和cuda同一个目录下。这样解压时，不用自己操作即可将cudnn文件复制到cuda文件夹中<br />
解压命令： <code>tar -xzvf cudnn-9.0-linux-x64-v7.3.0.29.tgz </code><br />
cudnn下载完毕<br />

3.安装anaconda<br />
====
到anaconda官网，找到对应版本<br />
命令： <code>wget -c https://repo.anaconda.com/archive/Anaconda3-5.3.0-Linux-ppc64le.sh</code><br />
安装命令： <code>sh Anaconda3-5.3.0-Linux-ppc64le.sh</code><br />
换源： <p><code>conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/</code><br />
<code>conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/</code><br />
<code>conda config --set show_channel_urls yes</code><br />
然后创建python虚拟环境<br />
使用 <code>conda create -n your_env_name python=X.X（2.7、3.6等)</code>命令创建python版本为X.X、名字为your_env_name的虚拟环境。your_env_name文件可以在Anaconda安装目录envs文件下找到<br />
<code>source activate your_env_name(虚拟环境名称)</code>  激活虚拟环境(tf-gpu)<br />
<code>source deactivate</code>  关闭虚拟环境<br />
激活虚拟环境后，使用pip或者conda安装包，直接安装到虚拟环境中<br />
anaconda和虚拟环境下载安装完毕<br />

4.下载tensorflow-gpu<br />
====
激活虚拟环境<br />
pip下载tensorflow-gpu命令： <code>pip install tensorflow-gpu</code><br />
即可<br />
验证是否安装成功：<br />
进入python<br />
<code>import tensorflow as tf</code><br />
<code>sess = tf.Session(config=tf.ConfigProto(log_device_placement=True))</code><br />
下方有大段显示GPU信息表示安装成功<br />
然后下载nb_conda（还是在当前tf-gpu环境下），目的下载ipynb和jupyter，这样tf-gpu虚拟环境就能在jpyter notebook上使用了<br />
pip下载nb_conda：<code>pip install nb_conda</code><br />

5.配置jupyter服务，用来远程访问服务器
===
通过命令<code>jupyter notebook --generate-config</code>生成配置文件。<br />
记录下生成的配置文件位置，例如：<code>/home/.jupyter/jupyter_notebook_config.py</code><br />
进入python,然后执行下面的两条语句并根据提示输入密码<br />
<code>from notebook.auth import passwd</code><br />
<code>passwd()</code>
确认密码后会生成一个sha1码，这个码需要记住<br />
<code>Enter password: </code><br />
<code>Verify password: </code><br />
<code>'sha1:.........’</code><br />
因为Jupyter必须要用https进行登录，所以需要生成ssl证书<br />
<code>openssl req -x509 -nodes -days 365 -newkey rsa:1024 -keyout mykey.key -out mycert.pem</code><br />
上面的命令可以自动生成证书，但是这个证书是不安全的，只能在测试过程中使用<br />
修改配置，在~/.jupyter/jupyter_notebook_config.py末尾添加如下内容<br />
<code>c.NotebookApp.password = u'sha1:...' #上面第二步中生成的密钥</code><br />
<code>c.NotebookApp.certfile = u'/absolute/path/to/your/certificate/mycert.pem'</code><br />
<code>c.NotebookApp.keyfile = u'/absolute/path/to/your/certificate/mykey.key’</code><br />
<code>c.NotebookApp.ip = '(服务器ip)'</code><br />
<code>c.NotebookApp.open_browser = False</code><br />
<code># It is a good idea to set a known, fixed port for server access</code><br />
<code>c.NotebookApp.port = 9999</code><br />
先在服务器上想要执行ipynb的目录下用jupyter notebook命令启动服务，<br />
然后 在任意一台终端的浏览器中输入<code>https://[all ip addresses on your system]:9999/</code>测试，会提示输入密码，表示成功！！！<br />
注意，需要用https<br />

<font color='blue'>
在服务器账号下的有关信息如下<br />
jupyter服务器密码<br />

<font color='black'>

6.服务器上使用tensorflow-gpu训练模型：<br />
====
我已经上传了吴恩达DeepLearning.ai课程的作业以及答案，以及实例分割模型Mask R_CNN。分别可以在jupyter运行和命令行运行。
    
![DL](https://github.com/CloserWU/tf-gpu/raw/master/image/dl.png)<br />

1.ipynb文件可以通过jupyter服务。
- 终端输入jupyter notebook，启用jupyter服务。

![jp](https://github.com/CloserWU/tf-gpu/raw/master/image/jp.png)<br />

- 打开本地浏览器，输入https://(ip):9999。具体端口号看倒数第二行的显示，有时会是10000<br />
- 然后点击继续前往



- 打开一个ipynb文件，例如

![keras](https://github.com/CloserWU/tf-gpu/raw/master/image/kreas.png)<br />

- 选择kernel -> change kernel -> Python [conda envs:tf-gpu]<br />

![change](https://github.com/CloserWU/tf-gpu/raw/master/image/change.png)<br />

即可看到转换成功

![tf-gpu](https://github.com/CloserWU/tf-gpu/raw/master/image/tf-gpu.png)<br />

- run即可运行,并且在Xshell可以看到以及在占用GPU资源<br />

![gpu](https://github.com/CloserWU/tf-gpu/raw/master/image/gpu.png)<br />

2.py文件可以通过命令行方式运行 
- 命令：<code>source activate tf-gpu</code><br />
- 命令：<code>python XXX.py XXX(命令行参数,可以没有)</code><br />
训练Mask R_CNN时：
<code>python coco.py train --dataset=/path/to/coco/dataset --model=coco</code><br />

参考资料
====
1. Linux系统 conda 创建python虚拟环境 https://blog.csdn.net/dongwanli666/article/details/78920059<br />
2. 在服务器上配置jupyter notebook https://blog.csdn.net/computerme/article/details/78751670<br />
3. linux查看硬件配置命令 https://www.cnblogs.com/chaichuan/p/3757840.html<br />
4. 从零开始搭建深度学习服务器: 1080TI四卡并行（Ubuntu16.04+CUDA9.2+cuDNN7.1+TensorFlow+Keras） http://www.52nlp.cn/%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E6%9C%8D%E5%8A%A1%E5%99%A8-1080ti-ubuntu16-04-cuda9-2-cudnn7-1-tensorflow-keras?utm_source=tuicool&utm_medium=referral<br />
5. Anaconda--设置国内镜像 https://blog.csdn.net/m0_37691307/article/details/80468568
6. 用conda创建python虚拟环境 https://blog.csdn.net/lyy14011305/article/details/59500819
7. 安装Cuda9.0 + CUDNN + Tensorflow https://blog.csdn.net/qq_22080019/article/details/80807377
8. 用wget下载需要用户名和密码认证的网站或者ftp服务器文件 https://cloud.tencent.com/developer/article/1055872
9. CUDA安装踩坑指南 https://blog.csdn.net/lzcong1986/article/details/81050639
10. linux中.run文件的安装与卸载 https://blog.csdn.net/longchao2/article/details/77453498
11. CentOS 7 安装 NVIDIA 显卡驱动和 CUDA Toolkit https://blog.csdn.net/xueshengke/article/details/78134991
12. cudnn https://developer.nvidia.com/rdp/cudnn-archive
13. CUDA https://developer.nvidia.com/cuda-90-download-archive?target_os=Linux&target_arch=x86_64&target_distro=CentOS&target_version=7&target_type=runfilelocal
14. centos7安装tensorflow-gpu版本 https://www.jianshu.com/p/78a936c27ec4
15. Centos7服务器上配置GPU的tensorflow https://blog.csdn.net/Carina_Cao/article/details/80846188
