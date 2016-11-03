<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<form action="#" id="pwdForm" class="form form-horizontal">
	<div class="form-body">
		<div class="row" data-type="pwd">
			<div class="col-md-12">
				<div class="form-group">
					<label class="control-label col-md-3">原密码：
						<span class="required"> * </span></label>
					<div class="col-md-9">
						<input type="password" class="form-control" name="originUserPwd" id="originUserPwd">
					</div>
				</div>
			</div>
		</div>
		<div class="row" data-type="pwd">
			<div class="col-md-12">
				<div class="form-group">
					<label class="control-label col-md-3">新密码：
						<span class="required"> * </span></label>
					<div class="col-md-9">
						<input type="password" class="form-control" name="newUserPwd" id="newUserPwd">
					</div>
				</div>
			</div>
		</div>
		<div class="row" data-type="pwd">
			<div class="col-md-12">
				<div class="form-group">
					<label class="control-label col-md-3">确认新密码：
						<span class="required"> * </span></label>
					<div class="col-md-9">
						<input type="password" class="form-control" name="rePwd">
					</div>
				</div>
			</div>
		</div>
	</div>
</form>
<script src="<%=request.getContextPath()%>/securityassets/scripts/modifypwd.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/securityassets/scripts/md5.js" type="text/javascript"></script>