package bk_schema.security.api;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

import bk_schema.organization.api.Organization;
import bk_schema.resource.api.Resource;

public class ShiroUser implements  Serializable {


	private static final long serialVersionUID = 2022276096541320609L;

	private String id;
	private String userName;
	private  String userAccount;
	private String userPassword;
	private String salt;
	private String email;
	private Organization organization;
	private Boolean enabled;
	private List<String> roles;
	private Set<String> operatorAuthority;
	private List<Resource> menuAuthority;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserAccount() {
		return userAccount;
	}
	public void setUserAccount(String userAccount) {
		this.userAccount = userAccount;
	}
	public String getUserPassword() {
		return userPassword;
	}
	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}
	public String getSalt() {
		return salt;
	}
	public void setSalt(String salt) {
		this.salt = salt;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Organization getOrganization() {
		return organization;
	}
	public void setOrganization(Organization organization) {
		this.organization = organization;
	}
	public Boolean getEnabled() {
		return enabled;
	}
	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}
	public List<String> getRoles() {
		return roles;
	}
	public void setRoles(List<String> roles) {
		this.roles = roles;
	}
	public Set<String> getOperatorAuthority() {
		return operatorAuthority;
	}
	public void setOperatorAuthority(Set<String> operatorAuthority) {
		this.operatorAuthority = operatorAuthority;
	}
	public List<Resource> getMenuAuthority() {
		return menuAuthority;
	}
	public void setMenuAuthority(List<Resource> menuAuthority) {
		this.menuAuthority = menuAuthority;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
    	
	
}
