<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div id="resource-manager-serauth" style="height: 300px">
    <div class="row">
        <div class="col-md-11">
            <div id="resource-tree">
            </div>
        </div>
    </div>
</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/resources/set-auth.js"></script>
<%
    String id = request.getParameter("id");
    if (id == null) {
        id = "";
    }

    String type = request.getParameter("type");
    if (type == null) {
        type = "";
    }
%>
<script type="text/javascript">
    setAuth.setPath('<%=request.getContextPath()%>');
    setAuth.init('<%=id%>', '<%=type%>');
</script>