package bk_schema.user.api;

import java.util.Date;

/**
 * 用户信息
 */
public class User {

  /**
   * 用户主键
   */
  private String id;
  /**
   * 用户登陆账号
   */
  private String userAccount;
  /**
   * 用户登录密码
   */
  private String password;
  /**
   * 用户名称
   */
  private String name;
  /**
   * 是否启用
   */
  private Boolean enabled;
  /**
   * 邮箱
   */
  private String email;
  /**
   * 所属组织结构
   */
  private String orgId;
  /**
   * 所属组织结构名称
   */
  private String orgName;
  /**
   * 上次登陆时间
   */
  private Date lastLoginDate;
  /**
   * 创建时间
   */
  private Date createDate;
  /**
   * 备注
   */
  private String remark;

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getUserAccount() {
    return userAccount;
  }

  public void setUserAccount(String userAccount) {
    this.userAccount = userAccount;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Boolean getEnabled() {
    return enabled;
  }

  public void setEnabled(Boolean enabled) {
    this.enabled = enabled;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getOrgId() {
    return orgId;
  }

  public void setOrgId(String orgId) {
    this.orgId = orgId;
  }

  public Date getLastLoginDate() {
    return lastLoginDate;
  }

  public void setLastLoginDate(Date lastLoginDate) {
    this.lastLoginDate = lastLoginDate;
  }

  public Date getCreateDate() {
    return createDate;
  }

  public void setCreateDate(Date createDate) {
    this.createDate = createDate;
  }

  public String getRemark() {
    return remark;
  }

  public void setRemark(String remark) {
    this.remark = remark;
  }

  public String getOrgName() {
    return orgName;
  }

  public void setOrgName(String orgName) {
    this.orgName = orgName;
  }
}
