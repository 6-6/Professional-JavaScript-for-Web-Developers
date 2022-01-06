# 第 23 章 离线应用与客户端存储
支持离线 Web 应用开发是 HTML5 的另一个重点。所谓离线 Web 应用，就是在设备不能上网的情况下仍然可以运行的应用。

## 23.1 离线检测
开发离线应用的第一步是要知道设备是在线还是离线，HTML5为此定义了一个```navigator.onLine```属性，这个属性值为 true 表示设备能上网，值为 false 表示设备离线。实际应用中， navigator.onLine 在不同浏览器间还有
些差异：
* IE6+和 Safari 5+能够正确检测到网络已断开，并将 navigator.onLine 的值转换为 false。
* Firefox 3+和 Opera 10.6+支持 navigator.onLine 属性，但你必须手工选中菜单项“文件 → Web开发人员（设置）→ 脱机工作”才能让浏览器正常工作。
* Chrome 11 及之前版本始终将 navigator.onLine 属性设置为 true。新版本已修复。

[navigator.onLine属性，判断是否离线访问](./23.1/OnLineExample01.html)
[online和offline事件](./23.1/OnlineEventsExample01.html)

## 23.2 应用缓存
HTML5 的应用缓存（application cache），或者简称为 appcache，是专门为开发离线 Web 应用而设计的。Appcache 就是从浏览器的缓存中分出来的一块缓存区。要想在这个缓存中保存数据，可以使用一个描述文件（manifest file），列出要下载和缓存的资源。下面是一个简单的描述文件示例。 

```
CACHE MAINFEST
#Comment

file.js
file.css
```

applicationCache 对象，这个对象有一个 status 属性，属性的值是常量，表示应用缓存的如下当前状态：
*  0：无缓存，即没有与页面相关的应用缓存。
*  1：闲置，即应用缓存未得到更新。
*  2：检查中，即正在下载描述文件并检查更新。
*  3：下载中，即应用缓存正在下载描述文件中指定的资源。
*  4：更新完成，即应用缓存已经更新了资源，而且所有资源都已下载完毕，可以通过 swapCache()
来使用了。
*  5：废弃，即应用缓存的描述文件已经不存在了，因此页面无法再访问应用缓存。应用缓存还有很多相关的事件，表示其状态的改变。以下是这些事件：
    * checking：在浏览器为应用缓存查找更新时触发。
    * error：在检查更新或下载资源期间发生错误时触发。
    * noupdate：在检查描述文件发现文件无变化时触发。
    * downloading：在开始下载应用缓存资源时触发。
    * progress：在文件下载应用缓存的过程中持续不断地触发。
    * updateready：在页面新的应用缓存下载完毕且可以通过 swapCache()使用时触发。
    * cached：在应用缓存完整可用时触发

## 23.3 数据存储
cookie 是原来的网景公司创造的。一份题为“Persistent Client State: HTTP Cookes”（持久客户端状态： HTTP Cookies）的标准中对 cookie 机制进行了阐述。

### 23.3.1 Cookie
HTTP Cookie，通常直接叫做 cookie，最初是在客户端用于存储会话信息的。该标准要求服务器对
任意 HTTP 请求发送 Set-Cookie HTTP 头作为响应的一部分，其中包含会话信息。例如，这种服务器响
应的头可能如下：

```
HTTP/1.1 200 OK
Content-type: text/html
Set-Cookie: name=value
Other-header: other-header-value
```

这个 HTTP 响应设置以 name 为名称、以 value 为值的一个 cookie，名称和值在传送时都必须是
URL 编码的。浏览器会存储这样的会话信息，并在这之后，通过为每个请求添加 Cookie HTTP 头将信
息发送回服务器，如下所示：

```
GET /index.html HTTP/1.1
Cookie: name=value
Other-header: other-header-value
```

1. 限制
cookie 在性质上是绑定在特定的域名下的。当设定了一个 cookie 后，再给创建它的域名发送请求时，
都会包含这个 cookie。这个限制确保了储存在 cookie 中的信息只能让批准的接受者访问，而无法被其他
域访问。

由于 cookie 是存在客户端计算机上的，还加入了一些限制确保 cookie 不会被恶意使用，同时不会占
据太多磁盘空间。每个域的 cookie 总数是有限的，不过浏览器之间各有不同。如下所示。

* IE6 以及更低版本限制每个域名最多 20 个 cookie。
* IE7 和之后版本每个域名最多 50 个。 IE7 最初是支持每个域名最大 20 个 cookie，之后被微软的
一个补丁所更新。
* Firefox 限制每个域最多 50 个 cookie。
* Opera 限制每个域最多 30 个 cookie。
* Safari 和 Chrome 对于每个域的 cookie 数量限制没有硬性规定。

2. cookie 的构成
cookie 由浏览器保存的以下几块信息构成：
* 名称：一个唯一确定 cookie 的名称。cookie 名称是不区分大小写的，所以 myCookie 和 MyCookie
被认为是同一个 cookie。然而，实践中最好将 cookie 名称看作是区分大小写的，因为某些服务器会这样处理cookie。 cookie 的名称必须是经过 URL 编码的。
* 值：储存在 cookie 中的字符串值。值必须被 URL 编码。
* 域： cookie 对于哪个域是有效的。所有向该域发送的请求中都会包含这个 cookie 信息。这个值
可以包含子域（subdomain，如 www.wrox.com），也可以不包含它（如.wrox.com，则对于 wrox.com
的所有子域都有效）。如果没有明确设定，那么这个域会被认作来自设置 cookie 的那个域。
* 路径：对于指定域中的那个路径，应该向服务器发送 cookie。例如，你可以指定 cookie 只有从
http://www.wrox.com/books/ 中才能访问，那么 http://www.wrox.com 的页面就不会发
送 cookie 信息，即使请求都是来自同一个域的。
* 失效时间：表示 cookie 何时应该被删除的时间戳（也就是，何时应该停止向服务器发送这个
cookie）。默认情况下，浏览器会话结束时即将所有 cookie 删除；不过也可以自己设置删除时间。
这个值是个 GMT 格式的日期（Wdy, DD-Mon-YYYY HH:MM:SS GMT），用于指定应该删除
cookie 的准确时间。因此， cookie 可在浏览器关闭后依然保存在用户的机器上。如果你设置的失
效日期是个以前的时间，则 cookie 会被立刻删除。
* 安全标志：指定后， cookie 只有在使用 SSL 连接的时候才发送到服务器。例如， cookie 信息只
能发送给 https://www.wrox.com，而 http://www.wrox.com 的请求则不能发送 cookie。
每一段信息都作为 Set-Cookie 头的一部分，使用分号加空格分隔每一段，如下例所示。

3. JavaScript 中的 cookie
在 JavaScript中处理 cookie有些复杂，因为其众所周知的蹩脚的接口，即 BOM的```document.cookie```
属性。这个属性的独特之处在于它会因为使用它的方式不同而表现出不同的行为。当用来获取属性值时，
```document.cookie``` 返回当前页面可用的（根据 cookie 的域、路径、失效时间和安全设置）所有 cookie
的字符串，一系列由分号隔开的名值对儿，如下例所示。

```name1=value1;name2=value2;name3=value3`