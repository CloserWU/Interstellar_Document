# docker创建mysql容器并外部访问
1.mysql容器
---
要使用mysql低于8.0版本的，否则外部连接不上！  
`docker pull mysql:5.6.41`  
2.执行以下命令  
---
`docker run --name centos-mysql -e MYSQL_ROOT_PASSWORD=123456 -p 3306:3306 -d mysql:5.6.41`</br>

 - name：给新创建的容器命名，此处命名为centos-mysql
 - -e：配置信息，此处配置mysql的root用户的登陆密码
 - -p：端口映射，此处映射主机3306端口到容器pwc-mysql的3306端口
 - -d：成功启动容器后输出容器的完整ID，
 - 最后一个mysql指的是mysql镜像名字

3.准备工作
---

开放端口</br>
`firewall-cmd --add-port=3306/tcp`</br>
关闭防火墙  
`systemctl stop firewalld`  

4.navicat连接
---

![](http://img.blog.csdn.net/20160317143333986)  
tips：md换行为两个空格
