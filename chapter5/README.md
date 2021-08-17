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
* [reverse()：](./5.2/ArrayTypeExample13.html) 反转数组
* [sort()排序方法](./5.2/ArrayTypeExample14.html)，[sort()自定义排序方法](./5.2/ArrayTypeExample15.html)

### 5.2.6 操作方法
* concat()合并数组：[示例](./5.2/ArrayTypeConcatExample01.html)
* slice()根据起始和结束提取数组元素：[示例](./5.2/ArrayTypeSliceExample01.html)
* splice()强大的数组方法，可对原数组进行删除、插入、替换：[示例](./5.2/ArrayTypeSpliceExample01.html)

### 5.2.7 位置方法
[示例](./5.2/ArrayIndexOfExample01.html)
* indexOf()：从数组的开头从前向后查找
* lastIndexOf()：从数组的末尾开始向前查找

### 5.2.8 迭代方法
ECMAScript 5 为数组定义了 5 个[迭代方法](https://note.youdao.com/ynoteshare1/index.html?id=e8dc93c1e4028d2532206f1a79683c68&type=note)。每个方法都接收两个参数：要在每一项上运行的函数和（可选的）运行该函数的作用域对象——影响 this 的值。以下是这 5 个迭代方法的作用。

* every()：对数组每一项运行给定函数，如果数组每一项返回true，则返回true
* filter()：对数组中每一项运行给定函数，返回该函数会返回true的项组成的数组
* forEach()：对数组中的每一项运行给定函数。这个方法没有返回值（不能够return）
* map()：对数组中每一项运行给定函数，返回每次函数调用的结果组成的数组
* some()：对数组中每一项运行给定函数，如果该函数对任一项返回true，则返回true

示例：

[every()和some()](./5.2/ArrayEveryAndSomeExample01.html)

[filter()](./5.2/ArrayFilterExample01.html)

[map()](./5.2/ArrayMapExample01.html)

[forEach()](./5.2/ArrayForEachExample01.html)

### 5.2.9 归并方法
[示例](./5.2/ArrayReductionExample01.html)
* reduce()
* reduceRight()

## 5.3 Date 类型
ECMAScript 中的 Date 类型是在早期 Java 中的 java.util.Date 类基础上构建的。要创建一个日期对象，使用 new 操作符和 Date 构造函数即可。

* new Date()：[示例1](./5.3/DateTypeExample01.html)、[示例2](./5.3/DateTypeConstructorExample01.html)
* Date.UTC()：[示例](./5.3/DateTypeUTCExample01.html)

### 5.3.1 继承的方法
Date 类型重写了 toLocaleString()、toString()和 valueOf()方法

valueOf()：[示例](./5.3/DateTypeValueOfExample01.html)

### 5.3.2 日期格式化方法
Date 类型还有一些专门用于将日期格式化为字符串的方法：
* toDateString()——以特定于实现的格式显示星期几、月、日和年；
toTimeString()——以特定于实现的格式显示时、分、秒和时区；
* toLocaleDateString()——以特定于地区的格式显示星期几、月、日和年；
* toLocaleTimeString()——以特定于实现的格式显示时、分、秒；
* toUTCString()——以特定于实现的格式完整的 UTC 日期。

### 5.3.3 日期/时间组件方法
| 方法 | 说明 |
| ---- | ---- |
| getTime() | 返回表示日期的毫秒数；与valueOf() 方法返回的值相同 |
| setTime(毫秒) | 以毫秒数设置日期，会改变整个日期 |
| getFullYear() | 取得4位数的年份（如2007而非仅07） |
| getUTCFullYear() | 返回UTC日期的4位数年份 |
| setFullYear(年) | 设置日期的年份。传入的年份值必须是4位数字（如2007而非仅07） |
| setUTCFullYear(年) | 设置UTC日期的年份。传入的年份值必须是4位数字（如2007而非仅07） |
| getMonth() | 返回日期中的月份，其中0表示一月， 11表示十二月 |
| getUTCMonth() | 返回UTC日期中的月份，其中0表示一月， 11表示十二月 |
| setMonth(月) | 设置日期的月份。传入的月份值必须大于0，超过11则增加年份 |
| setUTCMonth(月) | 设置UTC日期的月份。传入的月份值必须大于0，超过11则增加年份 |
| getDate() | 返回日期月份中的天数（1到31） |
| getUTCDate() | 返回UTC日期月份中的天数（1到31） |
| setDate(日) | 设置日期月份中的天数。如果传入的值超过了该月中应有的天数，则增加月份 |
| setUTCDate(日) | 设置UTC日期月份中的天数。如果传入的值超过了该月中应有的天数，则增加月份 |
| getDay() | 返回日期中星期的星期几（其中0表示星期日， 6表示星期六） |
| getUTCDay() | 返回UTC日期中星期的星期几（其中0表示星期日， 6表示星期六） |
| getHours() | 返回日期中的小时数（0到23） |
| getUTCHours() | 返回UTC日期中的小时数（0到23） |
| setHours(时) | 设置日期中的小时数。传入的值超过了23则增加月份中的天数 |
| setUTCHours(时) | 设置UTC日期中的小时数。传入的值超过了23则增加月份中的天数 |
| getMinutes() | 返回日期中的分钟数（0到59） |
| getUTCMinutes() | 返回UTC日期中的分钟数（0到59） |
| setMinutes(分) | 设置日期中的分钟数。传入的值超过59则增加小时数 |
| setUTCMinutes(分) | 设置UTC日期中的分钟数。传入的值超过59则增加小时数 |
| getSeconds() | 返回日期中的秒数（0到59） |
| getUTCSeconds() | 返回UTC日期中的秒数（0到59） |
| setSeconds(秒) | 设置日期中的秒数。传入的值超过了59会增加分钟数 |
| setUTCSeconds(秒) | 设置UTC日期中的秒数。传入的值超过了59会增加分钟数 |
| getMilliseconds() | 返回日期中的毫秒数 |
| getUTCMilliseconds() | 返回UTC日期中的毫秒数 |
| setMilliseconds(毫秒) | 设置日期中的毫秒数 |
| setUTCMilliseconds(毫秒) | 设置UTC日期中的毫秒数 |
| getTimezoneOffset() | 返回本地时间与UTC时间相差的分钟数。例如，美国东部标准时间返回300。在某地进入夏令时的情况下，这个值会有所变化 |

## 5.4 RegExp 类型
ECMAScript 通过 RegExp 类型来支持正则表达式。使用下面类似 Perl 的语法，就可以创建一个正则表达式。

```javascript
var expression = / pattern / flags ;
```

其中的模式（pattern）部分是正则表达式，可以包含字符类、限定符、分组、向前查找以及反向引用。每个正则表达式都可带有一或多个标志（flags），用以标明正则表达式的行为。正则表达式的匹配模式支持下列 3 个标志：

* g：表示全局（global）模式，即模式将被应用于所有字符串，而非在发现第一个匹配项时立即停止；
* i：表示不区分大小写（case-insensitive）模式，即在确定匹配项时忽略模式与字符串的大小写；
* m：表示多行（multiline）模式，即在到达一行文本末尾时还会继续查找下一行中是否存在与模
式匹配的项。

### 5.4.1 RegExp实例属性
* global：布尔值，表示是否设置了 g 标志。
* ignoreCase：布尔值，表示是否设置了 i 标志。
* lastIndex：整数，表示开始搜索下一个匹配项的字符位置，从 0 算起。
* multiline：布尔值，表示是否设置了 m 标志。
* source：正则表达式的字符串表示，按照字面量形式而非传入构造函数中的字符串模式返回。

### 5.4.2 RegExp实例方法
* exec()方法：[exec()方法的属性](./5.4/RegExpExecExample01.html)，[exec()正则使用全局匹配模式](./5.4/RegExpExecExample02.html)
* test()方法：[示例](./5.4/RegExpTestExample01.html)
* toString()和toLocaleString()：[示例](./5.4/RegExpToStringExample01.html)

### 5.4.3 RegExp构造函数属性
RegExp 构造函数包含一些属性，下表列出了 RegExp 构造函数的属性

**注：IE和Opera浏览器部分属性名不支持**

| 长属性名 | 短属性名 | 说明 |
|--------|-------|---|
| input | $_ | 最近一次要匹配的字符串。 |
| lastMatch | $& | 最近一次的匹配项。 |
| lastParen | $+ | 最近一次匹配的捕获组。 |
| leftContext | $` | input字符串中lastMatch之前的文本 |
| multiline | $* | 布尔值，表示是否所有表达式都使用多行模式。 |
| rightContext | $' | input字符串中lastMatch之后的文本 |

[长属性名示例](./5.4/RegExpConstructorPropertiesExample01.html)

[短属性名示例](./5.4/RegExpConstructorPropertiesExample02.html)

[RegExp构造函数存储属性](./5.4/RegExpConstructorPropertiesExample03.html)

## 5.5 Function 类型
函数是Function类型的实例，而且都与其它引用类型一样具有属性和方法。函数实际上是对象，函数名是一个指向函数对象的指针（类似变量名）。

[函数引用指针](./5.5/FunctionTypeExample01.html)

### 5.5.1 没有重载（深入理解）
[没有重载](./5.5/FunctionNoOverload.html)

### 5.5.2 函数声明与函数表达式
[函数声明示例](./5.5/FunctionDeclarationExample01.html)
[函数表达式示例](./5.5/FunctionInitializationExample01.html)

### 5.5.3 作为值的函数
函数名本身就是变量，所以函数也可以作为值来使用。也就是说，不仅可以像传递参数一样把一个函数传递给另一个函数，而且可以将一个函数作为另一个函数的结果返回。来看一看[示例](./5.5/FunctionAsAnArgumentExample01.html)

[函数返回嵌套函数](./5.5/FunctionReturningFunctionExample01.html)

### 5.5.4 函数内部属性
在函数内部，有两个特殊的对象： arguments 和 this。

* [使用callee属性的阶乘函数](./5.5/FunctionTypeArgumentsExample01.html)
* [函数内的this](./5.5/FunctionTypeThisExample01.html)
* [caller属性](./5.5/FunctionTypeArgumentsCallerExample01.html)，[caller属性2](./5.5/FunctionTypeArgumentsCallerExample02.html)

### 5.5.5 函数属性和方法
函数是一个对象，那么函数也有属性和方法：

* [length：](./5.5/FunctionTypeLengthPropertyExample01.html)函数的参数个数长度
* [apply()：](./5.5/FunctionTypeApplyMethodExample01.html)执行函数并传入this和参数数组，改变函数作用域
* [call()：](./5.5/FunctionTypeCallMethodExample01.html)执行函数并传入this和参数列表，改变数作用域
* [bind()：](./5.5/FunctionTypeBindMethodExample01.html)绑定函数不执行，传入this和逐个参数，改变函数作用域

## 5.6 基本包装类型
为了便于操作基本类型值， ECMAScript 还提供了 3 个特殊的引用类型： Boolean、 Number 和
String。

### 5.6.1 Boolean类型
Boolean 对象是与布尔值对应的引用类型。
```javascript
var booleanObject = new Boolean(true);
```
[创建Boolean对象](./5.6/BooleanTypeExample01.html)

### 5.6.2 Number类型
Number 是与数字值对应的引用类型。
```javascript
var numberObject = new Number(10);
```

[示例](./5.6/NumberTypeExample01.html)
* Number.toFixed()：添加几位小数点
* Number.toString()：转换进制

### 5.6.3 String类型
String 类型是字符串的对象包装类型。
```javascript
var booleanObject = new String('hello world');
```

* [charAt()：](./5.6/charAtMethodExample01.html)单字符字符串的形式返回给定位置的那个字符
* [charCodeAt()：](./5.6/charAtMethodExample01.html)单字符字符串的形式返回给定位置的那个字符编码
* [slice()、 substr()和 substring()：](./5.6/StringTypeManipulationMethodsExample01.html)这三个都是截取字符串的方法，返回一个新字符串，原字符串不变。
* [indexOf()和 lastIndexOf()：](./5.6/StringTypeLocationMethodsExample02.html)方法传入给定的子字符串，然后返子字符串的位置（返回的是索引值）
* [trim()：](./5.6/StringTypeTrimMethodExample01.html)创建一个字符串的副本，删除前置及后缀的所有空格，然后返回结果。
* [toLowerCase()、 toLocaleLowerCase()、 toUpperCase()和 toLocaleUpperCase()：](./5.6/StringTypeCaseMethodExample01.html)
* [search()：](./5.6/StringTypePatternMatchingExample01.html) String对象调用方法匹配正则表达式并检索字符串，返回一个索引值。
* [match()：](./5.6/StringTypePatternMatchingExample01.html) String对象调用方法匹配正则表达式并检索字符串，返回一个数组。数组中有以下属性：
    - groups: 一个捕获组数组 或 undefined（如果没有定义命名捕获组）。
    - index: 匹配的结果的开始位置
    - input: 搜索的字符串
* [replace()：](./5.6/StringTypePatternMatchingExample01.html) 方法返回一个由替换值（replacement）替换部分或所有的模式（pattern）匹配项后的新字符串。模式可以是一个字符串或者一个正则表达式，替换值可以是一个字符串或者一个每次匹配都要调用的回调函数。如果pattern是字符串，则仅替换第一个匹配项。
* [localeCompare()：](./5.6/StringTypeLocaleCompareExample01.html)返回一个数字来指示一个参考字符串是否在排序顺序前面或之后或与给定字符串相同。

## 5.7 单体内置对象
ECMA-262 对内置对象的定义是：“由 ECMAScript 实现提供的、不依赖于宿主环境（常见的宿主环境：浏览器和nodejs）的对象，这些对象在 ECMAScript 程序执行之前就已经存在了。” ECMA-262 还定义了两个单体内置对象： Global 和 Math。

### 5.7.1 Global对象
Global（全局）对象可以说是 ECMAScript 中最特别的一个对象了，因为不管你从什么角度上看，
这个对象都是不存在的。不属于任何其他对象的属性和方法，最终都是它的属性和方法。

它更像是一个抽象概念，而要指明它是什么，取决于程序在什么环境中运行。Global相对于浏览器这个环境而言就是window对象。

1. URI 编码方法  
Global 对象的 encodeURI()和 encodeURIComponent()方法可以对 URI（Uniform Resource Identifiers，通用资源标识符）进行编码，以便发送给浏览器。

* [encodeURIComponent()和encodeURI()：](./5.7/GlobalObjectURIEncodingExample01.html)这两个 URI 编码方法就可以对 URI 进行编码，它们用特殊的 UTF-8 编码替换所有无效的字符，
从而让浏览器能够接受和理解。

* [decodeURIComponent()和decodeURI()：](./5.7/GlobalObjectURIDecodingExample01.html)这两个 URI 编码方法就可以对 URI 进行编码，它们用特殊的 UTF-8 编码替换所有无效的字符，从而让浏览器能够接受和理解。

2. eval()方法  
eval()方法非常强大。其就像是一个完整的ECMAScript 解析器，它只接受一个参数，即要执行的 ECMAScript （或 JavaScript）字符串。**使用必须谨慎，如果用心不良之人使用代码注入可以威胁站点的安全。**
```javascript
var msg = "hello world";
eval("alert(msg)"); //"hello world"
```

3. Global 对象的属性  
下表列出了 Global 对象的所有属性：

| 属性 | 说明 |
| ---- | ---- |
| undefined | 特殊值undefined |
| NaN | 特殊值NaN |
| Infinity | 特殊值Infinity |
| Object | 构造函数Object |
| Array | 构造函数Array |
| Function | 构造函数Function |
| Boolean | 构造函数Boolean |
| String | 构造函数String |
| Number | 构造函数Number |
| Date | 构造函数Date |
| RegExp | 构造函数RegExp |
| Error | 构造函数Error |
| EvalError | 构造函数EvalError |
| RangeError | 构造函数RangeError |
| ReferenceError | 构造函数ReferenceError |
| SyntaxError | 构造函数SyntaxError |
| TypeError | 构造函数TypeError |
| URIError | 构造函数URIError |

4. window 对象  
是相对于Web浏览器而言的，它并不是ECMAScript规定的内置对象，它是浏览器的Web API,是存在于浏览器之中的，也就是离开浏览器这个宿主环境的话就不存在此对象了。

结论：JavaScript中的window对象扮演ECMAScript中的Global对象，所以Global对象包含着window对象

### 5.7.2 Math对象
ECMAScript 还为保存数学公式和信息提供了一个公共位置，即 Math 对象。与我们在JavaScript 直接编写的计算功能相比， Math 对象提供的计算功能执行起来要快得多。 Math 对象中还提供了辅助完成这些计算的属性和方法。

1. Math 对象的属性  

| 属性 | 说明 |
| ---- | ---- |
| Math.E | 自然对数的底数，即常量e的值 |
| Math.LN10 | 10的自然对数 |
| Math.LN2 | 2的自然对数 |
| Math.LOG2E | 以2为底e的对数 |
| Math.LOG10E | 以10为底e的对数 |
| Math.PI | π的值 |
| Math.SQRT1_2 | 1/2的平方根（即2的平方根的倒数）|

2. min()和 max()方法  
min()和 max()方法用于确定一组数值中的最小值和最大值。这两个方法都可以接收任意多个数值参数。

[min()和 max()方法示例](./5.7/MathObjectMinMaxExample01.html)

3. 舍入方法  
* Math.ceil()：执行向上舍入，即它总是将数值向上舍入为最接近的整数；
* Math.floor()执行向下舍入，即它总是将数值向下舍入为最接近的整数；
* Math.round()执行标准舍入，即它总是将数值四舍五入为最接近的整数（这也是我们在数学课
上学到的舍入规则）。

4. random()方法  
Math.random()方法返回大于等于 0 小于 1 的一个随机数。

5. 其他方法


| 方法 | 说明 |
| ---- | ---- |
| Math.abs(num) | 返回num 的绝对值 |
| Math.exp(num) | 返回Math.E 的num 次幂 |
| Math.log(num) | 返回num 的自然对数 |
| Math.pow(num,power) | 返回num 的power 次幂 |
| Math.sqrt(num) | 返回num 的平方根 |
| Math.acos(x) | 返回x 的反余弦值 |
| Math.asin(x) | 返回x 的反正弦值 |
| Math.atan(x) | 返回x 的反正切值 |
| Math.atan2(y,x) | 返回y/x 的反正切值 |
| Math.cos(x) | 返回x 的余弦值 |
| Math.sin(x) | 返回x 的正弦值 |
| Math.tan(x) | 返回x 的正切值 |