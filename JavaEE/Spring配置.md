# SpringMVC   Spring

##### `<context:component-scan/>`和`<mvc:annotation-driven/>`

其实<context:component-scan/>标签是告诉Spring 来扫描指定包下的类，
并注册被@Component，@Controller，@Service，@Repository等注解标记的组件（即，项目启动完成前这些被注解的组件就会被实例化bean放入容器上下文中）和注册AutowiredAnnotationBeanPostProcessor、 RequiredAnnotationBeanPostProcessor、 CommonAnnotationBeanPostProcessor以及 PersistenceAnnotationBeanPostProcessor。
而<mvc:annotation-driven/>是告知Spring，我们启用注解驱动，为WEB 应用服务(我们就可以使用该标签注册的几个bean的功能)。然后Spring会自动为我们注册上面说到的几个Bean到工厂中，来处理我们的请求。换句话说，<context:component-scan/>向容器中显式或隐式注册了一系列单个组件，但是项目要想将组件关联起来正常运转，则需要<mvc:annotation-driven/>注册的组件完成。
比如请求一个URL，我要知道这个URL匹配哪个controller中的哪个方法。哪个Controller就需要<context:component-scan/>注解，如何匹配，匹配哪个方法就需要<mvc:annotation-driven/>注解。
当然，你也可以不使用<context:component-scan/>而手动将所有需要的bean显示注册进applicationContext.xml中，这实在是太愚蠢！如果不想手动配置bean(xml)，使用注解获取bean就必须使用<context:component-scan/>。
如果想使web项目正常运转，一般情况下，<mvc:annotation-driven/>和<context:component-scan/>是必需的！项目中二者相辅相成，缺一不可！！！

## `<context:component-scan/>`和`<mvc:annotation-driven/>`和之间的关系

[转自](http://blog.csdn.net/caolaosanahnu/article/details/17305135)[http://blog.csdn.net/caolaosa...](http://blog.csdn.net/caolaosanahnu/article/details/17305135)
现在常用框架中SpringMVC.xml配置是:
`<mvc:annotation-driven/>`和`<context:component-scan>`
那么`<context:annotation-config/>`呢？
首先看一下三个注解各自定义:

#### 1 `<context:annotation-config/>`

1. 如果你想使用`@Autowired`注解，那么就必须事先在 spring 容器中声明 AutowiredAnnotationBeanPostProcessor Bean.
2. 如果想使用`@Resource` ,`@PostConstruct`,`@PreDestroy`等注解就必须声明CommonAnnotationBeanPostProcessor
3. 如果想使用`@PersistenceContext`注解，就必须声明PersistenceAnnotationBeanPostProcessor的Bean.
4. 如果想使用 `@Required`的注解，就必须声明RequiredAnnotationBeanPostProcessor的Bean.

**使用<context:annotation- config/>隐式地向 Spring容器注册这4个BeanPostProcessor** :

```
AutowiredAnnotationBeanPostProcessor
RequiredAnnotationBeanPostProcessor
CommonAnnotationBeanPostProcessor
PersistenceAnnotationBeanPostProcessor
```

**即<context:annotation-config/>是用来使上述注解起作用的，也就是说激活已经在application context中注册的bean**. 
之所以这样说是因为`<context:annotation-config/>`仅能够在spring容器中已经注册过的bean上面起作用.对于没有在spring容器中注册的bean，它并不能执行任何操作,也就是说如果你并没有spring容器中注册过bean（spring配置文件中配置bean就是注册），那么上述的那些注解并不会在你未注册过的bean中起作用.

#### 2 `<context:component-scan>`

`<context:component-scan>`做了`<context:annotation-config>`要做的事情，还额外支持`@Component`，`@Repository`，`@Service`，`@Controller`注解.并且`<context:component-scan>`扫描base-package并且在applicationcontext中注册扫描的beans.

**所以配置<context:component-scan>就不需要配置<context:annotation- config/>**

#### 3 `<mvc:annotation-driven/>`

至于该项看前缀就应该知道是springmvc所需要的注解.

`<mvc:annotation-driven/>`相当于注册了DefaultAnnotationHandlerMapping和AnnotationMethodHandlerAdapter两个bean，配置一些messageconverter.即解决了`@Controller`注解的使用前提配置.

我们找到对应的实现类是:

org.springframework.web.servlet.config.AnnotationDrivenBeanDefinitionParser.
通过阅读类注释文档，我们发现这个类主要是用来向工厂中注册了

```
RequestMappingHandlerMapping
BeanNameUrlHandlerMapping
RequestMappingHandlerAdapter
HttpRequestHandlerAdapter
SimpleControllerHandlerAdapter
ExceptionHandlerExceptionResolver
ResponseStatusExceptionResolver
DefaultHandlerExceptionResolver
```

上面几个Bean实例.这几个类都是用来做什么的呢？

前两个是HandlerMapping接口的实现类，用来处理请求映射的.

- 其中第一个是处理`@RequestMapping`注解的.
- 第二个会将controller类的名字映射为请求url.

中间三个是用来处理请求的.具体点说就是确定调用哪个controller的哪个方法来处理当前请求.

- 第一个处`理@Controller`注解的处理器，支持自定义方法参数和返回值（很酷）.
- 第二个是处理继承HttpRequestHandler的处理器.
- 第三个处理继承自Controller接口的处理器.

后面三个是用来处理异常的解析器.

另外还将提供以下支持:
① 支持使用ConversionService实例对表单参数进行类型转换； 
② 支持使用@NumberFormatannotation,@DateTimeFormat注解完成数据类型的格式化； 
③ 支持使用@Valid注解对Java bean实例进行JSR 303验证； 
④ 支持使用@RequestBody和@ResponseBody注解

转自:[http://blog.csdn.net/sunhuwh/...](http://blog.csdn.net/sunhuwh/article/details/25558867)
`<annotaion-driven/>`标签:这个标签对应的实现类是org.springframework.web.servlet.config.AnnotationDrivenBeanDefinitionParser

仔细阅读它的注释文档可以很明显的看到这个类的作用.解析这个文档:

这个类主要注册8个类的实例:

```
1.RequestMappingHandlerMapping

2.BeanNameUrlHandlerMapping

3.RequestMappingHandlerAdapter

4.HttpRequestHandlerAdapter

5.SimpleControllerHandlerAdapter

6.ExceptionHandlerExceptionResolver

7.ResponseStatusExceptionResolver

8.DefaultHandlerExceptionResolver
```

1是处理@RequestMapping注解的，2.将controller类的名字映射为请求url.1和2都实现了HandlerMapping接口，用来处理请求映射.

3是处理@Controller注解的控制器类，4是处理继承HttpRequestHandlerAdapter类的控制器类，5.处理继承SimpleControllerHandlerAdapter类的控制器.所以这三个是用来处理请求的.具体点说就是确定调用哪个controller的哪个方法来处理当前请求.

6,7,8全部继承AbstractHandlerExceptionResolver，这个类实现HandlerExceptionResolver，该接口定义:接口实现的对象可以解决处理器映射,执行期间抛出的异常，还有错误的视图.

所以`<annotaion-driven/>`标签主要是用来帮助我们处理请求映射，决定是哪个controller的哪个方法来处理当前请求，异常处理.

`<context:component-scan/>`标签:它的实现类是org.springframework.context.annotation.ComponentScanBeanDefinitionParser.

把鼠标放在`context:component-scan`上就可以知道有什么作用的，用来扫描该包内被`@Repository`,`@Service`,`@Controller`的注解类，然后注册到工厂中.并且`context:component-scan`激活`@required`,`@resource`,`@autowired`,`@PostConstruct`,`@PreDestroy`,`@PersistenceContext`,`@PersistenceUnit`.使得在适用该bean的时候用`@Autowired`就行了.



# Mybatis

