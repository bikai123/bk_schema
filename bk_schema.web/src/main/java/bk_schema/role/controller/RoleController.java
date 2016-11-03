package bk_schema.role.controller;

import com.alibaba.fastjson.JSONObject;
import bk_schema.role.api.Role;
import bk_schema.role.api.RoleService;
import bk_schema.user.api.User;
import bk_schema.user.api.UserService;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Arrays;
import java.util.List;

/**
 * Created by fanxi on 2016-5-3.
 */
@Controller
@RequestMapping(value = "roles")
public class RoleController {
  Logger logger = LoggerFactory.getLogger(RoleController.class.getName());

  @Autowired
  private RoleService roleService;

  @Autowired
  private UserService userService;

  @RequestMapping(value = "/role", method = RequestMethod.GET)
  @ResponseBody
  public List<Role> getRoles() {
    return roleService.getRoles();
  }

  @RequestMapping(value = "/role/{id}", method = RequestMethod.GET)
  @ResponseBody
  public Role getRole(@PathVariable("id") String id) {
    Role role = roleService.getRole(id);
    return role == null ? new Role() : role;
  }

  @RequestMapping(value = "/role", method = RequestMethod.POST)
  @ResponseBody
  public JSONObject addRole(@RequestBody Role role) {
    JSONObject returnData = new JSONObject();
    if (roleService.roleHasExist(role.getName())) {
      returnData.put("success", false);
      returnData.put("message", "瑙掕壊宸茬粡瀛樺湪锛�");
    }

    roleService.addRole(role);
    returnData.put("success", true);
    return returnData;
  }

  @RequestMapping(value = "/role/{id}", method = RequestMethod.PUT)
  @ResponseBody
  public JSONObject updateRole(@PathVariable("id") String id, @RequestBody Role role) {
    JSONObject returnData = new JSONObject();
    try {
      roleService.updateRole(id, role);
      returnData.put("success", true);
    } catch (Exception ex) {
      returnData.put("success", false);
      logger.error("淇敼瑙掕壊澶辫触锛�", ex);
    }

    return returnData;
  }

  @RequestMapping(value = "/role/{id}", method = RequestMethod.DELETE)
  @ResponseBody
  public boolean deleteRole(@PathVariable("id") String id) {
    roleService.deleteRole(id);
    return true;
  }

  @RequestMapping(value = "/roleauth/{id}", method = RequestMethod.PUT)
  @ResponseBody
  public void setRoleAuth(@PathVariable("id") String id, @RequestBody List<String> resourceIds) {
    roleService.setRoleAuth(id, resourceIds);
  }

  @RequestMapping(value = "/roleauth/{id}", method = RequestMethod.GET)
  @ResponseBody
  public List<String> getRoleAuth(@PathVariable("id") String id) {
    return roleService.getRoleAuth(id);
  }

  @RequestMapping(value = "/setroleusers/{roleId}", method = RequestMethod.PUT)
  @ResponseBody
  public boolean setRoleUsers(
          @PathVariable("roleId") String roleId,
          @RequestBody String[] userIds) {

    List<String> ids = Arrays.asList(userIds);
    return roleService.setRoleUsers(roleId, ids);
  }

  @RequestMapping(value = "/getroleuser/{roleId}", method = RequestMethod.GET)
  @ResponseBody
  public List<User> getRoleUser(@PathVariable("roleId") String roleId) {
    return userService.getUsersByRoleId(roleId);
  }
}
