# 第5章 引用类型

引用类型的值是引用类型的一个实例。在 ECMAScript 中，引用类型是一种数据结构，用于将数据和功能组织在一起。尽管 ECMAScript从技术上讲是一门面向对象的语言，但它不具备传统的面向对象语言所支持的类和接口等基本结构。

对象是某个特定引用类型的**实例**。新对象是使用 new 操作符后跟一个构造函数来创建的。请看下面这行代码:

```javascript
var person = new Object();
```

ECMAScript 提供了很多原生引用类型（例如 Object、Array、Date...），这些引用类型的构造函数本身也是一种函数。也可以直接使用new keyword创建任意对象的实例。

## 5.1 Object 类型
大多数引用类型值都是 Object 类型的实例；创建 Object 实例的方式有两种。

第一种是使用 new 操作符后跟 Object 构造函数，如下所示：

```javascript
var person = new Object();
person.name = "Nicholas";
person.age = 29;
```

另一种简写形式是使用**对象字面量**表示法：
```javascript
var person = {
  name : "Nicholas",
  age : 29
};
```

**注意：对象字面量的方式，在最后一个属性后面添加逗号，会在 IE7 及更早版本和Opera 中导致错误。**

对象字面量也是向函数传递大量可选参数的首选方式，[示例](./5.1/ObjectTypeExample04.html)

点表示法是常见的访问对象属性的方式。也可以使用方括号`[]`来访问，优势在于属性名可以使用空格、关键字和保留字例如：

```javascript
  alert(person['first name']);//如果使用点表示法则会报错
```

## 5.2 Array 类型
与其他语言不同的是，ECMAScript 数组的每一项可以保存任何类型的数据，例如arr[0]为数字，arr[1]可为字符串，arr[3]为对象。

new Array()创建数组：[示例](./5.2/ArrayTypeExample01.html)

数组字面量创建数组：[示例](./5.2/ArrayTypeExample02.html)

数组的 length 属性
* 通过length删除数组的项：[示例](./5.2/ArrayTypeExample03.html)
* 通过length添加数组的项：[示例](./5.2/ArrayTypeExample04.html)
* 通过length作为下标添加数组项并赋值：[示例](./5.2/ArrayTypeExample05.html)
* 超出数组长度的位置放置一个值，数组会重新计算长度：[示例](./5.2/ArrayTypeExample06.html)

### 5.2.1 检测数组
instanceof判断数组，通常全局环境下是没问题的。有可能存在多个环境，不同的全局执行环境。最好使用Array.isArray()方法来判断是否为数组。

### 5.2.2 转换方法
常见对象的转换方法
* toString()和 valueOf()方法：[示例](./5.2/ArrayTypeExample07.html)
* toLocaleString()：[示例](./5.2/ArrayTypeExample08.html) 
* join()：[示例](./5.2/ArrayTypeJoinExample01.html) 

**tips：如果数组中的某一项的值是 null 或者 undefined，那么该值在 join()、toLocaleString()、 toString()和 valueOf()方法返回的结果中以空字符串表示。**


### 5.2.3 栈方法
栈是一种 LIFO（Last-In-First-Out，后进先出）的数据结构，也就是最新添加的项最早被移除。而栈中项的插入（叫做**推入**）和移除（叫做**弹出**），只发生在一个位置——栈的顶部。ECMAScript 为数组专门提供了 push()和 pop()方法，以便实现类似栈的行为。

* push()和pop()模拟栈方法：[示例](./5.2/ArrayTypeExample09.html)

### 5.2.4 队列方法
队列数据结构的访问规则是 FIFO（First-In-First-Out，先进先出）。队列在列表的末端添加项，从列表的前端移除项。

shift()和 push()方法模拟队列方法：[示例](./5.2/ArrayTypeExample11.html)

unshift()和 pop()方法模拟队列方法：[示例](./5.2/ArrayTypeExample12.html)

|操作位置|推送|移出|
|--------|----|---|
|后面|push|pop|
|前面|unshift|shift|

**注意：IE7以及更早的版本，unshift()方法会返回undefined并非数组的长度。**

### 5.2.5 重排序方法
* reverse()反转数组：[示例](./5.2/ArrayTypeExample13.html)
* sort()排序方法：[数字排序](./5.2/ArrayTypeExample14.html)，[自定义比对方法](./5.2/ArrayTypeExample15.html)

### 5.2.6 操作方法
* concat()合并数组：[示例](./5.2/ArrayTypeConcatExample01.html)
* slice()根据起始和结束提取数组元素：[示例](./5.2/ArrayTypeSliceExample01.html)