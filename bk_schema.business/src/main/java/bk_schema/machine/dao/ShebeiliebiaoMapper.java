package bk_schema.machine.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import bk_schema.machine.api.Shebeiliebiao;

public interface ShebeiliebiaoMapper {
	  public List<Shebeiliebiao>  getAllShebeiliebiao();
	  public List<Shebeiliebiao>  getShebeiliebiaosByfenlei(@Param("fenlei") String fenlei);
	  public Shebeiliebiao  getShebeiliebiaoById(@Param("guid") String  guid);
	  public void  insertShebeiliebiao(@Param("shebeiliebiao") Shebeiliebiao  shebeiliebiao);
	  public void   updateShebeiliebiao(@Param("shebeiliebiao") Shebeiliebiao  shebeiliebiao);	  
	  public void deleteShebeiliebiao(@Param("guid") String  guid);
}
