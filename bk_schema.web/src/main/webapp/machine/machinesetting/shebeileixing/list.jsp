<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<div id="shebeileixing-list-container">
	<div class="ui-layout-center">
		<div class="ui-layout-content">
			<div class="portlet">
				<div class="portlet-title">
					<div class="caption">
					<span class="caption-subject bold uppercase">设备类型列表</span>
					</div>
				</div>
				<div class="portlet-body">
					<div class="table-toolbar">
						<div class="row">
							<div class="col-md-12">
								<button class="btn btn-default">
									<i class="fa fa-plus"></i> 新增
								</button>


								<div class="pull-right">

									<button class="btn btn-default" id="shebeileixing-search-btn">高级查询</button>
									<!--                          <input type="search" class="form-control" id="searchFilter"  placeholder="文档名"> -->

								</div>
							</div>
						</div>
						<div class="row" id="shebeileixing-search-div">

							<div class="col-md-2">
							 <div class="input-icon" style="width: 190px;">
								<i class="fa fa-search"></i>
								<input type="search" class="form-control" id="searchFilter" placeholder="类型名称"> </div>
							</div>
							


							<div class="col-md-2"> <div class="input-icon" style="width: 190px;">
								<i class="fa fa-search"></i>
								<input type="search" class="form-control" id="searchFilter" placeholder="所属分类"> </div></div>
						
							<div class="pull-right col-md-2">
								<button class="btn btn-default">查询</button>
							</div>

						</div>

					</div>
					<div class="dataTables_wrapper no footer">
						<table class="table table-striped table-bordered table-hover"
							id="shebeileixing_list_table">
							<thead>
								<tr>
									<th>类型编码</th>
									<th>类型名称</th>
									<th>所属分类</th>
									<th>停用</th>
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
	<div class="ui-layout-west">
		<div class="ui-layout-content">
			<div class="portlet">
				<div class="portlet-title">
					<div class="caption">
						<span class="caption-subject bold uppercase">资源信息列表</span>
					</div>
					<div class="actions"></div>
				</div>
				<div class="portlet-body">
					<div class="portlet-scroller">
						<div class="row">
							<div class="col-md-12">
								<div id="shebeileixing-list_tree"></div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
</div>
<script
	src="<%=request.getContextPath()%>/assets/pages/scripts/machine/machinesetting/shebeileixing/list.js"
	type="text/javascript"></script>
<script type="text/javascript">
$(function(){
	shebeileixing_list.setPath('<%=request.getContextPath()%>');
		shebeileixing_list.init();

	})
</script>