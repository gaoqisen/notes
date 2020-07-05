---
title: k8s命令记录
date: 2020-07-02 18:10:11
tags: k8s
categories: k8s
keywords: k8s
description: k8s命令记录。
---

## 一、名词介绍

- kubernetes: 开源的 Docker 容器编排系统，它可以调度计算集群的节点，动态管理上面的作业，保证它们按用户期望的状态运行。通过使用「labels」和「pods」的概念，Kubernetes 将应用按逻辑单元进行分组，方便管理和服务发现。
- pods: 是一组紧密关联的容器集合，它们共享 IPC(进程间通信)、Network(网络) 和 UTS namespace(UTS 命名空间是 Linux 命名空间的一个子系统，主要作用是完成对容器 Hostname 和 Domain 的隔离，同时保存内核名称、版本、以及底层体系结构类型等信息)，是 Kubernetes 调度的基本单位。
- labels: 键值对(key/value)标签，可以被关联到如 Pod 这样的对象上，主要作用是给用户一个直观的感受，比如这个 Pod 是用来放置数据库的
- GUI: 用户图形界面，可以是 Web 用户界面，比如使用 `kubernetes-dashboard` 组件，用户可以通过 Dashboard 在 Kubernetes 集群中部署容器化的应用，可以查看集群中应用的运行情况，同时也能够基于 Dashboard 创建或修改部署、任务、服务等 Kubernetes 的资源。通过部署向导，用户能够对部署进行扩缩容，进行滚动更新、重启 Pod 和部署新应用。当然，通过 Dashboard 也能够查看 Kubernetes 资源的状态
- kube-apiserver: 提供了资源操作的唯一入口，并提供认证、授权、访问控制、API 注册和发现等机制
- Kubernetes Master:  Kubernetes 集群主节点，主要由 `kube-apiserver`、`kube-scheduler`、`kube-controller-manager`、`etcd` 四个模块组成
-  kubernetes Node: Kubernetes 集群子节点，主要由 `kubelet`、`kube-proxy`、`runtime` 三个模块组成
- kubeadm: kubernetes 的集群安装工具，能够快速安装 kubernetes 集群，安装 kubernetes 主要是安装它的各个镜像，而 kubeadm 已经为我们集成好了运行 kubernetes 所需的基本镜像。但由于国内的网络原因，在搭建环境时，无法拉取到这些镜像。此时我们只需要修改为阿里云提供的镜像服务即可解决该问题。
- kubelet: 运行在cluster所有节点上,负责启动POD和容器
- kubectl: kebenetes的命令行工具,通过kubectl可以部署和管理应用，查看各种资源，创建，删除和更新组件



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
```

