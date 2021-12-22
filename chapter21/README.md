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
响应接收完毕后将触发 load 事件，因此也就没有必要去检查 readyState 属性了。用以替代 readystatechange 事件。onload 事件处理程序会接收到一个 event 对象，其 target 属性就指向 XHR 对象实例，因而可以访问到 XHR 对象的所有方法和属性。

```javascript
var xhr = createXHR(); 
xhr.onload = function(){ 
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){ 
        alert(xhr.responseText); 
    } else { 
        alert("Request was unsuccessful: " + xhr.status); 
    } 
}; 
xhr.open("get", "altevents.php", true); 
xhr.send(null);
```

### 21.3.2 progress事件
progress 事件会在浏览器接收新数据期间周期性地触发，而 onprogress 事件处理程序会接收到一个 event 对象，其 target 属性是 XHR 对象，但
包含着三个额外的属性：
* lengthComputable：表示进度信息是否可用的布尔值
* position：表示已经接收的字节数
* totalSize：表示根据Content-Length 响应头部确定的预期字节数

[onprogress 事件处理程序](./21.3/XHRProgressEventExample01.html)

## 21.4 跨源资源共享
默认情况下， XHR 对象只能访问与包含它的页面位于同一个域中的资源。

CORS（Cross-Origin Resource Sharing，跨源资源共享）定义了在必须访
问跨源资源时，浏览器与服务器应该如何沟通。 

附加 Origin 头部，其中包含请求页面的源信息（协议、域名和端
口），以便服务器根据这个头部信息来决定是否给予响应。下面是 Origin 头部的一个示例：

```Origin: http://www.nczonline.net```

如果服务器认为这个请求可以接受，就在 Access-Control-Allow-Origin 头部中回发相同的源信息（如果是公共资源，可以回发"*"）。例如：

```Access-Control-Allow-Origin: http://www.nczonline.net```

### 21.4.2 其他浏览器对CORS的实现
WebKit 都通过 XMLHttpRequest对象实现了对 CORS 的原生支持。请求位于另一个域中的资源，使用标准的 XHR 对象并在 open()方法中传入**绝对 URL** 即可（前提两方需开启跨域），例如：[跨域测试](./21.4/CORSExample01.html)

与 IE 中的 XDR 对象不同，通过跨域 XHR 对象可以访问 status 和 statusText 属性，而且还支持同步请求。跨域 XHR 对象也有一些限制，但为了安全这些限制是必需的。以下就是这些限制：
* 不能使用 setRequestHeader()设置自定义头部。
* 不能发送和接收 cookie。
* 调用 getAllResponseHeaders()方法总会返回空字符串。

> 对于本地资源，最好使用相对 URL，在访问远程资源时再使用绝对 URL。避免出现限制访问头部或本地 cookie 信息等问题。

### 21.4.3 Preflighted Reqeusts
CORS 通过一种叫做 Preflighted Requests 的机制支持开发人员使用自定义的头部、
GET 或 POST 之外的方法，以及不同类型的主体内容。在使用下列高级选项来发送请求时，就会向服务器发送一个 Preflight 请求。这种请求使用 OPTIONS 方法，发送下列头部：
* Origin：与简单的请求相同。
* Access-Control-Request-Method：请求自身使用的方法。
* Access-Control-Request-Headers：（可选）自定义的头部信息，多个头部以逗号分隔。
以下是一个带有自定义头部 NCZ 的使用 POST 方法发送的请求。
```javascript
Origin: http://www.nczonline.net
Access-Control-Request-Method: POST
Access-Control-Request-Headers: NCZ
```

发送这个请求后，服务器可以决定是否允许这种类型的请求。服务器通过在响应中发送如下头部与
浏览器进行沟通。
* Access-Control-Allow-Origin：与简单的请求相同。
* Access-Control-Allow-Methods：允许的方法，多个方法以逗号分隔。
* Access-Control-Allow-Headers：允许的头部，多个头部以逗号分隔。
* Access-Control-Max-Age：应该将这个 Preflight 请求缓存多长时间（以秒表示）。

例如：
```javascript
Access-Control-Allow-Origin: http://www.nczonline.net
Access-Control-Allow-Methods: POST, GET
Access-Control-Allow-Headers: NCZ
Access-Control-Max-Age: 1728000
```

> Preflight 请求结束后，结果将按照响应中指定的时间缓存起来。而为此付出的代价只是第一次发送这种请求时会多一次 HTTP 请求。

### 21.4.4 带凭据的请求
默认情况下，跨源请求不提供凭据（cookie、HTTP认证及客户端SSL证明等）。通过将withCredentials属性设置为true，可以指定某个请求应该发送凭据。如果服务器接受带凭据的请求，会用下面的 HTTP 头部来响应。
```Access-Control-Allow-Credentials: true```

如果发送的是带凭据的请求，但服务器的响应中没有包含这个头部，那么浏览器就不会把响应交给JavaScript（于是， responseText 中将是空字符串， status 的值为 0，而且会调用 onerror()事件处理程序）。另外，服务器还可以在 Preflight 响应中发送这个 HTTP 头部，表示允许源发送带凭据的请求。


### 21.5 其他跨域技术
利用 DOM 中能够执行跨域请求的功能，在不依赖 XHR 对象的情况下也能发送某种请求。例如：```<img>```标签可以显示跨域的图片

### 21.5.1 图像Ping
图像ping利用的是img标签可以不受跨域影响，进行单向的跨域通信。浏览器得不到任何具体的数据，但通过侦听 load 和 error 事件，它能知道响应是什么时候接收到的。例如：[图像Ping](./21.5/ImagePingExample01.html)

### 21.5.2 JSONP
JSONP 是 JSON with padding（填充式 JSON 或参数式 JSON）的简写，是应用 JSON 的一种新方法。 JSONP 看起来与 JSON 差不多，只不过是被包含在函数调用中的 JSON，就像下面这样：
```javascript
callback({ "name": "Nicholas" });
```

JSONP 由两部分组成：回调函数和数据。回调函数是当响应到来时应该在页面中调用的函数。回调函数的名字一般是在请求中指定的。而数据就是传入回调函数中的 JSON 数据。下面是一个典型的 JSONP请求。
```
http://freegeoip.net/json/?callback=handleResponse
```

JSONP 是通过动态```<script>```元素来使用的，```<script>```元素与```<img>```元素类似，都有能力不受限制地从其他域加载资源。
[](./21.5/JSONPExample01.html)