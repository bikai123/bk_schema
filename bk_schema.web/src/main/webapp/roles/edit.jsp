<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<form action="#" id="role-manager-formdata" class="form form-horizontal">
    <div class="form-body">
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label class="control-label col-md-3">角色名称：
                        <span class="required"> * </span></label>
                    <div class="col-md-9">
                        <input type="text" class="form-control" name="roleName">
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label class="control-label col-md-3">备注：</label>
                    <div class="col-md-9">
                        <textarea rows="5" class="form-control" name="roleRemark"></textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/roles/edit.js"
        type="text/javascript"></script>
<%
    String id = request.getParameter("id");
    if (id == null) {
        id = "";
    }
%>
<script type="text/javascript">
    $(function () {
        roleEdit.setPath('<%=request.getContextPath()%>');
        roleEdit.init('<%=id%>');
    });
</script>