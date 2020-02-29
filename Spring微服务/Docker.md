## 无网络环境安装`docker`
本篇介绍，在机器完全断开网络连接的情况下，如何安装docker，
参考https://docs.docker.com/install/linux/docker-ce/binaries/#install-static-binaries

转到<https://download.docker.com/linux/static/stable/>（或更改stable为edge或test），选择您的硬件平台，然后下载.tgz与要安装的Docker CE版本相关的文件。

```shell
如果要修改/etc/docker/daemon.json文件， 例如镜像源（主机没网络修改了也没用）或私有仓库（需和主机在同一局域网，不然也没用）
则先修改后再安装
tar xzvf /path/to/<FILE>.tar.gz
sudo cp docker/* /usr/bin/
sudo dockerd &
sudo docker run hello-world
docker info
```

如果安装过程中失败，则

```shell
删除/var/run/docer文件夹
删除/var/lib/docker文件夹
删除/var/run/docker.pid文件
删除/var/run/docker.sock文件
ps -aux | grep docker
停止docker相关进程
netstat -nplt | grep docker
解除docker相关进程占用端口
重新执行上述步骤
```





## 根据容器名批量删除容器

```shell
docker rm -f $(docker ps -a |  grep "192*"  | awk '{print $1}')
```



## 转移主机之间Docker镜像

## 列出Docker镜像

使用下面的命令在系统上的列表Docker镜像。

```shell
root@howtoing.com:~# docker images

REPOSITORY     TAG        IMAGE ID            CREATED          VIRTUAL SIZE
centos         latest     2933d50b9f77        11 days ago      196.6 MB
ubuntu         latest     36248ae4a9ac        11 days ago      188 MB
```

## 保存或存档镜像

现在使用下面的命令来保存一个名为Ubuntu的镜像库（镜像ID：36248ae4a9ac），并命名为Ubuntu的latest.tar.gz一个压缩存档。请记住，节省用于制造Docker镜像（不是容器）的备份。
```shell
docker save ubuntu | gzip > ubuntu-latest.tar.gz
```

## 导入镜像
在你的系统上的归档格式保存镜像Docker后使用scp或ftp将其移动到远程系统。远程系统下面的命令，使用后导入Docker镜像的名字Ubuntu和标签名最新的
```shell
zcat ubuntu-latest.gz | docker import - ubuntu:latest
```
上面的命令将创建名为Ubuntu和标记名称最新的系统上的镜像Docker。现在你可以使用这个形象像下面推出的容器。

```shell
docker run -i -t ubuntu /bin/bash
```