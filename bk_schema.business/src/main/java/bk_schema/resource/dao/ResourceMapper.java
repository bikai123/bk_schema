package bk_schema.resource.dao;

import bk_schema.resource.api.Resource;

import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by fanxi on 2016-5-3.
 */
public interface ResourceMapper {
  List<Resource> getResources();

  Resource getResource(@Param("id") String id);

  void deleteResource(@Param("id") String id);

  void addResource(@Param("resource") Resource resource);

  void updateResource(@Param("id") String id, @Param("resource") Resource resource);

  void moveResource(@Param("id") String id, @Param("parentId") String parentId, @Param("order") int order);

  Integer getMaxOrder(@Param("parentId") String parentId);

  void deleteResources(@Param("authIds") List<String> deleteRoleAuthIds);
}
