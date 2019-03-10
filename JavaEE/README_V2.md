# Java EE form表单发送Json、Servlet接收Json并发送Json
---
## 1.需要的jar包
---

[commons-beanutils-1.8.3.jar](http://www.java2s.com/Code/JarDownload/commons-beanutils/commons-beanutils-1.8.3.jar.zip)  
[commons-collections-3.2.1-1.0.0.jar](http://www.java2s.com/Code/JarDownload/commons-collections/commons-collections-3.2.1-1.0.0.jar.zip)  
[commons-lang-2.5.jar](http://www.java2s.com/Code/JarDownload/commons-lang/commons-lang-2.5.jar.zip)  
[commons-logging-1.1.1.jar](http://www.java2s.com/Code/JarDownload/commons-logging/commons-logging-1.1.1-api.jar.zip)  
[ezmorph-1.0.6.jar](http://www.java2s.com/Code/JarDownload/ezmorph/ezmorph-1.0.6.jar.zip)  
[json-lib-2.4-jdk15.jar](http://www.java2s.com/Code/JarDownload/json-lib/json-lib-2.4-jdk15.jar.zip) 

## 2.ajax使form传送json
---
```html
<form onsubmit="return false" action="#" method="post" id="form1">
	<input type="text" name="name1">
	<input type="text" name="name2"><br/>
	
	<input type="radio" value="男" name="gender">
	<input type="radio" value="女" name="gender"><br/>
	
	<input type="checkbox" value="0" name="game0">game0
	<input type="checkbox" value="1" name="game0">game1
	<input type="checkbox" value="2" name="game0">game2<br/>
	

    <input type="button" value="submit" onclick="login()">
</form>
```
```html
<script src="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
<script type="text/javascript">
    function login() {
    	console.log("123")
        $.ajax({
        //几个参数需要注意一下
            type: "POST",//方法类型
            dataType: "json",//预期服务器返回的数据类型
            url: "/24-request/JsonServlet" ,//url
            contentType:"application/json",	
            data:JSON.stringify($('form').serializeObject()),
            success: function (result) {
                console.log(result);//打印服务端返回的数据(调试用)
                if (result.resultCode == 200) {
                    alert("SUCCESS");
                }
                ;
            },
            error : function() {
                alert("异常！");
            }
        });
    }
    $.fn.serializeObject = function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [ o[this.name] ];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
</script>
```

## 3.Servlet接收Json、发送Json
---
[此部分参考博客](https://blog.csdn.net/guoquanyou/article/details/62421318)

```java
package com.closer.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import javax.servlet.http.HttpServletRequest;
import net.sf.json.JSONObject;
 
public class JsonReader {
	public static JSONObject receivePost(HttpServletRequest request) throws IOException, UnsupportedEncodingException {
 
		// 读取请求内容
		BufferedReader br = new BufferedReader(new InputStreamReader(request.getInputStream(),"utf-8"));
		String line = null;
		StringBuilder sb = new StringBuilder();
		while ((line = br.readLine()) != null) {
			sb.append(line);
		}
		//将json字符串转换为json对象
		JSONObject json=JSONObject.fromObject(sb.toString());
		return json;
	}
}

```

事先创建好User类，用于将传过来的Json赋值给User类对象  

```java
package com.closer.request;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.closer.util.JsonReader;

import net.sf.json.JSONObject;

@WebServlet("/JsonServlet")
public class JsonServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public JsonServlet() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json;charset=utf-8");
		 
		/** 设置响应头允许ajax跨域访问 **/
		response.setHeader("Access-Control-Allow-Origin", "*");
		/* 星号表示所有的异域请求都可以接受， */
		response.setHeader("Access-Control-Allow-Methods", "GET,POST");
		System.out.println(response.toString());
		JSONObject json=JsonReader.receivePost(request);
		System.out.println(json);
		
		User user = (User)JSONObject.toBean(json, User.class);
		System.out.println(user.toString());
		
		JSONObject jsonObject=new JSONObject();
		response.setStatus(200);
		jsonObject.put("user", JSONObject.fromObject(user));
		jsonObject.put("message", "用户登录成功！");
		response.getWriter().write(jsonObject.toString());
		response.getWriter().flush();
	}

}

```


## # 参考
1. [Servlet解析JSON数据和发送JSON数据](https://blog.csdn.net/guoquanyou/article/details/62421318)
1. [form表单提交json格式数据](https://blog.csdn.net/n447194252/article/details/77839594)
1. [Ajax提交表单数据的几种方式](https://blog.csdn.net/qq_17164811/article/details/78203766) 
