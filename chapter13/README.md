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

[html指定事件处理程序](./13.2/HTMLEventHandlerExample01.html)
[html和JavaScript指定事件处理程序](./13.2/HTMLEventHandlerExample05.html)

### 13.2.2 DOM0 级事件处理程序
DOM0、DOM1、DOM2...这些代表的是DOM的规范，是不同时代的DOM标准，其中DOM0的兼容性最好。

> DOM1一般只有设计规范没有具体实现，所以一般跳过。

[DOM0 级事件处理程序](./13.2/DOMLevel0EventHandlerExample01.html)

### 13.2.3 DOM2 级事件处理程序
“DOM2 级事件” 定义了两个方法，用于处理指定和删除事件处理程序的操作： addEventListener()
和 removeEventListener()。大多数情况下，都是将事件处理程序添加到事件流的冒泡阶段，这样可以最大限度地兼容各种浏览
器。

这两个方法都传入三个参数：
- 要处理的事件名
- 作为事件处理程序的函数
- true捕获阶段调用事件处理程序，false冒泡阶段调用事件处理程序

[DOM2 级事件处理程序](./13.2/DOMLevel2EventHandlerExample01.html)

## 13.3 事件对象
在触发 DOM 上的某个事件时，会产生一个事件对象 event，这个对象中包含着所有与事件有关的
信息。可以看看示例：[html指定事件处理程序](./13.2/HTMLEventHandlerExample01.html)，showEvent()方法输出event对象信息都包含了哪些。

### 13.3.1 DOM中的事件对象

| 属性/方法 | 类 型 | 读/写 | 说 明 |
| ---- | ---- | ---- | ---- |
| bubbles | Boolean | 只读 | 表明事件是否冒泡 |
| cancelable | Boolean | 只读 | 表明是否可以取消事件的默认行为 |
| currentTarget | Element | 只读 | 其事件处理程序当前正在处理事件的那个元素 |
| defaultPrevented | Boolean | 只读 | 为true 表 示 已 经 调 用 了 preventDefault()（DOM3级事件中新增） |
| detail | Integer | 只读 | 与事件相关的细节信息 |
| eventPhase | Integer | 只读 | 调用事件处理程序的阶段：1表示捕获阶段， 2表示“处于目标”， 3表示冒泡阶段 |
| preventDefault() | Function | 只读 | 取消事件的默认行为。如果cancelable是
true，则可以使用这个方法 |
| stopImmediatePropagation() | Function | 只读 | 取消事件的进一步捕获或冒泡，同时阻止任何事件处理程序被调用（DOM3级事件中新增） |
| stopPropagation() | Function | 只读 | 取消事件的进一步捕获或冒泡。如果bubbles为true，则可以使用这个方法 |
| target | Element | 只读 | 事件的目标 |
| trusted | Boolean | 只读 | 为true表示事件是浏览器生成的。为false表示事件是由开发人员通过JavaScript创建的（DOM3级事件中新增） |
| type | String | 只读 | 被触发的事件的类型 |
| view | AbstractView | 只读 | 与事件关联的抽象视图。等同于发生事件的window对象 |