package com.closerwu.web;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.omg.PortableServer.RequestProcessingPolicyOperations;

import com.closerwu.domain.Goods;
import com.closerwu.service.GoodsService;
import com.closerwu.utils.JsonReader;

import net.sf.json.JSONObject;

@WebServlet("/GoodsServlet")
public class GoodsServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public GoodsServlet() {
        super();
    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.getWriter().append("Served at: ").append(request.getContextPath());
		
		response.setHeader("Access-Control-Allow-Methods", "GET POST");
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setContentType("appliaction/json;charset=utf-8");
		
		JSONObject json = JsonReader.receivePost(request);
		String string = json.getString("key1");
		
		JSONObject resJson = new JSONObject();
		resJson.put("key1", string);
		
		
		Cookie cookie = new Cookie("key1", string);
		cookie.setMaxAge(60); //s
		cookie.setPath("/29-Cookie-Seesion");
		response.addCookie(cookie);
		response.setStatus(200);
		response.getWriter().write(resJson.toString());
		response.getWriter().flush();
		
		GoodsService goodsService = new GoodsService();
		List<Goods> all =  goodsService.getAllGoods();
		
		List<Goods> insert = goodsService.insertGoods();
		
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
