<template><div><h2 id="一、来源" tabindex="-1"><a class="header-anchor" href="#一、来源" aria-hidden="true">#</a> 一、来源</h2>
<ul>
<li>Infrastructure as a Service 基础设施即服务(IaaS)</li>
<li>platform as a Service 平台即服务(PaaS)</li>
<li>Software as a Service 软件即服务(SaaS)</li>
</ul>
<h2 id="一、名词介绍" tabindex="-1"><a class="header-anchor" href="#一、名词介绍" aria-hidden="true">#</a> 一、名词介绍</h2>
<ul>
<li>
<p><strong>kubernetes</strong>: 开源的 Docker 容器编排系统，它可以调度计算集群的节点，动态管理上面的作业，保证它们按用户期望的状态运行。通过使用「labels」和「pods」的概念，Kubernetes 将应用按逻辑单元进行分组，方便管理和服务发现。</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>优势:
1. 快速创建、部署、扩展应用
2. 开发和运行相分离，资源隔离，资源利用更高效
3. 无缝对接新的功能
4. 节省资源，优化硬件资源的使用
5. 自动重启、自动部署、自动复制、自动扩缩容
6. 模块化、插件化、可挂载、可组合
7. 持续开发、集成和部署
8. 开发，测试和生产环境一致性
9. 分布式，弹性，微服务化
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>pods</strong>: 是一组紧密关联的容器集合，它们共享 IPC(进程间通信)、Network(网络) 和 UTS namespace(UTS 命名空间是 Linux 命名空间的一个子系统，主要作用是完成对容器 Hostname 和 Domain 的隔离，同时保存内核名称、版本、以及底层体系结构类型等信息)，是 Kubernetes 调度的基本单位。</p>
</li>
<li>
<p><strong>labels</strong>: 键值对(key/value)标签，可以被关联到如 Pod 这样的对象上，主要作用是给用户一个直观的感受，比如这个 Pod 是用来放置数据库的</p>
</li>
<li>
<p><strong>GUI</strong>: 用户图形界面，可以是 Web 用户界面，比如使用 <code v-pre>kubernetes-dashboard</code> 组件，用户可以通过 Dashboard 在 Kubernetes 集群中部署容器化的应用，可以查看集群中应用的运行情况，同时也能够基于 Dashboard 创建或修改部署、任务、服务等 Kubernetes 的资源。通过部署向导，用户能够对部署进行扩缩容，进行滚动更新、重启 Pod 和部署新应用。当然，通过 Dashboard 也能够查看 Kubernetes 资源的状态</p>
</li>
<li>
<p><strong>kube-apiserver</strong>: 提供了资源操作的唯一入口，并提供认证、授权、访问控制、API 注册和发现等机制</p>
</li>
<li>
<p><strong>Kubernetes Master</strong>:  Kubernetes 集群主节点，主要由 <code v-pre>kube-apiserver</code>、<code v-pre>kube-scheduler</code>、<code v-pre>kube-controller-manager</code>、<code v-pre>etcd</code> 四个模块组成</p>
</li>
<li>
<p><strong>kubernetes Node</strong>: Kubernetes 集群子节点，主要由 <code v-pre>kubelet</code>、<code v-pre>kube-proxy</code>、<code v-pre>runtime</code> 三个模块组成</p>
</li>
<li>
<p><strong>kubeadm</strong>: kubernetes 的集群安装工具，能够快速安装 kubernetes 集群，安装 kubernetes 主要是安装它的各个镜像，而 kubeadm 已经为我们集成好了运行 kubernetes 所需的基本镜像。但由于国内的网络原因，在搭建环境时，无法拉取到这些镜像。此时我们只需要修改为阿里云提供的镜像服务即可解决该问题。</p>
</li>
<li>
<p><strong>kubelet</strong>: 运行在cluster所有节点上,负责启动POD和容器</p>
</li>
<li>
<p><strong>kubectl</strong>: kebenetes的命令行工具,通过kubectl可以部署和管理应用，查看各种资源，创建，删除和更新组件</p>
</li>
</ul>
<h2 id="二、集群安装" tabindex="-1"><a class="header-anchor" href="#二、集群安装" aria-hidden="true">#</a> 二、集群安装</h2>
<h3 id="_2-1-安装必备工具" tabindex="-1"><a class="header-anchor" href="#_2-1-安装必备工具" aria-hidden="true">#</a> 2.1 安装必备工具</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">apt-get</span> update <span class="token operator">&amp;&amp;</span> <span class="token function">apt-get</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> kubelet kubeadm kubectl
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-2-kubeadm安装" tabindex="-1"><a class="header-anchor" href="#_2-2-kubeadm安装" aria-hidden="true">#</a> 2.2 kubeadm安装</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 导出配置文件</span>
kubeadm config print init-defaults <span class="token parameter variable">--kubeconfig</span> ClusterConfiguration <span class="token operator">></span> kubeadm.yml
<span class="token comment"># 查看所需镜像</span>
kubeadm config images list <span class="token parameter variable">--config</span> kubeadm.yml
<span class="token comment"># 拉取镜像</span>
kubeadm config images pull <span class="token parameter variable">--config</span> kubeadm.yml
<span class="token comment"># 安装主节点</span>
<span class="token comment"># 指定了初始化时需要使用的配置文件，其中添加 --upload-certs 参数可以在后续执行加入节点时自动分发证书文件。追加的 tee kubeadm-init.log 用以输出日志</span>
kubeadm init <span class="token parameter variable">--config</span><span class="token operator">=</span>kubeadm.yml --upload-certs <span class="token operator">|</span> <span class="token function">tee</span> kubeadm-init.log
<span class="token comment"># 安装子节点</span>
kubeadm <span class="token function">join</span> <span class="token number">192.168</span>.81.110:6443 <span class="token parameter variable">--token</span> abcdef.0123456789abcdef --discovery-token-ca-cert-hash sha256:3eac1be34c9e324279ebd843087e7dd002b3102c7d14313aec490cd73b4138ad
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-常用命令" tabindex="-1"><a class="header-anchor" href="#_2-3-常用命令" aria-hidden="true">#</a> 2.3 常用命令</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 查看kubernetes api版本</span>
kubectl api-versions
<span class="token comment"># 查看命名空间</span>
kubectl get namespace
<span class="token comment"># 在主节点查看是否安装成功，检查node状态</span>
kubectl get nodes
<span class="token comment"># 查看 Pods 状态</span>
<span class="token function">watch</span> kubectl get pods <span class="token parameter variable">-n</span> kube-system <span class="token parameter variable">-o</span> wide
<span class="token comment"># 查看组件运行状态</span>
kubectl get cs
	<span class="token comment"># 输出如下</span>
  NAME                 STATUS    MESSAGE             ERROR
  scheduler            Healthy   ok  <span class="token comment"># 调度服务，主要作用是将 POD 调度到 Node</span>
  controller-manager   Healthy   ok  <span class="token comment"># 自动化修复服务，主要作用是 Node 宕机后自动修复 Node 回到正常的工作状态</span>
  etcd-0               Healthy   <span class="token punctuation">{</span><span class="token string">"health"</span><span class="token builtin class-name">:</span><span class="token string">"true"</span><span class="token punctuation">}</span> <span class="token comment"># 服务注册与发现</span>
<span class="token comment"># 检查master状态</span>
kubectl cluster-info
<span class="token comment"># 使用 kubectl 命令创建两个监听 80 端口的 Nginx Pod（Kubernetes 运行容器的最小单元）</span>
kubectl run nginx <span class="token parameter variable">--image</span><span class="token operator">=</span>nginx <span class="token parameter variable">--replicas</span><span class="token operator">=</span><span class="token number">2</span> <span class="token parameter variable">--port</span><span class="token operator">=</span><span class="token number">80</span>
<span class="token comment"># 查看pods状态</span>
kubectl get pods
<span class="token comment"># 查看已经部署的服务</span>
kubectl get deployment
<span class="token comment"># 查看已经发布的服务</span>
kubectl get services
<span class="token comment"># 使用负载均衡模式发布服务，让用户可以访问</span>
kubectl expose deployment nginx <span class="token parameter variable">--port</span><span class="token operator">=</span><span class="token number">80</span> <span class="token parameter variable">--type</span><span class="token operator">=</span>LoadBalancer
<span class="token comment"># 查看服务详情</span>
kubectl describe <span class="token function">service</span> kubia-web-demo
<span class="token comment"># 删除已经部署的服务</span>
kubectl delete deployment nginx
<span class="token comment"># 删除已经发布的服务</span>
kubectl delete <span class="token function">service</span> nginx
<span class="token comment"># 部署根据配置文件里面列出来的内容，升级现有的,内容可以只写需要升级的属性</span>
kubectl apply <span class="token parameter variable">-f</span> filename.yaml
<span class="token comment"># 部署先删除所有现有的东西，重新根据yaml文件生成新的</span>
kubectl create <span class="token parameter variable">-f</span> filename.yaml
<span class="token comment"># 通过ingress查看</span>
kubectl get ingress
<span class="token comment"># 编辑ingress信息</span>
kubectl edit ingress nginx-web
<span class="token comment"># 删除ingress</span>
kubectl delete ingress nginx-web
<span class="token comment"># 查看ingress资源</span>
kubectl get pods <span class="token parameter variable">-n</span> ingress-nginx <span class="token parameter variable">-o</span> wide
<span class="token comment"># 通过创建的svc可以看到已经把ingress-nginx service在主机映射的端口</span>
kubectl get svc <span class="token parameter variable">-n</span> ingress-nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、部署" tabindex="-1"><a class="header-anchor" href="#三、部署" aria-hidden="true">#</a> 三、部署</h2>
<ul>
<li>tomcat</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 创建该对象所使用的 Kubernetes API 的版本。通过kubectl api-versions可以查看版本</span>
apiVersion: apps/v1
<span class="token comment"># 创建的对象的类型: Deployment、Job、Ingress、Service、Pod</span>
kind: Deployment
<span class="token comment"># Pod的一些meta信息，比如名称、namespace、标签等信息</span>
metadata:
  <span class="token comment"># 资源的名字，在同一个namespace中必须唯一</span>
  name: tomcat-app
<span class="token comment"># Pod中容器的详细定义</span>
spec:
  <span class="token comment"># 定义标签选择器</span>
  selector:
    matchLabels:
      <span class="token comment"># 容器标签的名字，发布 Service 时，selector 需要和这里对应</span>
      app: tomcat
  <span class="token comment"># 副本数量</span>
  replicas: <span class="token number">2</span>
  <span class="token comment"># Pod的定义</span>
  template:
    metadata:
      <span class="token comment"># Pod的label</span>
      labels:
        app: tomcat
    <span class="token comment"># 指定该资源的内容</span>
    spec:
      <span class="token comment"># 容器</span>
      containers:
      - name: tomcat
        image: tomcat:8.5.43
        <span class="token comment"># 镜像拉取策略: Always不管镜像是否存在都会进行一次拉取,Never不管镜像是否存在都不会进行拉取,IfNotPresent:只有镜像不存在时，才会进行镜像拉取注意</span>
        imagePullPolicy: IfNotPresent
        ports:
        - containerPort: <span class="token number">8080</span>
---
apiVersion: v1
kind: Service
metadata:
  name: tomcat-http
spec:
  ports:
    - port: <span class="token number">8080</span>
      targetPort: <span class="token number">8080</span>
  <span class="token comment"># ClusterIP, NodePort, LoadBalancer</span>
  type: ClusterIP
  selector:
    app: tomcat
---
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: nginx-web
  annotations:
    <span class="token comment"># 指定 Ingress Controller 的类型</span>
    kubernetes.io/ingress.class: <span class="token string">"nginx"</span>
    <span class="token comment"># 指定我们的 rules 的 path 可以使用正则表达式</span>
    nginx.ingress.kubernetes.io/use-regex: <span class="token string">"true"</span>
    <span class="token comment"># 连接超时时间，默认为 5s</span>
    nginx.ingress.kubernetes.io/proxy-connect-timeout: <span class="token string">"600"</span>
    <span class="token comment"># 后端服务器回转数据超时时间，默认为 60s</span>
    nginx.ingress.kubernetes.io/proxy-send-timeout: <span class="token string">"600"</span>
    <span class="token comment"># 后端服务器响应超时时间，默认为 60s</span>
    nginx.ingress.kubernetes.io/proxy-read-timeout: <span class="token string">"600"</span>
    <span class="token comment"># 客户端上传文件，最大大小，默认为 20m</span>
    nginx.ingress.kubernetes.io/proxy-body-size: <span class="token string">"10m"</span>
    <span class="token comment"># URL 重写</span>
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  <span class="token comment"># 路由规则</span>
  rules:
  <span class="token comment"># 主机名，只能是域名，修改为你自己的</span>
  - host: k8s.test.com
    http:
      paths:
      - path:
        backend:
          <span class="token comment"># 后台部署的 Service Name</span>
          serviceName: tomcat-http
          <span class="token comment"># 后台部署的 Service Port</span>
          servicePort: <span class="token number">8080</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="四、深入学习" tabindex="-1"><a class="header-anchor" href="#四、深入学习" aria-hidden="true">#</a> 四、深入学习</h2>
<h3 id="介绍说明" tabindex="-1"><a class="header-anchor" href="#介绍说明" aria-hidden="true">#</a> 介绍说明</h3>
<h3 id="基础概念" tabindex="-1"><a class="header-anchor" href="#基础概念" aria-hidden="true">#</a> 基础概念</h3>
<p>Horizoontal Pod Autoscaling(HPA): 扩容缩</p>
<p>StatefulSet: 解决有服务状态服务的问题</p>
<p>DameonSet: 确保全部挥、或者一些Node上运行一个Pod副本。比如没有node上都安装一个logstash</p>
<p>Job: 负责批处理任务，只执行一次的任务。如备份等。</p>
<h3 id="资源清单" tabindex="-1"><a class="header-anchor" href="#资源清单" aria-hidden="true">#</a> 资源清单</h3>
<h3 id="pod控制器" tabindex="-1"><a class="header-anchor" href="#pod控制器" aria-hidden="true">#</a> Pod控制器</h3>
<p>ReplicaSets(RC): 滚动更新</p>
<p>Horizoontal Pod Autoscaling(HPA): 扩容缩</p>
<p>StatefulSet: 解决有服务状态服务的问题</p>
<p>DameonSet: 确保全部挥、或者一些Node上运行一个Pod副本。比如没有node上都安装一个logstash</p>
<p>Job: 负责批处理任务，只执行一次的任务。如备份等。</p>
<h3 id="服务发现" tabindex="-1"><a class="header-anchor" href="#服务发现" aria-hidden="true">#</a> 服务发现</h3>
<p>service</p>
<h3 id="存储" tabindex="-1"><a class="header-anchor" href="#存储" aria-hidden="true">#</a> 存储</h3>
<h3 id="调度器" tabindex="-1"><a class="header-anchor" href="#调度器" aria-hidden="true">#</a> 调度器</h3>
<h3 id="安全" tabindex="-1"><a class="header-anchor" href="#安全" aria-hidden="true">#</a> 安全</h3>
<h3 id="helm" tabindex="-1"><a class="header-anchor" href="#helm" aria-hidden="true">#</a> HELM</h3>
<h3 id="运维" tabindex="-1"><a class="header-anchor" href="#运维" aria-hidden="true">#</a> 运维</h3>
</div></template>


