package bk_schema.resource.business;
import bk_schema.resource.api.Resource;
import bk_schema.resource.api.ResourceService;
import bk_schema.resource.dao.ResourceMapper;
import bk_schema.role.api.RoleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Created by fanxi on 2016-5-3.
 */
@Service
public class ResourceServiceImpl implements ResourceService {
  @Autowired
  private ResourceMapper resourceMapper;

  @Autowired
  private RoleService roleService;

  @Override
  public List<Resource> getResources() {
    return resourceMapper.getResources();
  }

  @Override
  public Resource getResource(String id) {
    return resourceMapper.getResource(id);
  }

  @Override
  public Boolean deleteResource(String id) {
    resourceMapper.deleteResource(id);
    return true;
  }

  @Override
  public void addResource(Resource resource) {
    resourceMapper.addResource(resource);
  }

  @Override
  public void updateResource(String id, Resource resource) {
    resourceMapper.updateResource(id, resource);
  }

  @Override
  public void moveResource(String id, String parentId, int order) {
    resourceMapper.moveResource(id, parentId, order);
  }

  @Override
  public int getMaxOrder(String parentId) {
    Integer order = resourceMapper.getMaxOrder(parentId);
    return order == null ? 0 : order;
  }

  @Override
  @Transactional
  public void addResources(String roleId, String orgId, List<Resource> resources) {
    List<Resource> currentResources = getResources();
    for (int i = currentResources.size() - 1; i >= 0; i--) {
      for (int j = resources.size() - 1; j >= 0; j--) {
        if (currentResources.get(i).getFuncId() == resources.get(j).getFuncId()) {
          currentResources.remove(i);
          resources.remove(j);
        }
      }
    }

    List<String> deleteRoleAuthIds = new ArrayList<>();
    if (currentResources.size() > 0) {
      deleteRoleAuthIds.addAll(currentResources.stream().map(Resource::getFuncId).collect(Collectors.toList()));
    }

    if (resources.size() > 0) {
      for (Resource resource : resources) {
        resource.setId(UUID.randomUUID().toString());
        addResource(resource);
      }
    }

    if (deleteRoleAuthIds.size() > 0) {
      resourceMapper.deleteResources(deleteRoleAuthIds);
    }

    List<Resource> allResources = getResources();
    if (allResources.size() > 0) {
      List<String> authIds = allResources.stream().map(Resource::getId).collect(Collectors.toList());
      roleService.setRoleAuth(roleId, authIds);
    }
  }
}
