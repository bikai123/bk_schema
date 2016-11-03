package bk_schema.organization.api;

import java.util.List;

/**
 * Created by fanxi on 2016-5-4.
 */
public interface OrganizationService {
  Organization getOrg(String id);

  boolean deleteOrg(String id);

  int getMaxOrder(String parentId);

  String addOrg(Organization org);

  void updateOrg(String id, Organization org);

  /**
   * 获取独立应用组织之下的所有组织结构
   *
   * @param orgId 组织结构主键
   */
  List<Organization> getOrgs(String orgId);

  boolean hasOrgCodeExist(String code);
}
