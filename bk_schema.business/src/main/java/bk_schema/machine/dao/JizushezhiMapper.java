package bk_schema.machine.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import bk_schema.machine.api.Jizushezhi;

public interface JizushezhiMapper {
	 public List<Jizushezhi>  getAllJizushezhi();
	 public List<Jizushezhi>  getJizushezhiBySomething(@Param("jizushezhi") Jizushezhi jizushezhi);
	 public void  insertJizushezhi( @Param("jizushezhi") Jizushezhi  jizushezhi);
	  public void   updateJizushezhi(@Param("jizushezhi") Jizushezhi  jizushezhi);
	  public Jizushezhi  getJizushezhiById(@Param("guid") String  guid);
	  public void deleteJizushezhi( @Param("guid")  String  guid);
	  public void tingyongJizushezhi(@Param("guid")String  guid,@Param("tingyong")int tingyong);
}
