<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<form action="#" class="form form-horizontal" id="shebeileixing-form-datas">
	<div class="form-body">
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="control-label col-md-3">设备类型名称：
						<span class="required"> * </span></label>
					<div class="col-md-9">
						<input type="text" class="form-control" name="text">
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="control-label col-md-3">是否展开
						<span class="required"> * </span></label>
					<div class="col-md-9">
						<input type="text" class="form-control" name="opened">
					</div>
				</div>
			</div>
		</div>
		
	</div>
</form>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/machine/machinesetting/shebeileixing/edit.js" type="text/javascript"></script>
<%
	String id = request.getParameter("id");
	if (id == null) {
		id = "";
	}

	String parent = request.getParameter("parent");
	if (parent == null) {
		parent = "";
	}
%>
<script type="text/javascript">
shebeileixing_edit.setPath('<%=request.getContextPath()%>');
shebeileixing_edit.init('<%=id%>', '<%=parent%>');
</script>