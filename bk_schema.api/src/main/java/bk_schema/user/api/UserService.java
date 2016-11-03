package bk_schema.user.api;

import java.util.List;

/**
 * 用户信息服务接口 Created by fanxi on 2016-4-26.
 */
public interface UserService {
  /**
   * 获取用户信息
   *
   * @param id 主键
   * @return 用户信息
   */
  User getUser(String id);

  /**
   * 根据登陆账户获取用户信息
   *
   * @param userAccount 登陆账户
   * @return 用户信息
   */
  User getUserByAccount(String userAccount);

  /**
   * 获取全部用户信息
   *
   * @return 用户信息
   */
  List<User> getUsers();

  /**
   * 删除用户
   *
   * @param id 主键
   */
  void deleteUser(String id);

  /**
   * 根据主键修改用户信息
   *
   * @param id 主键
   */
  void updateUser(String id, User user);

  /**
   * 添加用户
   *
   * @param user 用户信息
   */
  String addUser(User user);

  /**
   * 用户登录账户是否已经存在
   *
   * @param account 登陆账户
   * @return 是否存在
   */
  boolean hasAccountExist(String account);

  /**
   * 重置密码
   *
   * @param id  主键
   * @param pwd 默认密码
   */
  void resetUserPwd(String id, String pwd);

  /**
   * 更改用户启停状态
   *
   * @param id     主键
   * @param status 是否启用
   */
  void setUserStatus(String id, Boolean status);

  /**
   * 设置用户所属角色
   *
   * @param id      主键
   * @param roleIds 角色主键集合
   */
  void setUserRole(String id, List<String> roleIds);

  /**
   * 设置用户所属功能权限
   *
   * @param id      主键
   * @param authIds 权限主键结合
   */
  void setUserAuth(String id, List<String> authIds);

  /**
   * 更改用户所属部门
   *
   * @param id    主键
   * @param orgId 组织结构主键
   */
  void changeOrg(String id, String orgId);

  List<String> getUserAuth(String id);

  String getUserOrg(String id);

  List<String> getUserRole(String id);

  List<User> getUsersByOrg(List<String> orgIds);

  boolean verifyPwd(String currentAccount, String originPwd);

  void updateUserPwd(String currentAccount, String newPwd);

  List<User> getUsersByRoleId(String roleId);
}
