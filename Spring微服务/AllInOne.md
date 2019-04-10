# 分布式开发工作流程

```
GitLab 192.168.75.128
Nexus  192.168.75.130:8081
Registry 192.168.75.131:8080
Mysql 192.168.75.133:3306
```



1. 修改项目

   在 Maven `settings.xml` 中添加 Nexus 认证信息(`servers` 节点下)：

   ```
   <server>
     <id>nexus-releases</id>
     <username>admin</username>
     <password>admin123</password>
   </server>
   
   <server>
     <id>nexus-snapshots</id>
     <username>admin</username>
     <password>admin123</password>
   </server>
   ```

   在 `pom.xml` 中添加如下代码：

   ```text
   <!--http://192.168.75.130:8081是Nexus地址-->
   <distributionManagement>  
     <repository>  
       <id>nexus-releases</id>  
       <name>Nexus Release Repository</name>  
       <url>http://192.168.75.130:8081/repository/maven-releases/</url>  
     </repository>  
     <snapshotRepository>  
       <id>nexus-snapshots</id>  
       <name>Nexus Snapshot Repository</name>  
       <url>http://192.168.75.130:8081/repository/maven-snapshots/</url>  
     </snapshotRepository>  
   </distributionManagement> 
   <repositories>
       <repository>
           <id>nexus</id>
           <name>Nexus Repository</name>
           <url>http://192.168.75.130:8081/repository/maven-public/</url>
           <snapshots>
               <enabled>true</enabled>
           </snapshots>
           <releases>
               <enabled>true</enabled>
           </releases>
       </repository>
   </repositories>
   <pluginRepositories>
       <pluginRepository>
           <id>nexus</id>
           <name>Nexus Plugin Repository</name>
           <url>http://192.168.75.130:8081/repository/maven-public/</url>
           <snapshots>
               <enabled>true</enabled>
           </snapshots>
           <releases>
               <enabled>true</enabled>
           </releases>
       </pluginRepository >
   </pluginRepositories>
   ```

   并且在项目中修改`db.properties`的数据库`url`为`192.168.75.133:3306`

2. 在Gitlab上新建一个项目myshop，添加一个readme 

   将本地机器项目`commit`到仓库里

3. 在另外一台机器上（要有maven，依赖jdk） 创建目录` /usr/local/docker`，用ssh下载下来项目 `git clone ...`，如果没有ssh `ssh-keygen -t rsa -C "18969946575@163.com" `生成一个ssh公钥私钥，将公钥复制到gitlab setting里即可

4. mvn打包项目

   在`/usr/local/docker/myshop`目录下（myshop的项目目录）

   `mvn clear packcage -Dmaven.test.skip=true`

   maven的默认本地仓库地址为在`/apache-maven.../conf/settings.xml`文件中  `${user.home}/.m2/repository`

5. 这台机器将项目打包为镜像传到`Resgitry`私服

   在`/usr/local/docker/myshop/target`下，将项目生成文件打包为tar

   进入`/target`下项目文件夹

   `tar -zcvf  myshop.tar.gz`   移动到`/image`下

   在`/usr/local/docker/myshop`下新建文件夹`/image`，进入`/image`创建文件`Dockerfile`

   ```dockerfile
   FROM tomcat
   
   WORKDIR /usr/local/tomcat/webapps/ROOT
   
   RUN rm -rf *
   
   ADD myshop.tar.gz /usr/local/tomcat/webapps/ROOT #ADD自动解压缩
   
   RUN rm -rf myshop.tar.gz
   
   WORKDIR /usr/local/tomcat
   ```

   ```shell
   docker build -t 192.168.75.131:5000/myshop
   
   docker push 192.168.75.131:5000/myshop
   ```

6. 从docker私有仓库上down下生产环境

   在任一台机器上`/usr/local/docker/myshop`文件夹下 创建`docker-compose.yml`

   ```yml
   version: 3.1
   services:
     myshop:
     restart: always
     image: 192.168.75.131:5000/myshop
     container_name:myshop
     ports:
       - 8080: 8080
   ```

   `vim  /etc/docker/daemon.json`

   ```
   {
     "registry-mirrors": [
       "https://registry.docker-cn.com"
     ],
     "insecure-registries": [
       "ip:5000"
     ]
   }
   ```

   最后 `docker-compose up` 访问`ip:8080`即可

   