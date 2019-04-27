---
layout: post
title: static-import-declarationgs-in-java
categories: Java Basic
tags:  java 
author: Marnner
excerpt: static-import-declarationgs-in-java
grammar_cjkRuby: true
---

* content
{:toc}


## 简介


正常的导入声明从包中导入类，这样它们就可以在没有包引用的情况下使用。类似地，静态导入声明从类中导入静态成员，并允许它们在没有类引用的情况下使用。

静态导入声明还有两种方式：单个静态导入和按需静态导入。单个静态导入声明从类型导入一个静态成员。静态导入按需声明导入类型的所有静态成员。静态导入声明的一般语法如下：

``` java
//Single-static-import declaration:
 
import static <<package name>>.<<type name>>.<<static member name>>;
 
//Static-import-on-demand declaration:
 
import static <<package name>>.<<type name>>.*;
```


## 静态导入示例

比如，您记得使用System.out.println（）方法在标准输出中打印消息吗。 System是java.lang包中的一个名为out的静态变量的类。当您使用System.out时，实际上指的是System类中的该静态变量。您可以使用静态导入声明从System类中导出out静态变量，如下所示：

> import static java.lang.System.out;

你的代码现在可以使用这个名字来表示你的程序中的System.out。编译器将使用静态导入声明将名称解析为System.out。

## 静态导入规则

以下是静态导入声明的一些重要规则。

1)如果导入了具有相同简单名称的两个静态成员，一个使用单静态导入声明，另一个使用静态导入按需声明，则使用单静态导入声明导入的一个静态成员优先。


假设有两个类，即package1.Class1和package2.Class2。这两个类都有一个叫做methodA的静态方法。以下代码将使用package1.Class1.methodA（）方法，因为它是使用单静态导入声明导入的：

``` java
import static package1.Class1.methodA; // Imports Class1.methodA() method
import static package2.Class2.*;  // Imports Class2.methodA() method too
  
public class Test {
        public static void main(String[] args) {
                methodA();   // Class1.methodA() will be called
        }
}
```
2)不允许使用单静态导入声明导入具有相同简单名称的两个静态成员。以下静态导入声明会生成错误，因为它们都使用相同的简单名称methodA导入静态成员：

> import static package1.Class1.methodA;
import static package1.Class2.methodA; // An error

3）如果使用单静态导入声明导入静态成员，并且在同一个类中存在同名的静态成员，则使用该类中的静态成员。

``` java
// A.java
package package1;
  
public class A {
        public static void test() {
                System.out.println("package1.A.test()");
        }
}
  
// Test.java
package package2;
  
import static package1.A.test;
  
public class Test {
        public static void main(String[] args) {
                test(); // Will use package2.Test.test() method, not package1.A.test() method
        }
  
        public static void test() {
                System.out.println("package2.Test.test()");
        }
}
 
Output:
 
package2.Test.test()
```


## 总结

我们可以看到静态导入可以帮助您使用静态成员的简单名称来使程序更容易写入和读取。有时静态导入可能在您的程序中引入微妙的错误，这可能很难调试。建议您不要使用静态导入，或者只在极少数情况下使用。