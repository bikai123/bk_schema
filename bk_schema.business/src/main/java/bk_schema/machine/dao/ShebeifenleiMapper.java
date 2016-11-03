package bk_schema.machine.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import bk_schema.machine.api.Shebeifenlei;

public interface ShebeifenleiMapper {
	 public List<Shebeifenlei>  getAllShebeifenlei();
	  public void  insertShebeifenlei( @Param("shebeifenlei") Shebeifenlei  shebeifenlei);
	  public void   updateShebeifenlei(@Param("shebeifenlei") Shebeifenlei  shebeifenlei);
	  public Shebeifenlei  getShebeifenleiById(@Param("id") String  guid);
	  public void deleteShebeifenlei(@Param("id") String  guid);
	  public void   moveShebeifenlei(@Param("id")String id,@Param("parent")String parent);
}
