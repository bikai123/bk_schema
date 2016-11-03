package bk_schema.machine.business;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bk_schema.machine.api.Jizushezhi;
import bk_schema.machine.api.JizushezhiService;
import bk_schema.machine.dao.JizushezhiMapper;
@Service
public class JizushezhiServiceImpl  implements JizushezhiService {
	@Autowired
	private JizushezhiMapper jizushezhimapper;
	 
	@Override
	public List<Jizushezhi> getAllJizushezhi() {
		 
		return jizushezhimapper.getAllJizushezhi();
	}

	@Override
	public void insertJizushezhi(Jizushezhi jizushezhi) {
		
		jizushezhimapper.insertJizushezhi(jizushezhi);		
	}

	@Override
	public void updateJizushezhi(Jizushezhi jizushezhi) {
		jizushezhimapper.updateJizushezhi(jizushezhi);
		
	}

	@Override
	public Jizushezhi getJizushezhiById(String guid) {
		// TODO Auto-generated method stub
		return jizushezhimapper.getJizushezhiById(guid);
	}

	@Override
	public void deleteJizushezhi(String guid) {
		jizushezhimapper.deleteJizushezhi(guid);
		
	}

	@Override
	public void tingyongJizushezhi(String guid, int tingyong) {
		jizushezhimapper.tingyongJizushezhi(guid, tingyong);
		
	}

	


	@Override
	public List<Jizushezhi> getJizushezhiBySomething(Jizushezhi jizushezhi) {
		// TODO Auto-generated method stub
		return jizushezhimapper.getJizushezhiBySomething(jizushezhi);
	}

	

}
