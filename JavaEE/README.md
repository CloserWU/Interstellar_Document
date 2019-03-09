# Java EE 学习记录
request
```java
String name1 = (String) request.getParameter("name1");
		// 获取请求行方法
		String method = request.getMethod();
		// 获取请求行uri  url-http://localhost:8080
		String requestURI = request.getRequestURI();
		// 获取请求行url
		StringBuffer requestURL = request.getRequestURL();
		// 获取get url？后的string
		String queryString = request.getQueryString();
		// 获取24-request
		String contextPath = request.getContextPath();
		//获取所有请求头key
		Enumeration<String> headerNames = request.getHeaderNames();
		while(headerNames.hasMoreElements()) {
			System.out.println(headerNames.nextElement());
		}
		//获取指定请求头value
		String header = request.getHeader("cookie");
		//获取所有请求头key-value
		Enumeration<String> headerNames2 = request.getHeaderNames();
		while(headerNames2.hasMoreElements()) {
			String nextElement = headerNames2.nextElement();
			String header2 = request.getHeader(nextElement);
			System.out.println(header2);
		}
		
		response.getWriter().append("Served at: ").append(request.getContextPath()).append(name1);
``` 


response
```java
response.setStatus(int)设置res的状态码 302刷新  
response.getWriter().write(String)向res中写入数据  
response.setHeader("refresh", "2;url=http://localhost:8080/servlet/");定时刷新 
response.sendRedirect("/servlet/");刷新  
response.setContentType(mimeType);设置res的文件类型  
response.setHeader("Content-Disposition", "attachment;filename" + filename);以附件的形式打开文件  
```


Servlet
```java
this.getServletContext().getMimeType(filename);获取文件类型  this.getServletContext().getRealPath("download/" + filename);获取WebContent的路径  
JdbcUtil.class.getClassLoader().getResource("db.properties").getPath();获取src文件夹内的路径  
```

 

