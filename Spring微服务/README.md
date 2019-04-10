# Spring微服务
---

## 前期准备工作
 - Ubuntu Server 16.04 LTS虚拟机安装，安装附带软件时选择OpenSSH，然后编辑`sudo vi /etc/ssh/sshd_config`文件`

```shell
# Authentication:
LoginGraceTime 120
#PermitRootLogin without-password    # 找到这里，把它注释，
PermitRootLogin yes                  # 添加这一行，设置为 yes
StrictModes yes
```
然后Xhell即可连接
 - 换源
  ```shell
  cp /etc/apt/sources.list /etc/apt/sources.list.bak
  vim /etc/apt/sources.list
  :%d
  ```
  写入下面内容
  ```shell
deb http://mirrors.aliyun.com/ubuntu/ xenial main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ xenial-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ xenial-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ xenial-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ xenial-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ xenial main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ xenial-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ xenial-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ xenial-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ xenial-backports main restricted universe multiverse 
  ```
  ```shell
  apt-get update
  ```
 - 安装JDK
 ```shell
 apt-get install python-software-properties
 add-apt-repository ppa:webupd8team/java
 apt-get update
 apt-get install oracle-java8-installer
 java -version
 ```
 - 安装Tomcat
 ```shell
 wget http://mirrors.ocf.berkeley.edu/apache/tomcat/tomcat-8/v8.5.39/bin/apache-tomcat-8.5.39.tar.gz
 tar -xzvf ...
 mv ... tomcat
 update-alternatives --config java #定位java安装目录
 vim tomcat/bin/start.sh
 
 最后一行前 加上
 #set java environment
export JAVA_HOME=/usr/java/jdk1.8.0_111  #java目录
export JRE_HOME=${JAVA_HOME}/jre
export CLASSPATH=.:%{JAVA_HOME}/lib:%{JRE_HOME}/lib
export PATH=${JAVA_HOME}/bin:$PATH

#tomcat
export TOMCAT_HOME=/usr/tomcat/apache-tomcat-8.5.9  #tomcat解压目录
 ```
 - MySQL
 ```shell
 apt-get install mysql-server
 apt install mysql-client
 apt install libmysqlclient-dev
 netstat -tap | grep mysql  # 查看是否安装成功
 # 允许远程访问
 vi /etc/mysql/mysql.conf.d/mysqld.cnf 
 # 注释掉bind-address = 127.0.0.1： 
 mysql -u root -p
 grant all on *.* to root@'%' identified by '你的密码' with grant option;
 flush privileges;
 exit;
 service mysql restart
 navicat连接测试
 ```
 - docker
 ```shell
apt-get remove docker docker-engine docker.io
apt update 
apt-get -y install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL http://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] http://mirrors.aliyun.com/docker-ce/linux/ubuntu $(lsb_release -cs) stable"
apt-get -y update
apt-get -y libltdl7
apt-get -y install containerd.io
apt-get -y install docker-ce
systemctl enable docker
systemctl start docker
docker run hello-world
vim /etc/docker/daemon.json
# 添加
{
  "registry-mirrors": [
    "https://registry.docker-cn.com"
  ]
}
systemctl daemon-reload
systemctl restart docker
 ```


## Docker
例1
```dockerfile
FROM circleci/node:latest-browsers

# COPY <源路径>... <目标路径>
# <目标路径> 可以是容器内的绝对路径，也可以是相对于工作目录的相对路径（工作目录可以用 WORKDIR 指令来指定）。目标路径不需要事先创建，如果目录不存在会在复制文件前先行创建缺失目录。
WORKDIR /usr/src/app/
USER root
COPY package.json ./
RUN yarn

COPY ./ ./

RUN npm run test:all

# 容器开启之后执行的命令。Docker 不是虚拟机，容器就是进程。既然是进程，那么在启动容器的时候，需要指定所运行的程序及参数。CMD 指令就是用于指定默认的容器主进程的启动命令的。Docker 不是虚拟机，容器中的应用都应该以前台执行，而不是像虚拟机、物理机里面那样，用 upstart/systemd 去启动后台服务，容器内没有后台服务的概念。  CMD service nginx start 错误的写法。正确的做法是直接执行 nginx 可执行文件，并且要求以前台形式运行。CMD ["nginx", "-g", "daemon off;"]
CMD ["npm", "run", "build"]


# 当指定了 ENTRYPOINT 后，CMD 的含义就发生了改变，不再是直接的运行其命令，而是将 CMD 的内容作为参数传给 ENTRYPOINT 指令，换句话说实际执行时，将变为：<ENTRYPOINT> "<CMD>"
```
例2
```dockerfile
FROM node:latest

WORKDIR /usr/src/app/

COPY package.json ./
RUN npm install --silent --no-cache

COPY ./ ./

CMD ["npm", "run", "start"]
```
例3
```dockerfile
FROM nginx

WORKDIR /usr/src/app/

COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY ./dist  /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"] 
```

## Spring Boot



