<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div id="resource-manager-content">
    <div class="ui-layout-center">
        <div class="ui-layout-content">
            <div class="portlet">
                <div class="portlet-title">
                    <div class="caption">
                        <span class="caption-subject bold uppercase">资源信息</span>
                    </div>
                    <div class="actions"></div>
                </div>
                <div class="portlet-body form">
                    <form action="#" class="form-horizontal" id="resourceForm">
                        <div class="form-body">
                            <div class="form-group">
                                <label class="control-label control-label-medium">名称：<span
                                        class="required"> * </span></label>
                                <div class="col-md-7">
                                    <input type="text" class="form-control" name="resourceName">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label control-label-medium">是否启用：</label>
                                <div class="col-md-7">
                                    <div class="radio-list"
                                         data-error-container="#form_enable_error">
                                        <label class="radio-inline">
                                            <input type="radio" name="resourceEnabled"
                                                   value="true">
                                            是
                                        </label>
                                        <label class="radio-inline">
                                            <input type="radio" name="resourceEnabled"
                                                   value="false"> 否
                                        </label>
                                    </div>
                                    <div id="form_enable_error"></div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label control-label-medium">资源类型：</label>
                                <div class="col-md-7">
                                    <select name="resourceType" class="form-control"
                                            id="resourceType"
                                            data-error-container="#form_resource_error">
                                        <option></option>
                                        <option value="menu">功能菜单</option>
                                        <option value="item">操作项</option>
                                    </select>
                                    <div id="form_resource_error"></div>
                                </div>
                            </div>
                            <div class="form-group" id="menu-url">
                                <label class="control-label control-label-medium">资源地址：</label>
                                <div class="col-md-7">
                                    <input type="text" class="form-control" name="resourceUrl">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label control-label-medium">权限标识：</label>
                                <div class="col-md-7">
                                    <input type="text" class="form-control"
                                           name="resourceIdentifier">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label control-label-medium">资源图标：</label>
                                <div class="col-md-7">
                                    <input type="text" class="form-control"
                                           name="resourceIcon">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label control-label-medium">描述：</label>
                                <div class="col-md-7">
                                <textarea rows="4" class="form-control"
                                          name="resourceRemark"></textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label control-label-medium"></label>
                                <div class="col-md-7">
                                    <button type="button" class="btn btn-primary"
                                            id="btnSaveResource">
                                        <i class="fa fa-save"></i> 保&nbsp;存
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
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
                    <div class="actions">
                        <div class="btn-group">
                            <a class="btn btn-circle btn-default " href="javascript:;"
                               data-toggle="dropdown">
                                <i class="fa fa-wrench"></i>
                            </a>
                            <ul class="dropdown-menu pull-right">
                                <li>
                                    <a href="javascript:;" id="btnNewResource">
                                        <i class="fa fa-plus"></i> 新增资源 </a>
                                </li>
                                <li>
                                    <a href="javascript:;" id="btnNewNextResource">
                                        <i class="fa fa-plus"></i> 新增下级资源 </a>
                                </li>
                                <li>
                                    <a href="javascript:;" id="btnDelResource">
                                        <i class="fa fa-trash-o"></i> 删除资源 </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="portlet-body">
                    <div class="portlet-scroller">
                        <div class="row">
                            <div class="col-md-12">
                                <div id="res_manage_tree"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/resources/resource.js"
        type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        resources.setPath('<%=request.getContextPath()%>');
        resources.init();
    });
</script>