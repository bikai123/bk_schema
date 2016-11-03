package bk_schema.security.api;

import bk_schema.organization.api.Organization;
import bk_schema.resource.api.Resource;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * 当前用户，能够直接获取当前用户，也能够直接获取当前用户的账户，当前用户的角色
 */
public final class CurrentLoginUser {


	  private static Subject getSubject() {
	    try {
	      return SecurityUtils.getSubject();
	    } catch (Exception ex) {
	    }

	    return null;
	  }

	  private static ShiroUser getPrincipal() {
	    return (ShiroUser) getSubject().getPrincipal();
	  }

	  public static boolean isLogin() {
	    Subject subject = getSubject();
	    if (subject == null) {
	      return false;
	    }

	    return getSubject().isAuthenticated();
	  }

	  public static String getId() {
	    if (!isLogin()) {
	      return "";
	    }

	    return getPrincipal().getId();
	  }

	  public static String getUserName(){
	    if (!isLogin()) {
	      return "";
	    }

	    return getPrincipal().getUserName();
	  }

	  public static String getUserAccount() {
	    if (!isLogin()) {
	      return "";
	    }

	    return getPrincipal().getUserAccount();
	  }

	  public static String getUserEmail() {
	    if (!isLogin()) {
	      return "";
	    }

	    return getPrincipal().getEmail();
	  }

	  public static Organization getOrganization() {
	    if (!isLogin()) {
	      return null;
	    }

	    return getPrincipal().getOrganization();
	  }

	  public static String getOrgId() {
	    if (!isLogin()) {
	      return "";
	    }

	    return getPrincipal().getOrganization().getId();
	  }

	  public static List<Resource> getResources() {
	    if (!isLogin()) {
	      return new ArrayList<>();
	    }

	    return getPrincipal().getMenuAuthority();
	  }

	  public static Set<String> getOperatorAuth() {
	    if (!isLogin()) {
	      return new HashSet<>();
	    }

	    return getPrincipal().getOperatorAuthority();
	  }

}
