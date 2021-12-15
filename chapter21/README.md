# 第 21 章 Ajax 与 Comet
Asynchronous JavaScript + XML 的简写就是Ajax，虽然名字中包含 XML 的成分，但 Ajax 通信与数据格式无关。

Ajax 技术的核心是 XMLHttpRequest 对象（简称 XHR），能够以异步方式从服务器取得数据，然后再通过DOM操作将数据插入页面中。

## 21.1 XMLHttpRequest 对象
IE5 是第一款引入 XHR 对象的浏览器。现代浏览器基本上都支持XHR 对象，像这样使用XMLHttpRequest构造函数```var xhr = new XMLHttpRequest();```。

### 21.1.1 XHR的用法
open()方法，接受 3 个参数：
* 要发送的请求的类型（"get"、 "post"等）
* 请求的 URL（绝对路径或相对路径）
* 是否异步请求（默认true，同步请求为false）

服务器响应的数据会自动填充到 XHR 对象的属性，相关属性如下：
* responseText：作为响应主体被返回的文本。
* responseXML：如果响应的内容类型是"text/xml"或"application/xml"，这个属性中将保存包含着响应数据的 XML DOM 文档。
* status：响应的 HTTP 状态。
* statusText： HTTP 状态的说明。

[XHR基础请求示例](./21.1/XHRExample01.html)

XHR 对象的 readyState 属性，该属性表示请求或响应的当前状态：
* 0：未初始化。尚未调用 open()方法。
* 1：启动。已经调用 open()方法，但尚未调用 send()方法。
* 2：发送。已经调用 send()方法，但尚未接收到响应。
* 3：接收。已经接收到部分响应数据。
* 4：完成。已经接收到全部响应数据，而且已经可以在客户端使用了。
[readyState 属性 和 xhr.abort()方法](./21.1/XHRAsyncExample01.html)

> 由于内存原因，不建议重用 XHR 对象

### 21.1.2 HTTP头部信息
默认情况下，在发送 XHR 请求的同时，还会发送下列头部信息：
* Accept：浏览器能够处理的内容类型。
* Accept-Charset：浏览器能够显示的字符集。
* Accept-Encoding：浏览器能够处理的压缩编码。
* Accept-Language：浏览器当前设置的语言。
* Connection：浏览器与服务器之间连接的类型。
* Cookie：当前页面设置的任何 Cookie。
* Host：发出请求的页面所在的域 。
* Referer：发出请求的页面的 URI。注意， HTTP 规范将这个头部字段拼写错了，而为保证与规范一致，也只能将错就错了。（这个英文单词的正确拼法应该是 referrer。）
* User-Agent：浏览器的用户代理字符串。

 setRequestHeader()方法可以设置自定义的请求头部信息，接受两个参数：
 * 头部字段的名称(键key)
 * 头部字段的值(值value)

[setRequestHeader()方法](./21.1/XHRRequestHeadersExample01.html)

### 21.1.3 GET请求
GET 是最常见的请求类型，最常用于向服务器查询某些信息（查）。
[setRequestHeader()方法](./21.1/GetExample01.html)

### 21.1.4 POST请求
POST 请求，通常用于向服务器发送应该被保存的数据（增、删、改）。 POST 请求的主体可以包含非常多的数据，而且格式不限。
[自定义serialize()方法序列化form表单](./21.1/XHRPostExample01.html)

> 从性能角度来看， GET 请求的速度最多可达到 POST 请求的两倍。

## 21.2 XMLHttpRequest 2 级
XMLHttpRequest 1 级只是把已有的 XHR 对象的实现细节描述了出来。而 XMLHttpRequest 2 级则进一步发展了 XHR。

### 21.2.1 FormData
XMLHttpRequest 2 级为此定义了FormData 类型。FormData构造函数可以序列化表单以及创建与表单格式相同的数据。

```javascript
//append()方法接收两个参数：键和值，向FormData对象中插入数据
var data = new FormData();
data.append("name", "Nicholas");
```

[FormData()构造函数序列化](./21.2/XHRFormDataExample01.html)

### 21.2.2 超时设定
timeout 属性，表示请求在等待响应多少毫秒之后就终止。如果在规定的时间内浏览器还没有接收到响应，那么就会触发 timeout 事件，进而会调用 ontimeout 事件处理程序。以下示例：[timeout属性设置ajax请求超时时间](./21.2/XHRTimeoutExample01.html)

### 21.2.3 overrideMimeType()方法
Firefox 最早引入了 overrideMimeType()方法，用于重写 XHR 响应的 MIME 类型。这个方法后来也被纳入了 XMLHttpRequest 2 级规范。MIME类型用来表示文档、文件或字节流的性质和格式。（如果服务器返回的MIME类型和数据的格式不匹配，会导致浏览器解析错误）

比如，服务器返回的 MIME 类型是 text/plain，但数据实际上XML格式。这样会使得responseXML 属性中仍然是 null，无法正确的解析数据。以下例子强制XHR对象将响应当作XML而非纯文本（text/plain）来处理：[overrideMimeType()方法该变MIME类型](./21.2/overrideMimeTypeExample01.html)

## 21.3 进度事件
Progress Events 规范是 W3C 的一个工作草案，定义了与客户端服务器通信有关的事件。这些事件最早其实只针对 XHR 操作，但目前也被其他 API 借鉴。有以下 6 个进度事件：
* loadstart：在接收到响应数据的第一个字节时触发。
* progress：在接收响应期间持续不断地触发。
* error：在请求发生错误时触发。
* abort：在因为调用 abort()方法而终止连接时触发。
* load：在接收到完整的响应数据时触发。
* loadend：在通信完成或者触发 error、 abort 或 load 事件后触发。

### 21.3.1 load事件
[](./21.3/XHRProgressEventExample01.html)