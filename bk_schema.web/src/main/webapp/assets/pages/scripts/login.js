var Login = function () {
  var configMap = {
    path: ''
  };

  var getEncryption = function (password, ucode, vcode) {
    var str1 = hex_md5(password);
    var str2 = hex_md5(str1 + ucode);
    var str3 = hex_md5(str2 + vcode.toUpperCase());
    return str3;
  };

  var login = function () {
    var loginForm = $('.login-form');
    if (loginForm.validate().form()) {
      var userName = $('input[name="username"]').val();
      var remember = $('input[name="rememberme"]:checked').length > 0 ? true : false;
      var jCaptchaCode = $('input[name="jCaptchaCode"]').val();
      var pwd = getEncryption($('input[name="password"]').val(), userName, jCaptchaCode);
      var postData = 'username=' + userName + '&password=' + pwd + '&remember=' + remember
        + '&jCaptchaCode=' + jCaptchaCode;
      $.ajax({
        url: configMap.path + '/login',
        type: 'POST',
        dataType: 'JSON',
        data: postData,
        success: function (result) {
          if (result.failed) {
            $('.alert-danger span', loginForm).text(result.msg);
            $('.alert-danger', loginForm).show();
            $('input[name="jCaptchaCode"]').val('');
            $('#checkCode').attr('src', configMap.path + '/jcaptcha.jpg?d=' + new Date() * 1);
          }
          else {
            window.location.href = configMap.path + '/index.jsp';
          }
        },
        error: function (ex, e, ee) {
          $('input[name="jCaptchaCode"]').val('');
          $('#checkCode').attr('src', configMap.path + '/jcaptcha.jpg?d=' + new Date() * 1);
          $('.alert-danger span', loginForm).text('登陆失败！');
          $('.alert-danger', loginForm).show();
        }
      });
    }
  };

  var handleLogin = function () {
    $('.login-form').validate({
      errorElement: 'span',
      errorClass: 'help-block',
      focusInvalid: false,
      rules: {
        username: {
          required: true
        },
        password: {
          required: true
        }
      },
      messages: {
        username: {
          required: '请输入用户名'
        },
        password: {
          required: '请输入密码'
        }
      },
      highlight: function (element) {
        $(element)
          .closest('.form-group').addClass('has-error');
      },
      success: function (label) {
        label.closest('.form-group').removeClass('has-error');
        label.remove();
      },
      errorPlacement: function (error, element) {
        if (element.attr("data-error-container")) {
          error.appendTo(element.attr("data-error-container"));
        } else {
          error.insertAfter(element.closest('.input-icon'));
        }
      }
    });

    $('#btnLogin').off().on('click', function () {
      login();
    });

    $('.login-form input').keypress(function (e) {
      if (e.which == 13) {
        login();
        return false;
      }
    });
  };

  return {
    init: function (path) {
      configMap.path = path;
      handleLogin();
    }
  };

}();
//@ sourceURL=login.js