package bk_schema.organization.api;

import java.io.Serializable;

/**
 * Created by fanxi on 2016-4-21.
 */
public class Organization implements Serializable {
	private static final long serialVersionUID = -5105883511957386750L;
	private String id;
	private String code;
	private String name;
	private String parentId;
	private Boolean independent;
	private String orgType;
	private String path;
	private String remark;
	private int orderNo;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getParentId() {
		return parentId;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
	}

	public Boolean getIndependent() {
		return independent;
	}

	public void setIndependent(Boolean independent) {
		this.independent = independent;
	}

	public String getOrgType() {
		return orgType;
	}

	public void setOrgType(String orgType) {
		this.orgType = orgType;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public int getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(int orderNo) {
		this.orderNo = orderNo;
	}
}
