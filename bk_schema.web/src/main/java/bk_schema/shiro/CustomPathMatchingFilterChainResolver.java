package bk_schema.shiro;

import javax.servlet.FilterChain;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import org.apache.shiro.web.filter.mgt.FilterChainManager;
import org.apache.shiro.web.filter.mgt.PathMatchingFilterChainResolver;

import bk_schema.security.api.SecurityConfig;

public class CustomPathMatchingFilterChainResolver extends PathMatchingFilterChainResolver 
{ 
   private  CustomDefaultFilterChainManager customDefaultFilterChainManager ;
   private  SecurityConfig securityConfig;
      
  public void setCustomDefaultFilterChainManager(
		  CustomDefaultFilterChainManager customDefaultFilterChainManager) {
	this.customDefaultFilterChainManager = customDefaultFilterChainManager;
	setFilterChainManager(customDefaultFilterChainManager);
	   if(!securityConfig.isCaptchaDisabled()){
   		   
	   customDefaultFilterChainManager.init();
		   
	   }
	
   }
  
  public FilterChain getChain(ServletRequest request, ServletResponse response, FilterChain originalChain) {
	    FilterChainManager filterChainManager = getFilterChainManager();
	    if (!filterChainManager.hasChains()) {
	      return null;
	    }

	    String requestURI = getPathWithinApplication(request);
	    for (String pathPattern : filterChainManager.getChainNames()) {
	      if (pathMatches(pathPattern, requestURI)) {
	        return customDefaultFilterChainManager.proxy(originalChain, pathPattern);
	      }
	    }
	    return null;

	  }

public FilterChainManager getCustomDefaultFilterChainManager() {
	return customDefaultFilterChainManager;
}

public SecurityConfig getSecurityConfig() {
	return securityConfig;
}

public void setSecurityConfig(SecurityConfig securityConfig) {
	this.securityConfig = securityConfig;
}
	
	
}
