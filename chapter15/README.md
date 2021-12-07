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
大多数 2D 上下文操作都会细分为填充和描边两个操作，分别依靠这两个属性： 
* fillStyle和strokeStyle包含可能的值：
  * color（包括颜色名、十六进制码、rgba、rgb、hsl等）
  * gradient（渐变色）
  * pattern（模式）

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

### 15.2.4 绘制文本
制文本主要有两个方法： fillText()和 strokeText()。这两个方法都可以接收 4 个参数：
* 要绘制的文本字符串
* x 坐标
* y 坐标
* 可选的最大像素宽度。

这两个方法以这 3 个属性为基础：
* font：表示文本样式
  * 大小及字体，用 CSS 中指定字体的格式来指定，例如"10px Arial"。
* textAlign：表示文本对齐方式。
  * "start"、"end"、"left"、"right"和"center"。建议使用"start"和"end"，不要使用"left"和"right"，因为前两者的意思更稳妥，能同时适合从左到右和从右到左显示（阅读）的语言。
* textBaseline：表示文本的基线。
  * "top"、"hanging"、"middle"、"alphabetic"、"ideographic"和"bottom"。

  [绘制时钟的文字](./15.2/2DTextExample01.html)
  [textAlign和textBaseline属性](./15.2/2DTextExample02.html)
  [文字自适应宽度显示](./15.2/2DTextExample03.html)

### 15.2.5 变换
可以通过如下方法来修改变换矩阵
* rotate(angle)：围绕原点旋转图像 angle 弧度。
* scale(scaleX, scaleY)：缩放图像，在 x 方向乘以 scaleX，在 y 方向乘以 scaleY。 scaleX
和 scaleY 的默认值都是 1.0。
* translate(x, y)：将坐标原点移动到(x,y)。执行这个变换之后， 坐标(0,0)会变成之前由(x,y)
表示的点。
* transform(m1_1, m1_2, m2_1, m2_2, dx, dy)：直接修改变换矩阵，方式是乘以如下
矩阵。
m1_1 m1_2 dx
m2_1 m2_2 dy
0 0 1
* setTransform(m1_1, m1_2, m2_1, m2_2, dx, dy)：将变换矩阵重置为默认状态，然后
再调用 transform()。

[变换原点](./15.2/2DTransformExample01.html)
[save()和restore()，保存和恢复上下文的状态](./15.2/2DSaveRestoreExample01.html)

### 15.2.6 绘制图像
[drawImage()方法将图片绘制到画布上](./15.2/2DDrawImageExample01.html)

### 15.2.7 阴影
2D 上下文会根据以下几个属性的值，自动为形状或路径绘制出阴影。
* shadowColor：用 CSS 颜色格式表示的阴影颜色，默认为黑色。
* shadowOffsetX：形状或路径 x 轴方向的阴影偏移量，默认为 0。
* shadowOffsetY：形状或路径 y 轴方向的阴影偏移量，默认为 0。
* shadowBlur：模糊的像素数，默认 0，即不模糊。

[canvas设置阴影](./15.2/2DFillRectShadowExample01.html)

### 15.2.8 渐变
[createLinearGradient()方法设置渐变色](./15.2/2DFillRectGradientExample01.html)

### 15.2.9 模式
模式其实就是重复的图像，可以用来填充或描边图形。要创建一个新模式，可以调用createPattern()方法并传入两个参数：
* ```<img>```、```<video>```、```<canvas>```元素
* 表示如何重复图像的字符串：与 background-repeat 属性值相同，有"repeat"、 "repeat-x"、"repeat-y"和"no-repeat"

[createPattern()方法创建一个模式](./15.2/2DFillRectPatternExample01.html)