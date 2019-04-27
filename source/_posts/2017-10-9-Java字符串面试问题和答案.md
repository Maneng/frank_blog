---
layout: post
title: Java字符串面试问题和答案
categories: Java
tags:  java面试 
author: Marnner
excerpt: Java字符串面试问题和答案
grammar_cjkRuby: true
---

* content
{:toc}



# Java字符串面试问题和答案

我们所有人都必须通过在java中与String类相关的面试问题。这些问题从不变性到内存泄漏问题。我将尽力在这篇文章中回答这些问题。



字符串面试问题讨论如下：



- 为什么字符串是不可变的？
- 字符串池的概念
- 关键字'intern'的用法
- 匹配正则表达式？
- 字符串比较？
- 内存泄漏问题

在Java中的字符串就像任何其他编程语言，字符序列。这更像是一个工具类来处理该字符序列。这个字符序列保存在以下变量中：



```java
/** The value is used for character storage. */
private final char value[];

要在不同的场景下访问这个数组，可以使用以下变量：

/** The offset is the first index of the storage that is used. */
private final int offset;
 
/** The count is the number of characters in the String. */
private final int count;
```





## 为什么字符串是不可变的？



我们都知道在java中的字符串是不可变的。如果你想知道，什么是不变性，是如何实现的？遵循这个职位：如何使一个Java类不可变？



这里的问题是为什么？为什么不可变？让我们分析一下。



- 我能想到的第一个原因是性能提高。开发Java语言是为了加快应用程序开发速度，因为在以前的语言中速度并不快。 JVM设计人员必须足够聪明，以确定真实世界的应用程序将主要由标签，消息，配置，输出等多种方式的字符串组成。看到这样的过度使用，他们想象出String的不当使用是多么危险。因此，他们提出了字符串池的概念(下一节)。字符串池不过是一些字符串的集合，大部分是唯一的。字符串池背后的基本思想是重复使用一次创建的字符串。这样，如果一个特定的字符串在代码中创建了20次，应用程序最终只有一个实例。
- 第二个原因，我把它视为安全考虑。字符串是Java编程各个方面中使用最多的参数类型。无论是加载驱动程序或打开一个URL连接，你需要以字符串的形式作为参数传递信息。如果字符串不是final，那么他们已经打开了一个安全问题的潘多拉盒子，我们所有人都必须通过在java中与String类相关的面试问题。这些问题从不变性到内存泄漏问题。我将尽力在这篇文章中回答这些问题。

## 字符串池的概念

字符串池是一个特殊的内存区域，与常规的堆内存不同，这些内存是存储这些字符串常量的。这些对象在应用程序的生命周期中被称为字符串变量。



在Java中，可以通过多种方式创建字符串。让我们了解他们：



### 1）String 赋值

> `String str = ``"abc"``;`

上面的代码会导致JVM验证是否已经有一个字符串“abc”(相同的char序列)。如果存在这样的字符串，则JVM只将现有对象的引用分配给变量str，否则将创建一个新的对象“abc”，并将其引用分配给变量str。



### 2) Using new keyword

> `String str = new String("abc");`

这个版本最终在内存中创建两个对象。字符串池中的一个对象具有字符序列“abc”，第二个字符在变量str引用的堆内存中，并且具有与“abc”相同的字符序列。



正如Java文档所说：除非需要原始的显式副本，否则使用此构造函数是不必要的，因为字符串是不可变的。



### Keyword ‘intern’ usage

当调用intern（）方法时，如果池已经包含一个与equals（Object）方法确定的String对象相等的字符串，则返回该字符串。否则，将此String对象添加到池中，并返回对此String对象的引用。



```java
String str = new String("abc");
 
str.intern();

```



因此，对于任何两个字符串s和t，当且仅当s.equals（t）为真时，s.intern（）== t.intern（）才为真。意思是如果s和t都是不同的字符串对象并且具有相同的字符序列，则在两者上调用intern（）将导致由这两个变量引用的单个字符串池字面量。





## 匹配正则表达式

如果你还没有探索过它，那么不是那么秘密而有用的功能。您必须已经看到使用Pattern和Matcher进行正则表达式匹配。 String类提供了自己的捷径。直接使用它。该方法也使用函数定义中的Pattern.matches（）。



```java
String str = new String("abc");
 
str.matches("<regex>");
```



### 字符串比较



面试中另一个最喜欢的领域。通常有两种方法来比较对象



- 使用==运算符
- 使用equals（）方法

==运算符比较对象引用，即内存地址相等。因此，如果两个字符串对象在字符串池中引用相同的字面值，或者堆中的字符串对象相同，则s == t将返回true，否则返回false。



equals（）方法在String类中被覆盖，并验证字符串对象持有的字符序列。如果它们存储相同的字符序列，则s.equals（t）将返回true，否则返回false。



## 内存泄漏问题



直到现在我们经历了基本的东西。现在有些严重。您是否尝试过从字符串对象创建子字符串？我敢打赌，是的。你知道在Java中的子串的内部。他们如何造成内存泄漏？



java中的子字符串是使用method substring（int beginIndex）和这个方法的一些其他重载形式创建的。所有这些方法创建一个新的String对象，并更新我们在本文开头看到的offset和count变量。



原始的**value[] **是不变的。因此，如果你创建一个有10000个字符的字符串，并在每个字符中创建100个5-10字符的子字符串，那么所有101个对象将具有相同大小为10000个字符的字符数组。。毫无疑问，这是内存浪费。

让我们看看这个使用程序：

```java
import java.lang.reflect.Field;
import java.util.Arrays;
 
public class SubStringTest {
    public static void main(String[] args) throws Exception
    {
        //Our main String
        String mainString = "i_love_java";
        //Substring holds value 'java'
        String subString = mainString.substring(7);
 
        System.out.println(mainString);
        System.out.println(subString);
 
        //Lets see what's inside mainString
        Field innerCharArray = String.class.getDeclaredField("value");
        innerCharArray.setAccessible(true);
        char[] chars = (char[]) innerCharArray.get(mainString);
        System.out.println(Arrays.toString(chars));
 
        //Now peek inside subString
        chars = (char[]) innerCharArray.get(subString);
        System.out.println(Arrays.toString(chars));
    }
}
 
Output:
 
i_love_java
java
[i, _, l, o, v, e, _, j, a, v, a]
[i, _, l, o, v, e, _, j, a, v, a]
```

显然，两个对象都有相同的字符数组存储，而子字符串只需要四个字符。



让我们用自己的代码解决这个问题：

```java

import java.lang.reflect.Field;
import java.util.Arrays;
 
public class SubStringTest
{
    public static void main(String[] args) throws Exception
    {
        //Our main String
        String mainString = "i_love_java";
        //Substring holds value 'java'
        String subString = fancySubstring(7, mainString);
 
        System.out.println(mainString);
        System.out.println(subString);
 
        //Lets see what's inside mainString
        Field innerCharArray = String.class.getDeclaredField("value");
        innerCharArray.setAccessible(true);
        char[] chars = (char[]) innerCharArray.get(mainString);
        System.out.println(Arrays.toString(chars));
 
        //Now peek inside subString
        chars = (char[]) innerCharArray.get(subString);
        System.out.println(Arrays.toString(chars));
    }
 
    //Our new method prevents memory leakage
    public static String fancySubstring(int beginIndex, String original)
    {
        return new String(original.substring(beginIndex));
    }
}
 
Output:
 
i_love_java
java
[i, _, l, o, v, e, _, j, a, v, a]
[j, a, v, a]
```

现在子字符串只有它需要的字符，用来创建正确子字符串的中间字符串可以被垃圾回收，因此不会留下内存占用。



