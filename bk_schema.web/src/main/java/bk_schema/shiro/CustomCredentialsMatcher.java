package bk_schema.shiro;

import bk_schema.commons.MD5EncryptService;
import bk_schema.security.api.SecurityService;
import bk_schema.security.api.ShiroUser;

import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authc.credential.SimpleCredentialsMatcher;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Created by fanxi on 2016-5-19.
 */
public class CustomCredentialsMatcher extends SimpleCredentialsMatcher {
  Logger logger = LoggerFactory.getLogger(CustomCredentialsMatcher.class);
  private MD5EncryptService encryptService = new MD5EncryptService();
  private SecurityService authorityVerify;

  @Override
  public boolean doCredentialsMatch(AuthenticationToken authcToken, AuthenticationInfo info) {
    UsernamePasswordToken token = (UsernamePasswordToken) authcToken;
    String[] strs = token.getUsername().split("&&");
    String accountCredentials = getCredentials(info).toString();
    String newCredentials1 = encryptService.encryptPassword(accountCredentials + strs[0], "");
    String newCredentials2 = encryptService.encryptPassword(newCredentials1 + strs[1].toUpperCase(), "");

    boolean isSuccess = equals(token.getPassword(), newCredentials2);
    if (isSuccess) {
      ShiroUser shiroUser = (ShiroUser) info.getPrincipals().asList().get(0);
      initLoginUser(shiroUser);
    }

    return isSuccess;
  }

  private void initLoginUser(ShiroUser shiroUser) {
    try {
      if (authorityVerify != null) {
        shiroUser.setRoles(authorityVerify.findUserRoles(shiroUser.getUserAccount()));
        shiroUser.setMenuAuthority(authorityVerify.findAllUrlAccessResources(shiroUser.getUserAccount()));
        shiroUser.setOperatorAuthority(authorityVerify.findUserOperatorAuth(shiroUser.getUserAccount()));
        shiroUser.setOrganization(authorityVerify.findOrganizationByUser(shiroUser.getOrganization().getId()));
      }
    } catch (Exception ex) {
      logger.error("初始化数据权限时出错！", ex);
    }
  }

  public void setAuthorityVerify(SecurityService authorityVerify) {
    this.authorityVerify = authorityVerify;
  }
}
