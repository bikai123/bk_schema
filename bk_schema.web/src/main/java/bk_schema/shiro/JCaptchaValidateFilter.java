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
 * ��֤����������̳�{@link AccessControlFilter}��AccessControlFilter�ṩ�˷��ʿ��ƵĻ������ܣ��Ƿ�������ʣ������ʾܾ���ʱ����δ���
 * �û���¼���ܣ��ܶ�ʱ����Ҫ��֤��֧�֣���֤�볣��Ŀ�ľ���Ϊ�˷�ֹ������ģ����ʵ�û���¼��������ʣ� �籩���ƽ⣨��˷���˷��صĵ�¼��ʾ��Ϣ�Ƚ�ģ���������ǱȽ���ϸ����Ϣ����
 * ����JCaptcha��Դ��Java���������֤��ͼƬ��
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
