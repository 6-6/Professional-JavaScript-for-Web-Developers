# 第 20 章 JSON
关于 JSON，最重要的是要理解它是一种数据格式，不是一种编程语言。JSON 并不从属于 JavaScript。很多编程语言都有针对 JSON 的解析器和序列化器。

## 20.1 语法
JSON 的语法可以表示以下三种类型的值：
* 简单值：使用与 JavaScript 相同的语法，可以在 JSON 中表示字符串、数值、布尔值和 null。但 JSON 不支持 JavaScript 中的特殊值 undefined。
* 对象：对象作为一种复杂数据类型，表示的是一组无序的键值对儿。而每个键值对中的值可以是简单值，也可以是复杂数据类型的值。
* 数组：数组也是一种复杂数据类型，表示一组有序的值的列表，可以通过数值索引来访问其中的值。数组的值也可以是任意类型——简单值、对象或数组。

### 20.1.1 简单值
最简单的 JSON 数据形式就是简单值。例如，下面这个值是有效的 JSON 数据：
```5```和```"Hello world!"```

### 20.1.2 对象
下面是一个 JavaScript 中的对象字面量：
```javascript
var object = {
    "name": "Nicholas",
    "age": 29
};
```
JSON 表示上述对象的方式如下：
```json
{
    "name": "Nicholas",
    "age": 29
}
```

### 20.1.3 数组
下面是 JavaScript 中的数组字面量：
```javascript
var values = [25, "hi", true];
```

在 JSON 中，可以采用同样的语法表示同一个数组：
```json
[25, "hi", true]
```

**JSON 与 JavaScript 不相同的地方：**
* 没有声明变量（JSON 中没有变量的概念）
* 没有末尾的分号（因为这不是 JavaScript 语句，所以不需要分号）
* JSON 中对象的属性名任何时候都必须加双引号
* JSON 字符串必须使用双引号

> 很容易混淆JavaScript的对象字面量和JSON，这两者格式相似，且可以相互转换，容易认为这两者是相同的。参考以上的区分

## 20.2 解析与序列化
JSON 数据结构解析为有用的 JavaScript 对象。与 XML 数据结构要解析成 DOM 文档而且从中提取数据
极为麻烦相比， JSON 可以解析为 JavaScript 对象的优势极其明显。

### JSON对象
由于 JSON 是 JavaScript 语法的子集，因此 eval()函数可以解析、解释并返回 JavaScript 对象和数组。 

JSON 对象有两个方法： stringify()和 parse()。在最简单的情况下，这两个方法分别用于把JavaScript 对象序列化为 JSON 字符串和把 JSON 字符串解析为原生 JavaScript 值。


### 20.2.2 序列化选项
JSON.stringify()接收三个参数：
* 需要序列化的 JavaScript 对象
* 过滤器，可以是一个数组，也可以是一个函数
* 是否在 JSON 字符串中保留缩进

1. 过滤结果
如果过滤器参数是数组，那么 JSON.stringify()的结果中将只包含数组中列出的属性。
示例：
* [JavaScript 对象序列化为 JSON字符串](./20.2/JSONStringifyExample01.html)
* [JSON.stringify()添加函数过滤器](./20.2/JSONStringifyExample02.html)

2. 字符串缩进
JSON.stringify()方法的第三个参数用于控制结果中的缩进和空白符。示例：[JSON.stringify() 添加字符串缩进](./20.2/JSONStringifyExample03.html)

3. toJSON()方法
JSON.stringify()还是不能满足对某些对象进行自定义序列化的需求。可以给对象定义 toJSON()方法，返回其自身的 JSON 数据格式。原生 Date 对象有一个 toJSON()方法，
能够将 JavaScript的 Date 对象自动转换成 ISO 8601日期字符串（与在 Date 对象上调用 toISOString()的结果完全一样）。
[](./20.2/JSONStringifyExample05.html)