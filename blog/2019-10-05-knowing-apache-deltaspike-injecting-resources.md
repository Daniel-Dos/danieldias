---
slug: knowing-apache-deltaspike-injecting-resources
title: 'Knowing Apache Deltaspike Injecting Resources'
authors: [daniel]
tags: [Java, Apache]
---

# Knowing Apache Deltaspike Injecting Resources

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*Ej3IdHebWjOPSJ6W4ym24A.png)

In this post, we’ll look at another feature within DeltaSpike’s CORE module, called **Injecting Resources**.

This is a short post, just to demonstrate how it works.

## Injecting Resources

One of the features I find really cool in DeltaSpike is that it provides simple APIs for basic resource loading and reading of properties files.

At least for me, this is quite useful. Let’s see how it works.

<!-- truncate -->

First, create a new Maven project with the following `pom.xml`:

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.medium.danieldiasjava</groupId>
    <artifactId>core.injecting.resources</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>Apache DeltaSpike - Core Injecting Resources</name>
    <description>Apache DeltaSpike - Core Injecting Resources</description>

    <properties>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>${maven.compiler.source}</maven.compiler.target>
        <weld.version>3.0.5.Final</weld.version>
        <deltaspike.version>1.9.1</deltaspike.version>
    </properties>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.apache.deltaspike.distribution</groupId>
                <artifactId>distributions-bom</artifactId>
                <version>${deltaspike.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <dependencies>
        <dependency>
            <groupId>org.apache.deltaspike.cdictrl</groupId>
            <artifactId>deltaspike-cdictrl-api</artifactId>
            <scope>compile</scope>
        </dependency>
        <dependency>
            <groupId>org.apache.deltaspike.cdictrl</groupId>
            <artifactId>deltaspike-cdictrl-weld</artifactId>
            <scope>runtime</scope>
        </dependency>

        <dependency>
            <groupId>org.apache.deltaspike.core</groupId>
            <artifactId>deltaspike-core-api</artifactId>
            <scope>compile</scope>
        </dependency>

        <dependency>
            <groupId>org.apache.deltaspike.core</groupId>
            <artifactId>deltaspike-core-impl</artifactId>
            <scope>runtime</scope>
        </dependency>

        <dependency>
            <groupId>org.jboss.weld.se</groupId>
            <artifactId>weld-se-shaded</artifactId>
            <version>${weld.version}</version>
            <type>jar</type>
        </dependency>
    </dependencies>
</project>
```

Also, create a `beans.xml` file inside the **META-INF** directory:

```xml
<?xml version="1.0"?>
<beans bean-discovery-mode="all" version="2.0"
 xmlns="http://xmlns.jcp.org/xml/ns/javaee"
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
 xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee 
                     http://xmlns.jcp.org/xml/ns/javaee/beans_2_0.xsd"/>
```

Next, under **resources**, create a `.txt` file with the following content:

```txt
Java Cloud Service-Java na Oracle Cloud-Alexandre dos Santos
Serverless Java-It then turns to solutions available for developing serverless applications, or functions, with Java.-Ivar Grimstad
JUnit 5 - Vale a pena migrar?-JUNI5-Marco Paulo
Apache DeltaSpike Data-Apache DeltaSpike é uma coleção de extensões CDI portáveis que fornecem recursos úteis para desenvolvedores Java .-Daniel Dias

```

This file will be read by DeltaSpike’s resource feature, and its content will be used to populate a class representing speakers:

```java
public class Palestrante {

    private String title;

    private String description;

    private String speaker;

    public Palestrante() { }

    public Palestrante(String title, String description, String speaker) {
        this.title = title;
        this.description = description;
        this.speaker = speaker;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSpeaker() {
        return speaker;
    }

    public void setSpeaker(String speaker) {
        this.speaker = speaker;
    }

    @Override
    public String toString() {
        return "name:" + title + ", description:" + description + ", speaker:" + speaker;
    }
}
```

Now let’s create a `Main` class to make use of **Injecting Resources**:

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

import org.apache.deltaspike.cdise.api.CdiContainer;
import org.apache.deltaspike.cdise.api.CdiContainerLoader;
import org.apache.deltaspike.cdise.api.ContextControl;
import org.apache.deltaspike.core.api.provider.BeanProvider;
import org.apache.deltaspike.core.api.resourceloader.InjectableResource;

@ApplicationScoped
public class MainApplication {

    @Inject
    @InjectableResource(location="palestrante.txt")
    private InputStream inputStream;

    public InputStream getInputStream() {
        return inputStream;
    }

    public static void main(String[] args) {

        CdiContainer cdiContainer = CdiContainerLoader.getCdiContainer();
        cdiContainer.boot();

        ContextControl contextControl = cdiContainer.getContextControl();
        contextControl.startContext(ApplicationScoped.class);

        MainApplication mainApplication = BeanProvider.getContextualReference(MainApplication.class);
       
        List<Palestrante> palestrantes = new ArrayList<>();

        try (BufferedReader palestranteTxt= new BufferedReader(new InputStreamReader(mainApplication.getInputStream()))) {
            palestranteTxt.lines().forEach(palestrante-> {
                String[] output = palestrante.split("-");
                palestrantes.add(new Palestrante(output[0], output[1], output[2]));
                });
        } catch (IOException e) {
            e.printStackTrace();
        }
        palestrantes.forEach(System.out::println);
    }
}
```

In the **MainApplication** class, we define a variable annotated with both **@Inject** and **@InjectableResource**, which receives our `.txt` file. We also create a getter to access it.

Then, in the `main` method, we initialize DeltaSpike's own CDI container and use a **BufferedReader** to read from the **InputStream**. It goes through the file, splits each line using the delimiter `-`, and populates a new `Speaker` object based on the array indexes. These instances are added to a list and displayed. The output looks like this:

![](https://miro.medium.com/v2/resize:fit:1100/format:webp/1*YY4MKZeBrDsCoGKX6ngKcQ.png)

Well, that’s it for today. I hope you enjoyed it. : )

**Source Code:**  
[Daniel-Dos/DanielDiasjava-Blog (GitHub)](https://github.com/Daniel-Dos/DanielDiasjava-Blog/tree/master/ProjetoDeltaspikeModulos/Core-InjectingResources/InjectingResources)

## References

* [DeltaSpike Documentation – Injecting Resources](https://deltaspike.apache.org/documentation/core.html#InjectingResources)
