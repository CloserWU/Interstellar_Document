package com.closer.request;

import java.io.FileInputStream;
import java.io.IOException;
import java.net.URLEncoder;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.closer.util.FileUtil;
import com.closer.util.JsonReader;

import net.sf.json.JSONObject;
import sun.misc.BASE64Encoder;

@WebServlet("/fileServlet")
public class fileServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("application/json;charset=utf-8");
		response.setHeader("Access-Control-Allow-Origin", "*");
		/* 星号表示所有的异域请求都可以接受， */
		response.setHeader("Access-Control-Allow-Methods", "GET,POST");
		JSONObject json = JsonReader.receivePost(request);
		JSONObject jsonObject = new JSONObject();

		String digits = json.getString("digit");
		String filename = json.getString("filename");
		System.out.println(filename);
		StringBuffer sb = new StringBuffer();

		byte[] b = new byte[1024];
		FileInputStream in = new FileInputStream("E:\\calcuPI\\gmp\\Chudnovsky-BSA-PI\\" + filename);
		int len = 0;
		while ((len = in.read(b)) != -1) {
			String str = new String(b, 0, len);
			sb.append(str);
		}
		in.close();

		jsonObject.put("pi", sb.toString());
		response.setStatus(200);
		response.getWriter().write(jsonObject.toString());
		response.getWriter().flush();

		// new FileUtil().getFile(digits, filename);
		//
		// System.out.println(filename);
		// String agent = request.getHeader("User-Agent");
		// String mimeType = this.getServletContext().getMimeType(filename);
		// response.setContentType(mimeType);
		// // 定义一个变量记录编码之后的名字
		// String filenameEncoder = "";
		// if (agent.contains("MSIE")) {
		// // IE编码
		// filenameEncoder = URLEncoder.encode(filename, "utf-8");
		// filenameEncoder = filenameEncoder.replace("+", " ");
		// } else if (agent.contains("Firefox")) {
		// // 火狐编码
		// BASE64Encoder base64Encoder = new BASE64Encoder();
		// filenameEncoder = "=?utf-8?B?" +
		// base64Encoder.encode(filename.getBytes("utf-8")) + "?=";
		// } else {
		// // 浏览器编码
		// filenameEncoder = URLEncoder.encode(filename, "utf-8");
		// }
		//
		// response.setHeader("Content-Disposition", "attachment;filename" +
		// filenameEncoder);
		//
		//// String path = this.getServletContext().getRealPath("download/" + filename);
		//// System.out.println(path);
		// FileInputStream in = new
		// FileInputStream("E:\\calcuPI\\gmp\\Chudnovsky-BSA-PI\\" + filename);
		// ServletOutputStream out = response.getOutputStream();
		// int len = 0;
		// byte[] b = new byte[1024];
		// while((len = in.read(b)) != -1) {
		// out.write(b, 0, len);
		//
		// }
		//
		// in.close();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("charset=utf-8");
		response.setHeader("Access-Control-Allow-Origin", "*");
		/* 星号表示所有的异域请求都可以接受， */
		response.setHeader("Access-Control-Allow-Methods", "GET,POST");

		response.setHeader("connection", "true");

		String digits = request.getParameter("digits");
		String filename = request.getParameter("filename");

		new FileUtil().getFile(digits, filename);

		System.out.println(filename);
		String agent = request.getHeader("User-Agent");
		String mimeType = this.getServletContext().getMimeType(filename);
		response.setContentType(mimeType);
		// 定义一个变量记录编码之后的名字
		String filenameEncoder = "";
		if (agent.contains("MSIE")) {
			// IE编码
			filenameEncoder = URLEncoder.encode(filename, "utf-8");
			filenameEncoder = filenameEncoder.replace("+", " ");
		} else if (agent.contains("Firefox")) {
			// 火狐编码
			BASE64Encoder base64Encoder = new BASE64Encoder();
			filenameEncoder = "=?utf-8?B?" + base64Encoder.encode(filename.getBytes("utf-8")) + "?=";
		} else {
			// 浏览器编码
			filenameEncoder = URLEncoder.encode(filename, "utf-8");
		}

		response.setHeader("Content-Disposition", "attachment;filename=" + filenameEncoder);

		// String path = this.getServletContext().getRealPath("download/" + filename);
		// System.out.println(path);
		FileInputStream in = new FileInputStream("E:\\calcuPI\\gmp\\Chudnovsky-BSA-PI\\" + filename);
		ServletOutputStream out = response.getOutputStream();
		int len = 0;
		byte[] b = new byte[1024];
		while ((len = in.read(b)) != -1) {
			out.write(b, 0, len);

		}

		in.close();
	}
}
