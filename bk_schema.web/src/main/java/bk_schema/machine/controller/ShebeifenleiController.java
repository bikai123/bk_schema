package bk_schema.machine.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import bk_schema.machine.api.Shebeifenlei;
import bk_schema.machine.api.ShebeifenleiService;

@Controller
@RequestMapping("/shebeifenlei")
public class ShebeifenleiController {
    @Autowired
	private ShebeifenleiService  shebeifenleiService;
    @RequestMapping(value = "/getAllShebeifenlei")
    @ResponseBody
    public List<Shebeifenlei> getAllJizushezhi() { 
   	 return shebeifenleiService.getAllShebeifenlei();
    }
    @RequestMapping(value = "/getShebeifenleiById/{guid}")
    @ResponseBody
    public  Shebeifenlei getShebeifenleiById(@PathVariable String guid) {  	 
   	return  shebeifenleiService.getShebeifenleiById(guid);  	 
    }
    @RequestMapping(value = "/insertShebeifenlei")     
    @ResponseBody
    public String insertShebeifenlei(@RequestBody Shebeifenlei shebeifenlei) {    	   	 
    	shebeifenleiService.insertShebeifenlei(shebeifenlei);
   	 return "success";
   	 
    }
    @RequestMapping(value = "/insertShebeifenlei/{id}")
    @ResponseBody
    public String updateShebeifenlei(@RequestBody Shebeifenlei shebeifenlei,@PathVariable String id) {
    	shebeifenlei.setId(id);
    	shebeifenleiService.updateShebeifenlei(shebeifenlei);;
   	    return "success";
   	 
    }
    @RequestMapping(value = "/delelteShebeifenlei/{id}")
    @ResponseBody
    public String elelteShebeifenlei(@PathVariable String id) {
    	
    	shebeifenleiService.deleteShebeifenlei(id);;
   	    return "success";
   	 
    }
    @RequestMapping(value = "/move/{id}/{parent}/{order}")
    @ResponseBody
    public String updateShebeifenlei(@PathVariable("id") String id,@PathVariable("parent") String parent,@PathVariable("order") String order) {
    	
    	shebeifenleiService.moveShebeifenlei(id, parent);;
   	    return "success";
   	 
    }
}
