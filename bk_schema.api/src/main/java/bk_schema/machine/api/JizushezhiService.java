package bk_schema.machine.api;

import java.util.List;

public interface JizushezhiService {

	
  public List<Jizushezhi>  getAllJizushezhi();
  public List<Jizushezhi>  getJizushezhiBySomething(Jizushezhi  jizushezhi);
  public void  insertJizushezhi(Jizushezhi  jizushezhi);
  public void   updateJizushezhi(Jizushezhi  jizushezhi);
  public Jizushezhi  getJizushezhiById(String  guid);
  public void deleteJizushezhi(String  guid);
  public void tingyongJizushezhi(String  guid,int tingyong);
}
