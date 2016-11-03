package bk_schema.security.business;

import bk_schema.organization.api.Organization;
import bk_schema.resource.api.Resource;
import bk_schema.security.api.SecurityService;
import bk_schema.security.api.ShiroUser;
import bk_schema.security.dao.SecurityMapper;
import bk_schema.user.api.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Created by fanxi on 2016-5-6.
 */
@Service("authorityVerify")
public class SecurityServiceImpl implements SecurityService {
  @Autowired(required = false)
  private SecurityMapper securityMapper;

  @Override
  public List<Resource> findAllUrlAccessResources(String userAccount) {
    return securityMapper.findUserAuth(userAccount, "menu");
  }

  @Override
  public ShiroUser findUserByUserName(String userAccount) {
    User user = securityMapper.findUser(userAccount);
    if (user == null) {
      return null;
    }

    ShiroUser shiroUser = new ShiroUser();
    shiroUser.setId(user.getId());
    shiroUser.setUserName(user.getName());
    shiroUser.setUserAccount(user.getUserAccount());
    shiroUser.setUserPassword(user.getPassword());
    shiroUser.setEmail(user.getEmail());
    shiroUser.setEnabled(user.getEnabled());
    Organization org = new Organization();
    org.setId(user.getOrgId());
    shiroUser.setOrganization(org);

    return shiroUser;
  }

  @Override
  public Set<String> findUserOperatorAuth(String userAccount) {
    List<Resource> authorities = securityMapper.findUserAuth(userAccount, "item");
    Set<String> userAuth = authorities.stream().map(Resource::getIdentifier).collect(Collectors.toSet());
    return userAuth;
  }

  @Override
  public Organization findOrganizationByUser(String orgId) {

    try {
      return securityMapper.findOrganization(orgId);
    } catch (Exception ex) {

    }

    return null;
  }

  @Override
  public List<String> findUserRoles(String userAccount) {

    try {
      return securityMapper.findUserRoles(userAccount);
    } catch (Exception ex) {

    }

    return new ArrayList<>();
  }
}
