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
2D 上下文的坐标开始于```<canvas>```元素的左上角，原点坐标是(0,0)。所有坐标值都基于这个原点计算， x 值越大表示越靠右， y 值越大表示越靠下。默认情况下， width 和 height 表示水平和垂直两个方向上可用的像素数目。

### 15.2.1 填充和描边
大多数 2D 上下文操作都会细分为填充和描边两个操作，分别依靠这两个属性： fillStyle 和 strokeStyle。可以使用 CSS 中指定颜色值的任何格式，包括颜色名、十六进制码、rgb、 rgba、 hsl 或 hsla。

```javascript
var drawing = document.getElementById("drawing");
//确定浏览器支持<canvas>元素
if (drawing.getContext){
  var context = drawing.getContext("2d");
  context.strokeStyle = "red";
  context.fillStyle = "#0000ff";
}
```

以上代码将 strokeStyle 设置为 red，将 fillStyle 设置为#0000ff（蓝色）。然后，所有涉及描边和填充的操作都将使用这两个样式，直至重新设置这两个值。

### 15.2.2 绘制矩形
矩形是唯一一种可以直接在 2D 上下文中绘制的形状。与矩形有关的方法包括 fillRect()、
strokeRect()和 clearRect()。

这三个方法都能接收 4 个参数，且参数的单位都是像素：
* 矩形的 x 坐标
* 矩形的 y 坐标
* 矩形宽度
* 矩形高度

```fillRect()```方法在画布上绘制的矩形会填充指定的颜色。填充的颜色通过 fillStyle 属性指定，比如以下示例：[fillRect()方法绘制填充矩形](./15.2/2DFillRectExample01.html)

```strokeRect()```方法在画布上绘制的矩形会使用指定的颜色描边，描边颜色通过 strokeStyle 属性指定，比如以下示例：[strokeRect()方法绘制描边矩形](./15.2/2DStrokeRectExample01.htm)

```clearRect()```方法用于清除画布上的矩形区域。本质上，这个方法可以把绘制上下文中的某一矩形区域变透明。那么通过这个特性，我们就可以绘制形状然后再清除指定区域，比如以下示例：[strokeRect()方法绘制描边矩形](./15.2/2DClearRectExample01.htm)

* lineWidth属性控制描边线条的宽度，该属性的值可以是任意整数。
* lineCap属性控制线条末端的形状，平头、圆头或方头（"butt"、"round"或"square"）。
* lineJoin属性控制线条相交的方式，圆交、斜交或斜接（"round"、 "bevel"或"miter"）。

### 15.2.3 绘制路径
2D 绘制上下文支持很多在画布上绘制路径的方法。要绘制路径，首先必须调用 beginPath()方法，表示要开始
绘制新路径。然后，再通过调用下列方法来实际地绘制路径：

* arc(x, y, radius, startAngle, endAngle, counterclockwise)：
  * (x,y) 圆心坐标
  * radius 弧线半径
  * startAngle 起始角度
  * endAngle 结束角度
  * counterclockwise 是否按照逆时针进行计算startAngle和endAngle
    * true为逆时针
    * false为顺时针

* arcTo(x1, y1, x2, y2, radius)：
  * (x1, y1) 起始坐标
  * (x2, y2) 结束坐标
  * radius 弧线半径
* bezierCurveTo(c1x, c1y, c2x, c2y, x, y)：从上一点开始绘制一条曲线，到(x,y)为止，并且以(c1x,c1y)和(c2x,c2y)为控制点。
* lineTo(x, y)：从上一点开始绘制一条直线，到(x,y)为止。
* moveTo(x, y)：将绘图游标移动到(x,y)，不画线。
* quadraticCurveTo(cx, cy, x, y)：从上一点开始绘制一条二次曲线，到(x,y)为止，并且以(cx,cy)作为控制点。
* rect(x, y, width, height)：从点(x,y)开始绘制一个矩形，宽度和高度分别由 width 和height 指定。这个方法绘制的是矩形路径，而不是 strokeRect()和 fillRect()所绘制的独立的形状。

参考以下示例：
[绘制一个简单的时钟](./15.2/2DPathExample01.html)

<!-- 从上一点开始绘制一条弧线，到(x2,y2)为止，并且以给定的半径 radius 穿过(x1,y1)。 -->