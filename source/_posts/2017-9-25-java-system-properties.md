---
layout: post
title: Java-System-Properties
categories: Java Basic
tags:  java 
author: Marnner
excerpt: Java System Properties
grammar_cjkRuby: true
---


* content
{:toc}


## 介绍

Java为其操作维护一组系统属性。每个java系统属性都是一个键值（String-String）对，例如“java.version”=“1.7.0_09”。您可以通过System.getProperties（）检索所有系统属性，也可以通过System.getProperty（key）检索单个属性。

请注意，访问系统属性可能受Java安全管理器和策略文件的限制。默认情况下，Java程序具有对所有系统属性的无限制访问权限。

## 重要的Java系统属性

### 1. JRE相关系统属性


| java.home            | JRE home directory, e.g., “C:\Program Files\Java\jdk1.7.0_09\jre”.                                                           
| java.library         | JRE library search path for search native libraries. It is usually but not necessarily taken from the environment variable PATH. |
| java.class.path      | JRE CLASSPATH, e.g., . (for current working directory).                                                                          |
| java.ext.dirs        | JRE extension library path(s), e.g, “C:\Program Files\Java\jdk1.7.0_09\jre\lib\ext;C:\Windows\Sun\Java\lib\ext”.               |
| java.version         | JRE version, e.g., 1.7.0_09.                                                                                                     |
| java.runtime.version | JRE version, e.g. 1.7.0_09-b05.                                                                                                  |

### 文件相关的系统属性

| file.separator | symbol for file directory separator such as d:\test\test.java. The default is \ for windows or / for Unix/Mac.  |
| path.separator | symbol for separating path entries, e.g., in PATH or CLASSPATH. The default is ; for windows or : for Unix/Mac. |
| line.separator |    symbol for end-of-line (or new line). The default is “\r\n” for windows or “\n” for Unix/Mac OS X.                                                                                                             |

### 用户相关的系统属性


| user.name  | the user’s name.  |
| user.home | the user’s home directory. |
| user.dir  |               the user’s current working directory.      |

### 操作系统相关的系统属性

| os.name    | the OS’s name, e.g., “Windows 7”.   |
| os.version | the OS’s version, e.g., “6.1”.      |
| os.arch    | the OS’s architecture, e.g., “x86”. |


## 获得系统属性

如前所述，您可以通过System.getProperties（）获取所有系统属性，也可以通过System.getProperty（key）检索单个属性。


``` java
import java.util.Properties;
public class PrintSystemProperties
{
   public static void main(String[] a)
   {
      // List all System properties
      Properties pros = System.getProperties();
      pros.list(System.out);
  
      // Get a particular System property given its key
      // Return the property value or null
      System.out.println(System.getProperty("java.home"));
      System.out.println(System.getProperty("java.library.path"));
      System.out.println(System.getProperty("java.ext.dirs"));
      System.out.println(System.getProperty("java.class.path"));
   }
}
```

## 设置系统属性

在java中，您可以从命令工具或java代码本身设置自定义的系统属性。

1. 从命令行设置系统属性
>  java -DCUSTOM_KEY=”CUSTOM_VALUE” your_application

2. 使用System.setProperty（）方法从代码设置系统属性
> System.setProperty("CUSTOM_KEY", "CUSTOM_VALUE");