package bk_schema.organization.business;

import bk_schema.organization.api.Organization;
import bk_schema.organization.api.OrganizationService;
import bk_schema.organization.dao.OrganizationMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

/**
 * Created by fanxi on 2016-5-4.
 */
@Service
public class OrganizationServiceImpl implements OrganizationService {
  @Autowired
  private OrganizationMapper organizationMapper;

  @Override
  public Organization getOrg(String id) {
    return organizationMapper.getOrg(id);
  }

  @Override
  public boolean deleteOrg(String id) {
    organizationMapper.deleteOrg(id);
    return true;
  }

  @Override
  public int getMaxOrder(String parentId) {
    Integer orderNo = organizationMapper.getMaxOrder(parentId);
    return orderNo == null ? 0 : orderNo;
  }

  @Override
  public String addOrg(Organization org) {
    org.setId(UUID.randomUUID().toString());
    organizationMapper.addOrg(org);
    return org.getId();
  }

  @Override
  public void updateOrg(String id, Organization org) {
    organizationMapper.updateOrg(id, org);
  }

  @Override
  public List<Organization> getOrgs(String orgId) {
    return organizationMapper.getOrgs(orgId);
  }

  @Override
  public boolean hasOrgCodeExist(String code) {
    Integer orgCount = organizationMapper.getOrgCount(code);
    return orgCount != null && orgCount > 0;
  }
}
