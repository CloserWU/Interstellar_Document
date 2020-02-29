# hello GitLab



终于拥有了自己的GitLab，docker更进一步 加油!!!



gitlab 

```shell
docker pull twang2218/gitlab-ce-zh
```

创建文件夹，创建文件`docker-compose.yml`

```shell
nginx端口最好不要使用80
如果在同一台机器上同时运行gitlab和gitlab-runner，gitlab使用80的话，会导致runner注册失败
亲测！！
```



```yml
version: '3'
services:
    web:
      image: 'twang2218/gitlab-ce-zh'
      restart: always
      hostname: '192.168.233.131'
      environment:
        TZ: 'Asia/Shanghai'
        GITLAB_OMNIBUS_CONFIG: |
          external_url 'http://192.168.233.131'
          gitlab_rails['gitlab_shell_ssh_port'] = 2222
          unicorn['port'] = 8888
          nginx['listen_port'] = 80
      ports:
        - '80:80'
        - '8443:443'
        - '2222:22'
      volumes:
        - /root/gitlab/config:/etc/gitlab
        - /root/gitlab/data:/var/opt/gitlab
        - /root/gitlab/logs:/var/log/gitlab

```

然后`docker-compose up`即可，初始超级管理员为root，密码最少八位12345678即可。



可以免密登录了 利用了ssh

```powershell
ssh-keygen -t rsa -C "18969946575@163.com"
```

一路回车，在`C:\users\closer\.ssh\`文件夹下生成密钥和公钥，复制`id_rsa.pub`内容，在gitlab中setting中配置`ssh`连接。即可在本地机器使用`ssh`免密拉取仓库

