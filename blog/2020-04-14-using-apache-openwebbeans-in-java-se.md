---
slug: using-apache-openwebbeans-in-java-se
title: 'Using Apache OpenWebBeans in Java SE'
authors: [daniel]
tags: [Java, Apache]
---


# Using Apache OpenWebBeans in Java SE

![](https://openwebbeans.apache.org/resources/images/logo.png)

This post have objective to show how configure the Apache OpenWebBeans in our Java SE applications . So, this post will be short : )

This is my first article in English, Please, enjoy the subject . And sorry by the grammatical mistakes.

<!-- truncate -->

## Introduction at Apache OpenWebBeans

Apache OpenWebBeans is an other CDI([Contexts and Dependency injection](https://jcp.org/en/jsr/detail?id=346)) implementation for Jakarta EE , in your current version implements the CDI 2.0 .

Different of Weld that is the reference implementation, that may be is more known , the OpenWebBeans too have your the light : )

According with the site , OpenWebBeans is :

* Fast :we agressively use caches internally and deliver great performance

* Modular : OpenWebBeans Core is purely JavaSE, additional EE functionality gets added via ‘Modules’

* Industry Proven : Many projects use OpenWebBeans in production.

* Community Oriented : Please visit our mailing list and we will help you moving your project forward.

The application Server how TomEE use the Apache OpenWebBeans how your CDI container .

Next step is create an simple Hello World application for use the OpenWebBeans in Java SE .

## Creating the project

First create a new maven project with the following pom.xml:

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.medium.danieldiasjava.openwebbean</groupId>
    <artifactId>openwebbean</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>OpenWebBean CDI</name>
    <description>openWebBeanCDI</description>

    <properties>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>${maven.compiler.source}</maven.compiler.target>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.apache.openwebbeans</groupId>
            <artifactId>openwebbeans-se</artifactId>
            <version>2.0.16</version>
        </dependency>

       <dependency>
            <groupId>javax.enterprise</groupId>
            <artifactId>cdi-api</artifactId>
            <version>2.0</version>
        </dependency>

    </dependencies>

    <build>
        <finalName>openWebBeanCDI</finalName>
    </build>
</project>

```

Here we have two dependencies , one is **openwebeans-se** and other is the spec of **CDI 2.0 .**

The **openwebeans-se **contains the jars needed for use the CDI that is :

* [openwebbeans-impl](https://mvnrepository.com/artifact/org.apache.openwebbeans/openwebbeans-impl)

* [geronimo-jcdi_2.0_spec](https://mvnrepository.com/artifact/org.apache.geronimo.specs/geronimo-jcdi_2.0_spec)

* [geronimo-el_2.2_spec](https://mvnrepository.com/artifact/org.apache.geronimo.specs/geronimo-el_2.2_spec)

* [geronimo-annotation_1.3_spec](https://mvnrepository.com/artifact/org.apache.geronimo.specs/geronimo-annotation_1.3_spec)

* [geronimo-atinject_1.0_spec](https://mvnrepository.com/artifact/org.apache.geronimo.specs/geronimo-atinject_1.0_spec)

* [geronimo-interceptor_1.2_spec](https://mvnrepository.com/artifact/org.apache.geronimo.specs/geronimo-interceptor_1.2_spec)

He is very similar at weld-se-shaded for Weld .

too in folder resources/META-INF , create an file** beans.xml **with the content :

```xml
<?xml version="1.0"?>
<beans bean-discovery-mode="all" version="2.0"
 xmlns="http://xmlns.jcp.org/xml/ns/javaee"
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
 xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee 
                     http://xmlns.jcp.org/xml/ns/javaee/beans_2_0.xsd"/>

```

## Creating the Classes

Now we are will create an class with name MyBean :

```java
package com.medium.danieldiasjava.openwebeans.controller;

import javax.inject.Named;

@Named
public class MyBean {

   public void getHelloBean(String name) {
       System.out.println("Hello " + name + " the OpenWebBeans started successfully !");
   }
}
```

Here I create an simple class that contains a unique method **getHelloBean()** and in top of our class utilize the annotation [**@Named](https://docs.jboss.org/cdi/spec/2.0/cdi-spec.html#named_at_injection_point)** that is necessary to your correct working com OpenWebBeans in Java SE .

Now we are will create the Main Class with the following content and is where the magic happens :

```java
package com.medium.danieldiasjava.openwebeans.application;

import javax.enterprise.inject.spi.Bean;
import javax.enterprise.inject.spi.BeanManager;

import com.medium.danieldiasjava.openwebeans.controller.MyBean;

import org.apache.webbeans.config.WebBeansContext;
import org.apache.webbeans.spi.ContainerLifecycle;

public class OpenWebBeansApplication {
    
    private static ContainerLifecycle lifecycle = null;

    public static void main(String[] args) {

        lifecycle = WebBeansContext.getInstance().getService(ContainerLifecycle.class);
        lifecycle.startApplication(null);

       BeanManager beanManager = lifecycle.getBeanManager();
       Bean<?> bean = beanManager.getBeans("myBean").iterator().next();

       MyBean myBean = (MyBean) beanManager.getReference(bean, MyBean.class, beanManager.createCreationalContext(bean));

       myBean.getHelloBean("Daniel Dias");
    }
}
```

This is a simple class main that makes the configuration to use the OpenWebBeans container .

In line 13 I create an attribute static of ContainerLifecycle* *class and and start the same receiving null.

In line 17 this attribute receive a new instance of Container LifeCycle and line 18 I call the method .**startApplication(null); **for start the our container OWB .

Once starting the OWB is need get the our bean CDI .

So in line 20 we create an BeanManager that receive the our lifeCycle and will call the method **getBeanManager() .**

In line 21 we create an new attribute for get an bean active and so will return an set of bean. Here will return the name of our MyBean.

In line 23 get the reference of our bean and create the instance of MyBean

and finally in line 25 we make the use of method **getHelloBean(String name) **and the result in console is “” :

![](https://cdn-images-1.medium.com/max/2586/1*ygiYVVdy3wHvDjfwMN-t8g.png)

Perfect, now we have the Apache OpenWebBeans working in Java SE .

Other form of make more easy is using the [API of CDI 2.0](https://docs.jboss.org/cdi/spec/2.0/cdi-spec.html#se_bootstrap) or use o module [Apache Deltaspike (deltaspike-cdictrl)](https://deltaspike.apache.org/documentation/container-control.html).

that is all for today : )

**CODE** : [https://github.com/Daniel-Dos/danieldiasjava-medium-english/tree/master/Using-Apache-OpenWebBeans-in-Java-SE](https://github.com/Daniel-Dos/danieldiasjava-medium-english/tree/master/Using-Apache-OpenWebBeans-in-Java-SE)

## References

* [https://docs.jboss.org/cdi/spec/2.0/cdi-spec.html](https://docs.jboss.org/cdi/spec/2.0/cdi-spec.html)

* [https://openwebbeans.apache.org/](https://openwebbeans.apache.org/)
