package com.closerwu.service;

import java.util.List;

import com.closerwu.dao.GoodsDao;
import com.closerwu.domain.Goods;

public class GoodsService {

	public List<Goods> getAllGoods() {
		GoodsDao goodsDao = new GoodsDao();
		List<Goods> allgoods = goodsDao.getAllGoods();
		return allgoods;
	}

	public List<Goods> insertGoods() {
		GoodsDao goodsDao = new GoodsDao();
		List<Goods> insertgoods = goodsDao.insertGoods();
		return null;
		
	}

}
