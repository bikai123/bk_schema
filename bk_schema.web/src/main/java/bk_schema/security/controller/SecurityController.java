package bk_schema.security.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import bk_schema.commons.InvokeResult;
import bk_schema.commons.MD5EncryptService;
import bk_schema.resource.api.Resource;
import bk_schema.security.api.CurrentLoginUser;
import bk_schema.security.api.SecurityConfig;

import org.apache.commons.lang.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

//import uCenter.Client;


@Controller
public class SecurityController {
  private static final org.slf4j.Logger LOGGER = LoggerFactory.getLogger(SecurityController.class);

  @Autowired
  private SecurityConfig securityConfig;

  @RequestMapping(value = "/login", method = RequestMethod.GET)
  public String login() {
    return "login";
  }

  @RequestMapping(value = "/xinhai/login/{username}/{pwd}", method = RequestMethod.GET)
  @ResponseBody
  public InvokeResult login(HttpServletRequest request, @PathVariable("username") String userName, @PathVariable("pwd") String pwd) {
    LoginCommand command = new LoginCommand();
    command.setUsername(userName);
    command.setjCaptchaCode("xinhai");

    MD5EncryptService encryptService = new MD5EncryptService();
    String str1 = encryptService.encryptPassword(pwd, "");
    String str2 = encryptService.encryptPassword(str1 + userName, "");
    String str3 = encryptService.encryptPassword(str2 + command.getjCaptchaCode().toUpperCase(), "");
    command.setPassword(str3);

    return execLogin(request, command);
  }

  @RequestMapping(value = "/login", method = RequestMethod.POST)
  @ResponseBody
  public InvokeResult login(HttpServletRequest request, LoginCommand command) {
    return execLogin(request, command);
  }

  private InvokeResult execLogin(HttpServletRequest request, LoginCommand command) {
    InvokeResult result = new InvokeResult();

    String shiroLoginFailure = (String) request.getAttribute("shiroLoginFailure");
    if (!StringUtils.isBlank(shiroLoginFailure)) {
      result.setFailed(true);
      result.setMsg("验证码输入有误。");
    } else {
      UsernamePasswordToken usernamePasswordToken = new UsernamePasswordToken(
              command.getUsername() + "&&" + command.getjCaptchaCode(),
              command.getPassword(),
              command.isRemember()
      );
      try {
        SecurityUtils.getSubject().login(usernamePasswordToken);
       // Client client = new Client();
       // client.uc_user_login("fxfuu", "111111");
        result.setFailed(false);
        result.setMsg("登录成功。");
      } catch (UnknownAccountException e) {
        LOGGER.error(e.getMessage(), e);
        result.setFailed(true);
        result.setMsg("账号不存在。");
      } catch (LockedAccountException e) {
        LOGGER.error(e.getMessage(), e);
        result.setFailed(true);
        result.setMsg("该用户已禁用，请联系管理员。");
      } catch (AuthenticationException e) {
        LOGGER.error(e.getMessage(), e);
        result.setFailed(true);
        result.setMsg("账号或者密码不正确。");
      } catch (Exception e) {
        LOGGER.error(e.getMessage(), e);
        result.setFailed(true);
        result.setMsg("登录失败。");
      }
    }

    return result;
  }

  @RequestMapping(value = "/logout", method = RequestMethod.GET)
  @ResponseBody
  public InvokeResult logout() {
    SecurityUtils.getSubject().logout();
    InvokeResult result = new InvokeResult();
    result.setFailed(false);
    return result;
  }

  @RequestMapping(value = "/verifylogin", method = RequestMethod.GET)
  @ResponseBody
  public Boolean verifyLogin() {
    if (securityConfig.isSecurityDisabled()) {
      return true;
    }

    return CurrentLoginUser.isLogin();
  }

  @RequestMapping(value = "/index", method = RequestMethod.GET)
  @ResponseBody
  public JSONObject index() {
    JSONObject resultDatas = new JSONObject();

    JSONArray arrayNode = new JSONArray();
    List<Resource> resources = CurrentLoginUser.getResources();
    List<Resource> rootResource = resources.stream().filter(f -> f.getParentId() == null || f.getParentId().isEmpty()).collect(Collectors.toList());
    builderResourceTree(resources, rootResource, arrayNode);
    resultDatas.put("menus", arrayNode);
    resultDatas.put("userinfo", CurrentLoginUser.getUserName());
    resultDatas.put("userid", CurrentLoginUser.getId());

    return resultDatas;
  }

  @RequestMapping(value = "/getsysinfo", method = RequestMethod.GET)
  @ResponseBody
  public JSONObject getSysInfo() {
    JSONObject resultDatas = new JSONObject();

    resultDatas.put("title", securityConfig.getSysTitle());
    resultDatas.put("copyright", securityConfig.getCopyright());
    resultDatas.put("jCaptchaDisabled", securityConfig.isCaptchaDisabled());

    return resultDatas;
  }

  private void builderResourceTree(List<Resource> allResources, List<Resource> currentResource, JSONArray resourceTree) {
    for (Resource resource : currentResource) {
      JSONObject node = new JSONObject();
      node.put("id", resource.getId());
      node.put("url", resource.getUrl());
      node.put("icon", resource.getMenuIcon());
      node.put("text", resource.getName());

      List<Resource> children = allResources.stream().filter(f -> Objects.equals(f.getParentId(), resource.getFuncId())).collect(Collectors.toList());
      if (children.size() > 0) {
        JSONArray childrenNode = new JSONArray();
        builderResourceTree(allResources, children, childrenNode);
        node.put("children", childrenNode);
      }

      resourceTree.add(node);
    }
  }
}
