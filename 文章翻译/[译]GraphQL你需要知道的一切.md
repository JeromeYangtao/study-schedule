> 原文链接:https://medium.com/@weblab_tech/graphql-everything-you-need-to-know-58756ff253d8

>原文作者:Weblab Technology


>译者:杨涛

![](https://upload-images.jianshu.io/upload_images/3474707-1ed4b88d4286d820.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
       你可能已经构建和使用REST API一段时间了，并且最近开始听说GraphQL--一种新型的API技术。有些人说它很好，但一些人并不认同。那么，我相信你肯定很想知道GraphQL让人惊奇的地方在哪和它与传统方法有什么不一样。
      
这篇文章的目的是指出GraphQL相关的主要功能和讨论特定API规范的优点和缺点。

GraphQL通常被描述为一种"前端导向"的API技术，因为它让前端开发者以一种比以前简单得多的方式请求数据。Facebook引入了这种查询语言，它的目标是以符合直觉和可伸缩的方式定制客户端应用，以描述数据的先决条件和交互。最好的一点是这种查询语言不依赖于任何特定的数据库管理系统，并且得到了当前数据格式和编码方式的支持。

**传统REST的一个基本问题是，客户端不能个性化的收集数据**。除此之外，运行和控制多个端点(译者注:表示API的具体网址,也可以理解为 接口)是另一个难点，因为客户端经常需要从多个端点获取数据。

当建立起一个GraphQL服务器，只需要简单的URL就能获取和修改数据。因此，一个用户可以通过传递查询字符串和声明他们需要什么来向服务器请求数据集。

在我们继续之前，在这你可以找到我们的个人实践。
     [graphlql-example](https://github.com/weblab-technology/graphql-example)

## GraphQL VS REST
![](https://upload-images.jianshu.io/upload_images/3474707-1ffc42696f8d5fb8.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

说到相似之处，REST和GraphQL都用于构建API。 另外，它们都可以通过HTTP进行管理。
至于差异，REST主要是一个以软件为中心的结构化概念，没有规范，也不求明确的工具集。它更关注API的稳定性而不是性能。
GraphQL，另一方面，是一种被设计于通过HTTP管理端点，提高性能和适用性的查询语言。我甚至可以说，查询语言和开发web的架构风格放在一起做比较，可能看起来很奇怪:)。一些其他显著的不同包括:
### 数据获取
毫无疑问，数据获取是GraphQL的一个最引人瞩目的特点之一。通过标准的REST API去生成和获取数据，我们可能需要向多个端点发起请求。相比之下，GraphQL提供了可以获取服务器数据的单端点
```
query {
  books {
    id
    title
    author
    isbn
    price
  } 
}
```
### 数据获取之外
由于在REST中每个接口都包含固定的数据格式，相比GraphQL，它会让你拿到更多的多余数据。相似的，REST会发送额外的请求去获取相关数据。
对于上一个例子，GraphQL是很不一样的。因为它是一种查询语言并且支持声明式获取数据，用户可以从服务器只获取他们需要的数据。
##### 只查询books的title和price
```
query {
 books {
   title
   price
 } 
}
```
### 错误管理
在REST风格中，错误管理是非常简单的。我们需要做的是检查HTTP的headers以及了解response的位置。通过状态码，我们能快速的找到错误和合适的方式去解决它。另一方面，在GraphQL中，我们总是收到200 OK的状态码。
```
Request: query { books { error_field } }
Response:
Request Method:POST
Status Code: 200 OK
{“errors”:[{“message”:”Cannot query field \”error_field\” on type \”Book\”.”,”category”:”graphql”,”locations”:[{“line”:3,”column”:3}]}]}
```
### 缓存
因为REST强制使用具有缓存机制的HTTP协议，你可以通过它避免获取多余资源。GraphQL,另一方面,没有缓存机制,它把缓存的重任交给了用户。
## GraphQL的优点
![](https://upload-images.jianshu.io/upload_images/3474707-772db95aa6f5dca3.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
### 版本
数据控制会带来API的边界，任何的变动都会被视为一种破坏性的改变，而破坏性改变就需要更新API的版本。这也许就是大多数API选择版本控制的原因。如果新API需要最新的版本，我们就需要频繁在新API和原有API之间调整。[译者注:例如接口改变了某个字段的数据类型]
相比之下，GraphQL只返回我们需要的数据，在不改变原有的请求的情况下，拿到最新的数据类型和字段。
### 弃用很容易
当使用GraphQL,你可以方便的弃用一个字段。GraphQL用户肯定会声明他们需要的字段。
```
‘author_name’ => [
  ‘type’ => Type::string(),
  ‘deprecationReason’ => ‘Deprecated. Use author field’,
 ],
```
REST API 以不同的方式运作。虽然基本的端点都能在REST API中获取，但不是所有端点都能返回稀疏字段。[译者注:即可能包含多余的字段]
相比之下，GraphQL非常容易监控特定字段的使用。API使用者能在特定的客户端部署获取到的字段。
### 性能优化
REST的请求默认作为一个整体，GraphQL通常尽量发送最少的请求。即便REST的每个请求返回最基本的部分，相同情况下，GraphQL能传输更多的数据片段。
## GraphQL的缺点
![](https://upload-images.jianshu.io/upload_images/3474707-dc0caa95b395b23f.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
### GraphQL缓存不容易
和默认采用能让客户端和代理端完美的工作的HTTP的REST不同，GraphQL以完全不同的方法调用。当然，事情并没有像REST一样简单，因为你需要调整你的数据集，使用Redis的集合和总是需要祈祷客户端能缓存。


正如[官方文档](http://graphql.org/learn/caching/)解释的那样，
***"在一个基于端点的API，客户端能够使用HTTP缓存轻易的避免重复获取资源和识别什么时候两个资源是一样的。客户端可以根据API中的URL作为全局唯一的标识符构建缓存。在GraphQL中，没有类似URL的对象能够作为全局唯一的标识符。最佳实践是提供这么一个标识符供客户端使用"***
### 鉴权问题
鉴权问题也是我们在使用GraphQL时关注的一个重要问题。将GraphQL作为一个特定领域语言考虑，它只是薄薄的一层放置在服务器和客户端中间。鉴权是单独的一层，语言本身并不会对应用进行验证和授权。但是你可以使用入口令牌(entry tokens)把客户端和响应关联起来。这与我们在REST中遵循的方法非常相似。
## 检测和解决n+1问题
![](https://upload-images.jianshu.io/upload_images/3474707-fa5bf52a5c07e4f1.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
### 什么是n+1问题？
n+1问题是在做GraphQL后端时最明显的可能遇到的优化问题。

如果你没有优化你的GraphQL查询，你可能在一次query进行多次查询。没有合适的缓存和批量处理系统，每次确定字段的时候服务器都会响应一次请求。DataLoader无疑是最好的解决方案，可以极大地增强后端的性能，特别是在GraphQL服务器中。
用一个简单的例子描述n+1问题
```
query {
 users {
    name
    education {
      degree
      year
    }
    age
    address {
      country
      city
      street
    }
  }
}
```
使用REST API是很容易评估，识别和解决n+1问题的。对于GraphQL有所不同。幸运的是，Facebook正在努力通过DataLoader解决这个问题
## 什么是DataLoader
![](https://upload-images.jianshu.io/upload_images/3474707-af0cb1164623a0d4.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
DataLoader是一个用于用户在GraphQL函数中读取数据和访问数据的基础设施。
我们可以通过这个基础设施直接从记录中读取数据而不是从SQL查询。
### 它是怎么运行的？
DataLoader主要使用了批处理和缓存。它用于批量加载客户端的多个 问题/请求的响应。此外，它可以缓存响应和让它们能响应连续类似的资源请求。
### GraphQL中的Queries, Mutations, and Subscriptions
好的，我们已经强调了一些GraphQL重要的方面。但是要开发一个功能齐全的app，我们也需要知道一些其他用来增强功能和性能的部分。
### Queries
正如它的名字，Queries是客户端从服务端获取数据。和从多个端点返回详细信息的REST不一样，GraphQL只提供了一个端点，让客户端从预定义的框架决定它需要的数据。
例如:
```
{
 Users {
   name
 }
}
```
上面的查询提到的'Users'字段称为根字段，其他数据称为载荷。
这个查询将会返回用户名的列表:
```
{
  “Users”: [
  {“name”: “Damira”},
  {“name”: “Michael”}
  {“name”: “Salman”}
  {“name”: “Sara”}
  {“name”: “Maria”}
]
}
```
值得注意的是，这个查询只返回了用户名(因为在我们的查询中，我们只声明了我们需要用户名)。对于二外的请求，我们需要为它增加特定的细节。
例如，假设我们只希望获取列表中的最后3个用户的信息。我们可以这么写参数来实现它。
```
{
  Users (last: 3) {
    name
    username
}}
```
至此，我们已经看到如何通过查询从服务器获取数据。现在让我们看一下在GraphQL中创建，省略，更新数据的方法。
### Mutations
Mutations用于创建，更新或者删除数据。除了需要在开头增加‘mutation’ 字段，它的结构和queries几乎一样。例如，
```
mutation {
  createUser (name : “John”, username: ”jo123”){
    name
    username
  }
}
```
#### Subscriptions
Subscriptions用于设置和保存和服务器的实时连接。它可以让你获取相关事件的实时信息。大多数情况下，客户端需要订阅特定的事件来获取相应的数据。
请通过[http://graphql.org/learn/queries/](http://graphql.org/learn/queries/) 获取详细信息
## 两全其美的办法
![](https://upload-images.jianshu.io/upload_images/3474707-555ebabac965b626.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
尽管GraphQL解决了一些问题，它还是有着一些缺陷和不足。校验，策略和缓存只是其中的几例。由于它本质上并不具备说服力，它并没有指导用户如何应用这些层。除此之外，在服务端和客户端之间存在不具体的一层令人不安。

在[Aollo里面的Stack](https://medium.com/apollo-stack/a-guide-to-authentication-in-graphql-e002a4039d1) 可以找到一部分问题的解决方案。

如果你有一个正在运行的项目，它是很难快速从RESTful API迁移到GraphQL的。但好消息是你可以同时享受这两种方法的好处。
例如你可以用GraphQL的queries去重构前端里获取数据的方式，然后再开始整合
mutations。它允许你缓慢的减少你的controllers里的actions
此外，你可以在项目中长时间保持两种方法并存。例如，如果你想简化授权机制，你可以一直用REST架构提供帮助。
## 总结
![](https://upload-images.jianshu.io/upload_images/3474707-fe017ef013d1966b.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
回忆起90年代末作为一个健壮的计算机网络应用交互结构化数据的协议，曾受到热烈欢迎和获得巨大的声誉的[SOAP](https://simple.wikipedia.org/wiki/SOAP_%28protocol%29)。但是它的载荷明显很高并且以前的应用容易提高的数据丢失和阻塞的几率。
REST是为了做到更好的利用web服务器和提高适应性而引入的。这个概念非常的简单直接，完全没有状态，因此可以放弃一些不相关的因素。除此之外，这种方法可以轻松的同时使用JSON和XML。但是，数据的统一是最大的障碍。此外版本号的分歧是另一个问题。为了解决这个问题，Facebook为开发者提供了一个两全其美的方案-GraphQL。
GraphQL不是一个没有具体实践基础的方案。RESTful已经在效率和表现方面证明了很多年。GraphQL能弥补REST的不足，REST可以填补GraphQL的空白。
值得注意的是，GraphQL和REST的情况和关系型数据库和非关系型数据库的关系很像。
使用GraphQL的时候，HTTP是服务端和客户端通信协议的最佳选择，这主要是因为它的普遍性。然而，当使用HTTP2的时候，性能还是会有问题。
尽管GraphQL解决了一些问题，选择任何一个API规范仍是困难的，因此你可以考虑让两者并存。
从设计到应用的整体功能，选择一种API风格都会对整个API过程产生影响。因此，做选择应当根据远见的而不仅仅是基本的信仰。
这篇文章完全基于我们对这两种方法的个人经验。我们很希望能听到你们关于GraphQL和RESTful API的看法。
### 一些有用的资料
https://github.com/weblab-technology/graphql-example 

[Implementing GraphQL as a Query Language for Deductive Databases in SWI-Prolog Using DCGs, Quasi Quotations, and Dicts](https://www.researchgate.net/publication/311989237_Implementing_GraphQL_as_a_Query_Language_for_Deductive_Databases_in_SWI-Prolog_Using_DCGs_Quasi_Quotations_and_Dicts)

[REST and Web Services — In Theory and in Practice — Springer](http://www.springer.com/cda/content/document/cda.../9781441983022-c1.pdf?SGWID)

> by [Oleksandr Knyga](http://www.oknyga.com/), Software Engineer
> *Maksim Kolesnikov, DevOps*
> Sergei Guliaev, Back-End Developer
> Viacheslav Eremin, Front-End Developer
> Sharmeen Hayat, author & Data Specialist
> Dima Dmytriienko, editor & Brand Specialist


### 译者注
原文提到的GraphQL一些问题，在[Apollo GraphQL](https://github.com/apollographql)这个项目中都得到了一定程度的解决，比加缓存。
















