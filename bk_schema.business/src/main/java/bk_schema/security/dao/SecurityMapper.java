package bk_schema.security.dao;

import bk_schema.organization.api.Organization;
import bk_schema.resource.api.Resource;
import bk_schema.user.api.User;

import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by fanxi on 2016-5-6.
 */
public interface SecurityMapper {
	User findUser(String userAccount);

	Organization findOrganization(String orgId);

	List<Resource> findUserAuth(@Param("userAccount") String userAccount, @Param("type") String type);

	List<String> findUserRoles(String userAccount);
}
