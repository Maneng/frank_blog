---
layout: post
title: 核心Java面试问题 - 第2部分
categories: Java
tags:  java面试 
author: Marnner
excerpt: 核心Java面试问题 - 第2部分
grammar_cjkRuby: true
---

* content
{:toc}


# 核心Java面试问题 - 第2部分

在Java面试问题系列中：第1部分，我们讨论了面试官大部分时间要问的一些重要问题。现在是时候进行讨论了。在这篇文章中，我将在下面给出问题列表.



## 为什么finalize（）方法应该避免？

我们都知道finalize（）方法是在回收分配给对象的内存之前被垃圾回收线程调用的基本语句。

```java
public class TryCatchFinallyTest implements Runnable {
 
    private void testMethod() throws InterruptedException
    {
        try
        {
            System.out.println("In try block");
            throw new NullPointerException();
        }
        catch(NullPointerException npe)
        {
            System.out.println("In catch block");
        }
        finally
        {
            System.out.println("In finally block");
        }
    }
 
    @Override
    protected void finalize() throws Throwable {
        System.out.println("In finalize block");
        super.finalize();
    }
 
    @Override
    public void run() {
        try {
            testMethod();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

```java
public class TestMain
{
    @SuppressWarnings("deprecation")
    public static void main(String[] args) {
    for(int i=1;i<=3;i++)
    {
        new Thread(new TryCatchFinallyTest()).start();
    }
    }
}
 
Output:
 
In try block
In catch block
In finally block
In try block
In catch block
In finally block
In try block
In catch block
In finally block
```

令人惊讶的是，finalize方法并没有执行任何线程。所以这证明了我已经说过了。我能想到的原因是：终结器是由垃圾收集器的一个单独的线程执行的。如果JVM过早退出，垃圾收集器没有足够的时间来创建和执行终结器。

事实上finalize（）调用是不能保证的。原因是：

- finalize()方法不像构造函数那样在链式构造器中工作。这意味着，当您调用构造函数时，所有超类的构造函数都将隐式调用。但是，在finalize 方法确定的情况下，这是不遵循的。超类的finalize()应该被显式调用。
- finalize方法引发的任何异常都被GC线程忽略，并且不会被进一步传播，事实上它不会被记录到日志文件中。那么糟糕，不是吗？
- 另外，当你的类中包含finalize（）时，会有一些性能损失。在Effective java（第2版）Joshua bloch说：
  - 哦，还有一件事:使用终结器会有严重的性能损失。在我的机器上，创建和销毁一个简单对象的时间约为5.6个ns。添加终结器可以增加2400个ns的时间。换句话说，用终结器创建和销毁对象的速度要慢430倍

## 为什么HashMap不应该用在多线程环境中？它能造成无限循环吗？

我们知道HashMap是非同步集合，其中同步的对应部分是HashTable。因此，当您在多线程环境中访问集合并且所有线程正在访问单个集合实例时，则出于各种显而易见的原因使用HashTable更安全。例如避免脏读和保持数据的一致性。在最坏的情况下，这个多线程环境也会导致无限循环。



是的，它是真实的。 HashMap.get（）会导致无限循环。让我们看看怎么样？

如果您查看源代码HashMap.get（Object key）方法，它看起来像这样：

```java
public Object get(Object key) {
    Object k = maskNull(key);
    int hash = hash(k);
    int i = indexFor(hash, table.length);
    Entry e = table[i];
    while (true) {
        if (e == null)
            return e;
        if (e.hash == hash &amp;&amp; eq(k, e.key))
            return e.value;
        e = e.next;
    }
}
```

while（true）{...}总是可以在多线程环境下运行时成为无限循环的牺牲品，IF，e.next可以指向自己。这将导致无限循环。但是，e.next如何指向自己（即）。

这可能发生在void传递（Entry [] newTable）方法中，在HashMap调整大小时被调用。



```java
do {
    Entry next = e.next;
    int i = indexFor(e.hash, newCapacity);
    e.next = newTable[i];
    newTable[i] = e;
    e = next;
} while (e != null);
```

这段代码容易产生上述情况，如果调整大小发生，同时其他线程试图修改map。

唯一避免这种情况的方法是在代码中使用同步，或者更好地使用同步收集。实例。



## 解释抽象和封装？他们有什么关系？

### 抽象

> 抽象仅捕获与当前透视图相关的对象的细节。

在面向对象编程理论中，抽象涉及定义对象的工具，这些对象代表可以执行工作，报告和改变其状态以及与系统中的其他对象“通信”的抽象“参与者”。



一般抽象有两种方式：

1. 数据抽象是创建复杂数据类型和公开只有有意义的操作与数据类型交互的方式，其中隐藏了所有实现细节。
2. 控制抽象是识别所有这些语句并将它们作为工作单元公开的过程。当我们创建一个函数来执行任何工作时，我们通常使用这个特性。

### 封装

> 将类内的数据和方法与实现隐藏(通过访问控制)结合起来通常被称为封装。结果是具有特征和行为的数据类型。封装本质上既包括信息隐藏和实现隐藏。

**Whatever changes, encapsulate it**:

它被引用为著名的设计原则。在任何一个类中，在运行时的数据中都可能发生更改，并且在将来的版本中可能会发生更改。因此，封装既适用于数据，也适用于实现。

所以，他们可以关联如下：

抽象更多的是“一个class可以做什么”。 [Idea]

封装更多的是如何实现这一功能。 [Implementation]



## StringBuffer如何节省内存？

一个字符串被实现为一个不可变的对象;也就是说，当你最初决定把一些东西放入一个String对象时，JVM就会分配一个固定宽度的数组，它的大小和你的初始值。然后将其作为JVM中的常量处理，在字符串的值没有改变的情况下，它允许非常显著的性能节省。但是，如果您决定以任何方式更改字符串的内容，那么JVM实际上做的是将原始字符串的内容复制到一个临时空间中，进行更改，然后将这些更改保存到一个全新的内存数组中。因此，在初始化后对字符串的值进行更改是相当昂贵的操作。

另一方面，StringBuffer是在JVM中作为一个动态可增长的数组实现的，这意味着任何更改操作都可以发生在现有的内存位置上，只有在需要时才会分配新的内存。但是，JVM没有机会对StringBuffer进行优化，因为它的内容在任何情况下都是可以改变的。

## 如果您的Serializable类包含不可序列化的成员，会发生什么？你如何解决它？

在这种情况下，NotSerializableException将在运行时抛出。为了解决这个问题，一个非常简单的解决方法就是标记这样的字段。这意味着这些字段不会被序列化。如果您希望保存这些字段的状态，那么您应该考虑已经实现Serializable接口的引用变量。

您也可能需要使用readResolve（）和writeResolve（）方法。让我们总结一下：

- 首先，让你的不可序列化的字段transient
- 在writeObject（）中，首先调用流的defaultWriteObject（）来存储所有的非瞬态字段，然后调用其他方法来序列化不可序列化对象的各个属性。
- 在readObject()中，在流中首先调用defaultReadObject()来读取所有非暂态字段，然后调用其他方法(对应于添加到writeObject的那些方法)来反序列化您的非序列化对象。



## 解释在Java中的transient 和volatile 关键字？

### Transient

Java中的transient关键字用于表示一个字段不应被序列化。根据语言规范:变量可能被标记为瞬态，表示它们不是对象的持久状态的一部分。例如，您可能有来自其他字段的字段，而且应该只是通过编程方式完成，而不是通过序列化来持久化状态。



如果我们回忆一下，java中的每个线程都有它自己的本地内存空间，并且它在本地内存中执行所有读/写操作。一旦完成所有操作，它就会在主内存中，从所有线程访问这个变量的地方回写修改后的变量状态。通常，这是JVM内部的默认流。但是，volatile修饰符告诉JVM，访问该变量的线程必须始终将其自身的变量副本与内存中的主副本协调。它意味着每次线程要读取变量状态时，它必须刷新本地内存状态并更新

### Volatile

volatile在无锁算法中非常有用。你变量持有共享数据标记为不稳定,当你不使用锁来访问该变量和你想要更改由一个线程是可见的在另一个,或者你想创建一个“之后”关系,确保计算不是重新定购商品,再一次,以确保更改成为可见的在适当的时候。

应该使用volatile来在多线程环境中安全地发布不可变对象。声明像public volatile ImmutableObject foo这样的字段可以确保所有线程始终能够看到当前可用的实例引用。



## Iterator和ListIterator之间的区别？

我们可以使用Iterator来遍历集合或列表或映射。但是ListIterator只能用于遍历列表。其他差异可以列在下面。





```java
List<String> names = new ArrayList<String>();
names.add("Alex");
names.add("Bob");
names.add("Charles");
System.out.println(names);
 
ListIterator<String> listIterator = names.listIterator();
 
//Add a value at any place using ListIterator
while(listIterator.hasNext()){
    listIterator.next();
    listIterator.add("Lokesh");
}
System.out.println(names);
 
listIterator = names.listIterator();
 
//Set a value at any place using ListIterator
while(listIterator.hasNext()){
    listIterator.next();
    listIterator.set("John");
}
System.out.println(names);
 
Output:
 
[Alex, Bob, Charles]
[Alex, Lokesh, Bob, Lokesh, Charles, Lokesh]
[John, John, John, John, John, John]
```



显然，我可以在列表中的随机位置添加元素，同时迭代它 - 类似地，我也可以更改任何元素。使用迭代器，这是不可能的。

