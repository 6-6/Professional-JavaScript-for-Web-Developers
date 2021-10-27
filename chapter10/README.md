# 第10章 DOM
文档对象模型 (DOM) 是HTML和XML文档的编程接口。它提供了对文档的结构化的表述，并定义了一种方式可以使从程序中对该结构进行访问，从而改变文档的结构，样式和内容。

DOM 将文档解析为一个由节点和对象（包含属性和方法的对象）组成的结构集合。简言之，它会将web页面和脚本或程序语言连接起来。

> 注意， IE 中的所有 DOM 对象都是以 COM 对象的形式实现的。这意味着 IE 中的
DOM 对象与原生 JavaScript 对象的行为或活动特点并不一致。

## 10.1 节点层次
DOM 可以将任何 HTML 或 XML 文档描绘成一个由多层节点构成的树形结构。每个节点都拥有各自的数据和方法，另外也与其他节点存在某种关系。

```html
<html>
  <head>
    <title>Sample Page</title>
  </head>
  <body>
    <p>Hello World!</p>
  </body>
</html>
```
可以将这个简单的 HTML 文档表示为一个层次结构，如图 10-1 所示。

![图 10-1](http://waimai.taros.xyz/?explorer/share/fileOut&shareID=7UBBGDsg&path=%7BshareItemLink%3A7UBBGDsg%7D%2F)

### 10.1.1 Node类型
DOM1 级定义了一个 Node 接口，该接口将由 DOM 中的所有节点类型实现。这个 Node 接口在
JavaScript 中是作为 Node 类型实现的；JavaScript 中的所有节点类型都继承自 Node 类型，因此所有节点类型都共享着相同的基本属性和方法。

每个节点都有一个 nodeType 属性，用于表明节点的类型。节点类型由在 Node 类型中定义的下列
12 个数值常量来表示，任何节点类型必居其一：

* Node.ELEMENT_NODE(1)；
* Node.ATTRIBUTE_NODE(2)；
* Node.TEXT_NODE(3)；
* Node.CDATA_SECTION_NODE(4)；
* Node.ENTITY_REFERENCE_NODE(5)；
* Node.ENTITY_NODE(6)；
* Node.PROCESSING_INSTRUCTION_NODE(7)；
* Node.COMMENT_NODE(8)；
* Node.DOCUMENT_NODE(9)；
* Node.DOCUMENT_TYPE_NODE(10)；
* Node.DOCUMENT_FRAGMENT_NODE(11)；
* Node.NOTATION_NODE(12)

```javascript
if (someNode.nodeType == NodeELEMENT_NODE){ //在 IE 中无效
  alert("Node is an element.");
}
```

```javascript
/*
  为了兼容性，尽量使用数字值和nodeType树形进行比较
*/
if (someNode.nodeType == 1){ //适用于所有浏览器
  alert("Node is an element.");
}
```

1. nodeName 和 nodeValue 属性  
要了解节点的具体信息，nodeName 和 nodeValue 这两个属性。这两个属性的值完全取决于节点的类型。

```javascript
if (someNode.nodeType == 1){
  value = someNode.nodeName; //nodeName 的值是元素的标签名
}
```

2. 节点关系  
节点存在类似父子关系或兄弟关系，如```<html>```是```<body>```的父元素。

每个节点都有一个 childNodes 属性，其中保存着一个 NodeList 对象。 NodeList 是一种类数组对象，用于保存一组有序的节点，可以通过位置来访问这些节点。

文档结构中的节点关系，见图10-2：
![图 10-2](http://waimai.taros.xyz/?explorer/share/fileOut&shareID=7UDEcnCQ&path=%7BshareItemLink%3A7UDEcnCQ%7D%2F)

3. 操作节点  
* appendChild()，用于向 childNodes 列表的末尾添加一个节点。

```javascript
//插入后成为最后一个子节点
returnedNode = someNode.insertBefore(newNode, null);
alert(newNode == someNode.lastChild); //true
//插入后成为第一个子节点
var returnedNode = someNode.insertBefore(newNode, someNode.firstChild);
alert(returnedNode == newNode); //true
alert(newNode == someNode.firstChild); //true
//插入到最后一个子节点前面
returnedNode = someNode.insertBefore(newNode, someNode.lastChild);
alert(newNode == someNode.childNodes[someNode.childNodes.length-2]); //true
```

```javascript
//移除第一个子节点
var formerFirstChild = someNode.removeChild(someNode.firstChild);
//移除最后一个子节点
var formerLastChild = someNode.removeChild(someNode.lastChild);
```

### 10.1.2 Document类型
JavaScript 通过 Document 类型表示文档。在浏览器中， document 对象是 HTMLDocument（继承自 Document 类型）的一个实例，表示整个 HTML 页面。而且， document 对象是 window 对象的一个属性，因此可以将其作为全局对象来访问。 Document 节点具有下列特征：
* nodeType 的值为 9；
* nodeName 的值为"#document"；
* nodeValue 的值为 null；
* parentNode 的值为 null；
* ownerDocument 的值为 null；
* 其子节点可能是一个 DocumentType（最多一个）、 Element（最多一个）、 ProcessingInstruction
或 Comment。

1. 文档的子节点  
* document.documentElement属性，取得```<html>```引用
* document.body属性，取得```<body>```引用
* document.doctype属性，取得```<!DOCTYPE>```引用 *（不同浏览器表现不一致）*


```javascript
//说明documentElement、 firstChild 和 childNodes[0]的值相同，都指向<html>元素。
var html = document.documentElement; //取得对<html>的引用
alert(html === document.childNodes[0]); //true
alert(html === document.firstChild); //true
```

2. 文档信息
* document.title，获取文档```<title>```元素中的文本
* document.domain，取得域名
* document.referrer，取得来源页面的 URL
* document.URL，获取完整的 URL

3. 查找元素  
* document.getElementById()
* document.getElementsByClassName()
* document.getElementsByTagName()
* document.getElementsByName()

4. 特殊集合
* document.anchors，包含文档中所有带 name 特性的```<a>```元素；
* document.applets，包含文档中所有的```<applet>```元素，因为不再推荐使用```<applet>```元素，
所以这个集合已经不建议使用了；
* document.forms，包含文档中所有的```<form>```元素，与 ```document.getElementsByTagName("form")```
得到的结果相同；
* document.images，包含文档中所有的```<img>```元素，与 ```document.getElementsByTagName```
("img")得到的结果相同；
* document.links，包含文档中所有带 href 特性的```<a>```元素。

### 10.1.3 Element类型
除了 Document 类型之外， Element 类型就要算是 Web 编程中最常用的类型了。 Element 类型用
于表现 XML 或 HTML 元素，提供了对元素标签名、子节点及特性的访问。 Element 节点具有以下特征：
* nodeType 的值为 1；
* nodeName 的值为元素的标签名；
* nodeValue 的值为 null；
* parentNode 可能是 Document 或 Element；
* 其子节点可能是 Element、 Text、 Comment、 ProcessingInstruction、 CDATASection 或
EntityReference。