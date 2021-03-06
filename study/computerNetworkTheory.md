---
title: 计算机网络原理
date: 2020-02-10 12:53:40
tags: network
categories: study
keywords: network
description: 第一章 计算机网络概述的习题
---

# 第一章 计算机网络概述的习题

## 什么是计算机网络

将有独立功能的多台计算机，通过通信设备线路链接起来，在网络软件的支持下，实现彼此之间资源共享和数据通信的整个系统。

## 网络协议的三要素是什么？每个要素的含义是什么？

协议三要素: 语法、语义、时序

1. 语法：定义实体之间交换信息的格式与结构，或定义实体之间传递信息的电平等。
2. 语义：定义实体之间交换的信息中需要发送哪些控制信息，这些控制信息的具体含义，以及针对不同含义的控制信息，接受信息端应如何响应。
3. 时序：也成为同步，定义实体之间交换信息的顺序以及如何匹配或适应彼此的速度。

## 计算机网络的功能是什么

在不同主机之间实现快速的信息交换。通过信息交换，计算机网络可实现资源共享这一核心功能，包括硬件资源共享，软件资源共享和信息资源共享。

## 按网络覆盖范围划分，主要有哪几类计算机网络？各有什么特点？

有个域网、局域网、城域网、广域网

1. 个域网：个人设备通过无线通信技术构成的小范围网络，实现个人设备间的数据传输，比如蓝牙技术实现个人设备的互连等（1-10m左右的范围）。
2. 局域网：部署在办公室、办公楼、厂区、校园等局部区域内。采用高速有线或者无线连接主机。（10m-1km）
3. 城域网：覆盖一个城市范围的网络（5-50km）
4. 广域网：覆盖范围在几十到几千千米，跨越更大的地理空间，可以实现异地城域网或局域网的互连。

## 按网络拓扑划分，主要有哪几类计算机网络？各有什么特点？

有星形拓扑结构、总线型拓扑结构、环形拓扑结构、网状拓扑结构、树状拓扑结构、混合拓扑结构。

1. 星形拓扑结构：包括一个中央节点、网络中的主机通过点对点的通信链路与中央节点连接
2. 总线形拓扑结构：采用一条广播信道作为公共传输介质，称为总线，所有节点都和总线连接，节点间的通信都通过共享的总线进行
3. 环形拓扑结构：所有的节点连成一个闭合的环，环中的数据传输通常是单向（也可双向）传输
4. 网状拓扑结构：通过多条链路与不同的节点直接连接
5. 树状拓扑结构：总线形和星形拓扑的网络扩展。
6. 混合拓扑结构：由两种以上简单的拓扑结构网络混合连接而成的网络

## 计算机网络结构主要包括哪几部分？每部分的主要功能是什么？

网络边缘、接入网络、网络核心

1. 网络边缘：连接到网络上的所有端系统
2. 接入网络：是实现网络边缘的端系统与网络核心连接与接入的网络
3. 网络核心：通信链路互连的分组交换设备构成的网络，是实现网络边缘中主机之间的数据中继与转发

## 简要描述你了解的接入网络，这些接入网络都有什么特点？经常使用的是那类接入网络？

1. 电话拨号接入：用电话网络接入，方便实现分散的家庭用户接入网络。但是宽带有限
2. 非对称用户线路ADSL：用现有的电话网络的用户线路接入，主要用于家庭用户接入。上行宽带比下行宽带小
3. 混合光钎同轴电缆HFC接入网络：有限电视网络接入，当用户数量较大时，HFC没有ADSL接入速率快
4. 局域网：企业、学校等机构组建的网络，光钎到户之后，很多家庭也采用局域网实现网络接入
5. 移动接入网络：只要利用移动通信网络，智能手机移动终端等接入网络。

## 请简述电路交换工作过程以及电路交换的特点。

过程：建立电路、传输数据、拆除电路
特点：有连接的，在通信时需要先建立电路连接，在通信过程中独占一个信道，通信结束后拆除电路连接。优点是实时性高，时延和时延抖动都较小。缺点是：对于突发性数据传输，信道利用率低，传输速率单一。

## 什么是报文交换？什么是分组交换？试比较两者的优势。

1. 报文交换：发送方把要发送的信息附加上发送／接受主机的地址以及其他控制信息，构成一个完整的报文。然后以报文为单位在交换网络的各结点之间以存储－转发的方式传送
        优点：线路利用率高。不会出现通信双方空闲时信道也要被占用的情况。

2. 分组交换：将报文分割成较小的数据块，每个数据块附加上地址、序号等控制信息构成数据分组，每个分组独立传输到目的地，目的地将收到的分组重新组装，还原为报文
        优点：交换设备存储容量要求低、交换速度快、可靠传输效率高、更加公平


## OSI参考模型包括几层？每层的主要功能是什么？

包括七层

1. 物理层：传输介质上实现无结构比特流传输
2. 数据链路层：相邻结点之间数据可靠而有效的传输
3. 网络层：将分组通过交换网络传输至目的地的主机
4. 传输层：端到端的层次，两个主机的进程之间
5. 会话层：用户与用户之间的连接
6. 表示层：处理应用实体间交换数据的语法

## TCP/IP参考模型包括几层？每层主要包括哪些协议？

包括四层

1. 应用层： TCP/IP
2. 传输层： UDP
3. 网络互联层：ICMP、IGMP、BGP、OSPF、RIP、路由协议
4. 网络接口层

## 考虑两台主机A和主机B由一条宽带为R(bi/s)、长度为D(m)的链路互连，信号传播速率为V(m/s)。假设主机A从t=0时刻开始向主机B发送分组，分组长度为L位。试求:

1. 传播延迟(时延)dp：传播时延dp = 信道长度(m) / 电磁波在信道上的传播速率(m/s) = D / V
2. 传输延迟dt = 数据帧长度(b) / 信道带宽(b/s) = L / R
3. 总延迟de = 传播时延 + 传输延迟 = D / V + L / R
4. dp > dt意味着最早发送的信号没有到达目的主机之前，数据分组的最后一个比特已经发送出来了，所以分组的第一个比特在距离主机的V * dt米的链路上
5. 时延带宽积 = 传播时延 * 带宽 = D / V * R = 512，解之得D = 1280米

## 假设主机A向主机B以存储-转发的分组交换方式发送一个大文件。主机A到达主机B的路径上有3段链路，其速率分别是R1=500kbps，R2=2Mbps，R3=1Mbps。试求：

1. 假设网络没有其他流量，则传送该文件的吞吐量是多少？
    - 假定网络中没有其他流量，R = min{R1+R2+R3} = min{500kbps,2Mbps,1Mbps} = 500kbps

2. 假设文件大小为4MB，则传输该文件到主机B大约需要多少时间？
     - T = 4MB/R = 4*10^3/500kbps = 64s

## 计算机网络 时延、发送时延、传输时延、处理时延、排队时延、时延带宽积

时延：指数据从网络的一端传送到另一端所需的时间

发送时延（传输时延）：是主机或路由器发送数据帧所需要的时间，也就是从发送数据帧的第一个比特算起，到该帧的最后一个比特发送完毕所需的时间，发送时延 = 数据帧长度(b) / 信道带宽(b/s)

传播时延：是电磁波在信道中传播一定的距离需要花费的时间，传播时延 = 信道长度(m) / 电磁波在信道上的传播速率(m/s)

发送时延（传输时延）发生在机器的内部的发送器中，而传播时延则发生在机器外部的传输信道媒体上。

处理时延：主机或路由器在收到分组时要花费一定的时间进行处理，例如分析分组的首部、从分组中提取数据部分、进行差错或查找适当的路由等等

排队时延：分组在经过网络传输时，要经过许多的路由器。但分组在进入路由器后要现在输入队列中排队等待处理。在路由器确定了转发接口后，还要在输出队列中排队等待转发

数据在网络中经历的总时延就是以上四种时延之和：总时延 = 发送时延 + 传播时延 + 处理时延 + 排队时延

时延带宽积：时延带宽积 = 传播时延 * 带宽

## 假设主机A向主机B发送一个L=1500B的分组，主机A到达主机B的路径上有3端链路、2个分组交换机，3段链路长度分别为D1=5000km、D2=4000km、D3=1000km;每段链路的传输速率均为R=2Mbit/s,信号传播速率为V=250000km/s,分组交换机处理每个分组的时延为dc=3ms,试求：

1. 若以存储－转发的分组交换方式，则该分组从主机A到达主机B的端到端时延是多少？
  
    链路时延：D / V ＝ (5000km+4000km+1000km)/250000km/s=0.04s
    总时延为：链路时延＋2*分组时延 ＝ 40ms *+ 2 * 3ms = 46ms
2. 若dc=0, 且不采取存储－转发的分组交换方式，而是分组交换机直接转发收到的每个分组（即直通交换），则该分组从主机A到达主机B的端到端时延是多少？
  
   时延： D / V ＝ (5000km+4000km+1000km)/250000km/s=0.04s=40ms
   
## 如图所示网络。A在t=0时刻开始向C发送一个2Mbits的文件；B在t=0.1+e秒（e为无限趋近于0的小正实数）向D发送一个1Mbits的文件。忽略传播延迟和结点处理延迟。

![https://gaoqisen.github.io/GraphBed/202002/20200212101314.png](https://gaoqisen.github.io/GraphBed/202002/20200212101314.png)

请回答下列问题：

1. 如果图中网络采用存储-转发方式的报文交换，则A将2Mbits的文件交付给C需要多长时间？B将1Mbits的文件交付给D需要多长时间？
2. 如果图中网络采用存储-转发方式的分组交换，分组长度为等长的1kbits，且忽略分组头开销以及报文的拆装开销，则A将2Mbits的文件交付给C需要大约多长时间？B将1Mbits的文件交付给D需要大约多长时间？
3. 报文交换与分组交换相比，哪种交换方式更公平？（即传输数据量小用时少，传输数据量大用时长）
答
1. 由于A先发报文所以，A的报文在路由器的队列中排在B的报文前面，所以A交付2Mbits报文需要时间为：2/10+2/20+2/10=0.5s=500ms；
    B将1Mbits的文件交付给D需要时间为：1/10+2/20(排队时间)        +1/20+1/10=0.35s=350ms。
2. 从t=0时刻到t=0.1s，A发送了1000个分组，用时：1000×1000/10000000=0.1s，
从t=0.1s时刻起与B共享连接路由器的链路，平均各共享到带宽10Mbps，A大约再用时：1/10+2×1000/10000000=0.1002s交付剩余的1000个分组，故A向C交付2Mbits文件大约需要(0.1+0.1002)s≈0.2s；
B向D交付1Mbits文件需要时间大约为：1/10+2×1000/10000000=0.1002s≈0.1s。
1. 分组交换比报文交换更公平。

# 第二章 网络应用的习题

## 计算机网络应用可以分为哪几种体系结构的应用类型？各种应用类型的特点是什么？

从体系结构角度可以分为：客户/服务器(C/S)结构、纯P2P结构和混合结构3种类型

客户/服务器(C/S)结构的特点：客户和客户之间不直接进行通信，客户只是与服务器进行通信。
纯P2P结构的特点：所有通信都是在对等的通信方之间直接进行，通信双方没有传统意义上的客户与服务器之分。
混合结构的特点：将C/S应用与P2P应用相结合，既有中心服务器的存在，又有对等端间的直接通信。

## 为什么说客户/服务器通信方式是网络应用通信的基本方式？

因为主动发起通信的一方就是客户，被动接受通信的一方就是服务器。人们平时使用就是这种网络

## 网络应用通信过程中，需要用哪些信息标识一个应用进程？

通过运行的主机 IP地址以及套接字所绑定的端口标识应用进程

## 简述域名系统的层次结构

1. 名字空间是层次结构的，类似Windows的文件名。它可看作是一个树状结构，域名系统不区分树内节点和叶子节点，而统称为节点，不同节点可以使用相同的标记。
2. 一个节点的域名是由从该节点到根的所有节点的标记连接组成的，中间以点分隔。
3. 第二层节点的域名称为二级域名，依此类推

## 请举例说明，什么是DNS递归解析过程？什么是DNS迭代解析过程？

递归解析过程：在进行域名查询时，本地域名服务器如果没有被查询域名的信息，则代理主机查询根域名服务器或其他服务器，直到得到被查询域名的IP地址，最后将解析结果发送给主机。
迭代解析过程：提供迭代查询服务的域名服务器不会代理客户的查询请求，而是将最终的结果或者下一步要查询的域名服务器直接响应给查询客户。

## 什么是本地域名服务器？主机是如何确定本地域名服务器的？

默认域名服务器就是本地域名服务器。是主机在进行域名查询过程中首先被查询的域名服务器。需要域名解析的时候会先去本地域名服务器查询，如果查询到了就直接返回结果，如果没有查询到才会查询其他的域名服务器。

## 简述HTTP1.0获取一引用10个小JPEG图片网页的通信过程

1. 建立TCP连接
2. 在建立的TCP连接基础上向服务器发送一个HTTP请求报文
3. 服务器接收到报文之后从指定的路径中检索出html的文件并封装到一个HTTP响应报文中，发送给客户进程
4. 服务器进程通知TCP断开TCP连接
5. 客户端接收到响应报文后，断开TCP连接
6. 之后引入10个图片，重复前4个步骤

## 什么是非持久的HTTP？什么是非流水方式的持久HTTP？什么是流水方式的持久HTTP？简述交互过程。

1. 非持久连接是指HTTP客户与HTTP服务端建立TCP连接之后，通过该链接发送HTTP请求报文，接收HTTP响应报文，然后断开链接。
2. 非流水方式的持久：客户端在通过持久连接收到前一个响应报文后，才能发出对下一个对象的请求报文。
3. 流水方式的持久：在通过持久连接接收到前一个对象的响应报文之前，连续依次发送对后续对象的请求报文，然后再通过该链接依次接收服务器发回的响应报文。

## 假设你在浏览某网页时点击了一个超链接，URL为“https://www.kicker.com.cn/index.html ”，且该URL对应的IP地址在你的计算机上没有缓存；文件index.html引用了8个小图像。域名解析过程中，无等待的一次DNS解析请求与响应时间记为RTTd，HTTP请求传输Web对象过程的一次往返时间记为RTTh。请回答下列问题：
1. 你的浏览器解析到URL对应的IP地址的最短时间是多少？最长时间是多少？
2. 若浏览器没有配置并行TCP连接，则基于HTTP1.0获取URL链接Web页完整内容（包括引用的图像，下同）需要多长时间（不包括域名解析时间，下同）？
3. 若浏览器配置5个并行TCP连接，则基于HTTP1.0获取URL链接Web页完整内容需要多长时间？
4. 若浏览器没有配置并行TCP连接，则基于非流水模式的HTTP1.1获取URL链接Web页完整内容需要多长时间？基于流水模式的HTTP1.1获取URL链接Web页完整内容需要多长时间？
答
1. 浏览器解析到URL对应的IP地址的最短时间是：RTTd；（2分）最长时间是：5RTTd。（2分）
2. 若浏览器没有配置并行TCP连接，则基于HTTP1.0获取URL链接Web页完整内容需要的时间：18RTTh。（2分）
3. 若浏览器配置5个并行TCP连接，则基于HTTP1.0获取URL链接Web页完整内容需要的时间：6RTTh。（2分）
4. 若浏览器没有配置并行TCP连接，则基于非流水模式的HTTP1.1获取URL链接Web页完整内容需要的时间：10RTTh；（2分）基于流水模式的HTTP1.1获取URL链接Web页完整内容需要的时间：3RTTh。（2分）

## 电子邮件主要由哪几部分构成？

1. 邮件服务器
2. 简单邮件传输协议（SMTP）
3. 用户代理
4. 邮件读取协议

## 简述SMTP发送邮件过程

1. 首先请求与服务器端的25端口建立TCP链接
2. 通过3个阶段的应用层交互完成邮件的传输
    1. 握手阶段：声明自己的身份
    2. 邮件传输阶段：向服务器通告邮件发送者与邮件接收者的邮箱地址然后开始邮件数据的传输
    3. 关闭阶段：关闭TCP链接

## FTP的“外带控制”特性是什么含义？控制连接和数据连接各有什么特点？用途分别是什么？

FTP专门使用一个独立的控制连接传输控制信息，与传输文件信息进行分离，所以将FTP这种控制信息的传送方式称为带外控制。

控制连接在整个回话假期一直保持打开
数据连接用于实际传送文件内容

## 考虑向N个对等方（用户）分发F=15Gb的一个文件。该服务器具有us=30Mbps的上传速率，每个对等方的下载速率di=2Mbps，上传速率为u。请分别针对客户-服务器分发模式和P2P分发模式两种情况，对于N=10、100和1000以及u=500kbps、1Mbps和2Mbps的每种组合，绘制最小分发时间图表。
（注：k=103、M=106、G=10^9）

![https://gaoqisen.github.io/GraphBed/202002/20200212104414.png](https://gaoqisen.github.io/GraphBed/202002/20200212104414.png)

## 简述TCP客户端与TCP服务器程序的socketAPI基本函数调用过程。

1. 调用socket()函数创建SOCK_STREAM类型的主套接字ms
2. 调用bind()函数绑定本地端点地址
3. 嗲用listen()函数置主套接字ms为监听模式
4. 调用accpt()函数通过主套接字调用成功，返回(创建)连接套接字ss

## 简述UDP客户端与UDP服务器的socketAPI基本函数调用过程。

1. 调用socket()函数创建SOCK_DGRAM类型的主套接字ums
2. 调用bind()函数绑定本地端点地址
3. 客户程序运行后，创建本地SOCK_DGRAM类型的套接字ucs
4. 客户端与服务器程序通过调用sendto()和recvfrom()函数实现数据发送接收。
5. 通信结束后，客服程序通过调用close()函数释放套接字ucs
6. 服务器程序继续调用recvfrom()函数，通过套接字ums接收下一个客户发送过来的数据报

# 第三章 传输层的习题

## 实现可靠数据传输的主要措施是哪些？这些措施主要用于解决那些问题？

1. 差错检测：利用差错编码实现数据包传输过程中的比特差错检测。数据发送方对需要检测差错的数据，然后将编码后的数据发送给接收方；接收方一句相同的差错编码规则，检验数据传输过程中是否发生比特差错。
2. 确认：接收方向发送方反馈接收状态。
3. 重传：发送方重新发送接收方没有正确接收的数据。
4. 序号：确保数据按序提交
5. 计时器：解决数据丢失问题。当数据丢失，但是接收方不会收到数据包，也就不会对丢失的包进行确认，计时器就是解决这一问题，当计时器超时，发送方就会将数据包重发。

## UDP与TCP分别如何实现复用与分解

https://www.cnblogs.com/oxspirt/p/6496434.html

## 请画出TCP报文端结构，并简要说明各个字段的主要作用？

[https://www.cnblogs.com/findumars/p/7990823.html](https://www.cnblogs.com/findumars/p/7990823.html)

![https://gaoqisen.github.io/GraphBed/202002/20200212215636.png](https://gaoqisen.github.io/GraphBed/202002/20200212215636.png)

1. 源端口、目标端口: 标识发送该报文段的源端口和目的端口，用于多路复用／分解来自或送到上层应用的数据
2. 序列号、确认号: 对每个应用层数据的每个字节进行编号，因此每个TCP报文段的序号是该段所封装的应用层数据的第一个字节的序号 
3. 首部长度: 指出TCP段的首部长度。
4. 保留字段：保留为今后使用，目前值为0
5. URG：表示本报文段中发送的数据是否包含紧急数据。URG=1，表示有紧急数据。后面的紧急指针字段只有当 URG=1 时才有效。
6. ACK：表示是否前面的确认号字段是否有效。ACK=1，表示有效。只有当 ACK=1 时，前面的确认号字段才有效。TCP 规定，连接建立后，ACK 必须为 1。
7. PSH：告诉对方收到该报文段后是否应该立即把数据推送给上层。如果为 1，则表示对方应当立即把数据提交给上层，而不是缓存起来。
8. RST：只有当 RST=1 时才有用。如果你收到一个 RST=1 的报文，说明你与主机的连接出现了严重错误（如主机崩溃），必须释放连接，然后再重新建立连接。或者说明你上次发送给主机的数据有问题，主机拒绝响应。
9. SYN：在建立连接时使用，用来同步序号。当 SYN=1，ACK=0 时，表示这是一个请求建立连接的报文段；当 SYN=1，ACK=1 时，表示对方同意建立连接。SYN=1，说明这是一个请求建立连接或同意建立连接的报文。只有在前两次握手中 SYN 才置为 1。
10. FIN：标记数据是否发送完毕。如果 FIN=1，就相当于告诉对方：“我的数据已经发送完毕，你可以释放连接了”
11. 接收窗口：表示现在运行对方发送的数据量。也就是告诉对方，从本报文段的确认号开始允许对方发送的数据量。
12. 校验和：提供额外的可靠性。具体如何校验，参考其他资料。
13. 紧急指针：标记紧急数据在数据字段中的位置。
14. 选项部分：其最大长度可根据 TCP 首部长度进行推算。TCP 首部长度用 4 位表示，那么选项部分最长为：(2^4-1)*4-20=40 字节。
15. 填充字段：是为了使整个首部长度是4字节的整数倍

## TCP为何采用三次握手来建立连接，若采用二次握手可以吗？为什么？

不可以，采用三次握手是为了确保连接双方彼此完全清楚对方状态，从而保证可靠、稳定的建立连接，同时，通过三次握手建立连接还可以有效预防过期、失效的连接请求到达后，导致无效连接的建立。三次握手缺一不可。
因为网络存在数据丢失，第二次握手控制段可能丢失，这样主动发起连接的一方由于没有收到第二次握手控制段，则无法建立连接，而接受连接建立的一方则认为连接已建立，从而出现无效链接。另外，二次握手建立连接，也无法避免失效连接请求。

## 请说明TCP建立连接与断开连接的过程，并给出主要状态转移

1. Client将标志位SYN置为1，随机产生一个值seq=J，并将该数据包发送给Server，
	 	Client进入SYN_SENT状态，等待Server确认。
2. Server收到数据包后由标志位SYN=1知道Client请求建立连接，Server将标志位
		SYN和ACK都置为1，ack=J+1，随机产生一个值seq=K，并将该数据包发送给
		Client以确认连接请求，Server进入SYN_RCVD状态。
3. Client收到确认后，检查ack是否为J+1，ACK是否为1，如果正确则将标志位A-
		CK置为1，ack=K+1，并将该数据包发送给Server，Server检查ack是否为K+1
		，ACK是否为1，如果正确则连接建立成功，Client和Server进入ESTABLISHE-
		D状态，完成三次握手，随后Client与Server之间可以开始传输数据了。

由于TCP连接时全双工的，因此，每个方向都必须要单独进行关闭，这一原则是当一方完成数据发送任务后，发送一个FIN来终止这一方向的连接，收到一个FIN只是意味着这一方向上没有数据流动了，即不会再收到数据了，但是在这个TCP连接上仍然能够发送数据，直到这一方向也发送了FIN。首先进行关闭的一方将执行主动关闭，而另一方则执行被动关闭。

1. 数据传输结束后，客户端的应用进程发出连接释放报文段，并停止发送数据，客户端进入FIN_WAIT_1状态，
   此时客户端依然可以接收服务器发送来的数据。

2. 服务器接收到FIN后，发送一个ACK给客户端，确认序号为收到的序号+1，服务器进入CLOSE_WAIT状态。
   客户端收到后进入FIN_WAIT_2状态。

3. 当服务器没有数据要发送时，服务器发送一个FIN报文，此时服务器进入LAST_ACK状态，等待客户端的确认

4. 客户端收到服务器的FIN报文后，给服务器发送一个ACK报文，确认序列号为收到的序号+1。此时客户端进入
   TIME_WAIT状态，等待2MSL（MSL：报文段最大生存时间），然后关闭连接


## TCP如何保证可靠数据传输？

1. 序列号、确认应答、超时重传

    ```
    数据到达接收方，接收方需要发出一个确认应答，表示已经收到该数据段，
并且确认序号会说明了它下一次需要接收的数据序列号。如果发送发迟迟
未收到确认应答，那么可能是发送的数据丢失，也可能是确认应答丢失，
这时发送方在等待一定时间后会进行重传。这个时间一般是2*RTT(报文段
往返时间）+一个偏差值。
    ```
2. 窗口控制与高速重发控制/快速重传（重复确认应答）

 ```
    TCP会利用窗口控制来提高传输速度，意思是在一个窗口大小内，不用一
定要等到应答才能发送下一段数据，窗口大小就是无需等待确认而可以继
续发送数据的最大值。如果不使用窗口控制，每一个没收到确认应答的数
据都要重发。
使用窗口控制，如果数据段1001-2000丢失，后面数据每次传输，确认应
答都会不停地发送序号为1001的应答，表示我要接收1001开始的数据，
发送端如果收到3次相同应答，就会立刻进行重发；但还有种情况有可能
是数据都收到了，但是有的应答丢失了，这种情况不会进行重发，因为发
送端知道，如果是数据段丢失，接收端不会放过它的，会疯狂向它提醒.
 ```

3. 拥塞控制

    ```
        如果把窗口定的很大，发送端连续发送大量的数据，可能会造成网络的拥
    堵（大家都在用网，你在这狂发，吞吐量就那么大，当然会堵），甚至造
    成网络的瘫痪。所以TCP在为了防止这种情况而进行了拥塞控制。
    
    慢启动：定义拥塞窗口，一开始将该窗口大小设为1，之后每次收到确认应答（经过一个rtt），将拥塞窗口大小*2。
    
    拥塞避免：设置慢启动阈值，一般开始都设为65536。拥塞避免是指当拥塞窗口大小达到这个阈值，拥塞窗口的值
    不再指数上升，而是加法增加（每次确认应答/每个rtt，拥塞窗口大小+1），以此来避免拥塞。
    
    将报文段的超时重传看做拥塞，则一旦发生超时重传，我们需要先将阈值设为当前窗口大小的一半，并且将窗口大
    小设为初值1，然后重新进入慢启动过程。
    
    快速重传：在遇到3次重复确认应答（高速重发控制）时，代表收到了3个报文段，但是这之前的1个段丢失了，便对
    它进行立即重传。
    
    然后，先将阈值设为当前窗口大小的一半，然后将拥塞窗口大小设为慢启动阈值+3的大小。
    
    这样可以达到：在TCP通信时，网络吞吐量呈现逐渐的上升，并且随着拥堵来降低吞吐量，再进入慢慢上升的过程，
    网络不会轻易的发生瘫痪。
    ```

## 请分别简述GBN协议和SR协议的工作过程

GBN: 协议的发送端缓存能力较高，可以在未得到确认前连续发送多个分组，因此GBN协议的发送窗口 Ws>=1。GBN接收端缓存能力很低，只能接收到1个按序到达的分组，不能缓存未按序到达的分组，通常称GBN协议的接收端无缓存能力。因此，GBN协议的接收窗口Wr=1。
SR: 可以基于流水线方式连续发送多个分组，通常情况下，可以提高信道利用率。（收发都弄个缓存器，专搞乱序的分组消息。 接收方就可以对每个分组单独确认！）

## 说明TCP滑动窗口机制，对比TCP滑动窗口与GBN协议的异同

窗口滑动协议是TCP使用的一种流量控制方法。该协议允许发送方在停止并等待接收确认报文前可以连续发送多个分组。由于发送方不必每发一个分组就停下来等待确认，因此该协议可以加速数据的传输。只有在接收窗口向前滑动时（与此同时也发送了确认），发送窗口才有可能向前滑动。收发两端的窗口按照以上规律不断地向前滑动，因此这种协议又称为滑动窗口协议。


## TCP与UDP的主要区别是什么？

1. TCP面向连接（如打电话要先拨号建立连接）;UDP是无连接的，即发送数据之前不需要建立连接
2. TCP提供可靠的服务。也就是说，通过TCP连接传送的数据，无差错，不丢失，不重复，且按序到达;UDP尽最大努力交付，即不保证可靠交付
Tcp通过校验和，重传控制，序号标识，滑动窗口、确认应答实现可靠传输。如丢包时的重发控制，还可以对次序乱掉的分包进行顺序控制。
3. UDP具有较好的实时性，工作效率比TCP高，适用于对高速传输和实时性有较高的通信或广播通信。
4. 每一条TCP连接只能是点到点的;UDP支持一对一，一对多，多对一和多对多的交互通信

## TCP如何实现拥赛控制？

TCP的拥赛控制是从端到端的角度，推测网络是否发生拥塞，如果推断网络发生拥塞，则立即将数据发送速率降下来，以便缓解网络拥塞。TCP的拥塞控制采用的也是窗口机制，通过调节窗口的大小实现对发送数据速率的调整。

## 假设甲乙双方采用GBN协议发送报文端，甲已经发送了编号为0~7的报文段，当计时器超时时，若甲只收到0号和3号报文段的确认，则甲需要重发的报文段是那些？

答案：4-7号帧。因为GBN不只是超时重传的特点，它还有累计确认的功能，即：发一个确认N，表示前N个帧都已正确收到。超时重传一旦发生，就重发最后确认帧之后的所有帧。

# 第四章 网络层的习题

## 网络层提供的主要功能是什么？

网络层关注的是如何将承载传输层报文段的网络层数据报从源主机送达目的主机。

## 说明转发和路由的含义，有什么区别和联系？

- 转发：当通过一条输入链路接收到一个分组后，路由器需要决策通过那条输出链路将分组发送出去，并将分组从输入接口转移到输出接口。
- 路由选择：当分组从源主机流向目的主机时，必须通过某种方式决定分组经过的路由或路径，计算分组所经过的路径的算法被称为路由选择算法，或称为路由算法。

路由就是路径的选择，转发就是将数据包从选定的路径发送出去。

## 对比虚电路网络和数据报网络的优缺点

虚电路技术特点：在数据传输之前必须通过虚呼叫设置一条虚电路。适用于两端之间长时间的数据交换。 优点：可靠，保持顺序 缺点：若有故障，则经过故障点的数据全部丢失。 
数据报特点：在目的地需要重新组装报文。 优点：若有故障发生可绕过故障点 缺点：不能保证顺序到达，丢失不能立即知晓

## 虚电路网络如何建立虚电路？虚电路网络分组转发的依据是什么？

在建立每条电路时，网络会为电路分配独享资源，沿某条电路传输的数据，只占用分配给该电路的资源。

根据分组所携带的VCID判断所属的虚电路，从而决策如何转发分组，并确保分组沿对应的虚电路送达目的。

## 实现异构网络互连的主要方法有哪些？典型实现同构网络互连的网络设施是什么？

有协议转换、构建虚拟互联网络。
同构网络互连的典型技术是隧道技术。

## 路由器有哪些部分组成？各部分主要功能是什么？

输入端口、交换结构、输出端口、路由处理器

- 输入端口：负责从物理接口接收信号，还原数据链路层帧，提取IP数据报，根据IP数据报的目的IP地址检索路由表，决策需要将该IP数据报交换到那个输出端口。
- 交换结构：具体的转发工作，包括基于内存交换、基于总线交换、基于网络交换
- 输出端口：输出端口首先提供一个缓存排队功能，排队交换到该端口的待发送分组，并从队列中不断取出分组进行数据链路层数据桢的封装，通过物理线路端接发送出去。
- 路由处理器: 路由处理器就是路由器的CPU,负责执行路由器的各种指令，包括路由协议的运行、路由计算以及路由表的更新维护等。

## 网络层出现拥塞的原因是什么？有哪些网络层拥塞控制策略？

由于众多的用户随机的将信息送入网络，是网络中需要传输的信息总量经常大于其传输能力，以至于某些网络节点因缓冲区已满，无法接收新到达的分组，此时就发生了所谓的拥塞现象。
主要原因：缓冲区容量有限、传输路线的宽带有限、网络结点的处理能力有限、网络中某些部分发生了故障。
控制措施：流量感知路由、准入控制、流量调节、负载脱落。

## 请将IP网络183.164.128.0/17划分为等长的8个子网，并分别给出每个子网的子网地址、子网掩码、IP地址总数、可分配IP地址数和可分配 IP地址范围

- 由于2的3次方等于8，因此，划分8个等长子网，需要借用3位主机位作为子网位。已知当前掩码为17位，借用3位后的掩码应该是20位，即255.255.240.0。8个子网网络地址如下：183.164.128.0，183.164.144.0，183.164.160.0，183.164.176.0，183.164.192.0，183.164.208.0，183.164.224.0，183.164.240.0。

## 简述ICMP的主要功能

是进行主机或路由器间的网络层差错报告与网络探测

## 解释网络地址转换(NAT)的工作原理，如何实现NAT穿透？

- 借助于NAT，私有（保留）地址的"内部"网络通过路由器发送数据包时，私有地址被转换成合法的IP地址，一个局域网只需使用少量IP地址（甚至是1个）即可实现私有地址网络内所有计算机与Internet的通信需求

- 目前常用的针对UDP的NAT 穿透（NAT Traversal）方法主要有：STUN、TURN、ICE、uPnP等。其中ICE方式由于其结合了STUN和TURN的特点，所以使用最为广泛。针对TCP的NAT穿透技术目前仍为难点。实用的技术仍然不多。

## IPv6提出的动机是什么？IPv6相比于IPv4其数据报格式有什么特点?

动机是IPv4地址耗尽的问题，NAT不能彻底解决IPv4问题。

特点:
 1. IPv6具有更大的地址空间。IPv4中规定IP地址长度为32，最大地址个数为2^32；而IPv6中IP地址的长度为128，即最大地址个数为2^128。与32位地址空间相比，其地址空间增加了2^128-2^32个。 　　
1. IPv6使用更小的路由表。IPv6的地址分配一开始就遵循聚类（Aggregation）的原则，这使得路由器能在路由表中用一条记录（Entry）表示一片子网，大大减小了路由器中路由表的长度，提高了路由器转发数据包的速度。 　　
2. IPv6增加了增强的组播（Multicast）支持以及对流的支持（Flow Control），这使得网络上的多媒体IPv6的长分布式结构图
3. 应用有了长足发展的机会，为服务质量（QoS，Quality of Service）控制提供了良好的网络平台。 　　
4. IPv6加入了对自动配置（Auto Configuration）的支持。这是对DHCP协议的改进和扩展，使得网络（尤其是局域网）的管理更加方便和快捷。 　　
5. IPv6具有更高的安全性。在使用IPv6网络中用户可以对网络层的数据进行加密并对IP报文进行校验，在IPV6中的加密与鉴别选项提供了分组的保密性与完整性。极大的增强了网络的安全性。 六：允许扩充。如果新的技术或应用需要时，IPV6允许协议进行扩充。 　　
6. 更好的头部格式。IPV6使用新的头部格式，其选项与基本头部分开，如果需要，可将选项插入到基本头部与上层数据之间。这就简化和加速了路由选择过程，因为大多数的选项不需要由路由选择。 　　
7. 新的选项。IPV6有一些新的选项来实现附加的功能。 

## 简述链路状态路由选择算法原理？

链路状态选路算法的工作原理如下 ：
1. 在参与链路状态选路的路由器集合中，每个路由器都需要通过某种机制来了解自己所连接的链路及其状态。
2. 各路由器都能够将其所连接的链路的状态信息通知给网络中的所有其他路由器，这些链路信息包括链路状态、费用以及链路两端的路由器等。
3. 链路状态信息的通过链路状态分组（LSP）来向整个网络发布。一个LSP通常包含源路由器的标识符、相邻路由器的标识符，以及而知之间链路的费用。每一个LSP都将被网络中的所有的路由器接收，并用于建立网络整体的统一拓扑数据库。由于网络中所有的路由器都发送LSP，经过一段时间以后，每一个路由器都保持了一张完整的网络拓扑图，再在这个拓扑图上，利用最短通路算法（例如Dijkstra算法等），路由器就可以计算出从任何源点到任何目的地的最佳通路。

## 削减距离向量路由选择算法可以产生的无穷计数问题的措施

毒性立传技术
最大有效费用度量值

## 比较RIP、OSPF、GBP的异同。

RIP是一种基于距离向量路由选择算法的IGP。
OSPE对权值表示的意义没有限制，可以是跳数，也可以是链路的宽带等，OSPF只关心在给定的节点、边和边的权值的集合下，如何求解最短路径。
GBP: 实现跨自治系统的路由信息交换，是Internet的标准EGP

# 第五章 数据链路层与局域网的习题

## 链路层协议能够向网络层提供哪些可能的服务？

1. 无确认的无连接服务
2. 有确认的无连接服务
3. 有确认的面向连接服务 

## 为什么有些网络用纠错码而不用检错和重传机制？请给出两个理由。

1. 服务的实时性要求，如果使用检错机制，那么没有时间重传。
2. 如果传输质量比较差，那么错误率会非常高，几乎所有的帧都要重传，在这种情况下纠错比检错重传效率更高。
## 差错编码的检错或纠错能力与什么有关?

与编码集的汉明距离有关。

## 考虑在低负载的情况下，纯ALOHA与时隙ALOHA相比，哪个延迟更小？

纯ALOHA可以立即开始发送，在负载低的情况下，碰撞小，传输成功可能性大，基本上没有延迟。在分槽ALOHA，需要等待下一个时间槽到达才能发送。会产生半个时间槽的延迟。