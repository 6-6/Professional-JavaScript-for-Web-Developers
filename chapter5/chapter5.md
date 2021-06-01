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
