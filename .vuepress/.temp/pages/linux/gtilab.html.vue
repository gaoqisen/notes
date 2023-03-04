<template><div><h2 id="gitlab私有代码存储仓库" tabindex="-1"><a class="header-anchor" href="#gitlab私有代码存储仓库" aria-hidden="true">#</a> Gitlab私有代码存储仓库</h2>
<h4 id="创建" tabindex="-1"><a class="header-anchor" href="#创建" aria-hidden="true">#</a> 创建</h4>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>version: '3'
services:
    web:
      image: 'twang2218/gitlab-ce-zh:10.5'
      restart: always
      hostname: '192.168.75.145'
      environment:
        TZ: 'Asia/Shanghai'
        GITLAB_OMNIBUS_CONFIG: |
          external_url 'http://192.168.75.145:8080'
          gitlab_rails['gitlab_shell_ssh_port'] = 2222
          unicorn['port'] = 8888
          nginx['listen_port'] = 8080
      ports:
        - '8080:8080'
        - '8443:443'
        - '2222:22'
      volumes:
        - /usr/local/docker/gitlab/config:/etc/gitlab
        - /usr/local/docker/gitlab/data:/var/opt/gitlab
        - /usr/local/docker/gitlab/logs:/var/log/gitlab
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="访问" tabindex="-1"><a class="header-anchor" href="#访问" aria-hidden="true">#</a> 访问</h4>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>http://ip:8080
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="maven私有仓库" tabindex="-1"><a class="header-anchor" href="#maven私有仓库" aria-hidden="true">#</a> Maven私有仓库</h2>
<h4 id="创建-1" tabindex="-1"><a class="header-anchor" href="#创建-1" aria-hidden="true">#</a> 创建</h4>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>version: '3.1'
services:
  nexus:
    restart: always
    image: sonatype/nexus3
    container_name: nexus
    ports:
      - 8081:8081
    volumes:
      - /usr/local/docker/nexus/data:/nexus-data
      
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="访问-1" tabindex="-1"><a class="header-anchor" href="#访问-1" aria-hidden="true">#</a> 访问</h4>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>http://ip:port/ 用户名：admin 密码：admin123
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="docker私有镜像仓库" tabindex="-1"><a class="header-anchor" href="#docker私有镜像仓库" aria-hidden="true">#</a> Docker私有镜像仓库</h2>
<h4 id="创建-2" tabindex="-1"><a class="header-anchor" href="#创建-2" aria-hidden="true">#</a> 创建</h4>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>version: '3.1'
services:
  registry:
    image: registry
    restart: always
    container_name: registry
    ports:
      - 5000:5000
    volumes:
      - /usr/local/docker/registry/data:/var/lib/registry
# Registry WebUI 工具      
version: '3.1'
services:
  frontend:
    image: konradkleine/docker-registry-frontend:v2
    ports:
      - 8080:80
    volumes:
      - ./certs/frontend.crt:/etc/apache2/server.crt:ro
      - ./certs/frontend.key:/etc/apache2/server.key:ro
    environment:
      - ENV_DOCKER_REGISTRY_HOST=192.168.75.133
      - ENV_DOCKER_REGISTRY_PORT=5000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="访问-2" tabindex="-1"><a class="header-anchor" href="#访问-2" aria-hidden="true">#</a> 访问</h4>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// 访问http://ip:5000/v2/，http://ip:5000
// 在/etc/docker/daemon.json中新增
{
  "registry-mirrors": [
    "https://registry.docker-cn.com"
  ],
  "insecure-registries": [
    "ip:5000"
  ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="访问-重启" tabindex="-1"><a class="header-anchor" href="#访问-重启" aria-hidden="true">#</a> 访问 重启</h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>sudo systemctl daemon-reload
sudo systemctl restart docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


