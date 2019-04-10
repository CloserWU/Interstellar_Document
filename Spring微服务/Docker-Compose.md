# Docker-Compose部署多应用

模板`docker-compose.yml`文件
```yml
version: '3.1'
services:
  tomcat:
    restart: always
    image: tomcat
    container_name: tomcat
    ports:
      - 8080:8080
    volumes:
      - /root/tomcat/webapps/SSM-JSON:/usr/local/tomcat/webapps/SSM-JSON
    environment:
      TZ: Asia/Shanghai
  mysql:
    restart: always
    image: mysql:8.0.11
    container_name: mysql
    ports:
      - 3306:3306
    environment:
      MYSQL_ROOT_PASSWORD: Ws-995339251
    command:
      --character-set-server=utf8mb4
      --collation-server=utf8mb4_general_ci
      --explicit_defaults_for_timestamp=true
    volumes:
      - mysql-data:/var/lib/mysql
volumes:
  mysql-data:
```

创建`docker-compose.yml`文件后，不要着急打开，因为数据还没有配置
docker的数据卷都存放在宿主机的`/var/lib/docker/volumes`下
进入这个文件夹，会有一个`backend_mysql-data/_data`的文件夹。

1.将外部数据库里的数据转移到数据卷里。
首先，在`docker-compose.yml`文件目录下执行`docker-compose up`，启动容器
打开navicat连接数据库，将数据库数据写入

2.在tomcat工程中，db.properties的url不能写localhost和127.0.0.1，虚拟机要写局域网ip地址，服务器要写公网ip。

3.当出现错误`Mysql Error:The user specified as a definer (‘mysql.infoschema’@’localhost’) does not exist’ when trying to dump tablespaces`时

解决办法：
```shell
docker exec -it mysql bash
mysql -u root -p
mysql> SET GLOBAL innodb_fast_shutdown = 1;
mysql_upgrade -u root -p
```

