package bk_schema.user.dao;

import bk_schema.user.api.User;

import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by fanxi on 2016-4-26.
 */
public interface UserMapper {
  User getUser(String id);

  List<User> getUsers();

  void deleteUser(String id);

  void updateUser(@Param("id") String id, @Param("user") User user);

  void addUser(User user);

  Integer hasAccountExist(String account);

  void resetUserPwd(@Param("id") String id, @Param("pwd") String pwd);

  void setUserStatus(@Param("id") String id, @Param("status") Boolean status);

  void deleteUserRole(@Param("id") String id);

  void setUserRole(@Param("id") String id, @Param("roleIds") List<String> roleIds);

  void deleteUserAuth(@Param("id") String id);

  void setUserAuth(@Param("id") String id, @Param("authIds") List<String> authIds);

  List<String> getUserAuth(String id);

  void changeOrg(@Param("id") String id, @Param("orgId") String orgId);

  String getUserOrg(String id);

  List<String> getUserRole(String id);

  List<User> getUsersByOrg(@Param("orgIds") List<String> orgIds);

  User getUserByAccount(String userAccount);

  Integer verifyPwd(@Param("currentAccount") String currentAccount, @Param("originPwd") String originPwd);

  void updateUserPwd(@Param("currentAccount") String currentAccount, @Param("newPwd") String newPwd);

  List<User> getUsersByRoleId(String roleId);
}
