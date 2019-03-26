package com.closerwu.dao;

import java.sql.SQLException;
import java.util.List;

import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanListHandler;

import com.closerwu.domain.Goods;
import com.closerwu.utils.JdbcUtil;

public class GoodsDao {

	public List<Goods> getAllGoods() {
		QueryRunner qr = new QueryRunner(JdbcUtil.getDataSource());
		String sql = "select * from goods";
		List<Goods> allgoods = null;
		try {
			allgoods = qr.query(sql, new BeanListHandler<Goods>(Goods.class));
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return allgoods;
		
	}

	public List<Goods> insertGoods() {
		QueryRunner qr = new QueryRunner(JdbcUtil.getDataSource());
		String sql = "select * from goods";
		List<Goods> allgoods = null;
		try {
			allgoods = qr.query(sql, new BeanListHandler<Goods>(Goods.class));
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return allgoods;
	}

}
