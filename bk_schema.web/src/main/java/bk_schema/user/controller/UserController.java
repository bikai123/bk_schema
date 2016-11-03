package bk_schema.user.controller;

import com.alibaba.fastjson.JSONObject;
import bk_schema.commons.MD5EncryptService;
import bk_schema.organization.api.Organization;
import bk_schema.organization.api.OrganizationService;
import bk_schema.security.api.CurrentLoginUser;
import bk_schema.user.api.User;
import bk_schema.user.api.UserService;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by fanxi on 2016-4-28.
 */
@Controller
@RequestMapping(value = "/users")
public class UserController {
  Logger logger = LoggerFactory.getLogger(UserController.class.getName());

  @Autowired
  private UserService userService;

  @Autowired(required = false)
  private OrganizationService organizationService;

  private MD5EncryptService passwordEncryptService = new MD5EncryptService();

  @RequestMapping(value = "/user", method = RequestMethod.GET)
  @ResponseBody
  public List<User> getUsers() {
    Organization org = CurrentLoginUser.getOrganization();
    List<String> orgIds = new ArrayList<>();
    Map idToOrg = new HashMap<String, String>();
    if (org != null && organizationService != null) {
      List<Organization> organizations = organizationService.getOrgs(org.getId());
      if (organizations.size() > 0) {
        for (Organization organization : organizations) {
          orgIds.add(organization.getId());
          idToOrg.put(organization.getId(), organization.getName());
        }
      }
    }

    if (orgIds.size() > 0) {
      List<User> users = userService.getUsersByOrg(orgIds);
      for (User user : users) {
        user.setOrgName((String) idToOrg.get(user.getOrgId()));
      }

      return users;
    }

    return userService.getUsers();
  }

  @RequestMapping(value = "/user/{id}", method = RequestMethod.GET)
  @ResponseBody
  public User getUser(@PathVariable("id") String id) {
    User user = userService.getUser(id);
    return user == null ? new User() : user;
  }

  @RequestMapping(value = "/user", method = RequestMethod.POST)
  @ResponseBody
  public JSONObject addUser(@RequestBody User user) {
    JSONObject returnData = new JSONObject();
    if (userService.hasAccountExist(user.getUserAccount())) {
      returnData.put("success", false);
      returnData.put("message", "鐧婚檰璐︽埛宸茬粡瀛樺湪锛�");
      return returnData;
    }

    Organization org = CurrentLoginUser.getOrganization();
    if ((user.getOrgId() == null || user.getOrgId().isEmpty()) && org != null) {
      user.setOrgId(org.getId());
    }

    user.setCreateDate(new Date());
    user.setPassword(passwordEncryptService.encryptPassword(user.getPassword(), ""));
    userService.addUser(user);

    returnData.put("success", true);
    return returnData;
  }

  @RequestMapping(value = "/user/{id}", method = RequestMethod.PUT)
  @ResponseBody
  public JSONObject updateUser(@PathVariable("id") String id, @RequestBody User user) {
    JSONObject returnData = new JSONObject();
    try {
      userService.updateUser(id, user);
      returnData.put("success", true);
    } catch (Exception ex) {
      returnData.put("success", false);
      logger.error("淇敼鐢ㄦ埛澶辫触锛�", ex);
    }

    return returnData;
  }

  @RequestMapping(value = "/user/{id}", method = RequestMethod.DELETE)
  @ResponseBody
  public boolean deleteUser(@PathVariable("id") String id) {
    userService.deleteUser(id);
    return true;
  }

  @RequestMapping(value = "/pwd/{id}", method = RequestMethod.PUT)
  @ResponseBody
  public boolean resetUserPwd(@PathVariable("id") String id) {
    String pwd = passwordEncryptService.encryptPassword("111111", "");
    userService.resetUserPwd(id, pwd);
    return true;
  }

  @RequestMapping(value = "/status/{id}/{status}", method = RequestMethod.PUT)
  @ResponseBody
  public boolean setUserStatus(@PathVariable("id") String id, @PathVariable("status") Boolean status) {
    userService.setUserStatus(id, status);
    return true;
  }

  @RequestMapping(value = "/userrole/{userId}", method = RequestMethod.GET)
  @ResponseBody
  public List<String> getUserRole(@PathVariable("userId") String userId) {
    return userService.getUserRole(userId);
  }

  @RequestMapping(value = "/userrole/{userId}", method = RequestMethod.PUT)
  @ResponseBody
  public boolean setUserRole(@PathVariable("userId") String userId, @RequestBody List<String> selectedRoles) {
    userService.setUserRole(userId, selectedRoles);
    return true;
  }

  @RequestMapping(value = "/setorg/{id}/{orgId}", method = RequestMethod.PUT)
  @ResponseBody
  public boolean setUserOrg(@PathVariable("id") String id, @PathVariable("orgId") String orgId) {
    userService.changeOrg(id, orgId);
    return true;
  }

  @RequestMapping(value = "/getorg/{id}", method = RequestMethod.GET)
  @ResponseBody
  public JSONObject getUserOrg(@PathVariable("id") String id) {
    JSONObject data = new JSONObject();
    String orgId = userService.getUserOrg(id);
    data.put("orgId", orgId);
    return data;
  }

  @RequestMapping(value = "/userauth/{id}", method = RequestMethod.GET)
  @ResponseBody
  public List<String> getUserAuth(@PathVariable("id") String id) {
    return userService.getUserAuth(id);
  }

  @RequestMapping(value = "/userauth/{id}", method = RequestMethod.PUT)
  @ResponseBody
  public void setUserAuth(@PathVariable("id") String id, @RequestBody List<String> resourceIds) {
    userService.setUserAuth(id, resourceIds);
  }


  @RequestMapping(value = "/modifypwd", method = RequestMethod.PUT)
  @ResponseBody
  public JSONObject modifyPwd(@RequestBody HashMap password) {
    JSONObject result = new JSONObject();
    if (password.containsKey("origin")) {
      String currentAccount = CurrentLoginUser.getUserAccount();
      boolean verifyUser = userService.verifyPwd(currentAccount, password.get("origin").toString());
      if (!verifyUser) {
        result.put("errmsg", "鍘熷瘑鐮佷笉姝ｇ‘锛�");
      } else {
        if (password.containsKey("newPwd")) {
          String newPwd = password.get("newPwd").toString();
          if (StringUtils.isEmpty(newPwd)) {
            result.put("errmsg", "鏂板瘑鐮佷笉鑳戒负绌猴紒");
          } else {
            userService.updateUserPwd(currentAccount, newPwd);
            result.put("errmsg", "");
          }
        } else {
          result.put("errmsg", "鏂板瘑鐮佷笉鑳戒负绌猴紒");
        }
      }
    } else {
      result.put("errmsg", "鍘熷瘑鐮佷笉鑳戒负绌猴紒");
    }

    return result;
  }
}
