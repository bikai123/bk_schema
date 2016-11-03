<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div class="row" id="jizushezhi-manager-view-data">
	<div class="col-md-12 form form-horizontal">
		<div class="form-body">
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-3">机组编号：</label>
						<div class="col-md-9">
							<p class="form-control-static" id="bianhao"></p>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-3">机组名称：</label>
						<div class="col-md-9">
							<p class="form-control-static" id="mingcheng"></p>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-3">铭牌容量(MW)：</label>
						<div class="col-md-9">
							<p class="form-control-static" id="mingpai"></p>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-3">燃料说明：</label>
						<div class="col-md-9">
							<p class="form-control-static" id="ranliao"></p>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-3">投运日期：</label>
						<div class="col-md-9">
							<p class="form-control-static" id="riqi"></p>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-3">机组类型：</label>
						<div class="col-md-9">
							<p class="form-control-static" id="leixing"></p>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-3">是否停用：</label>
						<div class="col-md-9">
							<p class="form-control-static" id="tingyong"></p>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-3">备注：</label>
						<div class="col-md-9">
							<p class="form-control-static" id="biezhu"></p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<script src="<%=request.getContextPath()%>/assets/pages/scripts/machine/machinesetting/jizushezhi/view.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
		jizushezhiView.setPath("<%=request.getContextPath() %>");
		jizushezhiView.init("<%=request.getParameter("id")%>");
	});
</script>