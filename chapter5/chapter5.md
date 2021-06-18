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
* reverse()反转数组：[示例](./5.2/ArrayTypeExample13.html)
* sort()排序方法：[数字排序](./5.2/ArrayTypeExample14.html)，[自定义比对方法](./5.2/ArrayTypeExample15.html)

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