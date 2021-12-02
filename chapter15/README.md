# 第15章 使用Canvas绘图
```<canvas>```元素最早是由苹果公司推出的，当时主要用在其 Dashboard 微件中。很快， HTML5 加入了这个元素，主流浏览器也迅速开始支持它。 除了具备基本绘图能力的 2D 上下文， ```<canvas>```还建议了一个名为WebGL 的 3D 上下文。

## 15.1 基本用法
要使用```<canvas>```元素，必须先设置其 width 和 height 属性，指定可以绘图的区域大小。出现在
开始和结束标签中的内容是后备信息，如果浏览器不支持```<canvas>```元素，就会显示这些信息。请看例子：

```html
<canvas id="drawing" width=" 200" height="200">A drawing of something.</canvas>
```

要在这块画布（canvas）上绘图，需要取得绘图上下文。而取得绘图上下文对象的引用，需要调用
getContext()方法并传入上下文的名字。传入"2d"，就可以取得 2D 上下文对象。

```javascript
var drawing = document.getElementById('drawing');

// 确定浏览器支持<canvas>元素
if(drawing.getContext){
  var context = drawing.getContext('2d');
  // 更多代码...
}
```

[canvas导出为base64图片](./15.1/2DDataUrlExample01.html)

## 15.2 2D 上下文
