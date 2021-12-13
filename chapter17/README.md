# 第 17 章 错误处理与调试
错误处理是很重要的机制，可以让开发人员快速定位错误的根源所在。JavaScript在ES3加入了try-catch和throw语句，意在为开发人员能够适当地处理错误。

## 17.2 错误处理

### 17.2.1 try-catch语句
[try-catch语句 捕捉错误](./17.2/TryCatchExample01.html)
1. finally 子句
虽然在 try-catch 语句中是可选的，但 finally 子句一经使用，其代码无论如何都会执行。请看示例：
[finally语句](./17.2/TryCatchExample02.html)

2. 错误类型
执行代码期间可能会发生的错误有多种类型。每种错误都有对应的错误类型，而当错误发生时，就
会抛出相应类型的错误对象。 ECMA-262 定义了下列 7 种错误类型：
* Error：基类型，以下其它错误类型都继承自该类型。
* EvalError：如果没有把eval()函数当成函数调用，就会抛出错误。
* RangeError：数值超出相应范围时触发，如new Array(-20)
* ReferenceError：在找不到对象的情况下触发，```var obj = x; //在 x 并未声明的情况下抛出 ReferenceError```
* SyntaxError：语法错误的 JavaScript 字符串传入 eval()函数时
* TypeError：执行特定于类型的操作时，变量的类型并不符合要求所致```var o = new 10;```
* URIError：使用 encodeURI()或 decodeURI()，而 URI 格式不正确时，就会导致 URIError 错误

3. 合理使用 try-catch
当 try-catch 语句中发生错误时，浏览器会认为错误已经被处理了，因而不会通过控制台的方式报告错误。

### 17.2.2 抛出错误
与 try-catch 语句相配的还有一个 throw 操作符，用于随时抛出**自定义错误**。要给 throw 操作符指定一个值，这个值是什么类型，没有要求。
```javascript
throw 12345;
throw "Hello world!";
throw true;
throw { name: "JavaScript"};
```

也可以模拟出类似的浏览器错误：
```javascript
throw new SyntaxError("I don’t like your syntax.");
throw new TypeError("What type of variable do you take me for?");
throw new RangeError("Sorry, you just don’t have the range.");
throw new EvalError("That doesn’t evaluate.");
throw new URIError("Uri, is that you?");
throw new ReferenceError("You didn’t cite your references properly.");
```

[原型链继承 Error 对象](./17.2/ThrowingErrorsExample01.html)

1. 抛出错误的时机
抛出自定义错误是一种很方便的方式，开发一个 JavaScript 库或者多个地方使用的函数，可以创建自己的错误处理机制，保证代码抛出的错误能够快速定位原因。如下所示：
[抛出错误的时机](./17.2/ThrowingErrorsExample02.html)

### 17.2.3 错误（error）事件
任何没有通过 try-catch 处理的错误都会触发 window 对象的 error 事件。onerror 事件处理程序接收三个参数：错误消息、错误所在的 URL 和行号。

[阻止浏览器报告错误的默认行为](./17.2/OnErrorExample01.htm)

### 17.2.4 处理错误的策略
try,catch的方案有如下特点：
1. 无法捕捉到语法错误，只能捕捉运行时错误；
1. 可以拿到出错的信息，堆栈，出错的文件、行号、列号；
1. 需要借助工具把所有的function块以及文件块加入try,catch，可以在这个阶段打入更多的静态信息。

window.onerror的方案有如下特点：
1. 可以捕捉语法错误，也可以捕捉运行时错误；
1. 可以拿到出错的信息，堆栈，出错的文件、行号、列号；
1. 只要在当前页面执行的js脚本出错都会捕捉到，例如：浏览器插件的javascript、或者flash抛出的异常等。
跨域的资源需要特殊头部支持。

**总结：** try,catch适合做提前的预防性自定义错误，window.onerror适合做整体项目错误监控

> 参考：https://blog.csdn.net/wangji5850/article/details/51180314

### 17.2.5 常见的错误类型
错误处理的核心，是首先要知道代码里会发生什么错误。由于 JavaScript 是松散类型的，而且也不
会验证函数的参数，因此错误只会在代码运行期间出现。一般来说，需要关注三种错误：
* 类型转换错误
* 数据类型错误
* 通信错误

1. 类型转换错误
在使用相等（==）和不相等（!=）操作符，或者在 if、for 及 while 等流控制语句中使用非布尔值时，最常发生类型转换错误。

```javascript
// 这个方法有三个参数，其中str3是非必须项
function concat(str1, str2, str3){
    var result = str1 + str2;
    //常见的错误写法，假设str3为0会导致自动转换为false
    if(str3){
        result += 5;
    }

    return result;
}
concat(1,2,0);
```

以上错误写法很常见，这就是为什么强调在控制流语句中避免使用类型转换的方式判断，可以用全等操作符```===```或是typeof等方式判断，重写以上函数：

```javascript
function concat(str1, str2, str3){
    var result = str1 + str2;
    if(typeof str3 == 'number'){
        result += 5;
    }
    return result;
}
concat(1,2,0);
```

2. 数据类型错误
JavaScript 是松散类型（弱类型）的语言，数据类型需要进行检测，否则容易出现数据类型的错误。基本类型的值应该使用 typeof 来检测，而对象的值则应该使用 instanceof 来检测。
```javascript
//安全，非数组的参数不会执行
function reverseSort(values){
    if(values instanceof Array){
        values.sort();
        values.reverse();
    }
}
```

3. 通信错误
通过Ajax的方式与服务器通信，常见的问题就是没有使用encodURIComponent()对数据进行编码。例如：
```
//不正确的：
http://www.yourdomain.com/?redir=http://www.someotherdomain.com?a=b&c=d

//用 encodeURIComponent()对"redir="后的参数进行编码：
http://www.yourdomain.com/?redir=http%3A%2F%2Fwww.someotherdomain.com%3Fa%3Db%26c%3Dd
```

### 17.2.6 区分致命错误和非致命错误
任何错误处理策略中最重要的一个部分，就是确定错误是否致命。

### 17.2.7 把错误记录到服务器
数据库和服务器错误都会定期写入日志，在复杂的 Web 应用程序中，我们同样可以把 JavaScript 错误也回写到服务器。

## 17.3 调试技术
最远古也是至今有些开发者还在使用的调试技术，那就是```alert()```函数，现在还是有更好的调试解决方案。

### 17.3.1 将消息记录到控制台
console 对象向 JavaScript 控制台中写入消息，这个对象具有下列方法：
* error(message)：将错误消息记录到控制台
* info(message)：将信息性消息记录到控制台
* log(message)：将一般消息记录到控制台
* warn(message)：将警告消息记录到控制台

### 17.3.2 将消息记录到当前页面
这种技术在不支持 JavaScript 控制台的 IE7 及更早版本或其他浏览器中十分有用。示例：[将消息记录到当前页面](./17.3/PageLoggingExample01.html)

### 17.3.3 抛出错误
[自定义错误抛出函数](./17.3/AssertExample01.html)

