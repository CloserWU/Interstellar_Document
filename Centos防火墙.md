# Centos防火墙
Centos升级到7之后，内置的防火墙已经从iptables变成了firewalld。所以，端口的开启还是要从两种情况来说明的，即iptables和firewalld。更多关于CentOs防火墙的最新内容，请参考Redhat官网。  
这里介绍firewalld  

1.启动防火墙  
```shell
systemctl start firewalld
```   
2.禁用防火墙  
```shell
systemctl stop firewalld
```  
3.设置开机启动  
```shell
systemctl enable firewalld
```  
4.停止并禁用开机启动  
```shell
sytemctl disable firewalld
```  

5.重启防火墙  
```shell
firewall-cmd --reload
```  

6.查看状态  
```shell
systemctl status firewalld或者 firewall-cmd --state
```  

7.查看版本  
```shell
firewall-cmd --version
```  

8.查看帮助  
```shell
firewall-cmd --help
```  

9.查看区域信息  
```shell
firewall-cmd --get-active-zones
```  

10.查看指定接口所属区域信息  
```shell
firewall-cmd --get-zone-of-interface=eth0
```  

11.拒绝所有包  
```shell
firewall-cmd --panic-on
```  

12.取消拒绝状态  
```shell
firewall-cmd --panic-off
```  
 
13.查看是否拒绝  
```shell
firewall-cmd --query-panic
```  

14.将接口添加到区域(默认接口都在public)  
```shell
firewall-cmd --zone=public --add-interface=eth0(永久生效再加上 --permanent 然后reload防火墙)
firewall-cmd --permanent --zone=public --add-port=8080/tcp
```  

15.设置默认接口区域  
```shell
firewall-cmd --set-default-zone=public(立即生效，无需重启)
```  

16.更新防火墙规则  
```shell
firewall-cmd --reload或firewall-cmd --complete-reload(两者的区别就是第一个无需断开连接，就是firewalld特性之一动态
添加规则，第二个需要断开连接，类似重启服务)
```  

17.查看指定区域所有打开的端口  
```shell
firewall-cmd --zone=public --list-ports
``` 
 
18.在指定区域打开端口（记得重启防火墙）  
```shell
firewall-cmd --zone=public --add-port=80/tcp(永久生效再加上 --permanent)
firewall-cmd --permanent --zone=public --add-port=8080/tcp
```

参考  
[Centos防火墙设置与端口开放的方法](https://blog.csdn.net/u011846257/article/details/54707864)  
[centos7.2部署tomcat8](https://blog.csdn.net/zh237560547/article/details/74504986)  
