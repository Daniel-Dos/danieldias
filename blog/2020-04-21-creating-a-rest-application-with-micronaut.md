---
slug: creating-a-rest-application-with-micronaut
title: 'Creating a Rest application with Micronaut'
authors: [daniel]
tags: [Java, Apache]
---

# Creating a Rest application with Micronaut

![](https://cdn-images-1.medium.com/max/2000/1*ZRHvGvVEAANthrjjLJjapg.png)


This post we go create a simple Rest application with Micronaut.

For this post we will create 2 simple endpoints (get/post) using the following libs and resources:

* [H2-DataBase](http://www.h2database.com/html/main.html)

* [Micronaut-Data](https://micronaut-projects.github.io/micronaut-data/latest/guide/index.html#introduction)

* [Bean Validation](https://docs.micronaut.io/latest/guide/index.html#beanValidation)

Please, enjoy the subject. And sorry for the grammatical mistakes.

## Introduction at Micronaut

Micronaut is a framework very similar in Spring for the construction of microservices.

Micronaut provide tools necessary to work fine in construction of applications :

* Dependency Injection and Inversion of Control (IoC)

* Sensible Defaults and Auto-Configuration

* Configuration and Configuration Sharing

* Service Discovery

* HTTP Routing

* HTTP Client with client-side load-balancing

According to the site, Micronaut o avoids disadvantages in other frameworks like Spring, Spring Boot, and Grails by providing:

* Fast startup time

* Reduced memory footprint

* Minimal use of reflection

* Minimal use of proxies

* Easy unit testing

From the little I played with the Micronaut, I found it very interesting, easy and really the way of programming is similar to Spring, that is, your experience in Spring is reused. : )

Let’s go at code : )

## Creating your Maven Project

First, create a new project maven with the following dependencies :

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.medium.danieldiasjava.micronaut.basic</groupId>
    <artifactId>micronaut.basic</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>basic Project</name>
    <description>basic Project</description>

    <properties>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>${maven.compiler.source}</maven.compiler.target>
        <micronaut.version>1.3.4</micronaut.version>
        <micronaut.data.version>1.0.2</micronaut.data.version>
        <mainClass>com.medium.danieldiasjava.micronaut.basic.application.MicronautBasicApplication</mainClass>
        <libs.classpath.prefix>libs</libs.classpath.prefix>
        <copied.libs.dir>${project.build.directory}/${libs.classpath.prefix}</copied.libs.dir>
    </properties>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>io.micronaut</groupId>
                <artifactId>micronaut-bom</artifactId>
                <version>${micronaut.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <dependencies>
        <dependency>
            <groupId>io.micronaut</groupId>
            <artifactId>micronaut-http-server-netty</artifactId>
            <scope>compile</scope>
        </dependency>

        <dependency>
            <groupId>io.micronaut</groupId>
            <artifactId>micronaut-runtime</artifactId>
            <scope>compile</scope>
        </dependency>

        <dependency>
            <groupId>io.micronaut</groupId>
            <artifactId>micronaut-inject-java</artifactId>
            <scope>compile</scope>
        </dependency>

        <dependency>
            <groupId>io.micronaut</groupId>
            <artifactId>micronaut-inject</artifactId>
            <scope>compile</scope>
        </dependency>

        <!--Bean Validation -->
        <dependency>
            <groupId>io.micronaut</groupId>
            <artifactId>micronaut-validation</artifactId>
            <scope>compile</scope>
        </dependency>

        <!-- Micronaut Data -->
        <dependency>
            <groupId>io.micronaut.data</groupId>
            <artifactId>micronaut-data-processor</artifactId>
            <scope>compile</scope>
            <version>${micronaut.data.version}</version>
        </dependency>
        <dependency>
            <groupId>io.micronaut.data</groupId>
            <artifactId>micronaut-data-hibernate-jpa</artifactId>
            <scope>compile</scope>
            <version>${micronaut.data.version}</version>
        </dependency>
        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>io.micronaut.configuration</groupId>
            <artifactId>micronaut-jdbc-tomcat</artifactId>
            <scope>runtime</scope>
        </dependency>
    </dependencies>

    <build>
        <finalName>micronaut-basic</finalName>
        <pluginManagement>
            <plugins>
                <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-jar-plugin</artifactId>
                    <version>2.5</version>
                    <configuration>
                        <archive>
                            <manifest>
                                <addClasspath>true</addClasspath>
                                <classpathPrefix>${libs.classpath.prefix}</classpathPrefix>
                                <mainClass>${mainClass}</mainClass>
                            </manifest>
                        </archive>
                    </configuration>
                </plugin>
                <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-compiler-plugin</artifactId>
                    <version>3.5.1</version>
                    <configuration>
                        <source>1.8</source>
                        <target>1.8</target>
                        <annotationProcessorPaths>
                            <path>
                                <groupId>io.micronaut</groupId>
                                <artifactId>micronaut-inject-java</artifactId>
                                <version>${micronaut.version}</version>
                            </path>
                            <path>
                                <groupId>io.micronaut.data</groupId>
                                <artifactId>micronaut-data-processor</artifactId>
                                <version>${micronaut.data.version}</version>
                            </path>
                            <path>
                                <groupId>io.micronaut</groupId>
                                <artifactId>micronaut-validation</artifactId>
                                <version>${micronaut.version}</version>
                            </path>
                        </annotationProcessorPaths>

                    </configuration>
                </plugin>
                <plugin>
                    <groupId>io.micronaut.build</groupId>
                    <artifactId>micronaut-maven-plugin</artifactId>
                    <version>1.0.0.BUILD-SNAPSHOT</version>
                </plugin>
            </plugins>
        </pluginManagement>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-dependency-plugin</artifactId>
                <executions>
                    <execution>
                        <id>copy-dependencies</id>
                        <phase>prepare-package</phase>
                        <goals>
                            <goal>copy-dependencies</goal>
                        </goals>
                        <configuration>
                            <outputDirectory>${copied.libs.dir}</outputDirectory>
                            <overWriteReleases>false</overWriteReleases>
                            <overWriteSnapshots>false</overWriteSnapshots>
                            <overWriteIfNewer>true</overWriteIfNewer>
                            <overWriteIfNewer>true</overWriteIfNewer>
                            <includeScope>runtime</includeScope>
                            <excludeScope>test</excludeScope>
                        </configuration>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
    <pluginRepositories>
        <pluginRepository>
            <id>ossrh</id>
            <url>https://oss.sonatype.org/content/repositories/snapshots</url>
            <snapshots>
                <enabled>true</enabled>
            </snapshots>
        </pluginRepository>
    </pluginRepositories>
</project>

```

Here are the basic dependencies for the Micronaut working:

* [micronaut-http-server-netty](https://mvnrepository.com/artifact/io.micronaut/micronaut-http-server-netty/1.3.4)

* [micronaut-runtime](https://mvnrepository.com/artifact/io.micronaut/micronaut-runtime/1.3.4)

* [micronaut-inject-java](https://mvnrepository.com/artifact/io.micronaut/micronaut-inject-java/1.3.4)

* [micronaut-inject](https://mvnrepository.com/artifact/io.micronaut/micronaut-inject/1.3.4)

Basically, that’s all for the Micronaut to work well : )

Here too add dependencies to Bean Validation, Micronaut-Data, H2 and Connection Poll JDBC TomCat

## Creating the Classes

Now we will create a class Model with name Person, very simple with annotation de JPA and Bean Validation :

```java
package com.medium.danieldiasjava.micronaut.basic.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import io.micronaut.core.annotation.Introspected;

@Entity
@Introspected
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotEmpty(message = "can not be empty")
    @Size(min = 1, max = 20)
    private String name;

    @Min(18)
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public Person() {}

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
```

Here is a simple class with annotations of JPA and Bean Validation, more with a unique difference, the class contains an annotation of Micronaut that is [**“@Introspected”](https://docs.micronaut.io/latest/guide/index.html#introspection).** She is necessary to instantiate and read/write a bean property without using reflection or caching reflective metadata.

The use of Bean Validation here is limited, if you can an Full Bean Validation, please add the dependency:

![](https://cdn-images-1.medium.com/max/2000/1*1oujloN_vZy5KTXDKi8m3g.png)

The next step is to create a class Repository for starting the use of Micronaut-Data :

```java
package com.medium.danieldiasjava.micronaut.basic.repository;

import com.medium.danieldiasjava.micronaut.basic.model.Person;

import io.micronaut.data.annotation.Repository;
import io.micronaut.data.repository.CrudRepository;

@Repository
public interface PersonRepository extends CrudRepository<Person, Long> { }
```

So this is a simple interface that extends the interface CrudRepository.

Micronaut-Data is very similar to the Spring-Data and [Apache DeltaSpike](https://deltaspike.apache.org/documentation/data.html). Very friendly to the developer use.

Micronaut-data provides other interfaces as shown in the image:

![[https://micronaut-projects.github.io/micronaut-data/latest/guide/index.html#repositories](https://micronaut-projects.github.io/micronaut-data/latest/guide/index.html#repositories)](https://cdn-images-1.medium.com/max/2000/1*38cHPMpBaV-znEln107cBw.png)*[https://micronaut-projects.github.io/micronaut-data/latest/guide/index.html#repositories](https://micronaut-projects.github.io/micronaut-data/latest/guide/index.html#repositories)*

Now we will create a class Controller with name PersonController and with the following Endpoints:

```java
package com.medium.danieldiasjava.micronaut.basic.controller;

import javax.inject.Inject;
import javax.validation.Valid;

import com.medium.danieldiasjava.micronaut.basic.model.Message;
import com.medium.danieldiasjava.micronaut.basic.model.Person;
import com.medium.danieldiasjava.micronaut.basic.repository.PersonRepository;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Post;
import io.micronaut.validation.Validated;


@Validated
@Controller("/persons")
public class PersonController {

    @Inject
    private PersonRepository personRepository;

    @Post()
    public HttpResponse<?> savePerson(@Body @Valid Person person) {
        this.personRepository.save(person);
        return HttpResponse.status(HttpStatus.CREATED).body(new Message(HttpStatus.CREATED.getCode(),"Saved successfully !"));
    }

    @Get()
    public HttpResponse<?> getPersons() {
        return HttpResponse.status(HttpStatus.OK).body(this.personRepository.findAll());
    }   
}
```

Here is only a simple Controller class with two endpoint GET/POST.

So, in line 19 we do use of annotation **“@Validated”** in your Controller to enable the support at validation in our POJOs Class.

In line 20 is annotation common in other framework MVC (Spring, Eclipse Krazo), here he receive an URI and by default it is already enabled to produce and consume JSON.

In line 24 and 25, we use the** [JSR-330 annotation @Inject](http://javax-inject.github.io/javax-inject/)** and then declare the “***PersonRepository”** *and inject it.

Next line(27) is the our first endpoint that is POST, here not declared a URI/path to her, more is possible to add resources how to example :

![](https://cdn-images-1.medium.com/max/2000/1*RDMTGFYbDEQ_wEYLvynOcQ.png)

In method **savePerson()**, we have an Object Person and two annotations how parameter.

The annotation **“@Body” **to indicate to Micronaut the parameter which will receive the data and the annotation **“@Valid” **use is required to validate our Person bean, which must be used in conjunction with the **“@Validated”** annotation.

In the next line (29), we call our repository and call the method save and a person is included in database H2 and after return an **“HttpResponse”** with a Status Code and an Object in your body this a Message Class that receives two parameters.

Then we have our endpoint that responds to a GET, whose function is to retrieve all data from the database, calling the findAll method of the Micronaut-Data.

to finish we created a main class and we also created a file called application.yml with JPA and H2 properties for the persistence function.

So the Main Class is only this :

```java
package com.medium.danieldiasjava.micronaut.basic.application;

import io.micronaut.runtime.Micronaut;

public class MicronautBasicApplication {
    public static void main(String[] args) {
        Micronaut.run(MicronautBasicApplication.class, args);
    }
}
```

and in folder **“resources” **maven create the file **application.yml :**

```yaml
datasources:
  default:
    url: jdbc:h2:mem:devDb
    driverClassName: org.h2.Driver
    username: sa
    password: ""
    dialect: H2

jpa:
  default:
    entity-scan:
        packages: 'com.medium.danieldiasjava.micronaut.basic.model'
    properties:
      hibernate:
        hbm2ddl:
          auto: update
        show_sql: true
        format_sql: true
```

Now run the Main Class and open your postman and test our application : )

![](https://cdn-images-1.medium.com/max/2582/1*hU7UA845oppCJn2kxrZeyA.png)

that’s all for today, I hope you enjoyed it.

I do not work with this framework, but I found it very easy to move and I believe it is a good alternative to Spring, since it is similar, in addition the Micronaut documentation is very complete and easy to understand.

Code: [https://github.com/Daniel-Dos/danieldiasjava-medium-english/tree/master/Creating-a-Rest-application-with-Micronaut](https://github.com/Daniel-Dos/danieldiasjava-medium-english/tree/master/Creating-a-Rest-application-with-Micronaut)

## References

* [https://docs.micronaut.io/latest/guide/index.html#ioc](https://docs.micronaut.io/latest/guide/index.html#ioc)

* [https://micronaut-projects.github.io/micronaut-data/latest/guide/index.html#introduction](https://micronaut-projects.github.io/micronaut-data/latest/guide/index.html#introduction)

* [https://docs.micronaut.io/latest/guide/index.html#beanValidation](https://docs.micronaut.io/latest/guide/index.html#beanValidation)
