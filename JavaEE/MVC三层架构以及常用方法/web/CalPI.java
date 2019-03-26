package com.closer.request;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.closer.util.JsonReader;

import net.sf.json.JSONObject;

@WebServlet("/CalPI")
public class CalPI extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public CalPI() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("application/json;charset=utf-8");
		response.setHeader("Access-Control-Allow-Origin", "*");
		/* 星号表示所有的异域请求都可以接受， */
		response.setHeader("Access-Control-Allow-Methods", "GET,POST");
		System.out.println("accept");
		JSONObject json = JsonReader.receivePost(request);

		
		String line = null;
		String time = null;
		JSONObject jsonObject = new JSONObject();

		if (json != null) {
			int digit = Integer.parseInt(json.getString("digit"));
			String[] args1 = new String[] { "python", "E:\\calcuPI\\gmp\\Chudnovsky-BSA-PI\\Chudnovsky-BSA-PI.py",
					String.valueOf(digit) };
			Process proc;
			try {
				proc = Runtime.getRuntime().exec(args1);// 执行py文件
				// 用输入输出流来截取结果
				BufferedReader in = new BufferedReader(new InputStreamReader(proc.getInputStream()));
				while ((line = in.readLine()) != null) {
					time = line;
					System.out.println(line);
				}
				in.close();
				proc.waitFor();
			} catch (IOException e) {
				e.printStackTrace();
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			jsonObject.put("status", "true");
		} 
		else {
			jsonObject.put("status", "false");
		}

		jsonObject.put("time", time);

		
		response.setStatus(200);
		response.getWriter().write(jsonObject.toString());
		response.getWriter().flush();
	}

}
