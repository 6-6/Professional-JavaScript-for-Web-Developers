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
[组合使用构造函数模式和原型模式](./6.2/HybridPatternExample01.html)

### 6.2.5 动态原型模式
