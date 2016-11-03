package bk_schema.machine.api;

import java.util.List;

public interface ShebeifenleiService {
	 public List<Shebeifenlei>  getAllShebeifenlei();
	  public void  insertShebeifenlei(Shebeifenlei  shebeifenlei);
	  public void   updateShebeifenlei(Shebeifenlei  shebeifenlei);
	  public void   moveShebeifenlei(String id,String parent);
	  public Shebeifenlei  getShebeifenleiById(String  guid);
	  public void deleteShebeifenlei(String  id);

}
