# 第六章 面向对象的程序设计
面向对象（Object-Oriented， OO）的语言有一个标志，那就是它们都有类的概念，而通过类可
以创建任意多个具有相同属性和方法的对象。

## 6.1 理解对象
[示例：创建自定义对象](./6.1/CreatingObjectsExample01.html)

### 6.1.1 属性类型
ECMA-262 第 5 版在定义只有内部才用的特性（attribute）时，描述了属性（property）的各种特征。在 JavaScript 中不能直接访问它们。为了表示特性是内部值，该规范把它们放在了两对儿方括号中，例如<code>[[Enumerable]]</code>。

ECMAScript 中有两种属性：数据属性和访问器属性：

#### 1. 数据属性  
数据属性包含一个数据值的位置。在这个位置可以读取和写入值。数据属性有 4 个描述其行为的
特性。
* [[Configurable]]：表示能否通过 delete 删除属性从而重新定义属性，能否修改属性的特
性，或者能否把属性修改为访问器属性。
这个特性默认值为 true。

* [[Enumerable]]：表示能否通过 for-in 循环返回属性。这个特性默认值为 true。

* [[Writable]]：表示能否修改属性的值。
这个特性默认值为 true。

* [[Value]]：包含这个属性的数据值。读取属性值的时候，从这个位置读；写入属性值的时候，
把新值保存在这个位置。这个特性的默认值为 undefined。

**Object.defineProperty()** 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

[Object.defineProperty()方法-writable属性](./6.1/DataPropertiesExample01.html)

[Object.defineProperty()方法-configurable属性](./6.1/DataPropertiesExample02.html)

[Object.defineProperty()方法-configurable属性不可重定义](./6.1/DataPropertiesExample03.html)

#### 2.访问器属性  
访问器属性**不包含数据值**；它们包含一对儿 getter 和 setter 函数（非必须）。在读取访问器属性时，会调用 getter 函数，这个函数负责返回有效的值；在写入访问器属性时，会调用
setter 函数并传入新值，这个函数负责决定如何处理数据。

* [[Configurable]]：表示能否通过 delete 删除属性从而重新定义属性，能否修改属性的特
性，或者能否把属性修改为数据属性。对于直接在对象上定义的属性，这个特性的默认值为
true。
* [[Enumerable]]：表示能否通过 for-in 循环返回属性。对于直接在对象上定义的属性，这
个特性的默认值为 true。
* [[Get]]：在读取属性时调用的函数。默认值为 undefined。
* [[Set]]：在写入属性时调用的函数。默认值为 undefined。

[defineProperty的getter函数和setter函数，扩展：数据属性和访问性属性的区别？](./6.1/AccessorPropertiesExample01.html)

[非标准方法__defineSetter__()和__defineGetter__()](./6.1/AccessorPropertiesExample02.html)

### 6.1.2 定义多个属性
Object.defineProperties() 方法直接在一个对象上定义一个或多个新的属性或修改现有属性，并返回该对象。

[Object.defineProperties() 方法](./6.1/MultiplePropertiesExample01.html)

### 6.1.3 读取属性的特性
Object.getOwnPropertyDescriptor() 方法返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）

## 6.2 创建对象
Object 构造函数或对象字面量都可以用来创建单个对象，但这些方式有个明显的缺点：使用同
一个接口创建很多对象，会产生大量的重复代码。为解决这个问题，人们开始使用工厂模式的一种变体。

### 6.2.1 工厂模式
考虑到在 ECMAScript 中无法创建类，就发明了一种函数，用函数来封装以特定接口创建对象的细节，[示例](./6.2/FactoryPatternExample01.html
)

### 6.2.2 构造函数模式
构造函数可用来创建特定类型的对象。[创建自定义的构造函数](./6.2/ConstructorPatternExample01.html
)

1. 将构造函数当作函数  
构造函数本质上来和普通函数，除了调用方式四不同以外，并无区别。任何函数，只要通过 new 操作符来调用，那它就可以作为构造函数。[构造函数模式2](./6.2/ConstructorPatternExample02.html)

2. 构造函数的问题  
使用构造函数的主要问题，就是每个方法都要在每个实例上重新创建一遍。在前面的例子中，person1 和 person2 都有一个名为 sayName()的方法，但那两个方法不是同一个 Function 的实例。不要忘了——ECMAScript 中的函数是对象，因此每定义一个函数，也就是实例化了一个对象。
[示例](./6.2/ConstructorPatternExample03.html)

### 6.2.3 原型模式
每个函数都有一个 prototype（原型）属性，这个属性是一个指针，指向一个对象，
而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。如果按照字面意思来理解，那么 prototype 就是通过调用构造函数而创建的那个对象实例的原型对象。
[原型对象示例](./6.2/PrototypePatternExample01.html)

1. 理解原型对象  
只要创建了一个新函数，就会根据一组特定的规则为该函数创建一个prototype属性，这个属性指向函数的原型对象。Person.prototype 指向了原型对象，而 Person.prototype.constructor 又指回了 Person。

**原型最初只包含 constructor 属性，而该属性也是共享的，因此可以通过对象实例访问。**



2. 原型与 in 操作符  
有两种方式使用 in 操作符：单独使用和在for-in 循环中使用。在单独使用时，in 操作符会在通过对象能够访问给定属性时返回 true，无论该属性存在于实例中还是原型中。

* [同名属性是否会更改原型中的值](./6.2/PrototypePatternExample03.html)
* [in 操作符](./6.2/PrototypePatternExample04.html)
* [判断属性是否在原型链上的方法](./6.2/PrototypePatternExample05.html)
* [in操作符遍历对象](./6.2/PrototypePatternExample06.html)
* [Object.getOwnPropertyNames()方法](./6.2/ObjectPropertyNamesExample01.html)
* [原型语法-字面量对象方式添加属性](./6.2/PrototypePatternExample07.html)
* [[[Enumerable]]被自动设置为true](./6.2/PrototypePatternExample08.html)
* [构造函数的实例](./6.2/PrototypePatternExample10.html)

5. 原生对象的原型
原生的引用类型都在其构造函数的原型上定义了方法。（如Array.prototype.sort()方法）也可以新增或修改原型上的方法。[自定义String构造函数的原型方法](./6.2/PrototypePatternExample11.html)

### 6.2.4 组合使用构造函数模式和原型模式
[示例：组合使用构造函数模式和原型模式](./6.2/HybridPatternExample01.html)

### 6.2.5 动态原型模式
[示例：动态添加原型](./6.2/DynamicPrototypeExample01.html)

### 6.2.6 寄生构造函数模式
返回的对象与构造函数或者与构造函数的原型属性之间没有关系；为此，不能依赖 instanceof 操作符来确定对象类型。由于存在上述问题，我们建议尽量不要使用这种模式。
[示例：寄生构造函数模式-构造函数内部创建Object对象](./6.2/HybridFactoryPatternExample01.html)
[示例：寄生构造函数模式-构造函数内部创建Array对象](./6.2/HybridFactoryPatternExample02.html)

### 6.2.7 稳妥构造函数模式
道格拉斯·克罗克福德（Douglas Crockford）发明了 JavaScript 中的稳妥对象（durable objects）这个概念。相比之前的寄生构造函数模式，主要两点不同：一是新创建对象的实例方法不引用 this；二是不使用 new 操作符调用构造函数。

```javascript
function Person(name, age, job){
  //创建要返回的对象
  var o = new Object();
  //可以在这里定义私有变量和函数
  //添加方法
  o.sayName = function(){
    alert(name);
  };
  //返回对象
  return o;
}

var friend = Person("Nicholas", 29, "Software Engineer");
friend.sayName(); //"Nicholas"
```

通过示例可以发现，使用sayName()方法才可以访问到name的值，保证了原始数据的安全性。

## 6.3 继承
许多 OO 语言都支持两种继承方式：**接口继承**只继承方法签名，而**实现继承**则继承实际的方法。ECMAScript 只支持实现继承，而且其实现继承主要是依靠原型链来实现的。

### 6.3.1 原型链
ECMAScript 中描述了原型链的概念，并将原型链作为实现继承的主要方法。其基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法。

实现原型链有一种基本模式，代码如此链接：[实现原型链实例](./6.3/PrototypeChainingExample01.html)

1. 默认的原型  
所有函数的默认原型都是 Object 的实例，因此默认原型都会包含一个内部指针，指向 Object.prototype。这也正是所有自定义类型都会继承 toString()、valueOf()等默认方法的根本原因。如下图6-5

![图 6-5](http://waimai.taros.xyz/?explorer/share/fileOut&shareID=7Qcgurrg&path=%7BshareItemLink%3A7Qcgurrg%7D%2F)

2. 确定原型和实例的关系
第一种方式：instanceof操作符确定实例是否存在该原型链上
```javascript
  console.log(instance instanceof Object); //true
  console.log(instance instanceof SuperType); //true
  console.log(instance instanceof SubType); //true
```

第二种方式：isPrototypeOf()方法传入实例，确定实例是否存在该原型链上
```javascript
  console.log(Object.prototype.isPrototypeOf(instance)); //true
  console.log(SuperType.prototype.isPrototypeOf(instance)); //true
  console.log(SubType.prototype.isPrototypeOf(instance)); //true
```

总结：由于原型链的关系，我们可以说 instance 是 Object、 SuperType 或 SubType 中任何一个类型的实例。

3. 谨慎地定义方法
[子类重写父类的原型方法](./6.3/PrototypeChainingExample02.html)
[字面量重写子类原型对象对继承的影响](./6.3/PrototypeChainingExample03.html)
```javascript
function Person(){}
let friend = new Person();

Person.prototype.constructor == Person
friend.__proto__ == Person.prototype
```

* 原型对象（即Person.prototype）的constructor指向其构造函数本身
* 实例（即friend）的__proto__和其原型对象指向同一个地方


摘自：[轻松理解JS 原型原型链](https://juejin.cn/post/6844903989088092174)

4. 原型链的问题
原型对象定义属性，所有实例都会共享。如果我们想要独立创建私有属性，那么应该在构造函数中创建属性，而不是原型对象上。
[原型链的问题](./6.3/PrototypeChainingExample04.html)

### 6.3.2 借用构造函数
借用构造函数constructor stealing（也叫伪造对象或经典继承）。原理：在子类型构造函数内部通过call()或apply()调用超类型的的构造函数，并将作用域设置会this。每次在创建子类型构造函数的实例，实例就会拥有超类型的属性副本。[示例：借用构造函数](./6.3/ConstructorStealingExample01.html)

1. 传递参数
相对于原型链而言，借用构造函数有一个很大的优势，即可以在子类型构造函数中向超类型构造函
数传递参数。看下面这个[示例：子类型构造函数给超类型构造函数传递参数](./6.3/ConstructorStealingExample02.html)

2. 借用构造函数的问题
方法都在构造函数中定义，因此在超类型的原型定义的方法，子类型是不可见的。

### 6.3.3 组合继承
组合继承（combination inheritance），有时候也叫做伪经典继承，指的是将原型链和借用构造函数的
技术组合到一块，从而发挥二者之长的一种继承模式。
[示例：原型链和借用构造函数的组合继承](./6.3/CombinationInheritanceExample01.html)

### 6.3.4 原型式继承
道格拉斯·克罗克福德在 2006 年写了一篇文章，题为 Prototypal Inheritance in JavaScript （JavaScript
中的原型式继承）。[原型式继承](./6.3/PrototypalInheritanceExample01.html)

### 6.3.5 寄生式继承
寄生式继承的思路与寄生构造函数和工厂模式类似，即创建一个仅用于封装继承过程的函数，该
函数在内部以某种方式来增强对象，最后再像真地是它做了所有工作一样返回对象。
[寄生式继承](./6.3/parasiticInheritanceExample01.html)

### 6.3.6 寄生组合式继承
[寄生式继承](./6.3/ParasiticCombinationInheritanceExample01.html)

## 6.4 小结
ECMAScript 支持面向对象（OO）编程，但不使用类或者接口。在没有类的情况下，可以采用下列模式创建对象：
* 工厂模式，使用简单的函数创建对象，为对象添加属性和方法，然后返回对象。这个模式后来
被构造函数模式所取代。
* 构造函数模式，可以创建自定义引用类型，可以像创建内置对象实例一样使用 new 操作符。不
过，构造函数模式也有缺点，即它的每个成员都无法得到复用，包括函数。由于函数可以不局
限于任何对象（即与对象具有松散耦合的特点），因此没有理由不在多个对象间共享函数。
* 原型模式，使用构造函数的 prototype 属性来指定那些应该共享的属性和方法。组合使用构造
函数模式和原型模式时，使用构造函数定义实例属性，而使用原型定义共享的属性和方法。

JavaScript 主要通过原型链实现继承。原型链的构建是通过将一个类型的实例赋值给另一个构造函
数的原型实现的。这样，子类型就能够访问超类型的所有属性和方法，这一点与基于类的继承很相似。
原型链的问题是对象实例共享所有继承的属性和方法，因此不适宜单独使用。解决这个问题的技术是借
用构造函数，即在子类型构造函数的内部调用超类型构造函数。这样就可以做到每个实例都具有自己的
属性，同时还能保证只使用构造函数模式来定义类型。使用最多的继承模式是组合继承，这种模式使用
原型链继承共享的属性和方法，而通过借用构造函数继承实例属性。

此外，还存在下列可供选择的继承模式：
* 原型式继承，可以在不必预先定义构造函数的情况下实现继承，其本质是执行对给定对象的浅
复制。而复制得到的副本还可以得到进一步改造。
* 寄生式继承，与原型式继承非常相似，也是基于某个对象或某些信息创建一个对象，然后增强
对象，最后返回对象。为了解决组合继承模式由于多次调用超类型构造函数而导致的低效率问
题，可以将这个模式与组合继承一起使用。
* 寄生组合式继承，集寄生式继承和组合继承的优点与一身，是实现基于类型继承的最有效方式。