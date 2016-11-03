package bk_schema.organization.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import bk_schema.organization.api.Organization;
import bk_schema.organization.api.OrganizationService;
import bk_schema.security.api.CurrentLoginUser;
import bk_schema.user.api.User;
import bk_schema.user.api.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Created by fanxi on 2016-5-4.
 */
@Controller
@RequestMapping(value = "/organization")
public class OrganizationController {
  @Autowired
  private OrganizationService organizationService;
  @Autowired
  private UserService userService;
 @RequestMapping(value="/organduser")
 @ResponseBody
  public JSONArray getOrgAndUser(){
	  JSONArray arrayNode=new JSONArray();
	  
	  Organization organization = CurrentLoginUser.getOrganization();
	  List<Organization> organizations = organizationService.getOrgs(
	  organization == null ? "" : organization.getId());

	    Set<String> orgIds = organizations.stream().map(Organization::getId).collect(Collectors.toSet());
	    List<User> users = userService.getUsersByOrg(new ArrayList<>(orgIds));
	   
	    for (Organization org : organizations) {
	      JSONObject node = new JSONObject();
	      node.put("id", org.getId());
	      node.put("text", org.getName());

	      JSONObject attr = new JSONObject();
	      attr.put("independent", org.getIndependent());
	      node.put("li_attr", attr);

	      if (org.getParentId() != null
	              && !org.getParentId().isEmpty()
	              && orgIds.contains(org.getParentId())) {
	        node.put("parent", org.getParentId());
	      } else {
	        JSONObject stateObject = new JSONObject();
	        stateObject.put("opened", true);
	        node.put("parent", "#");
	        node.put("state", stateObject);
	      }

	      arrayNode.add(node);
	    }
	    for (User user : users) {
	    	if(!user.getName().equals("admin")){
			JSONObject node=new JSONObject();
			node.put("id", user.getId());
			node.put("text",user.getName());
			node.put("parent", user.getOrgId());
			JSONObject attr = new JSONObject();
			attr.put("independent", null);
			node.put("li_attr", attr);
			arrayNode.add(node);
	    	}
			
	    	
		}
	  
	  
	  return arrayNode;
  }
  
  @RequestMapping(value = "/org", method = RequestMethod.GET)
  @ResponseBody
  public JSONArray getOrg() {
    JSONArray arrayNode = new JSONArray();
    Organization organization = CurrentLoginUser.getOrganization();
    List<Organization> organizations = organizationService.getOrgs(
            organization == null ? "" : organization.getId());

    Set<String> orgIds = organizations.stream().map(Organization::getId).collect(Collectors.toSet());
    for (Organization org : organizations) {
      JSONObject node = new JSONObject();
      node.put("id", org.getId());
      node.put("text", org.getName());

      JSONObject attr = new JSONObject();
      attr.put("independent", org.getIndependent());
      node.put("li_attr", attr);

      if (org.getParentId() != null
              && !org.getParentId().isEmpty()
              && orgIds.contains(org.getParentId())) {
        node.put("parent", org.getParentId());
      } else {
        JSONObject stateObject = new JSONObject();
        stateObject.put("opened", true);
        node.put("parent", "#");
        node.put("state", stateObject);
      }

      arrayNode.add(node);
    }

    return arrayNode;
  }

  @RequestMapping(value = "/org/{id}", method = RequestMethod.GET)
  @ResponseBody
  public Organization getOrg(@PathVariable("id") String id) {
    Organization organization = organizationService.getOrg(id);
    return organization == null ? new Organization() : organization;
  }

  @RequestMapping(value = "/org/{id}", method = RequestMethod.DELETE)
  @ResponseBody
  public boolean deleteOrg(@PathVariable("id") String id) {
    return organizationService.deleteOrg(id);
  }

  @RequestMapping(value = "/org", method = RequestMethod.POST)
  @ResponseBody
  public JSONObject addOrg(@RequestBody Organization org) {
    boolean hasOrgCodeExist = organizationService.hasOrgCodeExist(org.getCode());
    JSONObject object = new JSONObject();
    if (hasOrgCodeExist) {
      object.put("errmsg", "缁勭粐缁撴瀯缂栫爜宸茬粡瀛樺湪锛�");
    } else {
      if (org.getParentId() == null || org.getParentId().isEmpty()) {
        org.setPath(org.getCode());
      } else {
        Organization parentOrg = organizationService.getOrg(org.getParentId());
        if (parentOrg != null) {
          org.setPath(parentOrg.getPath() + "|&" + org.getCode());
        }
      }

      int order = organizationService.getMaxOrder(org.getParentId());
      org.setOrderNo(order + 1);
      String orgId = organizationService.addOrg(org);
      object.put("id", orgId);
    }

    return object;
  }


  @RequestMapping(value = "/org/{id}", method = RequestMethod.PUT)
  @ResponseBody
  public JSONObject updateOrg(@PathVariable("id") String id, @RequestBody Organization org) {
    organizationService.updateOrg(id, org);
    JSONObject object = new JSONObject();
    object.put("id", org.getId());
    return object;
  }
}
