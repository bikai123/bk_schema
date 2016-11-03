package bk_schema.user.business;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;


import bk_schema.user.api.User;
import bk_schema.user.api.UserService;
import bk_schema.user.dao.UserMapper;

/**
 * Created by fanxi on 2016-4-26.
 */
@Service
public class UserServiceImpl implements UserService {

  @Autowired
  private UserMapper userMapper;

  @Override
  public User getUser(String id) {
    return userMapper.getUser(id);
  }

  @Override
  public User getUserByAccount(String userAccount) {
    return userMapper.getUserByAccount(userAccount);
  }

  @Override
  public List<User> getUsers() {
    return userMapper.getUsers();
  }

  @Override
  public void deleteUser(String id) {
    userMapper.deleteUser(id);
  }

  @Override
  public void updateUser(String id, User user) {
    userMapper.updateUser(id, user);
  }

  @Override
  public String addUser(User user) {
    String id = UUID.randomUUID().toString();
    user.setId(id);
    userMapper.addUser(user);
    return id;
  }

  @Override
  public boolean hasAccountExist(String account) {
    Integer id = userMapper.hasAccountExist(account);
    return id != null && id != 0;
  }

  @Override
  public void resetUserPwd(String id, String pwd) {
    userMapper.resetUserPwd(id, pwd);
  }

  @Override
  public void setUserStatus(String id, Boolean status) {
    userMapper.setUserStatus(id, status);
  }

  @Override
  @Transactional(propagation = Propagation.REQUIRED)
  public void setUserRole(String id, List<String> roleIds) {
    userMapper.deleteUserRole(id);
    if (roleIds.size() > 0) {
      userMapper.setUserRole(id, roleIds);
    }
  }

  @Override
  @Transactional(propagation = Propagation.REQUIRES_NEW)
  public void setUserAuth(String id, List<String> authIds) {
    userMapper.deleteUserAuth(id);
    if (authIds.size() > 0) {
      userMapper.setUserAuth(id, authIds);
    }
  }

  @Override
  public void changeOrg(String id, String orgId) {
    userMapper.changeOrg(id, orgId);
  }

  @Override
  public List<String> getUserAuth(String id) {
    return userMapper.getUserAuth(id);
  }

  @Override
  public String getUserOrg(String id) {
    return userMapper.getUserOrg(id);
  }

  @Override
  public List<String> getUserRole(String id) {
    return userMapper.getUserRole(id);
  }

  @Override
  public List<User> getUsersByOrg(List<String> orgIds) {
    return userMapper.getUsersByOrg( orgIds);
  }

  @Override
  public boolean verifyPwd(String currentAccount, String originPwd) {
    Integer userCount = userMapper.verifyPwd(currentAccount, originPwd);

    return userCount != null && userCount == 1;
  }

  @Override
  public void updateUserPwd(String currentAccount, String newPwd) {
    userMapper.updateUserPwd(currentAccount, newPwd);
  }

  @Override
  public List<User> getUsersByRoleId(String roleId) {
    return userMapper.getUsersByRoleId(roleId);
  }
}
