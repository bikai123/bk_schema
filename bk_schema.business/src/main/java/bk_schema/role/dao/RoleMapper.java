package bk_schema.role.dao;

import bk_schema.role.api.Role;

import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by fanxi on 2016-4-28.
 */
public interface RoleMapper {
  Role getRole(String id);

  List<Role> getRoles();

  void deleteRole(String id);

  void updateRole(@Param("id") String id, @Param("role") Role role);

  void addRole(Role role);

  Integer roleHasExist( @Param("name") String name);

  void deleteRoleAuth(@Param("id") String id);

  void setRoleAuth(@Param("id") String id, @Param("authIds") List<String> authIds);

  List<String> getRoleAuth(String id);

  void deleteRoleUser(String roleId);

  void setRoleUsers(@Param("roleId") String roleId, @Param("userIds") List<String> userIds);
}
