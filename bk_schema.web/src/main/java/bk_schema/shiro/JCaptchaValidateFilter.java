package bk_schema.shiro;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.web.filter.AccessControlFilter;
import org.apache.shiro.web.util.WebUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import bk_schema.shiro.image.CustomImageCaptchaServlet;
/**
 * 验证码过滤器，继承{@link AccessControlFilter}，AccessControlFilter提供了访问控制的基本功能：是否允许访问，当访问拒绝的时候如何处理。
 * 用户登录功能，很多时候都需要验证码支持，验证码常用目的就是为了防止机器人模拟真实用户登录而恶意访问， 如暴力破解（因此服务端返回的登录提示信息比较模糊，而不是比较详细的信息）。
 * 采用JCaptcha开源的Java类库生成验证码图片。
 *
 * @author bikai
 */
public class JCaptchaValidateFilter extends  AccessControlFilter  {
   
   private static final Logger LOGGER = LoggerFactory.getLogger(JCaptchaValidateFilter.class);
    private boolean jCaptchaDisabled=false;
    private  String jCaptchaCode="jCaptchaCode";
    private   String failureKeyAttribute="shiroLoginFailure";
   
	@Override
	protected boolean isAccessAllowed(ServletRequest request,
			ServletResponse response, Object mappedValue) throws Exception {
		LOGGER.info("into JCaptchaValidateFilter isAccessAllowed");
		request.setAttribute("jCaptchaDisabled",jCaptchaDisabled);
		HttpServletRequest httpServletrequest=WebUtils.toHttp(request);
		if(jCaptchaDisabled || POST_METHOD.equalsIgnoreCase(httpServletrequest.getMethod())){
			return true;
			
		}
		String jCaptchaCodeParamter=httpServletrequest.getParameter("jCaptchaCode");
		return  (httpServletrequest.getSession(false)!=null && CustomImageCaptchaServlet.validateResponse(httpServletrequest, jCaptchaCodeParamter) );
	}

	@Override
	protected boolean onAccessDenied(ServletRequest request,
			ServletResponse response) throws Exception {
		  request.setAttribute(failureKeyAttribute, "jCaptchaCode.error");
		return  true;
	}

	public boolean isjCaptchaDisabled() {
		return jCaptchaDisabled;
	}

	public void setjCaptchaDisabled(boolean jCaptchaDisabled) {
		this.jCaptchaDisabled = jCaptchaDisabled;
	}

	public String getjCaptchaCode() {
		return jCaptchaCode;
	}

	public void setjCaptchaCode(String jCaptchaCode) {
		this.jCaptchaCode = jCaptchaCode;
	}

	public String getFailureKeyAttribute() {
		return failureKeyAttribute;
	}

	public void setFailureKeyAttribute(String failureKeyAttribute) {
		this.failureKeyAttribute = failureKeyAttribute;
	}

	
}
