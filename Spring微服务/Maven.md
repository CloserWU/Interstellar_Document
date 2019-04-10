# Ubuntu下载maven

1. 下载jdk -8u152-.....tar.gz

   tar -zxvf ...

   修改/etc/profile，在最后一个if块前添加

   环境变量：
   export JAVA_HOME=/usr/local/java/jdk1.8.0_152

   export JRE_HOME=/usr/local/java/jdk1.8.0_152/jre

   export CLASSPATH=$CLASSPATH:$JAVA_HOME/lib:$JAVA_HOME/jre/lib

   export PATH=$JAVA_HOME/bin:$JAVA_HOME/jre/bin:$PATH:$HOME/bin

2. 下载maven.tar.gz

   修改/etc/profile，在最后一个if块前添加

   环境变量：

   export MAVEN_HOME=/usr/local/apache-maven-3.5.3

   export PATH=$MEVEN_HOME/bin:$PATH:$HOME/bin

3. source /etc/profile



