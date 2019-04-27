---
layout: post
title: primitive-data-type-in-java
categories: Java Basic
tags:  java 
author: Marnner
excerpt: Primitive Data Types in Java
grammar_cjkRuby: true
---

* content
{:toc}

## 介绍

在上一个教程中，我们了解了有关非原始数据类型的更多信息。在这篇博文中，我将详细讨论原始数据类型。

Java支持八种基本数据类型。原始数据类型由语言预定义并由关键字命名。我们来看下面的图像中的每个基本数据类型。

![enter description here][1]


  [1]: https://howtodoinjava.com/wp-content/uploads/2015/05/Primitive-data-types-in-java.jpg
  
  ## Integral Data Types
  
  整数数据类型是数值型数据类型，其值为整数。Java提供了5个完整的数据类型:`byte, short, int, long, and char`。让我们简短地了解一下其中的每一个。
  
  1） int
  int数据类型是一个32位签名的Java原始数据类型。int数据类型的变量需要32位内存。
  
  int数据类型是32位签名的Java原语数据类型。 int数据类型的变量占用32位内存。其有效范围为-2,147,483,648至2,147,483,647（-2的31次方至2的31次方- 1）。该范围内的所有整数称为整数文字（或整数常量）。例如，10，-200，0，30，19等是int的整数字面量。一个整型文字可以分配给一个int变量，比如说num1，像这样：
  
  > int num = 21;

Java有一个名为Integer的类，它定义了两个常量，以表示int数据类型的最大值和最小值。MAX_VALUE Integer.MIN_VALUE。例如，

> int max = Integer.MAX_VALUE; // Assigns maximum int value to max
int min = Integer.MIN_VALUE; // Assigns minimum int value to min

2) long

：long数据类型是一个64位签名的Java原始数据类型。当整个数字的计算结果超过了int数据类型的范围时，就使用它。它的范围是- 2的63次方 2的63次方 - 1。ong的范围内的所有整数都称为long类型的整数文字。

类型long的整数文字总是以L（或小写字母l）结尾。以下是使用long类型的整数文字的示例：

``` java
long num1 = 0L;
long num2 = 401L;
long mum3 = -3556L;
```
即使存储在long变量中的值完全在int数据类型的范围内，也不允许从long到int的赋值，如下例所示：

``` java
int num1 = 5;
long num2 = 25L;
  
// A compile-time error. Even if num2's value 25 which is within the range of int.
num1 = num2;
```
如果要将long变量的值分配给int变量，则必须在代码中明确提及此事实，以便Java确保您知道可能存在数据溢出。您可以使用Java中的“cast”来执行此操作，如下所示：

通过编写（int）num2，您正在指示Java将存储在num2中的值视为int。在运行时，Java将仅使用32位的最低有效位num2，并将这32位中存储的值分配给num1。如果num2的值超出了int数据类型的范围，那么在num1中将不会得到相同的值。

Java有一个Long类（注意Long的大写字母L），它定义了两个常量来表示长数据类型Long.MAX_VALUE和Long.MIN_VALUE的最大值和最小值。


``` java
long max = Long.MAX_VALUE;
long min = Long.MIN_VALUE;
```
3) byte

字节数据类型是8位签名的Java原语整数数据类型。其范围为-128至127（-2的7次方至2的7次方-1）。这是Java中最小的整数数据类型。

与int和long literals不同，没有字节文字。但是，您可以将任何落在字节范围内的任何int文字分配给一个字节变量。例如，

> byte b1 = 125;
byte b2 = -11;

如果将一个int字面值分配给一个字节变量，该值超出了字节数据类型的范围，则Java会生成编译器错误。以下代码将产生编译错误：

``` java
// An error. 150 is an int literal outside -128 to 127
byte b3 = 150;
```


Java不允许您将更高范围数据类型的变量的值分配给较低范围数据类型的变量，因为进行此类分配时可能会损失精度。要从int到byte进行这样的赋值，你必须使用一个转换，就像在long-to-int赋值的情况下一样。

> b1 = (byte)num1; // Ok

Java有一个类Byte（注意大写字母B in Byte），它定义了两个常量来表示字节数据类型的最大值和最小值Byte.MAX_VALUE和Byte.MIN_VALUE。

> byte max = Byte.MAX_VALUE;
byte min = Byte.MIN_VALUE;

4) short

short数据类型是16位签名的Java原语整数数据类型。其范围为-32768至32767（或-215至215 - 1）。不像int和long literals，没有简短的字面意思。但是，您可以将short范围（-32768至32767）中的任何int文字分配给一个short变量。例如，


> short s1 = 12905;   // ok
short s2 = -11890;  // ok

由于字节数据类型的范围在short数据类型的范围内，所以字节变量的值始终可以分配给一个short变量。将值从int或long变量赋值给short变量的所有其他规则与字节变量相同。

Java有一个叫做Short的类（注意大写字母S in Short），它定义了两个常量来表示短数据类型的最小值和最小值Short.MAX_VALUE和Short.MIN_VALUE。

> short max = Short.MAX_VALUE;
short min = Short.MIN_VALUE;

5) char

char数据类型是16位无符号Java原语数据类型。它代表一个Unicode字符。请注意，char是一个无符号数据类型。因此，char变量不能为负值。 char数据类型的范围为0到65535，与Unicode集的范围相同。字符文字表示char数据类型的值。

``` java
char c1 = 'A';
char c2 = 'L';
char c3 = '5';
char c4 = '/';
```
字符文字也可以表示为字符转义序列。字符转义序列以反斜杠开头，紧跟着一个字符，并且都用单引号括起来。有八个预定义的字符转义序列如下所示：

``` livescript
‘\n’	A linefeed
‘\r’	A carriage return
‘\f’	A form feed
‘\b’	A backspace
‘\t’	A tab
‘\\’	A backslash
‘\”‘	A double quote
‘\”	  A single quote
```
这些Java中只有八个字符的转义序列。您无法定义自己的字符转义序列。 字符文字也可以以“\ uxxxx”的形式表示为Unicode转义序列，这里，\ u（紧随其后的小写字母u）的反斜杠表示Unicode转义序列的开始，xxxx表示正好四个十六进制数字。

> char c1 = 'A';
char c2 = '\u0041';  // Same as c2 = 'A'

## Floating-Point Data Types

包含小数部分的浮点数称为实数，例如3.25,0.49，-9.19等。当实数转换为其二进制表示时，计算机还必须存储小数点的位置数量内。在计算机内存中存储实数有两种策略。

a）仅存储数字的二进制表示，并假设在点之前和之后总是有固定数字的数字。一个点在二进制表示中称为数字的十进制表示中的小数点和二进制点。点的位置总是固定在一个数字中的表示的类型被称为“定点”数字格式。

b）将实数的二进制表示和点的位置存储在实数中。由于点数之前和之后的数字可以在实数的这种表示形式中变化，所以我们说点可以浮动。这种表示形式称为“浮点型”格式。

与定点表示相比，浮点表示更慢，更不准确。然而，与定点表示相比，浮点表示可以使用相同的计算机内存来处理更大范围的数字。

Java支持浮点数格式。 Java有两个浮点数值类型：float和double。

6) float

浮点数据类型使用32位来存储IEEE 754标准格式（单精度浮点数）中的浮点数。它可以代表一个小到1.4 x 10-45的实数，大小可达3.4 x 1038（约）。范围仅包括幅度。它可能是积极的或消极的。

以f或F结尾的所有实数都称为浮点数。

``` java
float f1 = 8F;
float f2 = 8.F;
float f3 = 8.0F;
```

浮点数据类型定义了两个无穷大：正无穷大和负无穷大。例如，2.5F除以0.0F的结果是浮动正无穷大，而2.5F除以-0.0F的结果是浮动负无穷大。 没有定义浮动操作的一些操作结果。这些结果由称为NaN（Not-a-Number）的浮点数据类型的特殊值表示。 Java有一个Float类（注意Float中的大写F），它定义了三个常量，它们表示浮点数据类型的正无穷大，负无穷大和NaN。还有两个常量，它们表示可以存储在浮点数变量中的最大值和最小值（大于零）的浮点值。


``` stylus
Float.POSITIVE_INFINITY - Positive infinity of type float.
Float.NEGATIVE_INFINITY - Negative infinity of type float.
Float.NaN - Not a Number of type float.
Float.MAX_VALUE - The largest positive value that can be represented in a float variable.
Float.MIN_VALUE - The smallest positive value greater than zero that can be represented in a float variable.
```


> 请注意，所有积分类型（int，long，byte，short和char）的值可以分配给浮点数据类型的变量，而不使用显式转换，但必须先将浮点值分配给任何整数数据类型的变量int，long，byte，short或char。

7) double

双数据类型使用64位以IEEE 754标准格式存储浮点数。根据IEEE 754标准以64位表示的浮点数也称为双精度浮点数。

所有实数都称为双字面值。双字面量可以任选以d或D结尾，例如19.27d。但是，后缀d或D在双字面值中是可选的。也就是说，19.27和19.27d都代表相同的双字面值。

``` java
double d1 = 8D
double d2 = 8.;
double d3 = 8.0;
double d4 = 8.D;
```
像float数据类型一样，双重数据类型定义了两个零，两个无穷大和一个NaN。


``` java
Double.POSITIVE_INFINITY - Positive infinity of type double.
Double.NEGATIVE_INFINITY - Negative infinity of type double.
Double.NaN - Not a Number of type double.
Double.MAX_VALUE - The largest positive value that can be represented in a double variable.
Double.MIN_VALUE - The smallest positive value greater than zero that can be represented in a double variable.
```


## Boolean

8) boolean

布尔数据类型只有两个有效值：true和false。这两个值称为布尔文字。您可以使用布尔文字作为

``` java
boolean done; // Declares a boolean variable named done
done = true;  // Assigns true to done
```
需要注意的一点是布尔变量不能转换为任何其他数据类型，反之亦然。 Java不指定布尔数据类型的大小。它的大小由JVM实现。通常，布尔数据类型的值在内部存储在一个字节中。

这就是java中可用的8种原始数据类型。