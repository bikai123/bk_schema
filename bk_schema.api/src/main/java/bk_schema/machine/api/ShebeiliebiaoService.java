package bk_schema.machine.api;

import java.util.List;

public interface ShebeiliebiaoService {
	  public List<Shebeiliebiao>  getAllShebeiliebiao();
	  public List<Shebeiliebiao>  getShebeiliebiaosByfenlei(String fenlei);
	  public Shebeiliebiao  getShebeiliebiaoById(String  guid);
	  public void  insertShebeiliebiao(Shebeiliebiao  shebeiliebiao);
	  public void   updateShebeiliebiao(Shebeiliebiao  shebeiliebiao);	  
	  public void deleteShebeiliebiao(String  guid);
}
