<template><div><h2 id="作用" tabindex="-1"><a class="header-anchor" href="#作用" aria-hidden="true">#</a> 作用</h2>
<p>在Linux中curl是一个利用URL规则在命令行下工作的文件传输工具，可以说是一款很强大的http命令行工具。它支持文件的上传和下载，是综合传输工具，但按传统，习惯称url为下载工具。</p>
<h2 id="常用参数" tabindex="-1"><a class="header-anchor" href="#常用参数" aria-hidden="true">#</a> 常用参数</h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>-A/--user-agent &lt;string>              设置用户代理发送给服务器
-b/--cookie &lt;name=string/file>    cookie字符串或文件读取位置
-c/--cookie-jar &lt;file>                    操作结束后把cookie写入到这个文件中
-C/--continue-at &lt;offset>            断点续转
-D/--dump-header &lt;file>              把header信息写入到该文件中
-e/--referer                                  来源网址
-f/--fail                                          连接失败时不显示http错误
-o/--output                                  把输出写到该文件中
-O/--remote-name                      把输出写到该文件中，保留远程文件的文件名
-r/--range &lt;range>                      检索来自HTTP/1.1或FTP服务器字节范围
-s/--silent                                    静音模式。不输出任何东西
-T/--upload-file &lt;file>                  上传文件
-u/--user &lt;user[:password]>      设置服务器的用户和密码
-w/--write-out [format]                什么输出完成后
-x/--proxy &lt;host[:port]>              在给定的端口上使用HTTP代理
-#/--progress-bar                        进度条显示当前的传送状态
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="例子" tabindex="-1"><a class="header-anchor" href="#例子" aria-hidden="true">#</a> 例子</h2>
<h3 id="基本get、post请求" tabindex="-1"><a class="header-anchor" href="#基本get、post请求" aria-hidden="true">#</a> 基本get、post请求</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>curl www.baidu.com   // get请求
curl -X POST --data "name=123&amp;age=20"  www.google.com  // post请求
curl -X POST -D "name=123&amp;age=20"  www.google.com  // post请求
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="代理请求" tabindex="-1"><a class="header-anchor" href="#代理请求" aria-hidden="true">#</a> 代理请求</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>curl --proxy  192.168.0.1:8080 www.google.com   // 代理get请求，192.168.0.1:8080为代理IP
curl --data "name=123&amp;age=20" --proxy  192.168.0.1:8080 www.google.com   // 代理post请求，192.168.0.1:8080为代理IP
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="带cookie请求" tabindex="-1"><a class="header-anchor" href="#带cookie请求" aria-hidden="true">#</a> 带cookie请求</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>curl -c cookies  www.google.com  // get请求取得cookie,保存到cookies
curl -b cookies -c cookies -d 'name=123&amp;age=20' 'www.google.com'   // 带cookie的post请求
curl -c cookies  --proxy  192.168.0.1:8080 www.google.com  // get代理请求取得cookie,保存到cookies
curl -b cookies -c cookies --proxy  192.168.0.1:8080 -d 'name=123&amp;age=20' 'www.google.com'   // 带cookie的代理post请求
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="其他参数" tabindex="-1"><a class="header-anchor" href="#其他参数" aria-hidden="true">#</a> 其他参数</h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>-a/--append                        上传文件时，附加到目标文件
--anyauth                            可以使用“任何”身份验证方法
--basic                                使用HTTP基本验证
-B/--use-ascii                      使用ASCII文本传输
-d/--data &lt;data>                  HTTP POST方式传送数据
--data-ascii &lt;data>            以ascii的方式post数据
--data-binary &lt;data>          以二进制的方式post数据
--negotiate                          使用HTTP身份验证
--digest                        使用数字身份验证
--disable-eprt                  禁止使用EPRT或LPRT
--disable-epsv                  禁止使用EPSV
--egd-file &lt;file>              为随机数据(SSL)设置EGD socket路径
--tcp-nodelay                  使用TCP_NODELAY选项
-E/--cert &lt;cert[:passwd]>      客户端证书文件和密码 (SSL)
--cert-type &lt;type>              证书文件类型 (DER/PEM/ENG) (SSL)
--key &lt;key>                    私钥文件名 (SSL)
--key-type &lt;type>              私钥文件类型 (DER/PEM/ENG) (SSL)
--pass  &lt;pass>                  私钥密码 (SSL)
--engine &lt;eng>                  加密引擎使用 (SSL). "--engine list" for list
--cacert &lt;file>                CA证书 (SSL)
--capath &lt;directory>            CA目   (made using c_rehash) to verify peer against (SSL)
--ciphers &lt;list>                SSL密码
--compressed                    要求返回是压缩的形势 (using deflate or gzip)
--connect-timeout &lt;seconds>    设置最大请求时间
--create-dirs                  建立本地目录的目录层次结构
--crlf                          上传是把LF转变成CRLF
--ftp-create-dirs              如果远程目录不存在，创建远程目录
--ftp-method [multicwd/nocwd/singlecwd]    控制CWD的使用
--ftp-pasv                      使用 PASV/EPSV 代替端口
--ftp-skip-pasv-ip              使用PASV的时候,忽略该IP地址
--ftp-ssl                      尝试用 SSL/TLS 来进行ftp数据传输
--ftp-ssl-reqd                  要求用 SSL/TLS 来进行ftp数据传输
-F/--form &lt;name=content>        模拟http表单提交数据
-form-string &lt;name=string>      模拟http表单提交数据
-g/--globoff                    禁用网址序列和范围使用{}和[]
-G/--get                        以get的方式来发送数据
-h/--help                      帮助
-H/--header &lt;line>              自定义头信息传递给服务器
--ignore-content-length        忽略的HTTP头信息的长度
-i/--include                    输出时包括protocol头信息
-I/--head                      只显示文档信息
-j/--junk-session-cookies      读取文件时忽略session cookie
--interface &lt;interface>        使用指定网络接口/地址
--krb4 &lt;level>                  使用指定安全级别的krb4
-k/--insecure                  允许不使用证书到SSL站点
-K/--config                    指定的配置文件读取
-l/--list-only                  列出ftp目录下的文件名称
--limit-rate &lt;rate>            设置传输速度
--local-port&lt;NUM>              强制使用本地端口号
-m/--max-time &lt;seconds>        设置最大传输时间
--max-redirs &lt;num>              设置最大读取的目录数
--max-filesize &lt;bytes>          设置最大下载的文件总量
-M/--manual                    显示全手动
-n/--netrc                      从netrc文件中读取用户名和密码
--netrc-optional                使用 .netrc 或者 URL来覆盖-n
--ntlm                          使用 HTTP NTLM 身份验证
-N/--no-buffer                  禁用缓冲输出
-p/--proxytunnel                使用HTTP代理
--proxy-anyauth                选择任一代理身份验证方法
--proxy-basic                  在代理上使用基本身份验证
--proxy-digest                  在代理上使用数字身份验证
--proxy-ntlm                    在代理上使用ntlm身份验证
-P/--ftp-port &lt;address>        使用端口地址，而不是使用PASV
-Q/--quote &lt;cmd>                文件传输前，发送命令到服务器
--range-file                    读取（SSL）的随机文件
-R/--remote-time                在本地生成文件时，保留远程文件时间
--retry &lt;num>                  传输出现问题时，重试的次数
--retry-delay &lt;seconds>        传输出现问题时，设置重试间隔时间
--retry-max-time &lt;seconds>      传输出现问题时，设置最大重试时间
-S/--show-error                显示错误
--socks4 &lt;host[:port]>          用socks4代理给定主机和端口
--socks5 &lt;host[:port]>          用socks5代理给定主机和端口
-t/--telnet-option &lt;OPT=val>    Telnet选项设置
--trace &lt;file>                  对指定文件进行debug
--trace-ascii &lt;file>            Like --跟踪但没有hex输出
--trace-time                    跟踪/详细输出时，添加时间戳
--url &lt;URL>                    Spet URL to work with
-U/--proxy-user &lt;user[:password]>  设置代理用户名和密码
-V/--version                    显示版本信息
-X/--request &lt;command>          指定什么命令
-y/--speed-time                放弃限速所要的时间。默认为30
-Y/--speed-limit                停止传输速度的限制，速度时间'秒
-z/--time-cond                  传送时间设置
-0/--http1.0                    使用HTTP 1.0
-1/--tlsv1                      使用TLSv1（SSL）
-2/--sslv2                      使用SSLv2的（SSL）
-3/--sslv3                      使用的SSLv3（SSL）
--3p-quote                      like -Q for the source URL for 3rd party transfer
--3p-url                        使用url，进行第三方传送
--3p-user                      使用用户名和密码，进行第三方传送
-4/--ipv4                      使用IP4
-6/--ipv6                      使用IP6
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


