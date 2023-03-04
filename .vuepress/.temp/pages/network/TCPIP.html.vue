<template><div><h1 id="tcp-ip" tabindex="-1"><a class="header-anchor" href="#tcp-ip" aria-hidden="true">#</a> <center>TCP/IP</center></h1>
<h2 id="时间轴" tabindex="-1"><a class="header-anchor" href="#时间轴" aria-hidden="true">#</a> 时间轴</h2>
<p>TCP/IP的起源可以追溯到由美国国防部(DoD)高级研究计划局(DARPA)在二十世纪六十年代后期和七十年代早期进行的研究。下面摘要列出了TCP/IP发展史上的一些重大事件：</p>
<ul>
<li>
<p>1970年，ARPANET主机开始使用网络控制协议(NCP)，这就是后来的传输控制协议(TCP)的雏形。</p>
</li>
<li>
<p>1972年，Telnet协议推出。Telnet用于终端仿真以连接相异的系统。在二十世纪七十年代早期，这些系统使用不同类型的主机。</p>
</li>
<li>
<p>1973年，文件传输协议(FTP)推出。FTP用于在相异的系统之间交换文件。</p>
</li>
<li>
<p>1974年，传输控制协议(TCP)被详细规定下来。TCP取代NCP，它为人们提供了更可靠的通信服务。</p>
</li>
<li>
<p>1981年，Internet协议(IP)(又称IP版本4[IPv4])被详细规定下来。IP为端到端传递提供寻址和路由功能。</p>
</li>
<li>
<p>1982年，国防通信署(DCA)和ARPA建立了传输控制协议(TCP)和Internet协议 (IP)作为TCP/IP协议套件。</p>
</li>
<li>
<p>1983年，ARPANET将NCP替换为TCP/IP。</p>
</li>
<li>
<p>1984年，域名系统(DNS)推出。DNS可将域名(如www.example.com)解析为IP地址(如192.168.5.18)。</p>
</li>
<li>
<p>1995年，Internet服务提供商(ISP)开始向企业和个人提供Internet接入。</p>
</li>
<li>
<p>1996年，超文本传送协议(HTTP)推出。万维网使用HTTP。</p>
</li>
<li>
<p>1996年，第一套IP版本6(IPv6)标准发布。</p>
</li>
</ul>
<h2 id="百科定义" tabindex="-1"><a class="header-anchor" href="#百科定义" aria-hidden="true">#</a> 百科定义</h2>
<p>TCP/IP（Transmission Control Protocol/Internet Protocol，传输控制协议/网际协议）是指能够在多个不同网络间实现信息传输的协议簇。TCP/IP协议不仅仅指的是TCP 和IP两个协议，而是指一个由FTP、SMTP、TCP、UDP、IP等协议构成的协议簇， 只是因为在TCP/IP协议中TCP协议和IP协议最具代表性，所以被称为TCP/IP协议。</p>
<h2 id="来源" tabindex="-1"><a class="header-anchor" href="#来源" aria-hidden="true">#</a> 来源</h2>
<p>TCP/IP 模型是由 OSI 模型演化而来，TCP/IP 模型将 OSI 模型由七层简化为五层（一开始为四层），应用层、表示层、会话层统一为应用层。</p>
<p><img src="https://gaoqisen.github.io/GraphBed/201911/20191113220114.png" alt="https://gaoqisen.github.io/GraphBed/201911/20191113220114.png"></p>
<h3 id="计算机协议" tabindex="-1"><a class="header-anchor" href="#计算机协议" aria-hidden="true">#</a> 计算机协议</h3>
<p>协议就是计算机与计算机之间通过网络实现通信时事先达成的一
种“约定”。这种“约定”使那些由不同厂商的设备、不同的CPU以及不同的操
作系统组成的计算机之间，只要遵循相同的协议就能够实现通信。反之，如果所
使用的协议不同，就无法实现通信。这就好比两个人使用不同国家的语言说话，
怎么也无法相互理解。协议可以分为很多种，每一种协议都明确地界定了它的行
为规范。两台计算机之间必须能够支持相同的协议，并遵循相同协议进行处理，
这样才能实现相互通信。</p>
<h2 id="组成" tabindex="-1"><a class="header-anchor" href="#组成" aria-hidden="true">#</a> 组成</h2>
<p><img src="https://gaoqisen.github.io/GraphBed/201911/20191113222432.png" alt="https://gaoqisen.github.io/GraphBed/201911/20191113222432.png"></p>
<ul>
<li>物理层：计算机在传递数据的时候传递的都是0和1的数字，而物理层关心的是用什么信号来表示0和1，是否可以双向通信，最初的连接如何建立以及完成连接如何终止,总之，物理层是为数据传输提供可靠的环境。</li>
<li>数据链路层：数据链路层位于物理层和网络层之间，用来向网络层提供数据，就是把源计算机网络层传过来的信息传递给目标主机。
<ul>
<li>如何将数据组合成数据帧(Frame)，帧是数据链路层的传输单位</li>
<li>数据链路的建立、维护和拆除</li>
<li>帧包装、帧传输、帧同步</li>
<li>帧的差错恢复</li>
<li>流量控制</li>
</ul>
</li>
<li>网络层: 网络层位于传输层和数据链路层之间,用于把数据从源主机经过若干个中间节点传送到目标主机,并向传输层提供最基础的数据传输服务,它要提供路由和选址的工作。
<ul>
<li>选址: 交换机是靠MAC来寻址的，而因为MAC地址是无层次的,所以要靠IP地址来确认计算机的位置,这就是选址。</li>
<li>路由: 在能够选择的多条道路之间选择一条最短的路径就是路由的工作。</li>
</ul>
</li>
<li>传输层：传输层是面向连接的、可靠的的进程到进程通信的协议。TCP提供全双工服务，即数据可在同一时间双向传播。TCP将若干个字节构成一个分组，此分组称为报文段(Segment)。提供了一种端到端的连接。传输层的协议主要有TCP 和 UDP，
<ul>
<li>TCP(Transimision Control Protocal)是一种可靠的、面向连接的协议，传输效率低。</li>
<li>UDP(User Datagram Protocal)是一种不可靠的、无连接的服务，传输效率高。</li>
<li>TCP功能：主要是将数据进行分段打包传输，对每个数据包编号控制顺序，运输中丢失、重发和丢弃处理。</li>
<li>TCP三次握手
<img src="https://gaoqisen.github.io/GraphBed/201911/20191113222923.png" alt="https://gaoqisen.github.io/GraphBed/201911/20191113222432.png">
<ol>
<li>第一次握手: 建立连接。客户端发送连接请求，发送SYN报文，将seq设置为0。然后，客户端进入SYN_SEND状态，等待服务器的确认。</li>
<li>第二次握手: 服务器收到客户端的SYN报文段。需要对这个SYN报文段进行确认，发送ACK报文，将ack设置为1。同时，自己还要发送SYN请求信息，将seq为0。服务器端将上述所有信息一并发送给客户端，此时服务器进入SYN_RECV状态。</li>
<li>第三次握手: 客户端收到服务器的ACK和SYN报文后，进行确认，然后将ack设置为1，seq设置为1，向服务器发送ACK报文段，这个报文段发送完毕以后，客户端和服务器端都进入ESTABLISHED状态，完成TCP三次握手。</li>
</ol>
</li>
<li>TCP四次挥手
<img src="https://gaoqisen.github.io/GraphBed/201911/20191113223218.png" alt="https://gaoqisen.github.io/GraphBed/201911/20191113223218.png">
<ol>
<li>先由客户端向服务器端发送一个FIN，请求关闭数据传输。</li>
<li>当服务器接收到客户端的FIN时，向客户端发送一个ACK，其中ack的值等于FIN+SEQ</li>
<li>然后服务器向客户端发送一个FIN，告诉客户端应用程序关闭。</li>
<li>当客户端收到服务器端的FIN是，回复一个ACK给服务器端。其中ack的值等于FIN+SEQ</li>
</ol>
</li>
</ul>
</li>
<li>应用层: 常见协议有HTTP(超文本传输)、HTTPS 、FTP (文件传输)、SMTP(简单邮件传输)、DNS(域名服务器)、NFS(网络文件系统)等</li>
</ul>
</div></template>


