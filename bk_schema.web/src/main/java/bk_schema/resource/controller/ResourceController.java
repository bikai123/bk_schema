package bk_schema.resource.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import bk_schema.resource.api.Resource;
import bk_schema.resource.api.ResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Created by fanxi on 2016-5-3.
 */
@Controller
@RequestMapping(value = "/resources")
public class ResourceController {
  @Autowired
  private ResourceService resourceService;

  @RequestMapping(value = "/resource", method = RequestMethod.GET)
  @ResponseBody
  public JSONArray getResources() {

    
	   JSONArray arrayNode = new JSONArray();
    List<Resource> resources = resourceService.getResources();
    List<Resource> rootResource = resources.stream().filter(f -> f.getParentId() == null || f.getParentId().isEmpty()).collect(Collectors.toList());
    builderResourceTree(resources, rootResource, arrayNode);
    return arrayNode;
  }

  private void builderResourceTree(List<Resource> allResources, List<Resource> currentResource, JSONArray resourceTree) {
    for (Resource resource : currentResource) {
      JSONObject node = new JSONObject();
      node.put("id", resource.getId());
      node.put("text", resource.getName());

      JSONObject attr = new JSONObject();
      attr.put("funcId", resource.getFuncId());
      attr.put("type", resource.getCategory());
      node.put("li_attr", attr);
      if (resource.getParentId() == null || resource.getParentId().isEmpty()) {
        JSONObject stateObject = new JSONObject();
        stateObject.put("opened", true);
        node.put("state", stateObject);
      }

      List<Resource> children = allResources.stream().filter(f -> Objects.equals(f.getParentId(), resource.getFuncId())).collect(Collectors.toList());
      if (children.size() > 0) {
        JSONArray childrenNode = new JSONArray();
        builderResourceTree(allResources, children, childrenNode);
        node.put("children", childrenNode);
      }

      resourceTree.add(node);
    }
  }

  @RequestMapping(value = "/resource/{id}", method = RequestMethod.GET)
  @ResponseBody
  public Resource getResource(@PathVariable("id") String id) {
    Resource resource = resourceService.getResource(id);
    return resource == null ? new Resource() : resource;
  }

  @RequestMapping(value = "/resource/{id}", method = RequestMethod.DELETE)
  @ResponseBody
  public boolean deleteResource(@PathVariable("id") String id) {
    return resourceService.deleteResource(id);
  }

  @RequestMapping(value = "/resource", method = RequestMethod.POST)
  @ResponseBody
  public JSONObject addResources(@RequestBody Resource resource) {
    String id = UUID.randomUUID().toString();
    resource.setId(id);
    if (resource.getFuncId() == null || resource.getFuncId().isEmpty()) {
      resource.setFuncId(id);
    }
    int order = resourceService.getMaxOrder(resource.getParentId());
    resource.setOrderNo(order + 1);
    resourceService.addResource(resource);

    JSONObject object = new JSONObject();
    object.put("id", resource.getId());
    return object;
  }

  @RequestMapping(value = "/resource/{id}", method = RequestMethod.PUT)
  @ResponseBody
  public JSONObject updateResource(@PathVariable("id") String id, @RequestBody Resource resource) {
    resourceService.updateResource(id, resource);
    JSONObject object = new JSONObject();
    object.put("id", id);
    return object;
  }

  @RequestMapping(value = "/move/{id}/{parent}/{order}")
  @ResponseBody
  public boolean moveResource(@PathVariable("id") String id, @PathVariable("parent") String parent, @PathVariable("order") int order) {
    String parentId = "";
    if (!Objects.equals(parent, "#")) {
      Resource resource = resourceService.getResource(parent);
      if (resource == null) {
        return false;
      } else {
        parentId = resource.getFuncId();
      }
    }

    resourceService.moveResource(id, parentId, order);
    return true;
  }

}
