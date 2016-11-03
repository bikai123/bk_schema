package bk_schema.machine.controller;
import java.io.File;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

import jxl.Sheet;
import jxl.Workbook;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import bk_schema.api.util.FileInputUtil;
import bk_schema.machine.api.Jizushezhi;
import bk_schema.machine.api.JizushezhiService;
@Controller
@RequestMapping(value = "/jizushezhi")
public class JizushezhiController {
     @Autowired
	private  JizushezhiService  jizushezhiService;
     @RequestMapping(value = "/getAllJizushezhi")
     @ResponseBody
     public List<Jizushezhi> getAllJizushezhi() {
   	 
    	 return jizushezhiService.getAllJizushezhi();
     }
     @RequestMapping(value = "/getJizushezhiBySomething")
     @ResponseBody
     public List<Jizushezhi> getJizushezhiBySomething(@RequestBody Jizushezhi jizushezhi) {
   	 
    	 return jizushezhiService.getJizushezhiBySomething(jizushezhi);
     }
     @RequestMapping(value = "/insertJizushezhi")     
     @ResponseBody
     public String insertJizushezhi(@RequestBody Jizushezhi jizushezhi) {    	   	 
    	 jizushezhiService.insertJizushezhi(jizushezhi);
    	 return "success";
    	 
     }
     @RequestMapping(value = "/getjizushezhiById/{guid}")
     @ResponseBody
     public  Jizushezhi getJizushezhiById(@PathVariable String guid) {
    	 
    	return  jizushezhiService.getJizushezhiById(guid);
    	 
     }
     @RequestMapping(value = "/insertJizushezhi/{guid}")
     @ResponseBody
     public String updateJizushezhi(@RequestBody Jizushezhi jizushezhi,@PathVariable String guid) {
    	 jizushezhi.setGuid(guid);
    	 jizushezhiService.updateJizushezhi(jizushezhi);
    	 return "success";
    	 
     }
     @RequestMapping(value = "/deleteJizushezhi/{guid}")
     @ResponseBody
     public String deleteJizushezhi(@PathVariable String guid) {
    	 jizushezhiService.deleteJizushezhi(guid);
    	 return "success";   	 
     }
     @RequestMapping(value = "/tingyong/{guidandtingyong}")
     @ResponseBody
     public String tingyongJizushezhi(@PathVariable String guidandtingyong){
    	 String[] arr=guidandtingyong.split("&&");
    	 String guid=arr[0];
    	 int tingyong=Integer.parseInt(arr[1]);
    	 jizushezhiService.tingyongJizushezhi(guid, tingyong);
    	 return "success";
     }
     @RequestMapping(value = "/insertJizushezhibyExcel")
     @ResponseBody
     public  FileInputUtil insertJizushezhibyExcel(@RequestParam(value="file",required=false)  MultipartFile[] files) throws UnsupportedEncodingException{
    	 
    	 	String path="F:/bkFile";
    	 	for (int i = 0; i < files.length; i++) {
    	 		String fileName=new String(files[i].getOriginalFilename().getBytes("ISO-8859-1"),"UTF-8");
    			File targetFile=new File(path, fileName);
    			if(!targetFile.exists()){
    				targetFile.mkdirs();				  				
    				}
    			
    			try {
    			
    				files[i].transferTo(targetFile);
    				List<Jizushezhi> list=new ArrayList<Jizushezhi>();
    			
    				 File file=new File(path+"/"+fileName);
    				 Workbook  rwb = Workbook.getWorkbook(file);
    				 Sheet rs=rwb.getSheet(0);
    				 int clos=rs.getColumns();//得到所有的列
    		         int rows=rs.getRows();//得到所有的行
    		         System.out.println(clos+"\\"+rows);
    		         for (int k = 1; k < rows; k++) {
    		                for (int j = 0; j < clos; j++) {
    		                    //第一个是列数，第二个是行数
    		                    String bianhao =rs.getCell(j++, k).getContents();//默认最左边编号也算一列 所以这里得j++
    		                    String mingcheng=rs.getCell(j++, k).getContents();
    		                    String mingpai=rs.getCell(j++, k).getContents();
    		                    String ranliao=rs.getCell(j++, k).getContents();
    		                    String riqi=rs.getCell(j++, k).getContents();
    		                    String leixing=rs.getCell(j++, k).getContents();
    		                    String tingyong=rs.getCell(j++, k).getContents();
    		                    String beizhu=rs.getCell(j++, k).getContents();  
    		                	Jizushezhi  jizushezhi=new Jizushezhi();
    		                    jizushezhi.setBianhao(bianhao);
    		                    jizushezhi.setMingcheng(mingcheng);
    		                    jizushezhi.setMingpai(Integer.parseInt(mingpai));
    		                    jizushezhi.setRanliao(Integer.parseInt(ranliao));
    		                    jizushezhi.setRiqi(riqi);
    		                    jizushezhi.setLeixing(leixing);
    		                    jizushezhi.setTingyong(Integer.parseInt(tingyong));
    		                    jizushezhi.setBeizhu(beizhu);  
    		                    list.add(jizushezhi);
    		                }
    		               
    		            }  
    		         for (int j = 0; j < list.size(); j++) {
    		        	  jizushezhiService.insertJizushezhi(list.get(j));
					}
	          
				} catch (Exception e) {
					e.printStackTrace();
				}
    			
    	 	}
    	 	FileInputUtil  fileInputUtil=new FileInputUtil();
			 String[] img={};
	    	 fileInputUtil.setInitialPreview(img);
	        	return   fileInputUtil;
     }
     
}
