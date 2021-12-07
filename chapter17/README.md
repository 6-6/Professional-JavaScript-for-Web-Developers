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
* RangeError：
* ReferenceError
* SyntaxError
* TypeError
* URIError