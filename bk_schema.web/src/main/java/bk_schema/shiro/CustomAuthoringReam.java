package bk_schema.shiro;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;
import bk_schema.security.api.SecurityService;
import bk_schema.security.api.ShiroUser;
import javax.annotation.PostConstruct;
/**
 * @author bikai
 */
public class CustomAuthoringReam  extends AuthorizingRealm{
    @Autowired
	private SecurityService  authorityVerify;       
	@Override 
	protected AuthorizationInfo doGetAuthorizationInfo(
			PrincipalCollection principals) {
		// TODO Auto-generated method stub
		return new SimpleAuthorizationInfo();
	}

	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(
			AuthenticationToken token) throws AuthenticationException {
		  UsernamePasswordToken  toToken=null;
		  if(token instanceof  UsernamePasswordToken){
			  toToken=(UsernamePasswordToken)token;
		  }
		    String userName=toToken.getPrincipal().toString().split("&&")[0];
		    ShiroUser  shiroUser=authorityVerify.findUserByUserName(userName);
		    if(shiroUser==null){
		    	throw new UnknownAccountException("current principal is not existed");		    	
		    } else if(!shiroUser.getEnabled()){
		    	throw new LockedAccountException("current user is suspend");
		    }  
		     SimpleAuthenticationInfo  result=new SimpleAuthenticationInfo(shiroUser, shiroUser.getUserPassword(), shiroUser.getUserName()); 		
		  
		// TODO Auto-generated method stub
		return result;
	}
	
	@PostConstruct
	public void initCredentialsMatcher(){
		CustomCredentialsMatcher  matcher=new CustomCredentialsMatcher();
		 matcher.setAuthorityVerify(authorityVerify);
		 setCredentialsMatcher(matcher);
		
		
	}
   
}
