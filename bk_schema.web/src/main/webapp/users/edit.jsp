<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<form action="#" class="form form-horizontal" id="user-form-datas">
	<div class="form-body">
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="control-label col-md-3">用户名称：
						<span class="required"> * </span></label>
					<div class="col-md-9">
						<input type="text" class="form-control" name="name">
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="control-label col-md-3">登陆账号：
						<span class="required"> * </span></label>
					<div class="col-md-9">
						<input type="text" class="form-control" name="userAccount">
					</div>
				</div>
			</div>
		</div>
		<div class="row" data-type="pwd">
			<div class="col-md-12">
				<div class="form-group">
					<label class="control-label col-md-3">密码：
						<span class="required"> * </span></label>
					<div class="col-md-9">
						<input type="password" class="form-control" name="userPwd" id="userPwd">
					</div>
				</div>
			</div>
		</div>
		<div class="row" data-type="pwd">
			<div class="col-md-12">
				<div class="form-group">
					<label class="control-label col-md-3">确认密码：
						<span class="required"> * </span></label>
					<div class="col-md-9">
						<input type="password" class="form-control" name="rePwd">
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="control-label col-md-3">所属部门：</label>
					<div class="col-md-9">
						<input type="text" class="form-control" name="org" style="display: none">
						<a href="javascript:;" id="btnSelectOrg" class="btn btn-default">
							<i class="fa fa-wrench"></i> 单击选择部门
						</a>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="control-label col-md-3">邮箱：</label>
					<div class="col-md-9">
						<input type="text" class="form-control" name="email">
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="control-label col-md-3">备注：</label>
					<div class="col-md-9">
						<textarea type="text" class="form-control" name="remark"/>
					</div>
				</div>
			</div>
		</div>
	</div>
</form>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/users/edit.js" type="text/javascript"></script>
<%
	String id = request.getParameter("id");
	if (id == null) {
		id = "";
	}

	String orgId = request.getParameter("orgid");
	if (orgId == null) {
		orgId = "";
	}
%>
<script type="text/javascript">
	userEdit.setPath('<%=request.getContextPath()%>');
	userEdit.init('<%=id%>', '<%=orgId%>');
</script>