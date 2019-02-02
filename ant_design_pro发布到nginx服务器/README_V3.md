# 让Ant Design Pro在服务器ECS上跑起来！
---
相信很多小伙伴的Ant Design Pro工程在WebStrom后中增加很多页面和功能后，对怎样发布到服务器上有多疑问。因为这时候又不和后端相连，只是想看看自己加的东西能不能正常在服务器上跑。这时怎么办呢？一个解决办法如下:
`OS:Centos7`

把除了`node_modules`文件夹外的所有文件都传到服务器上，然后运行`npm install`，下载好后，直接访问`ip:8000`就行，前提是要把服务器对8000端口的防火墙关闭，这个可以在阿里云控制台调。

<font color='red'>
**以下的不要看，完全是误导人的，因为我太菜了....**
===
</font>

---
---
---
<br/>

**其实很简单，就是克隆一份工程文件，记得是带有`node_modules`的整个项目，然后统统	扔到服务器上，然后`npm start`跑起来，再在`nginx`配置文件中，`proxy_pass `代理到`localhost:8000`，就大功告成了。**


## 1.nginx服务器
----
先在服务器上下载nginx，这里不再赘述。  
然后安如下配置`default.conf`即可  
```shell
server {
    listen 80;
    # gzip config
    gzip on;
    gzip_min_length 1k;
    gzip_comp_level 9;
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
    gzip_vary on;
    gzip_disable "MSIE [1-6]\.";

    root /usr/share/nginx/dist;

    location / {
        # 用于配合 browserHistory使用
        try_files $uri $uri/ /index.html;
        # 如果有资源，建议使用 https + http2，配合按需加载可以获得更好的体验
        # rewrite ^/(.*)$ https://preview.pro.ant.design/$1 permanent;

    }
    location /api {
        proxy_pass http://127.0.0.1:8000;
    }
}
```
配置完后先不要开启`nginx`服务

## 2.project跑起来
---
将本地项目文件夹下所有文件统统上传到ECS上，然后`npm start`。成功运行后，打开`nginx`服务
```shell
service nginx start
service nginx reload
```
然后浏览器访问`IP`即可。


## 附
---
上传项目文件夹有几点需要注意(都是坑，一路踩过来的)：

 1. 如果本机上是`windows`系统，那么久不能整个项目一起打包上传，因为服务器系统是   
    `Centos`，这是不兼容的。会报错`cross_env`巴拉巴拉的。  
        这时需要安装官网的教程 ```shell git clone --depth=1
        https://github.com/ant-design/ant-design-pro.git my-project cd
        my-project npm install ```再来一遍，然后把自己改动的文件夹上传覆盖。 然后`npm
        start`就不会报错了。

    
2. 有时候`npm start`会报错
```shell
> ant-design-pro@2.2.1 start /root/my-project
> cross-env APP_TYPE=site umi dev

/root/my-project/node_modules/antd-pro-merge-less/loopAllLess.js:10
const loopAllLess = async parents => {
                          ^^^^^^^

SyntaxError: Unexpected identifier
    at createScript (vm.js:56:10)
    at Object.runInThisContext (vm.js:97:10)
    at Module._compile (module.js:549:28)
    at Module._compile (/root/my-project/node_modules/pirates/lib/index.js:83:24)
    at Module._extensions..js (module.js:586:10)
    at Object.newLoader [as .js] (/root/my-project/node_modules/pirates/lib/index.js:88:7)
    at Module.load (module.js:494:32)
    at tryModuleLoad (module.js:453:12)
    at Function.Module._load (module.js:445:3)
    at Module.require (module.js:504:17)
/root/my-project/node_modules/umi-build-dev/lib/UserConfig.js:186
      throw new Error(msg);
      ^

Error: 配置文件 "config/config.js" 解析出错，请检查语法。

SyntaxError: Unexpected identifier
    at onError (/root/my-project/node_modules/umi-build-dev/lib/UserConfig.js:186:13)
    at requireFile (/root/my-project/node_modules/umi-build-dev/lib/UserConfig.js:97:12)
    at UserConfig.getConfig (/root/my-project/node_modules/umi-build-dev/lib/UserConfig.js:189:72)
    at Service.init (/root/my-project/node_modules/umi-build-dev/lib/Service.js:288:31)
    at Service.run (/root/my-project/node_modules/umi-build-dev/lib/Service.js:326:10)
    at Object.<anonymous> (/root/my-project/node_modules/umi/lib/scripts/realDev.js:28:47)
    at Module._compile (module.js:577:32)
    at Object.Module._extensions..js (module.js:586:10)
    at Module.load (module.js:494:32)
    at tryModuleLoad (module.js:453:12)
```
这是由于`node`的版本太低，升级`node`可解决此问题
```shell
npm install -g n
n latest
```
很尬的一点是，`npm start`也就是8000端口没法在后台运行，只要XShell关闭，8000端口就关闭了，这时80端口也访问不到了.....  
虽然整个过程的意义不大，但是......没有什么好但是的，就是意义不大（逃🏃‍♂️


**更新**

----
`npm start`可以后台运行👏  
```shell
which nohup
yum provides */nohup  # 没有的话安装
cd ~
vim .bash_profile
# 在PATH=$PATH:$HOME/bin后面加上which nohup的地址
PATH=$PATH:$HOME/bin:/usr/bin/nohup
source ~/.bash_profile
cd /path/to/your/project
nohup npm start &
```
参考资料：
https://blog.csdn.net/chanlingmai5374/article/details/80762983
https://blog.csdn.net/qq_27384769/article/details/78849930

附
```shell
netstat -ntlp | grep 80 查看端口占用情况

ps -ef | grep npm  查看端口或服务对应进程
ps -ef | grep node
```