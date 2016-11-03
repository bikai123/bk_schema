package bk_schema.security.api;

public class SecurityConfig {
	  private boolean securityDisabled;

	  private String sysTitle;

	  private String copyright;

	  private boolean captchaDisabled;

	  public boolean isSecurityDisabled() {
	    return securityDisabled;
	  }

	  public void setSecurityDisabled(boolean securityDisabled) {
	    this.securityDisabled = securityDisabled;
	  }

	  public String getSysTitle() {
	    return sysTitle;
	  }

	  public void setSysTitle(String sysTitle) {
	    this.sysTitle = sysTitle;
	  }

	  public String getCopyright() {
	    return copyright;
	  }

	  public void setCopyright(String copyright) {
	    this.copyright = copyright;
	  }

	  public boolean isCaptchaDisabled() {
	    return captchaDisabled;
	  }

	  public void setCaptchaDisabled(boolean captchaDisabled) {
	    this.captchaDisabled = captchaDisabled;
	  }
}
