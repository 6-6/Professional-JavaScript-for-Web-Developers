# 第13章 事件
事件是编程时系统内发生的动作或者发生的事情，系统响应事件后，如果需要，您可以某种方式对事件做出回应。例如：如果用户在网页上单击一个按钮，您可能想通过显示一个信息框来响应这个动作。

## 13.1 事件流
事件冒泡和事件捕获分别由微软和网景公司提出，这两个概念都是为了解决页面中事件流（事件发生顺序）的问题。

### 13.1.1 事件冒泡
冒泡事件(event bubbling)：事件从最精确的对象（最内层的元素）开始触发，然后到最不精确的对象(document 对象)。

示例：[事件冒泡和阻止冒泡](./13.1/eventBubbling.html)
```html
<!DOCTYPE html>
  <html>
    <head>
      <title>Event Bubbling Example</title>
    </head>
    <body>
      <div id="myDiv">Click Me</div>
    </body>
</html>
```

如果你单击了页面中的```<div>```元素，那么这个 click 事件会按照如下顺序传播：  
div -> body -> html -> document

### 13.1.2 事件捕获
捕获型事件(event capturing)：事件从最不精确的对象(document 对象)开始触发，然后到最精确（最内层的元素）。  

示例：[target.addEventListener()开启事件捕获](./13.1/eventcapturing.html)

以上个例子为例，点击了页面中的```<div>```元素，事件捕获的顺序是：  
document -> html -> body -> div

## 13.2 事件处理程序
事件就是用户或浏览器自身执行的某种动作。诸如 click、 load 和 mouseover，都是事件的名字。
而响应某个事件的函数就叫做事件处理程序（或事件侦听器）。事件处理程序的名字以"on"开头，click 事件的事件处理程序就是 onclick， load 事件的事件处理程序就是 onload。为事件指定处理程序的方式有好几种。

### 13.2.1 HTML事件处理程序
单击某个元素时执行一些 JavaScript，可以像下面这样编写代码：
```html
<!--用转义字符代替单引号，防止影响到HTML解析-->
<input type="button" value="Click Me" onclick="alert(&quot;Clicked&quot;)" />
```

[html标签对于事件的响应](./13.1/HTMLEventHandlerExample01.html)