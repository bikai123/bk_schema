<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<div class="row" id="jizushzhi-list-container">
	<div class="col-md-12">
		<div class="portlet light bordered">
			<div class="portletf-body">
				<div class="table-toolbar">
					<div class="row">
						<div class="col-md-12">
							<button class="btn btn-default" id="newjizushezhi">
								<i class="fa fa-plus"></i> 新增
							</button>
							<button class="btn btn-default" id='exportbyExcel'>
								<i class="fa fa-plus"></i> 批量导入
							</button>
							<div class="pull-right">

								<button class="btn btn-default" id="jizushzhi-search-btn">高级查询</button>
								<!--                          <input type="search" class="form-control" id="searchFilter"  placeholder="文档名"> -->

							</div>
							<div class="pull-right">
							<div class="input-icon" style="width: 190px;">
								<i class="fa fa-search"></i> <input type="search"
									class="form-control" id="searchFilter_jizushezhi"
									placeholder="机组名/机组类型">
							</div>
							</div>

							
						</div>
					</div>
					<div class="row" id="jizushzhi-search-div">

						<div class="col-md-1">
							<span class="label label-default">机组名</span>
						</div>
						<div class="col-md-2">
							<input type="text" class="form-control" name="mingcheng" id="mingcheng">
						</div>


						<div class="col-md-1">
							<span class="label label-default">机组类型</span>
						</div>
						<div class="col-md-2">
							<input type="text" class="form-control" name="leixing" id="leixing">
						</div>
						<div class="pull-right col-md-2">
							<button class="btn btn-default" id="chaxun">查询</button>
						</div>

					</div>
					<div id="exportbyExcel-div">
						<input id="selectExcel" name="file" class="file"
							multiple="multiple" type="file">
					</div>

				</div>

				<div class="dataTables_wrapper no footer">
					<table class="table table-striped table-bordered table-hover"
						id="jizushzhi_list_table">
						<thead>
							<tr>
								<th>机组编号</th>
								<th>机组名称</th>
								<th>铭牌容量(MW)</th>
								<th>燃料说明</th>
								<th>投运日期</th>
								<th>机组类型</th>
								<th>是否停用</th>
								<th>备注</th>
								<th>操作</th>
							</tr>
						</thead>
					</table>

				</div>
			</div>

		</div>
	</div>
</div>
<script
	src="<%=request.getContextPath()%>/assets/pages/scripts/machine/machinesetting/jizushezhi/list.js"
	type="text/javascript"></script>
<script type="text/javascript">
$(function(){
	jizushezhi_list.setPath('<%=request.getContextPath()%>');
		jizushezhi_list.init();

	})
</script>