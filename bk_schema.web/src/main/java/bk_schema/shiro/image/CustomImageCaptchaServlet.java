package bk_schema.shiro.image;

import java.awt.image.BufferedImage;
import java.io.IOException;

import javax.imageio.ImageIO;
import javax.servlet.Servlet;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.octo.captcha.service.CaptchaServiceException;
import com.octo.captcha.service.captchastore.FastHashMapCaptchaStore;
import com.octo.captcha.service.image.DefaultManageableImageCaptchaService;
import com.octo.captcha.service.image.ImageCaptchaService;

public class CustomImageCaptchaServlet extends HttpServlet implements Servlet{

	private static final long serialVersionUID = 1L;
	 
    private static ImageCaptchaService service=new DefaultManageableImageCaptchaService(
    		new FastHashMapCaptchaStore(), new GMailEngine(), 
    		180, 100000, 75000);
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setDateHeader("Expires", 0L);
		resp.setHeader("Cache-Control", "no-store,no-cache,must-revalidate");
		resp.setHeader("Cache-Control", "post-check=0,pre-check=0");
		resp.setHeader("Pragma", "no-cache");
		resp.setContentType("image/jpeg");
		ServletOutputStream out=resp.getOutputStream();
		try {
			String captchaId=req.getSession(true).getId();
			BufferedImage challenge=(BufferedImage)service.getChallengeForID(captchaId, req.getLocale());
			ImageIO.write(challenge,"jpg", out);
		} catch (CaptchaServiceException e) {	
			 e.printStackTrace();
		}  
		  finally{
			  out.close();
			  
		  }
		
		try{out.flush();} finally{
			out.close();
			
		}
		 
	}
	
	public static boolean validateResponse(HttpServletRequest request,String userCaptchaResponse){
		if (request.getSession()==null)
		{return false;}
		else {
			boolean validated=false;
			
			try {
				validated=service.validateResponseForID(request.getSession().getId(), userCaptchaResponse);
			} catch (Exception e) {
				// TODO: handle exception
			}
			return validated;
		}
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}
