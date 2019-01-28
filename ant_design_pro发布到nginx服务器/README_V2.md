# Nginx重启时报错和访问网页时json格式错误的问题解决

## 1.重启nginx报错
报错如下：  
```shell
Job for nginx.service failed because the control process exited with error code. See "systemctl status nginx.service" and "journalctl -xe" for details.
```
遇到这样时因为端口被占了。  
```shell
netstat -ntlp | grep 80
```
先查看一下80或者某个端口的使用情况，不出意外应该是这个端口被占了。如下。  
```shell
tcp        0      0 0.0.0.0:8081            0.0.0.0:*               LISTEN      9550/nginx: master
```
怎么解决呢？网上很多都是`kill pid `的方法，我觉得这样子太麻烦，我采用先停掉`nginx`服务  
```shell
service nginx stop
```
然后再查看端口，发现已经不被占用了。  
这时，再打开`nginx`就不会报错。  
```shell
service nginx start
```
不过如果占用80端口的不是`nginx`服务，这时就只有杀进程了。  
```shell
ps -ef | grep 80
kill pid 80
```
杀掉之后，重启`nginx`服务，  
```shell
service nginx restart
```

## 2.访问页面时json报错
报错如下  
```shell
umi.js:1 Uncaught (in promise) SyntaxError: Unexpected token < in JSON at position 0
```
网上说和`Json`的什么有关，我这边经检查出现这样错误的原因时`nginx`的配置没有配好，这时检查一下`nginx.conf`和`default.conf`文件，看看标点符号，`location`，`root`什么的是否有效bug，或者后端有没有连上。修改后再`service nginx reload`，应该就能正常访问了。  

## 附
我认为，这些命令都一个效果，不必纠结...  
```shell
systemctl start nginx.service
systemctl stop nginx.service
systemctl restart nginx.service
systemctl reload nginx.service

service nginx start  
service nginx stop  
service nginx restart  
service nginx reload  
  
/etc/init.d/nginx start  
/etc/init.d/nginx stop  
/etc/init.d/nginx restart  
/etc/init.d/nginx reload
```
另外，如果不是再服务器上部署的话，只是在虚拟机上试试，不建议`nginx`服务开机启动。  
因为开机启动的话，直接80端口就被占了，有时候会很迷，当然如过很熟悉nginx的话，请无视，见笑了(￣▽￣)"  

```shell
启动一个服务：systemctl start nginx.service
关闭一个服务：systemctl stop nginx.service
重启一个服务：systemctl restart nginx.service
显示一个服务的状态：systemctl status nginx.service
在开机时启用一个服务：systemctl enable nginx.service
在开机时禁用一个服务：systemctl disable nginx.service
```