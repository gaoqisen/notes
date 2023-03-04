---
title: docker命令
date: 2019-5-28 15:13:52
tags: Dockerfile docker-compose docker
categories: linux
keywords: Dockerfile docker-compose
description: Dockerfile docker-compose的命令。
---

## 一、镜像

更改数据源为国内阿里的镜像

```docker
# vim  /etc/docker/daemon.json
{
# 增加下面的数据源
"registry-mirrors": ["https://xv4nhf8h.mirror.aliyuncs.com"],
"exec-opts": ["native.cgroupdriver=systemd"],
"log-driver": "json-file",
"log-opts": {
"max-size": "100m"
}
}
# 重启docker
service docker restart
```

## 二、网络

在同一个docker-compose里面创建多个服务。自动创建在一个网络里面，通过服务名即可访问

```docker
// 创建一个桥接模式的网络
docker network create mynetwork 

// 在docker-compose里面加入如下配置
networks:
    default:
        external:
            name: mynetwork
```

## 三、客服端命令

```docker
sudo docker rm $(sudo docker ps -a -q) // 删除所有停止了的服务
docker container prune  // 删除所有停止了的服务(1.13版本后)
docker network create webcenter  // 网络
docker network inspect webcenter  // 查看网络有哪些容器
docker network connect webcenter mysql  // 将mysql容器添加到webcenter网络中
docker build -it webcenter:1.0.1 -f ./dockerfile .  // 指定docker文件构件
docker tag webcenter:latest gqs/webcenter:1.0.1  // 更改镜像名称
```

```docker
attach：依附到一个正在运行的容器中；
build：从一个 Dockerfile 创建一个镜像；
commit：从一个容器的修改中创建一个新的镜像；
cp：在容器和本地宿主系统之间复制文件中；
create：创建一个新容器，但并不运行它；
diff：检查一个容器内文件系统的修改，包括修改和增加；
events：从服务端获取实时的事件；
exec：在运行的容器内执行命令；
export：导出容器内容为一个 tar 包；
history：显示一个镜像的历史信息；
images：列出存在的镜像；
import：导入一个文件（典型为 tar 包）路径或目录来创建一个本地镜像；
info：显示一些相关的系统信息；
inspect：显示一个容器的具体配置信息；
kill：关闭一个运行中的容器 &#40;包括进程和所有相关资源&#41;；
load：从一个 tar 包中加载一个镜像；
login：注册或登录到一个 Docker 的仓库服务器；
logout：从 Docker 的仓库服务器登出；
logs：获取容器的 log 信息；
network：管理 Docker 的网络，包括查看、创建、删除、挂载、卸载等；
node：管理 swarm 集群中的节点，包括查看、更新、删除、提升/取消管理节点等；
pause：暂停一个容器中的所有进程；
port：查找一个 nat 到一个私有网口的公共口；
ps：列出主机上的容器；
pull：从一个Docker的仓库服务器下拉一个镜像或仓库；
push：将一个镜像或者仓库推送到一个 Docker 的注册服务器；
rename：重命名一个容器；
restart：重启一个运行中的容器；
rm：删除给定的若干个容器；
rmi：删除给定的若干个镜像；
run：创建一个新容器，并在其中运行给定命令；
save：保存一个镜像为 tar 包文件；
search：在 Docker index 中搜索一个镜像；
service：管理 Docker 所启动的应用服务，包括创建、更新、删除等；
start：启动一个容器；
stats：输出（一个或多个）容器的资源使用统计信息；
stop：终止一个运行中的容器；
swarm：管理 Docker swarm 集群，包括创建、加入、退出、更新等；
tag：为一个镜像打标签；
top：查看一个容器中的正在运行的进程信息；
unpause：将一个容器内所有的进程从暂停状态中恢复；
update：更新指定的若干容器的配置信息；
version：输出 Docker 的版本信息；
volume：管理 Docker volume，包括查看、创建、删除等；
wait：阻塞直到一个容器终止，然后输出它的退出符。
```

### 3.1 客服端命令选项

```
--config=""：指定客户端配置文件，默认为 `/.docker`；
-D=true|false：是否使用 debug 模式。默认不开启；
-H, --host=[]：指定命令对应 Docker 守护进程的监听接口，可以为 unix 套接字（unix:///path/to/socket），文件句柄（fd://socketfd）或 tcp 套接字（tcp://[host[:port]]），默认为 unix:///var/run/docker.sock；
-l, --log-level="debug|info|warn|error|fatal"：指定日志输出级别；
--tls=true|false：是否对 Docker 守护进程启用 TLS 安全机制，默认为否；
--tlscacert= /.docker/ca.pem：TLS CA 签名的可信证书文件路径；
--tlscert= /.docker/cert.pem：TLS 可信证书文件路径；
--tlscert= /.docker/key.pem：TLS 密钥文件路径；
--tlsverify=true|false：启用 TLS 校验，默认为否。

```

### 3.2 docker 命令选项

```
--api-cors-header=""：CORS 头部域，默认不允许 CORS，要允许任意的跨域访问，可以指定为 “*”；
--authorization-plugin=""：载入认证的插件；
-b=""：将容器挂载到一个已存在的网桥上。指定为 'none' 时则禁用容器的网络，与 --bip 选项互斥；
--bip=""：让动态创建的 docker0 网桥采用给定的 CIDR 地址; 与 -b 选项互斥；
--cgroup-parent=""：指定 cgroup 的父组，默认 fs cgroup 驱动为 `/docker`，systemd cgroup 驱动为 `system.slice`；
--cluster-store=""：构成集群（如 Swarm）时，集群键值数据库服务地址；
--cluster-advertise=""：构成集群时，自身的被访问地址，可以为 `host:port` 或 `interface:port`；
--cluster-store-opt=""：构成集群时，键值数据库的配置选项；
--config-file="/etc/docker/daemon.json"：daemon 配置文件路径；
--containerd=""：containerd 文件的路径；
-D, --debug=true|false：是否使用 Debug 模式。缺省为 false；
--default-gateway=""：容器的 IPv4 网关地址，必须在网桥的子网段内；
--default-gateway-v6=""：容器的 IPv6 网关地址；
--default-ulimit=[]：默认的 ulimit 值；
--disable-legacy-registry=true|false：是否允许访问旧版本的镜像仓库服务器；
--dns=""：指定容器使用的 DNS 服务器地址；
--dns-opt=""：DNS 选项；
--dns-search=[]：DNS 搜索域；
--exec-opt=[]：运行时的执行选项；
--exec-root=""：容器执行状态文件的根路径，默认为 `/var/run/docker`；
--fixed-cidr=""：限定分配 IPv4 地址范围；
--fixed-cidr-v6=""：限定分配 IPv6 地址范围；
-G, --group=""：分配给 unix 套接字的组，默认为 `docker`；
-g, --graph=""：Docker 运行时的根路径，默认为 `/var/lib/docker`；
-H, --host=[]：指定命令对应 Docker daemon 的监听接口，可以为 unix 套接字（unix:///path/to/socket），文件句柄（fd://socketfd）或 tcp 套接字（tcp://[host[:port]]），默认为 unix:///var/run/docker.sock；
--icc=true|false：是否启用容器间以及跟 daemon 所在主机的通信。默认为 true。
--insecure-registry=[]：允许访问给定的非安全仓库服务；
--ip=""：绑定容器端口时候的默认 IP 地址。缺省为 0.0.0.0；
--ip-forward=true|false：是否检查启动在 Docker 主机上的启用 IP 转发服务，默认开启。注意关闭该选项将不对系统转发能力进行任何检查修改；
--ip-masq=true|false：是否进行地址伪装，用于容器访问外部网络，默认开启；
--iptables=true|false：是否允许 Docker 添加 iptables 规则。缺省为 true；
--ipv6=true|false：是否启用 IPv6 支持，默认关闭；
-l, --log-level="debug|info|warn|error|fatal"：指定日志输出级别；
--label="[]"：添加指定的键值对标注；
--log-driver="json-file|syslog|journald|gelf|fluentd|awslogs|splunk|etwlogs|gcplogs|none"：指定日志后端驱动，默认为 json-file；
--log-opt=[]：日志后端的选项；
--mtu=VALUE：指定容器网络的 mtu；
-p=""：指定 daemon 的 PID 文件路径。缺省为 `/var/run/docker.pid`；
--raw-logs：输出原始，未加色彩的日志信息；
--registry-mirror=<scheme>://<host>：指定 `docker pull` 时使用的注册服务器镜像地址；
-s, --storage-driver=""：指定使用给定的存储后端；
--selinux-enabled=true|false：是否启用 SELinux 支持。缺省值为 false。SELinux 目前尚不支持 overlay 存储驱动；
--storage-opt=[]：驱动后端选项；
--tls=true|false：是否对 Docker daemon 启用 TLS 安全机制，默认为否；
--tlscacert= /.docker/ca.pem：TLS CA 签名的可信证书文件路径；
--tlscert= /.docker/cert.pem：TLS 可信证书文件路径；
--tlscert= /.docker/key.pem：TLS 密钥文件路径；
--tlsverify=true|false：启用 TLS 校验，默认为否；
--userland-proxy=true|false：是否使用用户态代理来实现容器间和出容器的回环通信，默认为 true；
--userns-remap=default|uid:gid|user:group|user|uid：指定容器的用户命名空间，默认是创建新的 UID 和 GID 映射到容器内进程。
```

## 四、Dockerfile

### 4.1 命令

```
docker build -t java:image .  // 构建脚本
```

### 4.2 脚本

```
FROM  // 镜像来源
COPY hom* /mydir/  // 复制hom开头的文件到mydir文件夹下面
ADD file.gz /mydir   // 增强复制功能，自动解压缩
CMD ["nginx", "-g", "daemon off;"]   //  分为shell命令和执行命令，容器启动命令，启动nginx
ENTRYPOINT  // 入口点
ENV  // 设置环境变量
ARG  // 构建参数,设置的构建环境的环境变量
VOLUME  // 挂载匿名卷，用于数据持久化
EXPOSE  // 暴露端口
WORKDIR  // 指定工作目录
USER  // 指定当前用户
HEALTHCHECK  // 健康检查
ONBUILD  // 以当前镜像为基础镜像，去构建下一级镜像的时候才会被执行
```

## 五、docker-compose

### 5.1 命令

```
build //构建（重新构建）项目中的服务容器
  --force-rm //删除构建过程中的临时容器
  --no-cache //构建镜像过程中不使用 cache（这将加长构建过程）。
  --pull //始终尝试通过 pull 来获取更新版本的镜像。
config //验证 Compose 文件格式是否正确，若正确则显示配置，若格式错误显示错误原因
down //停止 up 命令所启动的容器，并移除网络
exec //进入指定的容器
help // 帮助
images  // 列出 Compose 文件中包含的镜像
kill  //格式为 docker-compose kill [options] [SERVICE...]。通过发送 SIGKILL 信号来强制停止服务容器。支持通过 -s 参数来指定发送的信号，例如通过如下指令发送 SIGINT 信号。
logs  // 查看服务容器的输出。默认情况下，docker-compose 将对不同的服务输出使用不同的颜色来区分。可以通过 --no-color 来关闭颜色
pause  // 暂停一个服务容器。
port  // 打印某个容器端口所映射的公共端口。
  --protocol=proto //指定端口协议，tcp（默认值）或者 udp。
  --index=index //如果同一服务存在多个容器，指定命令对象容器的序号（默认为 1）。
ps  //列出项目中目前的所有容器
  -q 只打印容器的 ID 信息
pull //拉取服务依赖的镜像
  --ignore-pull-failures //忽略拉取镜像过程中的错误。
push // 推送服务依赖的镜像到 Docker 镜像仓库
restart  // 重启项目中的服务

  -t, --timeout TIMEOUT 指定重启前停止容器的超时（默认为 10 秒） 
rm  // 删除所有（停止状态的）服务容器。推荐先执行 docker-compose stop 命令来停止容器。
  -f, --force 强制直接删除，包括非停止状态的容器。一般尽量不要使用该选项。
  -v 删除容器所挂载的数据卷。   
run // 在指定服务上执行一个命令。docker-compose run ubuntu ping docker.com， 将会启动一个 ubuntu 服务容器，并执行 ping docker.com 命令
  -d 后台运行容器。
  --name NAME //为容器指定一个名字。
  --entrypoint CMD //覆盖默认的容器启动指令。
  -e KEY=VAL //设置环境变量值，可多次使用选项来设置多个环境变量。
  -u, --user="" //指定运行容器的用户名或者 uid。
  --no-deps //不自动启动关联的服务容器。
  --rm //运行命令后自动删除容器，d 模式下将忽略。
  -p, --publish=[] //映射容器端口到本地主机。
  --service-ports //配置服务端口并映射到本地主机。
  -T //不分配伪 tty，意味着依赖 tty 的指令将无法运行。
scale  //设置指定服务运行的容器个数 docker-compose scale web=3 db=2  将启动 3 个容器运行 web 服务，2 个容器运行 db 服务
  -t, --timeout TIMEOUT // 停止容器时候的超时（默认为 10 秒）
start  // 启动已经存在的服务容器
up  // 该命令十分强大，它将尝试自动完成包括构建镜像，（重新）创建服务，启动服务，并关联服务相关容器的一系列操作。默认情况，docker-compose up 启动的容器都在前台，控制台将会同时打印所有容器的输出信息，可以很方便进行调试。如果服务容器已经存在，docker-compose up 将会尝试停止容器，然后重新创建（保持使用 volumes-from 挂载的卷），以保证新启动的服务匹配 docker-compose.yml 文件的最新内容。如果用户不希望容器被停止并重新创建，可以使用 docker-compose up --no-recreate。这样将只会启动处于停止状态的容器，而忽略已经运行的服务。如果用户只想重新部署某个服务，可以使用 docker-compose up --no-deps -d <SERVICE_NAME> 来重新创建服务并后台停止旧服务，启动新服务，并不会影响到其所依赖的服务。
  -d //在后台运行服务容器。
  --no-color //不使用颜色来区分不同的服务的控制台输出。
  --no-deps //不启动服务所链接的容器。
  --force-recreate //强制重新创建容器，不能与 --no-recreate 同时使用。
  --no-recreate //如果容器已经存在了，则不重新创建，不能与 --force-recreate 同时使用。
  --no-build //不自动构建缺失的服务镜像。
  -t, --timeout TIMEOUT //停止容器时候的超时（默认为 10 秒）。
version  // 打印版本信息。  
stop   // 停止已经处于运行状态的容器，但不删除它。通过 docker-compose start 可以再次启动这些容器
unpause  // 恢复处于暂停状态中的服务。
top  // 查看各个服务容器内运行的进程。
```

### 5.2 脚本

```
build  // 指定 Dockerfile 所在文件夹的路径（可以是绝对路径，或者相对 docker-compose.yml 文件的路径）。 Compose 将会利用它自动构建这个镜像，然后使用这个镜像
  context: dir //指定 Dockerfile 所在文件夹的路径
  dockerfile: name  // 指定 Dockerfile 文件名
  arg:  // 指令指定构建镜像时的变量
    buildno: 1  // 变量buildno为1
  cache_from：//指定构建镜像的缓存
cap_add:  // 指定容器的内核能力（capacity）分配
  - ALL  // 让容器拥有所有能力可以指定为
cap_drop:  // 去掉能力
  - NET_ADMIN  // 去掉NET_ADMIN  
command: echo "hello world"  //覆盖容器启动后默认执行的命令 
configs  // 仅用于 Swarm mode
cgroup_parent // 指定父 cgroup 组，意味着将继承该组的资源限制.创建了一个 cgroup 组名称为 cgroups_1
container_name: docker-web-container  // 指定容器名称。默认将会使用 项目名称_服务名称_序号 这样的格式。
deploy  // 仅用于 Swarm mode
devices:  // 指定设备映射关系。
  - "/dev/ttyUSB1:/dev/ttyUSB0"  // 例子
depends_on:  // 解决容器的依赖、启动先后的问题。以下例子中会先启动 redis db 再启动 web
  - db    // 先启动 redis
  - redis // 在启动 db，最后启动web
dns: // 自定义 DNS 服务器。可以是一个值，也可以是一个列表
  - 8.8.8.8
  - 8.8.8.8 
dns_search:  // 配置 DNS 搜索域。可以是一个值，也可以是一个列表。
  - domain1.example.com
  - domain2.example.com
tmpfs:  //挂载一个 tmpfs 文件系统到容器
  - /run  
env_file:  // 从文件中获取环境变量，可以为单独的文件路径或列表。如果通过 docker-compose -f FILE 方式来指定 Compose 模板文件，则 env_file 中变量的路径会基于模板文件路径。如果有变量名称与 environment 指令冲突，则按照惯例，以后者为准。
  - ./common.env
environment:  // 设置环境变量。可以使用数组或字典两种格式。
  RACK_ENV: development  // 只给定名称的变量会自动获取运行 Compose 主机上对应变量的值，可以用来防止泄露不必要的数据
  SESSION_SECRET: 
expose:  // 暴露端口，但不映射到宿主机，只被连接的服务访问。
   - "3000"
external_links:  // 不建议使用该指令.链接到 docker-compose.yml 外部的容器，甚至并非 Compose 管理的外部容器 
extra_hosts:  //类似 Docker 中的 --add-host 参数，指定额外的 host 名称映射信息
  - "googledns:8.8.8.8"  // 在/etc/hosts增加googledns:8.8.8.8文本
healthcheck:  // 通过命令检查容器是否健康运行。
  test: ["CMD", "curl", "-f", "http://localhost"]
  interval: 1m30s
  timeout: 10s
  retries: 3
image: ubuntu  // 指定为镜像名称或镜像 ID。如果镜像在本地不存在，Compose 将会尝试拉取这个镜像
labels: // 为容器添加 Docker 元数据（metadata）信息。例如可以为容器添加辅助说明信息。
  com.startupteam.description: "webapp for a startup team"
  com.startupteam.department: "devops department"
  com.startupteam.release: "rc3 for v1.0"
logging:  // 配置日志选项
  driver: syslog  // 目前支持三种日志驱动类型"json-file", "syslog", "none"
  options:
    syslog-address: "tcp://192.168.0.42:123"
    max-size: "200k"
    max-file: "10" 
network_mode: "bridge"  // 设置网络模式。使用和 docker run 的 --network 参数一样的值
network_mode: "host"
network_mode: "none"
network_mode: "service:[service name]"
network_mode: "container:[container name/id]"   
ports: // 暴露端口信息。使用宿主端口：容器端口 &#40;HOST:CONTAINER&#41; 格式，或者仅仅指定容器的端口（宿主将会随机选择端口）都可以。
  - "3000"  // 当使用 HOST:CONTAINER 格式来映射端口时，如果你使用的容器端口小于 60 并且没放到引号里，可能会得到错误结果，因为 YAML 会自动解析 xx:yy 这种数字格式为 60 进制。为避免出现这种问题，建议数字串都采用引号包括起来的字符串格式。
  - "8000:8000"
  - "49100:22"
  - "127.0.0.1:8001:8001"     
secrets:  // 存储敏感数据，例如 mysql 服务密码
  my_secret:
    file: ./my_secret.txt
  my_other_secret:
    external: true
security_opt:  // 指定容器模板标签（label）机制的默认属性（用户、角色、类型、级别等）。例如配置标签的用户名和角色名。
  - label:user:USER
  - label:role:ROLE    
stop_signal: SIGUSR1 // 设置另一个信号来停止容器。在默认情况下使用的是 SIGTERM 停止容器。
sysctls:  //配置容器内核参数
  net.core.somaxconn: 1024
  net.ipv4.tcp_syncookies: 0
sysctls:
  - net.core.somaxconn=1024
  - net.ipv4.tcp_syncookies=0
ulimits:  // 指定容器的 ulimits 限制值。
    nproc: 65535   //指定最大进程数为 65535，指定文件句柄数为 20000（软限制，应用可以随时修改，不能超过硬限制） 和 40000（系统硬限制，只能 root 用户提高）。
    nofile:
      soft: 20000
      hard: 40000 
volumes:  // 数据卷所挂载路径设置。可以设置宿主机路径 （HOST:CONTAINER） 或加上访问模式 
 - /var/lib/mysql
 - cache/:/tmp/cache
 - ~/configs:/etc/configs/:ro  
entrypoint: /code/entrypoint.sh  // 指定服务容器启动后执行的入口文件
user: nginx  // 指定容器中运行应用的用户名。
working_dir: /code  // 指定容器中工作目录。
domainname: your_website.com  // 指定容器中搜索域名
hostname: test  // 指定容器中主机名
mac_address: 08-00-27-00-0C-0A  // 指定容器中mac 地址
privileged: true  // 允许容器中运行一些特权命令。
restart: always  // 指定容器退出后的重启策略为始终重启。该命令对保持服务始终运行十分有效，在生产环境中推荐配置为 always 或者 unless-stopped。
read_only: true  // 以只读模式挂载容器的 root 文件系统，意味着不能对容器内容进行修改。
stdin_open: true  // 打开标准输入，可以接受外部输入。
tty: true  // 模拟一个伪终端。
$&#123;MONGO_VERSION&#125;  // Compose 模板文件支持动态读取主机的系统环境变量和当前目录下的 .env 文件中的变量。  MONGO_VERSION=3.6   
```




