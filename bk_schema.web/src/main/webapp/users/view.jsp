<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div class="row" id="user-manager-view-data">
	<div class="col-md-12 form form-horizontal">
		<div class="form-body">
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-3">用户名：</label>
						<div class="col-md-9">
							<p class="form-control-static" id="name"></p>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-3">账号：</label>
						<div class="col-md-9">
							<p class="form-control-static" id="account"></p>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-3">用户状态：</label>
						<div class="col-md-9">
							<p class="form-control-static" id="status"></p>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-3">所属组织结构：</label>
						<div class="col-md-9">
							<p class="form-control-static" id="org"></p>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-3">创建时间：</label>
						<div class="col-md-9">
							<p class="form-control-static" id="createDate"></p>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-3">邮箱：</label>
						<div class="col-md-9">
							<p class="form-control-static" id="email"></p>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-3">备注：</label>
						<div class="col-md-9">
							<p class="form-control-static" id="remark"></p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<script src="<%=request.getContextPath()%>/assets/pages/scripts/users/view.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
		userView.setPath("<%=request.getContextPath() %>");
		userView.init("<%=request.getParameter("id")%>");
	});
</script>