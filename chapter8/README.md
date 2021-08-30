# 第8章 BOM
ECMAScript 是 JavaScript 的核心，但如果要在 Web 中使用 JavaScript，那么 BOM（浏览器对象模
型）则无疑才是真正的核心。W3C 为了把浏览器中 JavaScript 最基本的部分标准化，已经将 BOM 的主要方面纳入了 HTML5 的规范中。

## 8.1 windo对象
BOM 的核心对象是 window，它表示浏览器的一个实例。在浏览器中， window 对象有双重角色，
它既是通过 JavaScript 访问浏览器窗口的一个接口，又是 ECMAScript 规定的 Global 对象。这意味着
在网页中定义的任何一个对象、变量和函数，都以 window 作为其 Global 对象，因此有权访问
parseInt()等方法。

### 8.1.1 全局作用域
由于 window 对象同时扮演着 ECMAScript 中 Global 对象的角色，因此所有在全局作用域中声明
的变量、函数都会变成 window 对象的属性和方法。
```javascript
var age = 29;
function sayAge(){
  alert(this.age);
}
alert(window.age); //29
sayAge(); //29
window.sayAge(); //29
```

[delete操作符对window对象的属性删除操作](./8.1/DeleteOperatorExample01.html)

### 8.1.2 窗口关系及框架
```<frame>``` 是 HTML 元素，它定义了一个特定区域，另一个 HTML 文档可以在里面展示。

iframe和frame的区别
* frame不能脱离frameSet单独使用，iframe可以
* frame不能放在body中
* frame的高度只能通过frameSet控制，iframe可以自己控制通过样式或属性设置。

> ```<frame>``` 的使用不应提倡，因为有一些缺点，比如性能问题，以及使用屏幕阅读器的用户缺少可访问性。比起 ```<frame>```，```<iframe>``` 更应该提倡。

> **已废弃: 该特性已经从 Web 标准中删除，一些浏览器目前仍然支持它，但还是尽量不要使用该特性。**

[frame示例](./8.1/FramesetExample01.html)

### 8.1.3 窗口位置
确定和修改 window 对象位置的属性和方法有很多。 IE、 Safari、 Opera 和 Chrome 都提供了**screenLeft** 和 **screenTop** 属性，分别用于表示窗口相对于屏幕左边和上边的位置。 Firefox 则在**screenX** 和 **screenY** 属性中提供相同的窗口位置信息， Safari 和 Chrome 也同时支持这两个属性。 Opera虽然也支持 screenX 和 screenY 属性，但与 screenLeft 和 screenTop 属性并不对应，不要在 Opera 中使用它们。

* [window对象位置属性（相对屏幕左边和上边的窗口位置）](./8.1/WindowPositionExample01.html)
* [window.moveTo()和window.moveBy()方法](./8.1/WindowPositionExample02.html)

### 8.1.4 窗口大小
outerWidth 和 outerHeight 返回浏览器窗口本身的尺寸，innerWidth 和 innerHeight则表示该容器中页面视图区的大小（减去边框宽度）。在 Chrome 中， outerWidth、 outerHeight 与innerWidth、innerHeight 返回相同的值，即视口（viewport）大小而非浏览器窗口大小。
[获取页面视口的大小](./8.1/WindowSizeExample01.html)

### 8.1.5 导航和打开窗口
用 window.open()方法既可以导航到一个特定的 URL，也可以打开一个新的浏览器窗口。

1. 弹出窗口
| 设置  | 值  | 说明  |
| --- | --- | --- |
|fullscreen|yes或no|表示浏览器窗口是否最大化。仅限IE|
|height|数值|表示新窗口的高度。不能小于100|
|left|数值|表示新窗口的左坐标。不能是负值|
|location|yes或no|表示是否在浏览器窗口中显示地址栏。不同浏览器的默认值不同。如果设置为no，地址栏可能会隐藏，也可能会被禁用（取决于浏览器）|
|menubar|yes或no|表示是否在浏览器窗口中显示菜单栏。默认值为no|
|resizable|yes或no|表示是否可以通过拖动浏览器窗口的边框改变其大小。默认值为no|
|scrollbars|yes或no|表示如果内容在视口中显示不下，是否允许滚动。默认值为no|
|status|yes或no|表示是否在浏览器窗口中显示状态栏。默认值为no|
|toolbar|yes或no|表示是否在浏览器窗口中显示工具栏。默认值为no|
|top|数值|表示新窗口的上坐标。不能是负值|
|width|数值|表示新窗口的宽度。不能小于100|

2. 安全限制
弹出窗口经常有广告骚扰用户，还有的伪装成各类系统对话框。给使用浏览器的用户造成麻烦，浏览器就在弹出窗口添加了限制，一般情况会阻止弹窗直接弹出来。

3. 弹出窗口屏蔽程序
[测试弹窗是否被限制](./8.1/PopupBlockerExample01.html)
 
### 8.1.6 间歇调用和超时调用
JavaScript 是单线程语言，但它允许通过设置间歇时间值来调度代码在特定的时刻执行。如下：

* [setTimeout()方法](./8.1/TimeoutExample01.html)
* [clearTimeout()方法](./8.1/TimeoutExample02.html)
* [setInterval()方法](./8.1/IntervalExample01.html)
* [clearInterval()方法](./8.1/IntervalExample02.html)
* [函数回调控制setTimeout()次数方法](./8.1/TimeoutExample03.html)

### 8.1.7 系统对话框
* [alert()方法](./8.1/alertExample01.html)
* [confirm()方法](./8.1/confirmExample01.html)
* [prompt()方法](./8.1/promptExample01.html)

## 8.2 location 对象
| 属性名 | 例子 | 说明 |
| ------ | ---- |---  |
| hash | "#contents" | 返回URL中的hash（#号后跟零或多个字符），如果URL中不包含散列，则返回空字符串 |
| host | "www.wrox.com:80" | 返回服务器名称和端口号（如果有） |
| hostname | "www.wrox.com" | 返回不带端口号的服务器名称 |
| href | "http:/www.wrox.com" | 返回当前加载页面的完整URL。而location对象的toString()方法也返回这个值 |
| pathname | "/WileyCDA/" | 返回URL中的目录和（或）文件名 |
| port | "8080" | 返回URL中指定的端口号。如果URL中不包含端口号，则这个属性返回空字符串 |
| protocol | "http:" | 返回页面使用的协议。通常是http:或https: |
| search | "?q=javascript" | 返回URL的查询字符串。这个字符串以问号开头 |
    

### 8.2.1 查询字符串参数
示例：[查询字符串解析并生成键值对](./8.2/LocationExample01.html)        

### 8.2.2 位置操作
使用 location 对象可以通过很多方式来改变浏览器的位置。首先，也是最常用的方式，就是使用
assign()方法并为其传递一个 URL，如下所示。

[location对象](./8.2/LocationExample02.html)

## 8.3 navigator 对象
navigator 对象可获取浏览器的一些信息。与其他 BOM 对象的情况一样，每个浏览器中的 navigator 对象也都有一套自己的属性。

### 8.3.1 检测插件
示例：[location对象](./8.3/PluginDetectionExample01.html)

## 8.5 history 对象
history 对象保存着用户上网的历史记录
```javascript
//后退一页
history.go(-1);
//前进一页
history.go(1);
//前进两页
history.go(2);
//跳转到最近的 wrox.com 页面
history.go("wrox.com");
//后退一页
history.back();
//前进一页
history.forward();
//历史记录的数量
history.length
```
