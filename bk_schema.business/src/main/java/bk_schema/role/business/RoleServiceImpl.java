package bk_schema.role.business;

import bk_schema.role.api.Role;
import bk_schema.role.api.RoleService;
import bk_schema.role.dao.RoleMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

/**
 * Created by fanxi on 2016-4-28.
 */
@Service
public class RoleServiceImpl implements RoleService {
  @Autowired
  private RoleMapper roleMapper;

  @Override
  public Role getRole(String id) {
    return roleMapper.getRole(id);
  }

  @Override
  public List<Role> getRoles() {
    return roleMapper.getRoles();
  }

  @Override
  @Transactional(propagation = Propagation.REQUIRES_NEW)
  public void deleteRole(String id) {
    roleMapper.deleteRoleAuth(id);
    roleMapper.deleteRole(id);
  }

  @Override
  public void updateRole(String id, Role role) {
    roleMapper.updateRole(id, role);
  }

  @Override
  public void addRole(Role role) {
    role.setId(UUID.randomUUID().toString());
    roleMapper.addRole(role);
  }

  @Override
  public boolean roleHasExist(String name) {
    Integer id = roleMapper.roleHasExist(name);
    return id != null && id != 0;
  }

  @Override
  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
  public void setRoleAuth(String id, List<String> authIds) {
    roleMapper.deleteRoleAuth(id);
    if (authIds.size() > 0) {
      roleMapper.setRoleAuth(id, authIds);
    }
  }

  @Override
  public List<String> getRoleAuth(String id) {
    return roleMapper.getRoleAuth(id);
  }

  @Override
  public boolean setRoleUsers(String roleId, List<String> userIds) {
    roleMapper.deleteRoleUser(roleId);
    if (userIds.size() > 0) {
      roleMapper.setRoleUsers(roleId, userIds);
    }

    return true;
  }
}
