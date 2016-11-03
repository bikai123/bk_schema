<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<form action="#" class="form form-horizontal" id="jizushezhi-form-datas">
	<div class="form-body">
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="control-label col-md-3">机组编号：
						<span class="required"> * </span></label>
					<div class="col-md-9">
						<input type="text" class="form-control" name="bianhao">
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="control-label col-md-3">机组名称：
						<span class="required"> * </span></label>
					<div class="col-md-9">
						<input type="text" class="form-control" name="mingcheng">
					</div>
				</div>
			</div>
		</div>
		<div class="row" >
			<div class="col-md-12">
				<div class="form-group">
					<label class="control-label col-md-3">铭牌容量：
						<span class="required"> * </span></label>
					<div class="col-md-9">
						<input type="text" class="form-control" name="mingpai">
					</div>
				</div>
			</div>
		</div>
		<div class="row" >
			<div class="col-md-12">
				<div class="form-group">
					<label class="control-label col-md-3">燃料说明：
						<span class="required"> * </span></label>
					<div class="col-md-9">
						<input type="text" class="form-control" name="ranliao">
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="control-label col-md-3">投运日期：</label>
					<div class="col-md-9">
						<input type="text" class="form-control" name="riqi" id="riqi">
						
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="control-label col-md-3">机组类型：</label>
					<div class="col-md-9">
						<input type="text" class="form-control" name="leixing">
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="control-label col-md-3">是否停用：</label>
					<div class="col-md-9">						
						<select id="tingyong" name="tingyong"   class="form-control">
						  <option value="1" id="tingyong1">启用</option>
                          <option value="2" id="tingyong2">停用</option>
						</select>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="control-label col-md-3">备注：</label>
					<div class="col-md-9">
						<textarea type="text" class="form-control" name="beizhu"/>
					</div>
				</div>
			</div>
		</div>
	</div>
</form>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/machine/machinesetting/jizushezhi/edit.js" type="text/javascript"></script>
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
jizushezhi_edit.setPath('<%=request.getContextPath()%>');
jizushezhi_edit.init('<%=id%>', '<%=orgId%>');
</script>