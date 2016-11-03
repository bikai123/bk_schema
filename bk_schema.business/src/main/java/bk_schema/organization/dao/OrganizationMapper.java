package bk_schema.organization.dao;

import bk_schema.organization.api.Organization;

import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by fanxi on 2016-5-4.
 */
public interface OrganizationMapper {
	Organization getOrg(String id);

	void deleteOrg(String id);

	Integer getMaxOrder( @Param("parentId") String parentId);

	void addOrg(@Param("org") Organization org);

	void updateOrg(@Param("id") String id, @Param("org") Organization org);

	List<Organization> getOrgs(@Param("orgId") String orgId);

	Integer getOrgCount(@Param("code") String code);
}
