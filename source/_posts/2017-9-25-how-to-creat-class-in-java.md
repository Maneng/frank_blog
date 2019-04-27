---
layout: post
title: how-to-creat-class-in-java
categories: Java Basic
tags:  java 
author: Marnner
excerpt: how-to-creat-class-in-java
grammar_cjkRuby: true
---

* content
{:toc}

# How to create a class in Java?


## 介绍

类是面向对象范式中编程的基本单元。在本教程中，我们将在Java中编写一个类时，将需要了解一些基本但重要的内容。

在Java中，类用作创建对象的模板。我们来讨论如何定义一个类。 Java中的一个类可能包含五个组件：

1.Fields 字段
2.Methods 方法
3.Constructors 构造器
4.Static initializers 静态初始化器
5.Instance initializers 实例初始化器

字段和方法也称为类的成员。其余3个组件用于初始化类，即使用类模板创建对象。构造函数用于创建类的对象。您必须至少有一个类的构造函数（如果您明确声明，则JVM为您注册默认引用）。初始化器用于初始化类的字段。您可以拥有零个或多个静态或实例类型的初始值。

## 怎么样来声明一个类

在Java中声明一个类的一般语法是：

``` java
<<modifiers>> class <<class name>> {
        // Body of the class goes here
}
```

类声明可能有零个或多个修饰符。关键字类用于声明一个类。 << class name >>是用户定义的类的名称，它应该是有效的标识符。每个类都有一个主体，它在一对大括号（{}）中指定。类的主体包含其不同的组件，例如字段，方法等。


下面是定义一个类的例子：

``` java
// Main.java filename
class Main {
    // Empty body for now; Write you own
}
```


## 如何在类中声明字段

类的字段表示该类对象的属性(也称为属性)。字段在类的主体内声明。在类中声明字段的一般语法是:


``` java
<<modifiers>> class <<class name>> {
        // A field declaration
        <<modifiers>> <<data type>> <<field name>> = <<initial value>>;
}
```
假设人类的每一个物体都有两个属性：一个名字和一个性别。人类应包括两个字段的声明：一个表示名称，一个表示性别。所以声明的字段将如下所示：


``` java
// Human.java
class Human {
        String name;
        String gender;
}
```
在这里，Human类声明了两个字段:名称和性别。两个字段都是字符串类型。Human类的每个实例(或对象)都将具有这两个字段的副本。

## 创建类的实例

下面是创建类实例的一般语法:

``` java
<<Class>> <<variable>> = new <<Call to Class Constructor>>;
 
//e.g.
 
Human h = new Human();
```
当您不向类添加构造函数时，Java编译器会为您添加一个构造函数。由Java编译器添加的构造函数称为默认构造函数。默认构造函数不接受参数。类的构造函数的名称与类名相同。新的操作符后面是一个调用该类的构造函数的调用，它的实例正在被创建。新操作符通过在堆上分配内存来创建一个类的实例。

## null引用类型

Java有一个特殊的引用类型，称为null类型。它没有名字因此，您无法定义空引用类型的变量。空引用类型只有一个由Java定义的值，它是空文本。它只是空。空引用类型是与任何其他引用类型兼容的赋值。也就是说，您可以为任何引用类型的变量分配一个空值。实际上，存储在引用类型变量中的空值意味着引用变量是指没有对象。


``` java
// Assign null value to john
Human john = null;  // john is not referring to any object
john = new Human(); // Now, john is referring to a valid Human object
```
注意，null是null类型的文字。您不能将null赋值给原始类型变量，这就是为什么java编译器不允许您将原始值与null值进行比较。

## 构造函数

构造函数是一个命名的代码块，用于在对象创建后立即初始化类的对象。构造函数声明的一般语法是：


``` java
<<Modifiers>> <<Constructor Name>>(<<parameters list>>) throws <<Exceptions list>> {
        // Body of constructor goes here
}
```


构造函数可以将其访问修饰符设置为public，private，protected或package-level（无修饰符）。构造函数名称与类的简单名称相同。构造函数名称后面是一对开和括号，可以包括参数。右括号后面可以是关键字throws，后者是逗号分隔的异常列表。

与方法不同，构造函数没有返回类型。您甚至不能将void指定为构造函数的返回类型。如果有任何返回类型，那么它就是方法。记住，如果构造的名称与类的简单名称相同，那么它可以是一个方法或构造函数。如果它指定了返回类型，则它是一个方法。如果它没有指定返回类型，则它是一个构造函数。

## 实例初始化块

你看到一个构造函数用于初始化一个类的实例。实例初始化块（也称为实例初始化程序）也用于初始化类的对象。一个实例初始化器只是一个类的一个代码块，但在任何方法或构造函数之外。实例初始化程序没有名称。它的代码简单地放在一个开放的大括号和一个关闭括号内。

请注意，实例初始化程序在实例上下文中执行，关键字在实例初始化程序中可用。

``` java
// An instance initializer
{
        /* Other code for the instance initializer goes here */
}
```


您可以为类创建多个实例初始值。对于您创建的每个对象，所有这些都以文本顺序自动执行。所有实例初始化程序的代码都在任何构造函数之前执行。

一个实例初始化器不能有一个返回语句。它不能抛出检查异常，除非所有声明的构造函数在其throws子句中列出这些检查的异常。

## 静态初始化块

静态初始化块也称为静态初始化程序。它类似于实例初始化块。它用于初始化一个类。每个对象执行一次实例初始化程序，而当类定义加载到JVM中时，静态初始化程序只对类执行一次。为了将其与实例初始化程序区分开，您需要在其声明开头使用static关键字。


你可以在一个类中有多个静态初始化器。所有的静态初始化器都按照出现的文本顺序执行，并在任何实例初始化器之前执行。

``` java
// An static initializer
static {
        /* Other code for the static initializer goes here */
}
```

静态初始化器不能抛出已检查的异常，也不能有返回语句。


