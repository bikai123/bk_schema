<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="row" id="user-manager-container">
	<div class="col-md-12">
		<div class="portlet light bordered">
			<div class="portletf-body">
				<div class="table-toolbar">
					<div class="row">
						<div class="col-md-12">
							<button id="btnNewUser" class="btn btn-default">
								<i class="fa fa-plus"></i>
								新增
							</button>
							<button id="btnSetRole" class="btn btn-default">
								<i class="fa fa-wrench"></i>
								设置角色
							</button>
							<button id="btnSetUserAuth" class="btn btn-default">
								<i class="fa fa-wrench"></i>
								设置功能权限
							</button>
							<button id="btnSetOrg" class="btn btn-default">
								<i class="fa fa-wrench"></i>
								更改部门
							</button>
							<button id="btnResetPwd" class="btn btn-default">
								<i class="fa fa-wrench"></i>
								重置密码
							</button>
                            <div class="pull-right">
                                <div class="input-icon" style="width: 190px;">
								<i class="fa fa-search"></i>
								<input type="search" class="form-control" id="searchFilter" placeholder="用户名/账号/所属部门"> </div>
                            </div>
						</div>
					</div>
				</div>
				<div class="dataTables_wrapper no-footer">
					<table class="table table-striped table-bordered table-hover"
						   id="users_data">
						<thead>
						<tr>
							<th width="30%">用户名</th>
							<th width="20%">账号</th>
							<th width="20%">所属部门</th>
							<th width="20%">创建时间</th>
							<th width="5%" style="min-width: 150px;">操作</th>
						</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/users/users.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
		users.setPath('<%=request.getContextPath()%>');
		users.init();
	});
</script>