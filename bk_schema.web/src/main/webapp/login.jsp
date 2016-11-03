<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->
<head>
    <meta charset="utf-8"/>
    <title>登陆</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1" name="viewport"/>
    <meta content="" name="description"/>
    <meta content="" name="author"/>
    <link href="<%=request.getContextPath()%>/assets/global/plugins/font-awesome/css/font-awesome.min.css"
          rel="stylesheet" type="text/css"/>

    <link href="<%=request.getContextPath()%>/assets/global/plugins/bootstrap/css/bootstrap.min.css"
          rel="stylesheet"
          type="text/css"/>
    <link href="<%=request.getContextPath()%>/assets/global/plugins/uniform/css/uniform.default.css"
          rel="stylesheet"
          type="text/css"/>
    <link href="<%=request.getContextPath()%>/assets/global/plugins/icheck/skins/all.css"
          rel="stylesheet"
          type="text/css"/>

    <link href="<%=request.getContextPath()%>/assets/global/css/components.css" rel="stylesheet"
          id="style_components"
          type="text/css"/>
    <link href="<%=request.getContextPath()%>/assets/global/css/plugins.css" rel="stylesheet"
          type="text/css"/>
    <link href="<%=request.getContextPath()%>/assets/pages/css/login.css" rel="stylesheet"
          type="text/css"/>
</head>

<body class="login" style="background-image: url(assets/global/img/loginbg.jpg)">

<div class="logo">
    太阳能工程项目管理平台
</div>
<div  align="center" >
	<img src="assets/global/img/login_box.png">
</div>
<div class="content">
       
    <form class="login-form" action="#">
       
        <div class="alert alert-danger display-hide"   >
<!--             <button class="close" data-close="alert"></button> -->
<!--             <span> 请输入用户名或密码！ </span> -->
        </div>
        <div class="form-group">
            <label class="control-label visible-ie8 visible-ie9">用户名</label>
            <div class="input-icon">
                <i class="fa fa-user"></i>
                <input class="form-control form-control-solid placeholder-no-fix" type="text"
                       autocomplete="off"
                       placeholder="用户名" name="username"/></div>
        </div>
        <div class="form-group">
            <label class="control-label visible-ie8 visible-ie9">密码</label>
            <div class="input-icon">
                <i class="fa fa-lock"></i>
                <input class="form-control form-control-solid placeholder-no-fix" type="password"
                       autocomplete="off"
                       placeholder="密码" name="password"/></div>
        </div>
        <div class="row jCaptchaCode">
            <div class="col-md-7">
                <div class="form-group">
                    <label class="control-label visible-ie8 visible-ie9">验证码</label>
                    <input class="form-control form-control-solid placeholder-no-fix"
                           autocomplete="off"
                           placeholder="验证码" name="jCaptchaCode"/>
                </div>
            </div>
            <div class="col-md-5 no-space">
                <img src="jcaptcha.jpg" style="height: 34px; width: 120px;" id="checkCode"
                     onclick="this.src='jcaptcha.jpg?d='+new Date()*1"/>
            </div>
        </div>
        <div class="form-actions">
            <button type="button" class="btn btn-primary" id="btnLogin">&nbsp;&nbsp;登&nbsp;&nbsp;录&nbsp;&nbsp;</button>
            <%--<div class="checkbox">--%>
                <%--<label>--%>
                    <%--<input type="checkbox" value="1" name="rememberme">记住我</label>--%>
            <%--</div>--%>
        </div>
    </form>
    <!-- END LOGIN FORM -->
</div>
<div class="copyright">太阳能工程项目管理平台</div>
<!--[if lt IE 9]>
<script src="<%=request.getContextPath()%>/assets/global/plugins/respond.min.js"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/excanvas.min.js"></script>
<![endif]-->
<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/bootstrap/js/bootstrap.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/uniform/jquery.uniform.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery-validation/js/jquery.validate.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery-validation/js/additional-methods.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery-validation/js/localization/messages_zh.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/icheck/icheck.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/scripts/app.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/md5.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/login.js"
        type="text/javascript"></script>
<script type="text/javascript">
    jQuery(document).ready(function () {
        Login.init('<%=request.getContextPath()%>');
        $('input:checkbox').uniform();
        $.get('<%=request.getContextPath()%>/getsysinfo', null, function (result) {
            if (result) {
                $('title').text(result.title ? result.title : '太阳能工程项目管理平台');
                $('.logo').text(result.title ? result.title : '太阳能工程项目管理平台');
                $('.copyright').text(result.copyright ? result.copyright : '太阳能工程项目管理平台');

                if (result.jCaptchaDisabled) {
                    $('.jCaptchaCode').hide();
                    $('input[name="jCaptchaCode"]').val('xinhai');
                }
            }
        });
    });
</script>
</body>

</html>