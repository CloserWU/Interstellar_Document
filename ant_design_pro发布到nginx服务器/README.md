# Ant Design Pro的project发布到nginx服务器
前端小白一个，在WebStorm里面玩的不亦乐乎，当想要把网站部署到服务器上时，一脸懵逼.jpg，于是开始填坑之旅。。。。。。  
为防止不必要的麻烦，其实是想省钱，我先打算用虚拟机安装nginx，看看在虚拟机上能不能行，然后再说阿里云的ECS。  
## 1.npm run build
将前端project执行`npm run build`命令，antd脚手架帮我们简化了一大波，一行命令完事。执行完的`dist`文件夹才几MB。之前我还想是不是要把整个project带上node_modules都1个多G的文件都传到服务器上((lll￢ω￢)...)

## 2.Centos安装nginx
听说最近百度评价急剧下降，所以咱们到Googel上找教程(滑稽)。  
1.将nginx放到yum repro库中  
`rpm -ivh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm`  
2.查看nginx信息  `yum info nginx`   
3.使用yum安装ngnix  `yum install nginx`  
4.启动nginx  `service nginx start`  
5.访问nginx  `curl -i localhost`或者在浏览器上输入localhost或者ip
到这里如果能显示，就很舒服了。显示不了页问题不大。首先，关闭服务器防火墙，`systemctl stop firewalld.service` ，或者这个重启页不用再关闭`systemctl disable firewalld.service` 。然后再使一波。
有个就问题不大了。

## 3.前端显目部署
将dist文件夹送到服务器随便一个地方，我是`/usr/share/nginx/`，就是nginx默认开启页面的隔壁。然后修改nginx的配置文件  
1.`vim /etc/nginx/nginx.conf`，然后搞成这样
```
user  root;    # 这里要修改
worker_processes  auto;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    tcp_nopush     on;
    tcp_nodelay    on;
    keepalive_timeout  65;

    gzip  on;

    include /etc/nginx/conf.d/*.conf;
}

```

2.`vim /etc/nginx/conf.d/default.conf`，搞成这样。这边可以参考antd官网的doc  https://pro.ant.design/docs/deploy-cn  
```
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
        proxy_pass https://preview.pro.ant.design;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_set_header   Host              $http_host;
        proxy_set_header   X-Real-IP         $remote_addr;
    }
}

```

然后重启nginx服务。`service nginx restart`。浏览器访问ip:80。镐腚。  
 ECS...再说
这边都改完后可能会出现403。有三个原因，要么dist里面没有index，要么是用户给没有权限访问dist，要么是SELinux的问题。我刚好是第三个，运气好的么就不谈了...参考这里  https://my.oschina.net/angerbaby/blog/738652
## 参考
1. 构建和发布 https://pro.ant.design/docs/deploy-cn  
1. centos7安装nginx的两种方法 https://www.jianshu.com/p/96691511295f  
1. 安装Nginx 在 CentOS 7 http://blog.51cto.com/cantgis/1540004  
1. 前端部署服务器小结 https://juejin.im/post/5b42f77ce51d451923443220#/admin/addArticle/_blank  
1. ubuntu16.04下nginx的基础配置教程 https://segmentfault.com/a/1190000009514737  
1. Ant Design Pro nginx配置 https://www.liangjucai.com/article/311  
1. 启动Nginx后请求资源403解决方案总结 https://my.oschina.net/angerbaby/blog/738652
1. nginx重启几种方法 https://blog.csdn.net/zqinghai/article/details/71125045  