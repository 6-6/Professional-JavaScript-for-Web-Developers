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
抛出自定义错误是一种很方便的方式
[](./17.2/ThrowingErrorsExample02.html)