package bk_schema.security.api;

import java.util.List;
import java.util.Set;

import bk_schema.organization.api.Organization;
import bk_schema.resource.api.Resource;

public interface SecurityService {
 
    ShiroUser findUserByUserName( String userAccount);
    List<Resource> findAllUrlAccessResources(String userAccount);
    Set<String> findUserOperatorAuth(String userAccount);
    Organization findOrganizationByUser(String userAccount);
    List<String> findUserRoles(String userAccount);
	  
}
