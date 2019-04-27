---
layout: post
title: Modern JavaScript 参考手册 
categories: JavaScript
tags:  es6
author: Marnner
excerpt: Modern JavaScript 参考手册 
grammar_cjkRuby: true
---


* content
{:toc}



# Modern JavaScript 参考手册

## 介绍

本文翻译自[Modern JavaScript cheatsheet](https://github.com/mbeaudru/modern-js-cheatsheet)，英文好的同学建议去看原文。

### 为什么做这个？

这个文档是JavaScript的备忘单，在现代项目和大多数当代示例代码中经常遇到。

本指南不是为了教你JavaScript，而是为了帮助那些可能很难熟悉现代代码库（或者让我们来学习React的例子）的基础知识的开发人员，因为使用了JavaScript的概念。

此外，我有时会提供可能有争议的个人建议，但请注意，当我这样做时，这只是个人的建议。

> **注意 :** 这里介绍的大多数概念都来自于JavaScript语言更新(ES2015，通常称为ES6)。您可以在这里来添加新特性。

### 补充资源

当你努力理解一个概念时，我建议你通过以下资源来查找答案:

- [MDN (Mozilla 开发者网络)](https://developer.mozilla.org/fr/search?q=)
- [You don't know JS (book)](https://github.com/getify/You-Dont-Know-JS)
- [ES6 Features with examples](http://es6-features.org)
- [WesBos blog (ES6)](http://wesbos.com/category/es6/)
- [Reddit (JavaScript)](https://www.reddit.com/r/javascript/)
- [Google](https://www.google.com/) 查找具体的博客和资源

## 目录

- [Modern JavaScript cheatsheet](#modern-javascript-cheatsheet)
  * [介绍](#introduction)
    + [为什么做这个？](#motivation)
    + [补充资源](#complementary-resources)
  * [目录](#table-of-contents)
  * [概念](#notions)
    + [声明变量: var, const, let](#variable-declaration-var-const-let)
      - [简短的解释](#short-explanation)
      - [示例代码](#sample-code)
      - [详细的解释](#detailed-explanation)
      - [外部资源](#external-resource)
    + [箭头函数](#-arrow-function)
      - [示例代码](#sample-code-1)
      - [详细解释](#detailed-explanation-1)
        * [Concision（简洁）](#concision)
        * [*this* 引用](#this-reference)
      - [有用的资源](#useful-resources)
    + [函数的默认参数值](#function-default-parameter-value)
      - [外部资源](#external-resource-1)
    + [解构对象和数组](#destructuring-objects-and-arrays)
      - [示例代码与 解释](#explanation-with-sample-code)
      - [有用的资源](#useful-resources-1)
    + [Array 方法 - map / filter / reduce](#array-methods---map--filter--reduce)
      - [实例代码](#sample-code-2)
      - [解释](#explanation)
        * [Array.prototype.map()](#arrayprototypemap)
        * [Array.prototype.filter()](#arrayprototypefilter)
        * [Array.prototype.reduce()](#arrayprototypereduce)
      - [外部资源](#external-resource)
    + [Spread operator "..."](#spread-operator-)
      - [示例代码](#sample-code-3)
      - [解释](#explanation-1)
        * [In iterables (like array)](#in-iterables-like-array)
        * [Function rest parameter](#function-rest-parameter)
        * [Object properties spreading](#object-properties-spreading)
      - [外部资源](#external-resources)
    + [对象属性简写](#object-property-shorthand)
      - [解释](#explanation-2)
      - [外部资源](#external-resources-1)
    + [Promises](#promises)
      - [实力代码](#sample-code-4)
      - [解释](#explanation-3)
        * [创建promise](#create-the-promise)
        * [使用promise](#use-the-promise)
      - [外部资源](#external-resources)
    + [模板文字](#template-literals)
      - [示例代码](#sample-code-5)
      - [外部资源](#external-resources-2)
    + [导入 / 导出](#imports--exports)
      - [示例代码与解释](#explanation-with-sample-code-1)
      - [外部资源](#external-resources-3)
    + [JavaScript *this*](#-javascript-this)
      - [外部资源](#external-resources-4)
    + [Class](#class)
      - [例子](#samples)
      - [外部资源](#external-resources-5)
  * [术语](#glossary)
    + [Scope（作用域）](#-scope)
    + [Variable mutation（变量突变）](#-variable-mutation)

## 概念

### 声明变量: var, const, let

在Javascript 中，有三个关键字可以用于声明变量，每一个都有不同之处. 他们是 ```var```, ```let``` and ```const```.

#### 简短的解释

变量声明为 ```const``` 的关键字不能被重新赋值, 而 ```let``` 和 ```var``` 可以.

我建议在默认情况下 总是使用 ```const``` 来定义变量, 如果你需要改变它，或者稍后重新分配，那么用```let```。.

<table>
  <tr>
    <th></th>
    <th>Scope（范围）</th>
    <th>Reassignable（重新赋值）</th>
    <th>Mutable（易变的）</th>
   <th><a href="#tdz_sample">Temporal Dead Zone（暂时性死区）</a></th>
  </tr>
  <tr>
    <th>const</th>1
    <td>区块作用域</td>
    <td>No</td>
    <td><a href="#const_mutable_sample">Yes</a></td>
    <td>Yes</td>
  </tr>
  <tr>
    <th>let</th>
    <td>区块作用域</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
   <tr>
    <th>var</th>
    <td>函数作用域</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>No</td>
  </tr>
</table>

#### 示例代码

```javascript
const person = "Nick";
person = "John" // 会出现错误，不能重新赋值
```

```javascript
let person = "Nick";
person = "John";
console.log(person) // "John", let 允许重新赋值
```

#### 详细解释

 [*scope*](#scope_def)作用范围 的意思是这个变量在代码中可用的地方

- **var**

```var``` 声明的变量是 *function scoped（函数范围的）*,这意味着当函数中创建变量的时候，该函数的所有内容都可以访问该变量. Conversely（相反）,   在函数外创建的*block scoped（块范围）*变量无法访问。.

I recommend you to picture it as if an *X scoped* variable meant that this variable was a property of X.
我建议你把它看作 ，一个什么范围的变量意味着这个变量是什么属性，有什么作用域。

```javascript
function myFunction() {
  var myVar = "Nick";
  console.log(myVar); // "Nick" - myVar可以在函数内访问
}
console.log(myVar); // Undefined, myVar不能在函数外面访问
```

仍然关注变量的范围，这里有一个更微妙的例子:

```javascript
function myFunction() {
  var myVar = "Nick";
  if (true) {
    var myVar = "John";
    console.log(myVar); // "John"
    // 实际上，myVar是函数范围，我们刚刚删除了以前的myVar值“Nick”为“John”
  }
  console.log(myVar); // "John" - 看看if块中的指令如何影响这个值
}
console.log(myVar); // Undefined, myVar 在函数外不可访问。.
```

此外, *var* 声明的变量被移动到执行的范围的顶端. This is what we call [var hoisting（var变量提升）](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var#var_hoisting).

看这部分代码:

```js
console.log(myVar) // undefined -- 没有错误发生
var myVar = 2;
```

在执行过程中被理解为:

```js
var myVar;
console.log(myVar) // undefined --  没有错误发生
myVar = 2;
```

- **let**

```var``` 和 ```let ``` 是差别不多的，但是 ```let ``` 声明的变量是块范围的，它们在被分配之前是无法访问的。

让我们以我们之前的例子来看看块范围的影响，:

```javascript
function myFunction() {
  let myVar = "Nick";
  if (true) {
    let myVar = "John";
    console.log(myVar); // "John"
    //事实上，myVar是块范围的，我们在这里创建了一个新的myVar变量
    // 这个变量在这个块之外是不可访问的，完全独立于第一个myVar的创建
  }
  console.log(myVar); // "Nick", if块中的指令没有影响这个值
}
console.log(myVar); // Undefined, myVar 在函数外面不能访问到
```

<a name="tdz_sample"></a> 现在,  我们来看看*let* (和 *const*) 变量在赋值前是不可以访问的是什么意思

```js
console.log(myVar) // raises a ReferenceError（引用错误） !
let myVar = 2;
```

上面是合法的JS代码，正常输出undefined而不是报错Uncaught ReferenceError: a is not defined。为什么？就是因为声明提升（hoisting）。


与var变量相比，如果您尝试在一个let或const变量上读取或写入错误，则会增加一个错误。这个现象通常被称为暂时性死区或 [*Temporal dead zone*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#Temporal_Dead_Zone_and_errors_with_let) 或者简写*TDZ*.。

> **注意 :**  在技术上，let和const变量声明也被提升了，而不是它们的赋值。由于它们被创建成在分配之前不能使用它，它直观地感觉就像没有提升，但是有。如果你想知道更多，可以在[这里](http://jsrocks.org/2015/01/temporal-dead-zone-tdz-demystified) 找到更多关于这个细节的解释。

- **const**


const，以及let，声明的变量是 *block scoped*（块范围i的），在分配赋值之前是不可访问的，但是不能重新分配，也不能重新声明。

```js
const myVar = "Nick";
myVar = "John" // r出现了错误，不允许重新赋值
```

```js
const myVar = "Nick";
const myVar = "John" //出现了错误，不允许重新声明
```

<a name="const_mutable_sample"></a> 但是还有一点微妙的是 : ```const``` variables are not [**immutable**](#mutation_def) ! 具体的说, 这意味着对象和数组const声明的变量可以发生变化。

For objects:
```js
const person = {
  name: 'Nick'
};
person.name = 'John' // 这将工作！人员变量不是完全重新分配，而是被赋值突变的
console.log(person.name) // "John"
person = "Sandra" // 引发错误，因为const声明的变量不允许重新分配
```

For arrays:
```js
const person = [];
person.push('John'); //这将工作！人员变量不是完全重新分配，而是突变的
console.log(person[0]) // "John"
person = ["Nick"] // 引发错误，因为const声明的变量不允许重新分配
```

#### 外部资源

- [How let and const are scoped in JavaScript - WesBos](http://wesbos.com/javascript-scoping/)
- [Temporal Dead Zone (TDZ) Demystified](http://jsrocks.org/2015/01/temporal-dead-zone-tdz-demystified)

### <a name="arrow_func_concept"></a> 箭头函数

ES6 JavaScript更新引入了箭头函数，这是另一种声明和使用函数的方法。以下是他们带来的好处：

- 更加的简洁
- *this* is picked up from surroundings（this 从周围的环境中获得）
- implicit return（隐式返回）

#### Sample code

- 简洁和隐式返回

```js
function double(x) { return x * 2; } // 传统的方式
console.log(double(2)) // 4
```

```js
const double = x => x * 2; // 使用箭头函数并且隐式返回
console.log(double(2)) // 4
```

- *this* 引用

In an arrow function, *this* is equal to the *this* value of the enclosing execution context. Basically, with arrow functions you don't have to do the "that = this" trick before calling a function inside a function anymore.

在一个箭头函数中，*this*等于封闭执行上下文的*this*值。基本上，使用箭头函数，您不必再在函数内部调用函数之前做"that = this"这个技巧。



```js
function myFunc() {
  this.myVar = 0;
  setTimeout(() => {
    this.myVar++;
    console.log(this.myVar) // 1
  }, 0);
}
```

#### Detailed explanation（详细的解释）

##### Concision （简明）

箭头函数在许多方面比传统函数更简洁。让我们回顾一下所有可能的情况:

- Implicit VS Explicit return （显示 VS 隐式的返回）

 **explicit return**（显示返回）显式返回是在其主体中使用return关键字的函数。

```js
  function double(x) {
    return x * 2; // 此函数显式返回x * 2，*返回*关键字被使用
  }
```

以传统的方式写函数，return总是明确的。但是使用箭头函数，您可以执行隐式返回，这意味着您不需要使用关键字return来返回值

要做一个隐式的返回，代码必须用一行句子来写。

```js
  const double = (x) => {
    return x * 2; // Explicit return here 隐式返回
  }
```

由于这里只有一个返回值，我们可以这样做一个隐式的返回。

```js
 const double = (x) => x * 2;
```

为此，我们只需要删除括号和return关键字。这就是为什么它被称为隐式返回，返回关键字不在那里，但这个函数确实会返回x * 2。

> **注意 :** 如果你的函数没有返回一个值（有副作用），它不会做一个显式的或一个隐式的返回。

- 只有一个参数

如果你的函数只有一个参数，你可以省略它周围的圆括号。如果我们重新写上面的两行代码：

```js
 const double = (x) => x * 2; // this arrow function only takes one parameter
```

围绕参数的括号可以避免：


```js
 const double = x => x * 2; // this arrow function only takes one parameter
```

- 没有参数

当没有向箭头函数提供参数时，需要提供括号否则这将是错误的语法不会工作。

```js
  () => { // parenthesis（圆括号） are provided, everything is fine
    const x = 2;
    return x;
  }
```

```js
  => { // No parenthesis, this won't work!
    const x = 2;
    return x;
  }
```

##### *this* 引用

要理解使用箭头函数介绍的这个细微之处，您必须了解 [this](#this_def)在JavaScript中的行为。



在一个箭头函数中，*this*等于封闭执行上下文的 *this*值。这意味着一个箭头函数不会创建一个新的*this*，它从它的周围抓取它



没有箭头功能，如果你想从一个函数内部的函数中访问变量*this* ，你必须使用*that = this*或*self = this*这个技巧。

例如，在myFunc中使用setTimeout函数:

```js
function myFunc() {
  this.myVar = 0;
  var that = this; // that = this trick
  setTimeout(
    function() { // A new *this* 在这个函数中被创建
      that.myVar++;
      console.log(that.myVar) // 1

      console.log(this.myVar) // undefined -- 定义在上面那个函数
    },
    0
  );
}
```

但是如果 用箭头函数, *this* 从他的环境周围获取:

```js
function myFunc() {
  this.myVar = 0;
  setTimeout(
    () => { // this 从环境周围获取，这里从myFun从()获取
      this.myVar++;
      console.log(this.myVar) // 1
    },
    0
  );
}
```

#### Useful resources (有用的资源)

- [Arrow functions introduction - WesBos](http://wesbos.com/arrow-functions/)
- [JavaScript arrow function - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- [Arrow function and lexical *this*](https://hackernoon.com/javascript-es6-arrow-functions-and-lexical-this-f2a3e2a5e8c4)

### Function default parameter value(函数默认参数值)

从ES2015 JavaScript更新开始，您可以使用以下语法将默认值设置为函数参数：

```js
function myFunc(x = 10) {
  return x;
}
console.log(myFunc()) // 10 -- 没有提供任何值，所以x默认值10被分配给myFunc中的x
console.log(myFunc(5)) // 5 -- 提供了一个值，所以x在myFunc中等于5

console.log(myFunc(undefined)) // 10 -- 提供了未定义的值，因此默认值被分配给x
console.log(myFunc(null)) // null -- 提供了一个值（null），有关详细信息，请参见下文
```

默认参数应用于两种和仅两种情况：

- 没有参数提供
- *undefined* 参数提供

此外, 如果你传递 *null* 作为默认值 **won't be applied（将不会被应用）**.

> **Note :** 默认值分配也可以与解构参数一起使用（参见下一个概念以查看示例）

#### External resource （外部资源）

- [Default parameter value - ES6 Features](http://es6-features.org/#DefaultParameterValues)
- [Default parameters - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)

### Destructuring objects and arrays （解构对象和数组）

*Destructuring* 是通过从存储在对象或数组中的数据中提取一些值来创建新变量的方便方法。

To name a few useful cases, *destructuring* can be used to destructure function parameters or *this.props* in React projects for instance

为了列举一些有用的例子，举例来说，在React 中解构可以被用来解构函数参数或者*this.props*。

#### Explanation with sample code （示例代码和解释）

- Object （对象）

Lets consider the following object for all the samples:

```js
const person = {
  firstName: "Nick",
  lastName: "Anderson",
  age: 35,
  sex: "M"
}
```

Without destructuring（没有解构的情况下）

```js
const first = person.firstName;
const age = person.age;
const city = person.city || "Paris";
```

With destructuring, all in one line:（有解构的情况下，所有都在一行上，对象中有的变量会被解构为变量，没有的会Undefined）

```js
const { firstName: first, age, city = "Paris" } = person; // That's it !

console.log(age) // 35 -- A new variable age is created and is equal to person.age
console.log(first) // "Nick" -- A new variable first is created and is equal to person.firstName
console.log(firstName) // Undefined -- person.firstName exists BUT the new variable created is named first
console.log(city) // "Paris" -- A new variable city is created and since person.city is undefined, city is equal to the default value provided "Paris".
```

**Note :**在const {age} = person中，const关键字之后的括号不用于声明对象或块，而是解构语法。

- Function parameters （函数参数）

*Destructuring* is often used to destructure objects parameters in functions.
解构经常被用来解构对象和函数中的参数

Without destructuring（没有解构的时候）

```js
function joinFirstLastName(person) {
  const firstName = person.firstName;
  const lastName = person.lastName;
  return firstName + '-' + lastName;
}

joinFirstLastName(person); // "Nick-Anderson"
```

In destructuring the object parameter *person*, we get a more concise function:
在解构对象参数person时，我们得到一个更简洁的功能：

```js
function joinFirstLastName({ firstName, lastName }) { // we create firstName and lastName variables by destructuring person parameter
  return firstName + '-' + lastName;
}

joinFirstLastName(person); // "Nick-Anderson"
```

Destructuring is even more pleasant to use with [arrow functions](#arrow_func_concept):
解构使用箭头功能更加愉快：

```js
const joinFirstLastName = ({ firstName, lastName }) => firstName + '-' + lastName;

joinFirstLastName(person); // "Nick-Anderson"
```

- Array （数组）

Lets consider the following array:

```js
const myArray = ["a", "b", "c"];
```

Without destructuring 没有解构

```js
const x = myArray[0];
const y = myArray[1];
```

With destructuring 有解构

```js
const [x, y] = myArray; // That's it !

console.log(x) // "a"
console.log(y) // "b"
```

#### Useful resources 有用的资源

- [ES6 Features - Destructuring Assignment](http://es6-features.org/#ArrayMatching)
- [Destructuring Objects - WesBos](http://wesbos.com/destructuring-objects/)
- [ExploringJS - Destructuring](http://exploringjs.com/es6/ch_destructuring.html)

### Array methods - map / filter / reduce 数组方法

*Map*, *filter* and *reduce* are array methods that are coming from a programming paradigm named [*functional programming*](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0).

Map, filter and reduce 是数组的方法，他们来自来自一个名为函数式编程的编程范例。

To sum it up: 总结一下

- **Array.prototype.map()** takes an array, does something on its elements and returns an array with the transformed elements. 使用数组，在其元素上执行某些操作，并返回带有转换元素的数组。
- **Array.prototype.filter()** takes an array, decides element by element if it should keep it or not and returns an array with the kept elements only 使用一个数组，按元素决定是否应该保留它，并返回一个仅包含保留元素的数组
- **Array.prototype.reduce()** takes an array and aggregates the elements into a single value (which is returned)  使用数组并将元素聚合为单个值（返回）


我建议尽可能地使用它们来遵循函数式编程的原则，因为它们是可组合的，简洁的和优雅的。

通过这三种方法，您可以避免在必要情况下使用for和forEach循环。当你试图做一个for循环，尝试用map，filter和reduce来组合。你可能很难做到这一点，因为它需要你学习一种新的思维方式，但是一旦你得到它，事情变得更容易了。


#### Sample code

```js
const numbers = [0, 1, 2, 3, 4, 5, 6];
const doubledNumbers = numbers.map(n => n * 2); // [0, 2, 4, 6, 8, 10, 12]
const parNumbers = numbers.filter(n => n % 2 === 0); // [0, 2, 4, 6]
const sum = numbers.reduce((prev, next) => prev + next, 0); // 21
```

通过组合 map, filter 和 reduce，过滤和缩小计算10以上学生的总成绩总和：

```js
const students = [
  { name: "Nick", grade: 10 },
  { name: "John", grade: 15 },
  { name: "Julia", grade: 19 },
  { name: "Nathalie", grade: 9 },
];

const aboveTenSum = students
  .map(student => student.grade) // 们将学生数组映射到他们的成绩数组
  .filter(grade => grade >= 10) //我们过滤成绩数组只保留10以上的数组
  .reduce((prev, next) => prev + next, 0); // 我们把10个以上的成绩一个一个地加起来

console.log(aboveTenSum) // 44 -- 10 (Nick) + 15 (John) + 19 (Julia), Nathalie below 10 is ignored
```

#### Explanation （解释）

Let's consider the following array of numbers for our examples:
让我们考虑下列数组：

```js
const numbers = [0, 1, 2, 3, 4, 5, 6];
```

##### Array.prototype.map()

```js
const doubledNumbers = numbers.map(function(n) {
  return n * 2;
});
console.log(doubledNumbers); // [0, 2, 4, 6, 8, 10, 12]
```

这里发生了什么我们在数组中使用.map，map在数组的每个元素上迭代，并将其传递给我们的函数。该函数的目标是生成并返回一个新的值，以便映射可以替换它。

Lets extract this function to make it more clear, just for this once:
让我们提取这个功能让它更清楚，只是为了这一次：

```js
const doubleN = function(n) { return n * 2; };
const doubledNumbers = numbers.map(doubleN);
console.log(doubledNumbers); // [0, 2, 4, 6, 8, 10, 12]
```

```numbers.map(doubleN)``` 生成了 ```[doubleN(0), doubleN(1), doubleN(2), doubleN(3), doubleN(4), doubleN(5), doubleN(6)]``` which is equal to ```[0, 2, 4, 6, 8, 10, 12]```.

> **Note :** 如果不需要返回一个新的数组，只想做一个具有副作用的循环，你可能只想使用for / forEach循环而不是map。

##### Array.prototype.filter()

```js
const parNumbers = numbers.filter(function(n) {
  return n % 2 === 0; // true if "n" is par, false if "n" isn't
});
console.log(parNumbers); // [0, 2, 4, 6]
```

们在数组数组中使用.filter，filter在数组的每个元素上进行迭代，并将其传递给我们的函数。函数的目标是返回一个布尔值，它将确定当前值是否被保留。 Filter然后返回数组，只保留值。

##### Array.prototype.reduce()

reduce方法的目标是将其迭代的数组的所有元素减少为单个值。如何聚合这些元素取决于你。

```js
const sum = numbers.reduce(
  function(acc, n) {
    return acc + n;
  },
  0 //在第一次迭代步骤中，累加器变量值
);

console.log(sum) //21
```

就像对于.map和.filter方法一样，.reduce应用于一个数组，并将一个函数作为第一个参数。

但这一次，有一些变化:

- reduce有两个参数

第一个参数是在每个迭代步骤中调用的函数。

The second parameter is the value of the accumulator variable (*acc* here) at the first iteration step (read next point to understand).
第二个参数是在第一个迭代步骤（读取下一个要理解的）的累加器变量的值（acc here）。

- Function parameters 函数参数

作为.reduce的第一个参数传递的函数需要两个参数。第一个（acc这里）是累加器变量，而第二个参数（n）是当前元素。

The accumulator variable is equal to the return value of your function at the **previous** iteration step. At the first step of the iteration, *acc* is equal to the value you passed as .reduce second parameter.
累加器变量等于上一次迭代步骤中函数的返回值。在迭代的第一步，acc等于您作为.reduce第二个参数传递的值。

###### At first iteration step 在第一次迭代步骤


```acc = 0``` 因为我们以0作为第二个参数来reduce

```n = 0``` 数字数组的第一个元素

Function returns *acc* + *n* --> 0 + 0 --> 0

###### At second iteration step 在第二次迭代步骤


```acc = 0``` 它的值是在上一个迭代步骤中返回的函数

```n = 1``` 数字数组的第二个元素

Function returns *acc* + *n* --> 0 + 1 --> 1

###### At third iteration step 在第三次迭代步骤


```acc = 1``` 它在上一次迭代步骤中返回的函数的值

```n = 2``` 数字数组的第三个元素

Function returns *acc* + *n* --> 1 + 2 --> 3

###### At fourth iteration step 在第四次迭代步骤


```acc = 3``` 它在上一次迭代步骤中返回的函数的值
```n = 3``` 数字数组的第四个元素

Function returns *acc* + *n* --> 3 + 3 --> 6

###### [...] At last iteration step 在最后一次迭代步骤


```acc = 15``` 它在上一次迭代步骤中返回的函数的值

```n = 6``` 数字数组的最后一个元素

Function returns *acc* + *n* --> 15 + 6 --> 21

最后一步迭代, **.reduce** returns 21.

#### External Resource 外部的资源

- [Understanding map / filter / reduce in JS](https://hackernoon.com/understanding-map-filter-and-reduce-in-javascript-5df1c7eee464)

### Spread operator "..." 扩展操作符

扩展操作符...已经引入了ES2015，用于将可迭代元素（如数组）扩展到多个元素可以适合的位置。

#### Sample code

```js
const arr1 = ["a", "b", "c"];
const arr2 = [...arr1, "d", "e", "f"]; // ["a", "b", "c", "d", "e", "f"]
```

```js
function myFunc(x, y, ...params) {
  console.log(x);
  console.log(y);
  console.log(params)
}

myFunc("a", "b", "c", "d", "e", "f")
// "a"
// "b"
// ["c", "d", "e", "f"]
```

```js
const { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
console.log(x); // 1
console.log(y); // 2
console.log(z); // { a: 3, b: 4 }

const n = { x, y, ...z };
console.log(n); // { x: 1, y: 2, a: 3, b: 4 }
```

#### Explanation 解释

##### In iterables (like arrays) 在迭代（如数组）

If we have the two following arrays: 如果我们有以下两个数组：

```js
const arr1 = ["a", "b", "c"];
const arr2 = [arr1, "d", "e", "f"]; // [["a", "b", "c"], "d", "e", "f"]
```

arr2的第一个元素是一个数组，因为arr1被注入到arr2中。但是我们想要的是arr2是一个字母数组。为此，我们可以将arr1的元素扩展到arr2中。

With spread operator

```js
const arr1 = ["a", "b", "c"];
const arr2 = [...arr1, "d", "e", "f"]; // ["a", "b", "c", "d", "e", "f"]
```

##### Function rest parameter

在函数参数中，我们可以使用rest操作符来将参数注入到我们可以循环的数组中。已经有一个参数对象绑定到每个函数，等于传递给函数的所有参数的数组。

```js
function myFunc() {
  for (var i = 0; i < arguments.length; i++) {
    console.log(arguments[i]);
  }
}

myFunc("Nick", "Anderson", 10, 12, 6);
// "Nick"
// "Anderson"
// 10
// 12
// 6
```

但是让我们说，我们希望这个功能能够创建一个具有成绩和平均成绩的新学生。将前两个参数提取为两个分离的变量不是更方便，然后将数组中的所有成绩可以迭代？

That's exactly what the rest operator allows us to do!
这正是rest操作员允许我们做的!

```js
function createStudent(firstName, lastName, ...grades) {
  // firstName = "Nick"
  // lastName = "Anderson"
  // [10, 12, 6] -- "..." takes all other parameters passed and creates a "grades" array variable that contains them

  const avgGrade = grades.reduce((acc, curr) => acc + curr, 0) / grades.length; // computes average grade from grades

  return {
    firstName: firstName,
    lastName: lastName,
    grades: grades,
    avgGrade: avgGrade
  }
}

const student = createStudent("Nick", "Anderson", 10, 12, 6);
console.log(student);
// {
//   firstName: "Nick",
//   lastName: "Anderson",
//   grades: [10, 12, 6],
//   avgGrade: 9,33
// }
```

> **Note :** createStudent函数是有缺陷的，因为我们没有检查grade.length是否存在或不同于0.但是它更容易阅读，所以我没有处理这种情况。

##### Object properties spreading 对象属性扩展

For this one I recommend you read previous explanations about the rest operator on iterables and function parameters.
对于这一个，我建议您阅读有关迭代和函数参数的其余操作符的以前的说明。

```js
const myObj = { x: 1, y: 2, a: 3, b: 4 };
const { x, y, ...z } = myObj; // object destructuring here
console.log(x); // 1
console.log(y); // 2
console.log(z); // { a: 3, b: 4 }

// z is the rest of the object destructured : myObj object minus x and y properties destructured

const n = { x, y, ...z };
console.log(n); // { x: 1, y: 2, a: 3, b: 4 }

// Here z object properties are spread into n
```

#### External resources 外部资源

- [TC39 - Object rest/spread](https://github.com/tc39/proposal-object-rest-spread)
- [Spread operator introduction - WesBos](https://github.com/wesbos/es6-articles/blob/master/28%20-%20Spread%20Operator%20Introduction.md)
- [JavaScript & the spread operator](https://codeburst.io/javascript-the-spread-operator-a867a71668ca)
- [6 Great uses of the spread operator](https://davidwalsh.name/spread-operator)

### Object property shorthand 对象属性简写

将变量分配给对象属性时，如果变量名称等于属性名称，则可以执行以下操作：

```js
const x = 10;
const myObj = { x };
console.log(myObj.x) // 10
```

#### Explanation

通常（pre-ES2015）当你声明一个新的对象字面值并且想要使用变量作为对象属性值时，你会写这样的代码：

```js
const x = 10;
const y = 20;

const myObj = {
  x: x, // assigning x variable value to myObj.x
  y: y // assigning y variable value to myObj.y
};

console.log(myObj.x) // 10
console.log(myObj.y) // 20
```

如您所见，这是非常重复的，因为myObj的属性名称与要分配给这些属性的变量名相同。

使用ES2015，当变量名与属性名称相同时，您可以进行以下速记：

```js
const x = 10;
const y = 20;

const myObj = {
  x,
  y
};

console.log(myObj.x) // 10
console.log(myObj.y) // 20
```

#### External resources 外部资源

- [Property shorthand - ES6 Features](http://es6-features.org/#PropertyShorthand)

### Promises


承诺是一个可以从异步函数([ref](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261#3cd0))同步返回的对象。


承诺可以用来避免 [callback hell（回调地狱）](http://callbackhell.com/)，而且他们在现代JavaScript项目中越来越频繁地遇到。

#### Sample code

```js
const fetchingPosts = new Promise((res, rej) => {
  $.get("/posts")
    .done(posts => res(posts))
    .fail(err => rej(err));
});

fetchingPosts
  .then(posts => console.log(posts))
  .catch(err => console.log(err));
```

#### Explanation

当您执行Ajax请求时，响应不是同步的，因为您想要的一些资源需要一些时间。如果您要求的资源由于某些原因（404）不可用，甚至可能永远不会来。

为了处理这种情况，ES2015给了我们的承诺。承诺可以有三种不同的状态：

- Pending 未决定
- Resolved 解决
- Rejected 拒绝

假设我们希望使用promises来处理Ajax请求以获取资源X.

##### Create the promise

我们首先要创造一个承诺。我们将使用jQuery get方法来完成我们对X的Ajax请求。

```js
const xFetcherPromise = new Promise( // Create promise using "new" keyword and store it into a variable
  function(resolve, reject) { // Promise constructor takes a function parameter which has resolve and reject parameters itself
    $.get("X") // Launch the Ajax request
      .done(function(X) { // Once the request is done...
        resolve(X); // ... resolve the promise with the X value as parameter
      })
      .fail(function(error) { // If the request has failed...
        reject(error); // ... reject the promise with the error as parameter
      });
  }
)
```

如上面的示例所示，Promise对象接受一个函数，该函数接受两个参数**resolve** 和**reject**。这些参数是当被调用将将promise *pending*状态转移到*resolved*和*rejected*状态的函数。

但是目前，这个承诺还没有被使用，只是被声明并存储到xFetcherPromise变量中!所以它没有现在的状态。

##### Use the promise

为了使用这个承诺，我们做如下:

```js
xFetcherPromise
  .then(function(X) {
    console.log(X);
  })
  .catch(function(err) {
    console.log(err)
  })
```

```.then```是一种方法，一旦调用，将把xFetcherPromise置于未决状态。当调用时，承诺体运行，在此情况下将执行Ajax调用。

If it succeeds, *resolve* is called and the function passed as ```.then``` parameter is executed.
如果成功，执行 .then()函数

If it fails, *reject* is called and the function passed as ```.catch``` parameter is executed.
如果失败，执行.catch()函数

#### External Resources 外部资源

- [JavaScript Promises for dummies - Jecelyn Yeen](https://scotch.io/tutorials/javascript-promises-for-dummies)
- [JavaScript Promise API - David Walsh](https://davidwalsh.name/promises)
- [Using promises - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
- [What is a promise - Eric Elliott](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261)
- [JavaScript Promises: an Introduction - Jake Archibald](https://developers.google.com/web/fundamentals/getting-started/primers/promises)
- [Promise documentation - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

### Template literals 模板文字

Template literals is an [*expression interpolation*](https://en.wikipedia.org/wiki/String_interpolation) for single and multiple-line strings.

In other words, it is a new string syntax in which you can conveniently use any JavaScript expressions (variables for instance).

模板文字是单行和多行字符串的表达式插值[*expression interpolation*](https://en.wikipedia.org/wiki/String_interpolation)。 换句话说，它是一种新的字符串语法，您可以方便地使用任何JavaScript表达式（例如变量）。

#### Sample code

```js
const name = "Nick";
`Hello ${name}, the following expression is equal to four : ${2+2}`;

// Hello Nick, the following expression is equal to four: 4
```

#### External resources 外部资源

- [String interpolation - ES6 Features](http://es6-features.org/#StringInterpolation)
- [ES6 Template Strings - Addy Osmani](https://developers.google.com/web/updates/2015/01/ES6-Template-Strings)

### Imports / Exports 导入，导出


ES6模块用于访问由其导入的模块中的变量或函数。


我强烈建议您查看导入/导出的MDN资源（请参阅下面的外部资源），它既简单又完整。

#### Explanation with sample code

- Named exports 命名导出

Named exports are useful to export several values from a module. You can only name-export variables (not functions or class), so if you want to name-export a function, you have to store it in a variable before.
命名导出对于从模块导出多个值非常有用。您只能命名导出变量（而不是函数或类），因此如果要导出一个函数，必须先将其存储在变量中。

```js
// mathConstants.js
export const pi = 3.14;
export const exp = 2.7;
export const alpha = 0.35;

// -------------

// myFile.js
import { pi, exp } from './mathConstants.js'; // Destructuring import 解构导入的变量
console.log(pi) // 3.14
console.log(exp) // 2.7

// -------------

// mySecondFile.js
import * as constants from './mathConstants.js'; // Inject all exported values into constants variable 
console.log(constants.pi) // 3.14
console.log(constants.exp) // 2.7
```

- Default import / export

关于默认导出，每个模块只有一个默认导出。默认导出可以是函数，类，对象或其他任何东西。这个值被认为是“主要”的导出值，因为它将是最简单的导入。. [Ref: MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export#Description)

```js
// coolNumber.js
const ultimateNumber = 42;
export default ultimateNumber;

// ------------

// myFile.js
import number from './coolNumber.js';
// Default export, independently from its name, is automatically injected into number variable;
默认导出，独立于其名称，自动注入数字变量;
console.log(number) // 42
```

Function exporting: 函数导出

```js
// sum.js
export default function sum(x, y) {
  return x + y;
}
// -------------

// myFile.js
import sum from './sum.js';
const result = sum(1, 2);
console.log(result) // 3
```

#### External resources 其他的资源

- [Export - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)
- [Import - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
- [Understanding ES6 Modules](https://www.sitepoint.com/understanding-es6-modules/)
- [Modules in JavaScript](http://exploringjs.com/es6/ch_modules.html#sec_modules-in-javascript)

### <a name="this_def"></a> JavaScript *this*

*this* 操作符的行为与其他语言不同，在大多数情况下由函数的调用决定。 ([Ref: MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)).

这个概念有很多细微之处，相当困难，我强烈建议你深入下面的外部资源。因此，我会提供我个人的想法来确定这是相等的。我学到了这个从这里[this article written by Yehuda Katz](http://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/).

```js
function myFunc() {
  ...
}

// After each statement you find the value of *this* in myFunc
在每个语句之后，在myFunc中找到* this *的值

myFunc.call("myString", "hello") // "myString" -- first .call parameter value is injected into *this*

// 在非严格模式下
myFunc("hello") // window -- myFunc() is syntax sugar for myFunc.call(window, "hello")
myFunc（）是myFunc.call的语法糖（window，“你好”）

//在严格模式下
myFunc("hello") // undefined -- myFunc() is syntax sugar for myFunc.call(undefined, "hello")
```

```js
var person = {
  myFunc: function() { ... }
}

person.myFunc.call(person, "test") // person Object -- first call parameter is injected into *this*
person.myFunc("test") // person Object -- person.myFunc() is syntax sugar for person.myFunc.call(person, "test")

var myBoundFunc = person.myFunc.bind("hello") // Creates a new function in which we inject "hello" in *this* value
person.myFunc("test") // person Object -- The bind method has no effect on the original method
myBoundFunc("test") // "hello" -- myBoundFunc is person.myFunc with "hello" bound to *this*
```

#### External resources

- [Understanding JavaScript Function Invocation and "this" - Yehuda Katz](http://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/)
- [JavaScript this - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)

### Class



JavaScript是基于 原型[prototype-based](https://en.wikipedia.org/wiki/Prototype-based_programming) 的语言（例如，Java是基于类 [class-based](https://en.wikipedia.org/wiki/Class-based_programming)的语言）。 ES6引入了JavaScript类，它们是用于基于原型的继承的语法糖，而不是一种新的基于类的继承模型([ref](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes))。

The word *class* is indeed error prone if you are familiar with classes in other languages. If you do, avoid assuming how JavaScript classes work on this basis and consider it an entirely different notion.

如果您熟悉其他语言的类，那类这个词的确容易出错。如果这样做，请避免假设JavaScript中的类在此基础上工作，并将其视为完全不同的概念。

由于本文件不是从根本上教你的语言，我会考虑你知道什么是原型，以及它们的行为。但这里有一些链接，我觉得很好理解这个概念：

- [Understanding Prototypes in JS - Yehuda Katz](http://yehudakatz.com/2011/08/12/understanding-prototypes-in-javascript/)
- [A plain english guide to JS prototypes - Sebastian Porto](http://sporto.github.io/blog/2013/02/22/a-plain-english-guide-to-javascript-prototypes/)
- [Inheritance and the prototype chain - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)

#### Samples

Before ES6, prototype syntax: 在ES6之前，原型语法：

```js
var Person = function(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.stringSentence = function() {
  return "Hello, my name is " + this.name + " and I'm " + this.age;
}
```

With ES6 class syntax:

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  stringSentence() {
    return "Hello, my name is " + this.name + " and I'm " + this.age;
  }
}

const myPerson = new Person("Manu", 23);
console.log(myPerson.age) // 23
console.log(myPerson.stringSentence()) // "Hello, my name is Manu and I'm 23
```

#### External resources

For prototype understanding:为了原型理解：

- [Understanding Prototypes in JS - Yehuda Katz](http://yehudakatz.com/2011/08/12/understanding-prototypes-in-javascript/)
- [A plain english guide to JS prototypes - Sebastian Porto](http://sporto.github.io/blog/2013/02/22/a-plain-english-guide-to-javascript-prototypes/)
- [Inheritance and the prototype chain - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)

For classes understanding:

- [ES6 Classes in Depth - Nicolas Bevacqua](https://ponyfoo.com/articles/es6-classes-in-depth)
- [ES6 Features - Classes](http://es6-features.org/#ClassDefinition)
- [JavaScript Classes - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)

## Glossary 术语

### <a name="scope_def"></a> Scope 范围

The context in which values and expressions are "visible," or can be referenced. If a variable or other expression is not "in the current scope," then it is unavailable for use.

值和表达式“可见”或可被引用的上下文。如果变量或其他表达式不是“在当前范围内”，那么它不可用。

Source: [MDN](https://developer.mozilla.org/en-US/docs/Glossary/Scope)

### <a name="mutation_def"></a> Variable mutation 变量突变

A variable is said to have been mutated when its initial value has changed afterwards.

当变量的初始值发生变化时，变量就会发生突变。

```js
var myArray = [];
myArray.push("firstEl") // myArray is being mutated
```

A variable is said to be *immutable* if it can't be mutated.
如果一个变量不能发生突变，它就是不可变的。

[Check MDN Mutable article](https://developer.mozilla.org/en-US/docs/Glossary/Mutable) for more details.
