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
[函数自定义bind()方法绑定](./22.1/FunctionBindingExample01.html)
[原生bind()方法绑定](./22.1/FunctionBindingExample02.html)

### 22.1.5 函数柯里化
与函数绑定紧密相关的主题是函数柯里化（function currying），它用于创建已经设置好了一个或多
个参数的函数。函数柯里化的基本方法和函数绑定是一样的：使用一个闭包返回一个函数。两者的区别
在于，当函数被调用时，返回的函数还需要设置一些传入的参数。请看以下例子。

```javascript
function add(num1, num2){
    return num1 + num2;
}
function curriedAdd(num2){
    return add(5, num2);
}
alert(add(2, 3)); //5
alert(curriedAdd(3)); //8
```

尽管从技术上来说 curriedAdd()并非柯里化的函数，但它很好地展示了其概念。创建柯里化函数的通用方式示例：
* [函数柯里化](./22.1/FunctionCurryingExample01.html)
* [将bind()函数柯里化](./22.1/FunctionCurryingExample02.html)
* [原生bind()方法实现柯里化](./22.1/FunctionCurryingExample03.html)

## 22.2 防篡改对象
任何对象都可以被在同一环境中运行的代码修改。很可能会意外地修改别人的代码，甚至更糟糕地，用不兼容的功能重写原生对象。ECMAScript 5 致力于解决这个问题，可以让开发人员定义防篡改对象（tamper-proof object）。

第6章讨论了对象属性的问题，也讨论了如何手工设置每个属性的```[[Configurable]]```、
```[[Writable]]```、 ```[[Enumerable]]```、 ```[[Value]]```、 ```[[Get]]```以及```[[Set]]```特性，以改变属性的行为。

防篡改方法等级依次为（严格程度小到大）：```Object.preventExtensions() < Object.seal() < Object.freeze()```

> 一旦把对象定义为防篡改，就无法撤销了。

### 22.2.1 不可扩展对象
默认情况下，所有对象都是可以扩展的。也就是说，任何时候都可以向对象中添加属性和方法。例
如，可以像下面这样先定义一个对象，后来再给它添加一个属性：
```javascript
var person = { name: "Nicholas" };
person.age = 29;
```

* [Object.preventExtensions()方法禁用对象添加属性和方法](./22.2/NonExtensibleObjectsExample01.html)
* [Object.isExtensible()方法确定对象是否可扩展](./22.2/NonExtensibleObjectsExample02.html)


### 22.2.2 密封的对象
ECMAScript 5 为对象定义的第二个保护级别是密封对象（sealed object）。密封对象不可扩展，而
且已有成员的```[[Configurable]]```特性将被设置为 false。这就意味着**不能删除属性和方法**，因为不能
使用 Object.defineProperty()把数据属性修改为访问器属性。

* [Object.seal()方法密封对象](./22.2/SealedObjectsExample01.html)
* [Object.isExtensible()和Object.isSealed()方法](./22.2/SealedObjectsExample02.html)

### 22.2.3 冻结的对象
最严格的防篡改级别是冻结对象（frozen object）。冻结的对象既不可扩展，又是密封的，而且对象
数据属性的[[Writable]]特性会被设置为 false。如果定义[[Set]]函数，访问器属性仍然是可写的。
ECMAScript 5 定义的 Object.freeze()方法可以用来冻结对象。

[Object.freeze()方法冻结对象](./22.2/FrozenObjectsExample01.html)

JavaScript 库最怕有人意外（或有意）地修改了库中的核心对象。冻结（或密封）主要的库对象能够防止这些问题的发生。

## 22.3 高级定时器
JavaScript 是运行于**单线程**的环境中的，而定时器仅仅只是计划代码在未来的某个时间执行。执行时机是不能保证的。在页面下载完后的代码运行、事件处理程序、 Ajax 回调函数都必须使用同样的线程来执行。实际上，浏览器负责进行排序，指派某段代码在某个时间点运行的优先级。

```javascript
var btn = document.getElementById("my-btn");
btn.onclick = function(){
    setTimeout(function(){
        document.getElementById("message").style.visibility = "visible";
    }, 250);
    //其他代码
};
```
以上这段代码，给一个按钮设置了一个事件处理方法，事件处理方法内部设置了250ms后调用的定时器。实际上定时器指定的时间间隔，不是何时执行代码，而是何时将定时器代码添加到队列（JavaScript是单线程）。队列中所有的代码都要等到 JavaScript 进程空闲之后才能执行，而不管它们是如何添加到队列中的。

### 22.3.1 重复的定时器
将以上代码setTimeout方法改为使用 setInterval()创建的定时器，JavaScript引擎会将代码重复规则地插入队列中。为什么说是规则的插入队列呢？当使用 setInterval()时，仅当没有该定时器的任何其他代码实例时，才将定时器代码添加到队列中。

但这样会导致setInterval()创建的重复定时器会有两个问题：
1. 某些间隔会被跳过；（假设定时器内时间执行了300ms，下一个250ms间隔定时器就无法执行，因为此时定时器还未结束，JavaScript引擎不会再去添加一个定时器副本）
2. 多个定时器的代码执行之间的间隔可能会比预期的小。

为了避免setInterval()方法的缺点，可以使用setTimeout()的链式调用：
```javascript
setTimeout(function(){
    //确保了每次定时器中的代码完全执行完毕了，再去添加新的定时器
    setTimeout(arguments.callee, interval);
}, interval);
```

### 22.3.2 Yielding Processes
为了防止恶意web程序，JavaScript 被严格限制，如果代码运行超过特定的时间或者特定语句数量就不
让它继续执行。且会弹出浏览器错误的提示框，用户可以允许其继续执行或停止。

JavaScript 的执行是一个阻塞操作，脚本运行所花时间越久，用户无法与页面交互的时间也越久。当你发现某个循环占用了大量时间，可以使用定时器分割这个循环。

[数组分块技术解决显示大量数据卡顿](./22.3/ArrayChunkingExample.html)

### 22.3.3 函数节流
onresize 事件处理程序的时候容易发生，当调整浏览器大小的时候，该事件会连续触发。在 onresize 事件处理程序内部如果尝试进行 DOM 操作，其高频率的更改可能会让浏览器崩溃。为了绕开这个问题，你可以使用定时器对该函数进行节流。

```javascript
var processor = {
    timeoutId: null,
    //实际进行处理的方法
    performProcessing: function(){
        //实际执行的代码
    },
    //初始处理调用的方法
    process: function(){
        /* 每次运行都会清除上次定时器id */
        clearTimeout(this.timeoutId);
        var that = this;
        /* 再次创建定时器，保证performProcessing()方法一定运行 */
        this.timeoutId = setTimeout(function(){
            that.performProcessing();
        }, 100);
    }
};
```

在以上例子中，创建一个processor的对象。这个对象有两个方法：
* performProcessing()：初始化实际执行的业务代码，只通过process()方法来调用
* process()：初始化处理调用的方法

如果 100ms 之内调用了 process()共 20 次， performanceProcessing()仍只会被调用一次。可以再精简为单个节流函数：[节流函数应用onresize事件](./22.3/ThrottlingExample.html)

## 22.4 自定义事件
之前在[html指定事件处理程序](/Professional-JavaScript-for-Web-Developers/chapter13/13.2/HTMLEventHandlerExample01.html)问过一个问题，是否可以自定义一个事件？当时使用的```new Event()```构造函数，而现在我们不依赖Event()构造函数，实现一个自定义事件。

观察者模式由两类对象组成： 主体和观察者。主体负责发布事件，同时观察者通过订阅这些事件来观察该主体。该模式的一个关键概念是主体并不知道观察者的任何事情，也就是说它可以独自存在并正常运作即使观察者不存在。从另一方面来说，观察者知道主体并能注册事件的回调函数（事件处理程序）。涉及 DOM 上时， DOM 元素便是主体，你的事件处理代码便是观察者。

事件是与 DOM 交互的最常见的方式，但它们也可以用于非 DOM 代码中——通过实现自定义事件。自定义事件背后的概念是创建一个管理事件的对象，让其他对象监听那些事件。实现此功能的基本模式可以如下定义：

[](./22.4/EventTargetExample01.html)