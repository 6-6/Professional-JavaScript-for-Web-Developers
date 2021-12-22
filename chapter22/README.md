# 第22章 高级技巧

## 22.1 高级函数
由于所有的函数都是对象，所以使用函数指针非常简单。

### 22.1.1 安全的类型检测
JavaScript 内置的类型检测机制并非完全可靠。对正则表达式应用 typeof 操作符时会返回"function"，因此很难确定某个值到底是不是函数。

再比如， instanceof 操作符在存在多个全局作用域（像一个页面包含多个 frame）的情况下，也是问题多多。

由于原生数组的构造函数名与全局作用域无关，因此使用 toString()就能保证返回一致的值。利用这一点，可以创建如下函数：

```javascript
function isArray(value){
    return Object.prototype.toString.call(value) == "[object Array]";
}
```

> 请注意， Object.prototpye.toString()本身也可能会被修改。本节讨论的技巧假设 Object.prototpye.toString()是未被修改过的原生版本。

### 22.1.2 作用域安全的构造函数
构造函数其实就是一个使用 new 操作符调用的函数。当使用 new 调用时，构造函数内用到的 this 对象会指向新创建的对象实例，如下例子所示：
* [构建作用域安全的构造函数](./22.1/ScopeSafeConstructorsExample02.html)
* [其它构造函数无法直接继承作用域安全的构造函数](./22.1/ScopeSafeConstructorsExample03.html)
* [解决作用域安全的构造函数继承问题](./22.1/ScopeSafeConstructorsExample04.html)

### 22.1.3 惰性载入函数
因为浏览器之间行为的差异，多数 JavaScript 代码包含了大量的 if 语句，将执行引导到正确的代码中。
```javascript
function createXHR(){
    if(typeof XMLHttpRequest != 'undefined'){
        return new XMLHttpRequest();
    }
    else if(typeof ActiveXObject != 'undefined'){
        //......
    }
    else{
        throw new Error("No XHR object available.");
    }
}
```
以上例子，createXHR()方法内部有if判断XMLHttpRequest()构造函数是否存在，旧版IE浏览器不支持XMLHttpRequest。每次运行createXHR()方法都需要进行一次判断，那么有没有办法更快地运行？这里就要说到惰性载入的技巧：

* [惰性载入函数-1](./22.1/LazyLoadingExample01.html)
* [惰性载入函数-2](./22.1/LazyLoadingExample02.html)

> 惰性载入函数的优点是只在执行分支代码时牺牲一点儿性能。如果需要多次执行函数，那么无疑这个是更好的选择。

### 22.1.4 函数绑定
函数绑定要创建一个函数，可以在特定的 this 环境中以指定参数调用另一个函数。常见场景在回调函数与事件处理程序一起使用，以便在将函数作为变量传递的同时保留代码执行环境，请看以下例子：
```javascript
var handle = {
    message: "Event handled",
    handleClick: function(){
        alert(this.message);
    }
};
var btn = document.getElementById("my-btn");
EventUtil.addHandler(btn, "click", handler.handleClick);
```
[函数自定义绑定](./22.1/FunctionBindingPrepareExample01.html)
[函数自定义绑定，通过闭包解决this指向问题](./22.1/FunctionBindingPrepareExample02.html)
[](./22.1/FunctionBindingExample01.html)