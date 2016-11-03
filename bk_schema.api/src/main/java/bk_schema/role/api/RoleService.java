package bk_schema.role.api;

import java.util.List;

/**
 * Created by fanxi on 2016-4-28.
 */
public interface RoleService {
	Role getRole(String id);

	List<Role> getRoles();

	void deleteRole(String id);

	void updateRole(String id, Role role);

	void addRole(Role role);

	boolean roleHasExist(String name);

	void setRoleAuth(String id, List<String> authIds);

	List<String> getRoleAuth(String id);

	boolean setRoleUsers(String roleId, List<String> userIds);
}
