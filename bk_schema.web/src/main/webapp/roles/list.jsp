<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div class="row" id="role-manager-content">
	<div class="col-md-12">
		<div class="portlet light bordered">
			<div class="portlet-body">
				<div class="table-toolbar">
					<div class="row">
						<div class="col-md-12">
							<button id="btnNewRole" class="btn btn-default">
								<i class="fa fa-plus"></i> 新增角色
							</button>
							<button id="btnSetRoleAuth" class="btn btn-default">
								<i class="fa fa-wrench"></i> 设置功能权限
							</button>
							<button id="btnSetUser" class="btn btn-default">
								<i class="fa fa-wrench"></i> 设置用户
							</button>
						</div>
					</div>
				</div>
				<div class="dataTables_wrapper no-footer">
					<table class="table table-striped table-bordered table-hover"
						   id="roles_data">
						<thead>
						<tr>
							<th width="40%">角色名称</th>
							<th width="55%">描述</th>
							<th width="5%" style="min-width: 100px;">操作</th>
						</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/roles/roles.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
		roles.init();
	});
</script>