package bk_schema.machine.business;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bk_schema.machine.api.Shebeiliebiao;
import bk_schema.machine.api.ShebeiliebiaoService;
import bk_schema.machine.dao.ShebeiliebiaoMapper;
@Service
public class ShebeiliebiaoImpl  implements ShebeiliebiaoService{
   @Autowired
	private ShebeiliebiaoMapper shebeiliebiaoMapper;
	@Override
	public List<Shebeiliebiao> getAllShebeiliebiao() {
		// TODO Auto-generated method stub
		return shebeiliebiaoMapper.getAllShebeiliebiao();
	}

	@Override
	public List<Shebeiliebiao> getShebeiliebiaosByfenlei(String fenlei) {
		// TODO Auto-generated method stub
		return shebeiliebiaoMapper.getShebeiliebiaosByfenlei(fenlei);
	}

	@Override
	public Shebeiliebiao getShebeiliebiaoById(String guid) {
		// TODO Auto-generated method stub
		return shebeiliebiaoMapper.getShebeiliebiaoById(guid);
	}

	@Override
	public void insertShebeiliebiao(Shebeiliebiao shebeiliebiao) {
		shebeiliebiaoMapper.insertShebeiliebiao(shebeiliebiao);
		
	}

	@Override
	public void updateShebeiliebiao(Shebeiliebiao shebeiliebiao) {
		shebeiliebiaoMapper.updateShebeiliebiao(shebeiliebiao);
		
	}

	@Override
	public void deleteShebeiliebiao(String guid) {
		shebeiliebiaoMapper.deleteShebeiliebiao(guid);
		
	}

}
