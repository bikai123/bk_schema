package bk_schema.machine.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import bk_schema.machine.api.Shebeiliebiao;
import bk_schema.machine.api.ShebeiliebiaoService;

@Controller
@RequestMapping("/shebeiliebiao")
public class ShebeiliebiaoController {
    @Autowired
	private ShebeiliebiaoService  ShebeiliebiaoService;
    @RequestMapping(value = "/getAllShebeiliebiao")
    @ResponseBody
    public List<Shebeiliebiao> getAllJizushezhi() { 
    	 	 return ShebeiliebiaoService.getAllShebeiliebiao();
    }
    @RequestMapping(value = "/getShebeiliebiaosbyfenlei/{fenlei}")
    @ResponseBody
    public List<Shebeiliebiao> getAllJizushezhiByfenlei(@PathVariable String fenlei) { 
   	 return ShebeiliebiaoService.getShebeiliebiaosByfenlei(fenlei);
    }
    @RequestMapping(value = "/getShebeiliebiaoById/{guid}")
    @ResponseBody
    public  Shebeiliebiao getShebeiliebiaoById(@PathVariable String guid) {  	 
   	return  ShebeiliebiaoService.getShebeiliebiaoById(guid);  	 
    }
    @RequestMapping(value = "/insertShebeiliebiao")     
    @ResponseBody
    public String insertShebeiliebiao(@RequestBody Shebeiliebiao Shebeiliebiao) {    	   	 
    	ShebeiliebiaoService.insertShebeiliebiao(Shebeiliebiao);
   	 return "success";
   	 
    }
    @RequestMapping(value = "/insertShebeiliebiao/{guid}")
    @ResponseBody
    public String updateShebeiliebiao(@RequestBody Shebeiliebiao Shebeiliebiao,@PathVariable String guid) {
    	Shebeiliebiao.setGuid(guid);
    	ShebeiliebiaoService.updateShebeiliebiao(Shebeiliebiao);;
   	    return "success";
   	 
    }
    @RequestMapping(value = "/delelteShebeiliebiao/{id}")
    @ResponseBody
    public String elelteShebeiliebiao(@PathVariable String id) { 	
    	ShebeiliebiaoService.deleteShebeiliebiao(id);;
   	    return "success";
   	 
    }
  
}
