package bk_schema.machine.business;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bk_schema.machine.api.Shebeifenlei;
import bk_schema.machine.api.ShebeifenleiService;
import bk_schema.machine.dao.ShebeifenleiMapper;
@Service
public class ShebeifenleiServiceImpl  implements ShebeifenleiService{
    @Autowired
	private ShebeifenleiMapper  shebeifenleiMapper;
	@Override
	public List<Shebeifenlei> getAllShebeifenlei() {
		// TODO Auto-generated method stub
		return shebeifenleiMapper.getAllShebeifenlei();
	}

	@Override
	public void insertShebeifenlei(Shebeifenlei shebeifenlei) {
		shebeifenleiMapper.insertShebeifenlei(shebeifenlei);
		
	}

	@Override
	public void updateShebeifenlei(Shebeifenlei shebeifenlei) {
		shebeifenleiMapper.updateShebeifenlei(shebeifenlei);
		
	}

	@Override
	public Shebeifenlei getShebeifenleiById(String guid) {
		// TODO Auto-generated method stub
		return shebeifenleiMapper.getShebeifenleiById(guid);
	}

	@Override
	public void deleteShebeifenlei(String guid) {
		shebeifenleiMapper.deleteShebeifenlei(guid);
		
	}

	@Override
	public void moveShebeifenlei(String id, String parent) {
		shebeifenleiMapper.moveShebeifenlei(id, parent);
		
	}

}
