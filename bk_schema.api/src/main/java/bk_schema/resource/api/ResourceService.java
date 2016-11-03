package bk_schema.resource.api;

import java.util.List;

/**
 * Created by fanxi on 2016-5-3.
 */
public interface ResourceService {

  /**
   * 根据客户主键获取资源信息
   */
  List<Resource> getResources();

  Resource getResource(String id);

  Boolean deleteResource(String id);

  void addResource(Resource resource);

  void updateResource(String id, Resource resource);

  void moveResource(String id, String customerId, int order);

  int getMaxOrder(String parentId);

  void addResources(String roleId, String orgId, List<Resource> resources);
}
