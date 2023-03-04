---
title: k8s命令记录
date: 2020-07-02 18:10:11
tags: k8s
categories: linux
keywords: k8s
description: k8s命令记录。
---

## 一、来源

- Infrastructure as a Service 基础设施即服务(IaaS)
- platform as a Service 平台即服务(PaaS)
-  Software as a Service 软件即服务(SaaS)

## 一、名词介绍

- **kubernetes**: 开源的 Docker 容器编排系统，它可以调度计算集群的节点，动态管理上面的作业，保证它们按用户期望的状态运行。通过使用「labels」和「pods」的概念，Kubernetes 将应用按逻辑单元进行分组，方便管理和服务发现。

  ```
  优势:
  1. 快速创建、部署、扩展应用
  2. 开发和运行相分离，资源隔离，资源利用更高效
  3. 无缝对接新的功能
  4. 节省资源，优化硬件资源的使用
  5. 自动重启、自动部署、自动复制、自动扩缩容
  6. 模块化、插件化、可挂载、可组合
  7. 持续开发、集成和部署
  8. 开发，测试和生产环境一致性
  9. 分布式，弹性，微服务化
  ```

  

- **pods**: 是一组紧密关联的容器集合，它们共享 IPC(进程间通信)、Network(网络) 和 UTS namespace(UTS 命名空间是 Linux 命名空间的一个子系统，主要作用是完成对容器 Hostname 和 Domain 的隔离，同时保存内核名称、版本、以及底层体系结构类型等信息)，是 Kubernetes 调度的基本单位。

- **labels**: 键值对(key/value)标签，可以被关联到如 Pod 这样的对象上，主要作用是给用户一个直观的感受，比如这个 Pod 是用来放置数据库的

- **GUI**: 用户图形界面，可以是 Web 用户界面，比如使用 `kubernetes-dashboard` 组件，用户可以通过 Dashboard 在 Kubernetes 集群中部署容器化的应用，可以查看集群中应用的运行情况，同时也能够基于 Dashboard 创建或修改部署、任务、服务等 Kubernetes 的资源。通过部署向导，用户能够对部署进行扩缩容，进行滚动更新、重启 Pod 和部署新应用。当然，通过 Dashboard 也能够查看 Kubernetes 资源的状态

- **kube-apiserver**: 提供了资源操作的唯一入口，并提供认证、授权、访问控制、API 注册和发现等机制

- **Kubernetes Master**:  Kubernetes 集群主节点，主要由 `kube-apiserver`、`kube-scheduler`、`kube-controller-manager`、`etcd` 四个模块组成

- **kubernetes Node**: Kubernetes 集群子节点，主要由 `kubelet`、`kube-proxy`、`runtime` 三个模块组成

- **kubeadm**: kubernetes 的集群安装工具，能够快速安装 kubernetes 集群，安装 kubernetes 主要是安装它的各个镜像，而 kubeadm 已经为我们集成好了运行 kubernetes 所需的基本镜像。但由于国内的网络原因，在搭建环境时，无法拉取到这些镜像。此时我们只需要修改为阿里云提供的镜像服务即可解决该问题。

- **kubelet**: 运行在cluster所有节点上,负责启动POD和容器

- **kubectl**: kebenetes的命令行工具,通过kubectl可以部署和管理应用，查看各种资源，创建，删除和更新组件



##  二、集群安装

### 2.1 安装必备工具

```shell
apt-get update && apt-get install -y kubelet kubeadm kubectl
```

### 2.2 kubeadm安装

```shell
# 导出配置文件
kubeadm config print init-defaults --kubeconfig ClusterConfiguration > kubeadm.yml
# 查看所需镜像
kubeadm config images list --config kubeadm.yml
# 拉取镜像
kubeadm config images pull --config kubeadm.yml
# 安装主节点
# 指定了初始化时需要使用的配置文件，其中添加 --upload-certs 参数可以在后续执行加入节点时自动分发证书文件。追加的 tee kubeadm-init.log 用以输出日志
kubeadm init --config=kubeadm.yml --upload-certs | tee kubeadm-init.log
# 安装子节点
kubeadm join 192.168.81.110:6443 --token abcdef.0123456789abcdef --discovery-token-ca-cert-hash sha256:3eac1be34c9e324279ebd843087e7dd002b3102c7d14313aec490cd73b4138ad
```

### 2.3 常用命令

```shell
# 查看kubernetes api版本
kubectl api-versions
# 查看命名空间
kubectl get namespace
# 在主节点查看是否安装成功，检查node状态
kubectl get nodes
# 查看 Pods 状态
watch kubectl get pods -n kube-system -o wide
# 查看组件运行状态
kubectl get cs
	# 输出如下
  NAME                 STATUS    MESSAGE             ERROR
  scheduler            Healthy   ok  # 调度服务，主要作用是将 POD 调度到 Node
  controller-manager   Healthy   ok  # 自动化修复服务，主要作用是 Node 宕机后自动修复 Node 回到正常的工作状态
  etcd-0               Healthy   {"health":"true"} # 服务注册与发现
# 检查master状态
kubectl cluster-info
# 使用 kubectl 命令创建两个监听 80 端口的 Nginx Pod（Kubernetes 运行容器的最小单元）
kubectl run nginx --image=nginx --replicas=2 --port=80
# 查看pods状态
kubectl get pods
# 查看已经部署的服务
kubectl get deployment
# 查看已经发布的服务
kubectl get services
# 使用负载均衡模式发布服务，让用户可以访问
kubectl expose deployment nginx --port=80 --type=LoadBalancer
# 查看服务详情
kubectl describe service kubia-web-demo
# 删除已经部署的服务
kubectl delete deployment nginx
# 删除已经发布的服务
kubectl delete service nginx
# 部署根据配置文件里面列出来的内容，升级现有的,内容可以只写需要升级的属性
kubectl apply -f filename.yaml
# 部署先删除所有现有的东西，重新根据yaml文件生成新的
kubectl create -f filename.yaml
# 通过ingress查看
kubectl get ingress
# 编辑ingress信息
kubectl edit ingress nginx-web
# 删除ingress
kubectl delete ingress nginx-web
# 查看ingress资源
kubectl get pods -n ingress-nginx -o wide
# 通过创建的svc可以看到已经把ingress-nginx service在主机映射的端口
kubectl get svc -n ingress-nginx
```

## 三、部署

- tomcat

```shell
# 创建该对象所使用的 Kubernetes API 的版本。通过kubectl api-versions可以查看版本
apiVersion: apps/v1
# 创建的对象的类型: Deployment、Job、Ingress、Service、Pod
kind: Deployment
# Pod的一些meta信息，比如名称、namespace、标签等信息
metadata:
  # 资源的名字，在同一个namespace中必须唯一
  name: tomcat-app
# Pod中容器的详细定义
spec:
  # 定义标签选择器
  selector:
    matchLabels:
      # 容器标签的名字，发布 Service 时，selector 需要和这里对应
      app: tomcat
  # 副本数量
  replicas: 2
  # Pod的定义
  template:
    metadata:
      # Pod的label
      labels:
        app: tomcat
    # 指定该资源的内容
    spec:
      # 容器
      containers:
      - name: tomcat
        image: tomcat:8.5.43
        # 镜像拉取策略: Always不管镜像是否存在都会进行一次拉取,Never不管镜像是否存在都不会进行拉取,IfNotPresent:只有镜像不存在时，才会进行镜像拉取注意
        imagePullPolicy: IfNotPresent
        ports:
        - containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: tomcat-http
spec:
  ports:
    - port: 8080
      targetPort: 8080
  # ClusterIP, NodePort, LoadBalancer
  type: ClusterIP
  selector:
    app: tomcat
---
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: nginx-web
  annotations:
    # 指定 Ingress Controller 的类型
    kubernetes.io/ingress.class: "nginx"
    # 指定我们的 rules 的 path 可以使用正则表达式
    nginx.ingress.kubernetes.io/use-regex: "true"
    # 连接超时时间，默认为 5s
    nginx.ingress.kubernetes.io/proxy-connect-timeout: "600"
    # 后端服务器回转数据超时时间，默认为 60s
    nginx.ingress.kubernetes.io/proxy-send-timeout: "600"
    # 后端服务器响应超时时间，默认为 60s
    nginx.ingress.kubernetes.io/proxy-read-timeout: "600"
    # 客户端上传文件，最大大小，默认为 20m
    nginx.ingress.kubernetes.io/proxy-body-size: "10m"
    # URL 重写
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  # 路由规则
  rules:
  # 主机名，只能是域名，修改为你自己的
  - host: k8s.test.com
    http:
      paths:
      - path:
        backend:
          # 后台部署的 Service Name
          serviceName: tomcat-http
          # 后台部署的 Service Port
          servicePort: 8080
```



## 四、深入学习

### 介绍说明

### 基础概念

Horizoontal Pod Autoscaling(HPA): 扩容缩

StatefulSet: 解决有服务状态服务的问题

DameonSet: 确保全部挥、或者一些Node上运行一个Pod副本。比如没有node上都安装一个logstash

Job: 负责批处理任务，只执行一次的任务。如备份等。

### 资源清单

### Pod控制器

ReplicaSets(RC): 滚动更新

Horizoontal Pod Autoscaling(HPA): 扩容缩

StatefulSet: 解决有服务状态服务的问题

DameonSet: 确保全部挥、或者一些Node上运行一个Pod副本。比如没有node上都安装一个logstash

Job: 负责批处理任务，只执行一次的任务。如备份等。

### 服务发现

service

 ### 存储

### 调度器

### 安全

### HELM

###  运维



