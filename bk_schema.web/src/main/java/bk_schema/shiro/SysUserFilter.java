package bk_schema.shiro;

import java.util.List;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.util.AntPathMatcher;
import org.apache.shiro.util.PatternMatcher;
import org.apache.shiro.web.filter.authz.AuthorizationFilter;
import org.apache.shiro.web.servlet.ShiroHttpServletRequest;

import bk_schema.resource.api.Resource;
import bk_schema.security.api.ShiroUser;

public class SysUserFilter  extends AuthorizationFilter{
   
	 private PatternMatcher  pathMatcher=new AntPathMatcher();
	@Override
	protected boolean isAccessAllowed(ServletRequest request,
			ServletResponse response, Object mappedValue) throws Exception {
		  ShiroUser loginUser=(ShiroUser)SecurityUtils.getSubject().getPrincipal();
		  if(loginUser==null){
			  return false;
		  }
		  else if(loginUser.getRoles().contains("超级管理员")){
			  
			  return true;
			  
		  } else{
			  
			  String requestUrl=((ShiroHttpServletRequest)request).getRequestURI();
			  List<Resource>  resources=loginUser.getMenuAuthority();
			  for (Resource resource : resources) {
				if(pathMatcher.matches(resource.getIdentifier(), requestUrl)){
					return true;
				}
			}
			  return false ;
		  }
		 
	}

}
