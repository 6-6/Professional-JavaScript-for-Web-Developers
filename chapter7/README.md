# 第7章 函数表达式
函数表达式是 JavaScript 中的一个既强大又容易令人困惑的特性。第 5 章曾介绍过，定义函数的方式有两种：一种是函数声明，另一种就是函数表达式。[示例：获取函数表达式的name属性](./7.1/functionNameExample01.html)



函数声明提升（function declaration hoisting），意思是调用函数可以写在函数声明之前，因为执行代码时会先读取函数声明。[示例：函数声明提升](./7.1/FunctionDeclarationHoisting01.html)


匿名函数（也叫**拉姆达函数**），function关键字后面没有标识符。
```javascript
let functionName = function(arg0, arg1, arg2) {
  //函数体
}
```

[示例：函数提升导致的报错](./7.1/FunctionDeclarationsErrorExample01.html)

## 7.1 递归
递归函数是在一个函数通过名字调用自身的情况下构成的，如[示例](./7.1/RecursionExample01.html)

## 7.2 闭包
闭包是指有权访问另一个函数作用域中的变量的函数。

当某个函数被调用时，会创建一个执行环境（execution context）及相应的作用域链。

```javascript
function compare(value1, value2){
  if (value1 < value2){
    return -1;
  } else if (value1 > value2){
    return 1;
  } else {
    return 0;
  }
}
let result = compare(5, 10);
```
执行环境都有一个表示变量的对象——变量对象。全局环境的变量对象始终存在，而像
compare()函数这样的局部环境的变量对象，则只在函数执行的过程中存在。在创建 compare()函数
时，会创建一个预先包含全局变量对象的作用域链，这个作用域链被保存在内部的<code>[[Scope]]</code>属性中。

> 作用域链本质上是一个指向变量对象的指针列表，它只引用但不实际包含变量对象。

在函数中访问一个变量时，就会从作用域链中搜索具有相应名字的变量。当函数执行完毕后，局部活动对象就会被销毁，内存中仅保存全局作用域的变量对象。但是，闭包的情况又有所不同。

### 7.2.1 闭包与变量
* [闭包与变量-执行作用域](./7.2/ClosureExample01.html)
* [闭包与变量-通过立即执行函数创建私有作用域](./7.2/ClosureExample02.html)

### 7.2.2 关于this对象
在全局函数中， this 等于 window，而当函数被作为某个对象的方法调用时， this 等
于那个对象。**匿名函数的执行环境具有全局性，因此其 this 对象通常指向 window。**

* [匿名函数this对象的指向](./7.2/ThisObjectExample01.html)
* [改变闭包内this对象的指向](./7.2/ThisObjectExample02.html)
* [调用方式影响this的指向](./7.2/ThisObjectExample03.html)

### 7.2.3 内存泄漏
闭包在 IE 的这些版本中会导致一些特殊的问题。具体来说，如果闭包的作用域链中保存着一个
HTML 元素，那么就意味着该元素将无法被销毁。来看下面的例子。

```javascript
function assignHandler(){
  var element = document.getElementById("someElement");
  element.onclick = function(){
    alert(element.id);
  };
}
```

匿名函数保存了一个对 assignHandler()的活动对象的引用，因此就会导致无法减少 element 的引用数。因此它所占用的内存就永远不会被回收。把 element 变量设置为 null。这样就能够解除对 DOM 对象的引用，顺利地减少其引用数，确保正常回收其占用的内存。

```javascript
function assignHandler(){
  var element = document.getElementById("someElement");
  var id = element.id;
  element.onclick = function(){
    alert(id);
  };
  element = null;
}
```

> 必须要记住：闭包会引用包含函数的整个活动对象，而其中包含着 element。即使闭包不直接引用 element，包含函数的活动对象中也
仍然会保存一个引用。

## 7.3 模仿块级作用域
JavaScript 没有块级作用域的概念，但我们可以利用函数作用域模拟出块级作用域。

```javascript
//自执行函数/立即执行函数
(function(){
  //这里是块级作用域
})();
```
> 注：javascript引擎规定，如果function关键字出现在行首，一律解释成函数声明语句。


* [javascript没有块级作用域](./7.3/BlockScopeExample01.html)
* [重复声明变量](./7.3/BlockScopeExample02.html)
* [立即执行函数创建私有作用域](./7.3/BlockScopeExample03.html)

## 7.4 私有变量
函数外部不能访问这些变量，因此称之为私有变量。私有变量包括函数的参数、局部变量和在函数内部定义的其他函数。

我们把有权访问私有变量和私有函数的公有方法称为特权方法（privileged method）。如示例：[特权方法-访问私有变量](./7.4/PrivilegedMethodExample01.html)

### 7.4.1 静态私有变量
这个模式与在构造函数中定义特权方法的主要区别，就在于私有变量和函数是由实例共享的。

[示例：静态私有变量](./7.4/PrivilegedMethodExample02.html)

> 多查找作用域链中的一个层次，就会在一定程度上影响查找速度。而这正是使用闭包和私有变量的一个显明的不足之处。

### 7.4.2 模块模式
模块模式（module pattern）则是为单例创建私有变量和特权方法。所谓单例（singleton），指的就是只有一个实例的对象。JavaScript 是以对象字面量的方式来创建单例对象的。
