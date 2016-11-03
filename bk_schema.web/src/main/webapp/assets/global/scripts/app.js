/**
 Core script to handle the entire theme and core functions
 **/
var App = function () {

  // IE mode
  var isRTL = false;
  var isIE8 = false;
  var isIE9 = false;
  var isIE10 = false;

  var resizeHandlers = [];

  var assetsPath = '../assets/';

  var globalImgPath = 'global/img/';

  var globalPluginsPath = 'global/plugins/';

  var globalCssPath = 'global/css/';

  // theme layout color set

  var brandColors = {
    'blue': '#89C4F4',
    'red': '#F3565D',
    'green': '#1bbc9b',
    'purple': '#9b59b6',
    'grey': '#95a5a6',
    'yellow': '#F8CB00'
  };

  var handleInit = function () {

    if ($('body').css('direction') === 'rtl') {
      isRTL = true;
    }

    isIE8 = !!navigator.userAgent.match(/MSIE 8.0/);
    isIE9 = !!navigator.userAgent.match(/MSIE 9.0/);
    isIE10 = !!navigator.userAgent.match(/MSIE 10.0/);

    if (isIE10) {
      $('html').addClass('ie10'); // detect IE10 version
    }

    if (isIE10 || isIE9 || isIE8) {
      $('html').addClass('ie'); // detect IE10 version
    }
  };

  var _runResizeHandlers = function () {
    // reinitialize other subscribed elements
    for (var i = 0; i < resizeHandlers.length; i++) {
      var each = resizeHandlers[i];
      each.call();
    }
  };

  var handleOnResize = function () {
    var resize;
    if (isIE8) {
      var currheight;
      $(window).resize(function () {
        if (currheight == document.documentElement.clientHeight) {
          return; //quite event since only body resized not window.
        }
        if (resize) {
          clearTimeout(resize);
        }
        resize = setTimeout(function () {
          _runResizeHandlers();
        }, 50); // wait 50ms until window resize finishes.
        currheight = document.documentElement.clientHeight; // store last body client height
      });
    } else {
      $(window).resize(function () {
        if (resize) {
          clearTimeout(resize);
        }
        resize = setTimeout(function () {
          _runResizeHandlers();
        }, 50); // wait 50ms until window resize finishes.
      });
    }
  };

  var handleFixInputPlaceholderForIE = function () {
    //fix html5 placeholder attribute for ie7 & ie8
    if (isIE8 || isIE9) { // ie8 & ie9
      // this is html5 placeholder fix for inputs, inputs with placeholder-no-fix class will
      // be skipped(e.g: we need this for password fields)
      $('input[placeholder]:not(.placeholder-no-fix), textarea[placeholder]:not(.placeholder-no-fix)')
        .each(function () {
          var input = $(this);

          if (input.val() === '' && input.attr("placeholder") !== '') {
            input.addClass("placeholder").val(input.attr('placeholder'));
          }

          input.focus(function () {
            if (input.val() == input.attr('placeholder')) {
              input.val('');
            }
          });

          input.blur(function () {
            if (input.val() === '' || input.val() == input.attr('placeholder')) {
              input.val(input.attr('placeholder'));
            }
          });
        });
    }
  };

  var handleDropdowns = function () {
    /*
     Hold dropdown on click
     */
    $('body').on('click', '.dropdown-menu.hold-on-click', function (e) {
      e.stopPropagation();
    });
  };

  var initComponents = function () {
    if ($.fn.modal) {
      $.fn.modal.Constructor.prototype.enforceFocus = function () {
      };
    }

    if ($.fn.select2) {
      $.fn.select2.defaults.set("theme", "bootstrap");
      $.fn.select2.defaults.set("language", "zh-CN");
    }

    if ($.fn.DataTable) {
      $.fn.DataTable.defaults.oLanguage =
      {
        "sProcessing": "处理中...",
        "sLengthMenu": "每页 _MENU_ 条",
        "sZeroRecords": "没有匹配结果",
        "sInfo": "第 _PAGE_ 页 / 共 _PAGES_ 页",
        "sInfoEmpty": "当前没有数据显示",
        "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
        "sInfoPostFix": "",
        "sSearch": "搜索:",
        "sUrl": "",
        "sEmptyTable": "表中数据为空",
        "sLoadingRecords": "载入中...",
        "sInfoThousands": ",",
        "oPaginate": {
          "sFirst": "首页",
          "sPrevious": "上页",
          "sNext": "下页",
          "sLast": "末页"
        },
        "oAria": {
          "sSortAscending": ": 以升序排列此列",
          "sSortDescending": ": 以降序排列此列"
        }
      };
    }

    if (window.Messenger) {
      Messenger.options = {
        extraClasses: 'messenger-fixed messenger-on-top',
        theme: 'block'
      };
    }
  };

  var dropMenu = function () {
    if ($().tabdrop) {
      $('.tabbable-tabdrop .nav-tabs').tabdrop('layout');
    }
  };

  return {
    init: function () {
      handleInit();
      handleOnResize();
      handleDropdowns();
      handleFixInputPlaceholderForIE();
      initComponents();
      App.addResizeHandler(dropMenu);
    },

    scrollTo: function (el, offeset) {
      var pos = (
                el && el.size() > 0) ? el.offset().top : 0;

      if (el) {
        if ($('body').hasClass('page-header-fixed')) {
          pos = pos - $('.page-header').height();
        } else if ($('body').hasClass('page-header-top-fixed')) {
          pos = pos - $('.page-header-top').height();
        } else if ($('body').hasClass('page-header-menu-fixed')) {
          pos = pos - $('.page-header-menu').height();
        }
        pos =
          pos + (
            offeset ? offeset : -1 * el.height());
      }

      $('html,body').animate({
        scrollTop: pos
      }, 'slow');
    },

    initSlimScroll: function (el) {
      $(el).each(function () {
        if ($(this).attr("data-initialized")) {
          return; // exit
        }

        var height;

        if ($(this).attr("data-height")) {
          height = $(this).attr("data-height");
        } else {
          height = $(this).css('height');
        }

        $(this).slimScroll({
          allowPageScroll: true, // allow page scroll when the element
                                 // scroll is ended
          size: '7px',
          color: (
            $(this).attr("data-handle-color") ? $(this)
              .attr("data-handle-color") : '#bbb'),
          wrapperClass: (
            $(this).attr("data-wrapper-class") ? $(this)
              .attr("data-wrapper-class") : 'slimScrollDiv'),
          railColor: (
            $(this).attr("data-rail-color") ? $(this)
              .attr("data-rail-color") : '#eaeaea'),
          position: isRTL ? 'left' : 'right',
          height: height,
          alwaysVisible: (
            $(this).attr("data-always-visible") == "1"
              ? true : false),
          railVisible: (
            $(this).attr("data-rail-visible") == "1" ? true
              : false),
          disableFadeOut: true
        });

        $(this).attr("data-initialized", "1");
      });
    },

    destroySlimScroll: function (el) {
      $(el).each(function () {
        if ($(this).attr("data-initialized") === "1") { // destroy existing instance before updating the height
          $(this).removeAttr("data-initialized");
          $(this).removeAttr("style");

          var attrList = {};

          // store the custom attribures so later we will reassign.
          if ($(this).attr("data-handle-color")) {
            attrList["data-handle-color"] = $(this).attr("data-handle-color");
          }
          if ($(this).attr("data-wrapper-class")) {
            attrList["data-wrapper-class"] = $(this).attr("data-wrapper-class");
          }
          if ($(this).attr("data-rail-color")) {
            attrList["data-rail-color"] = $(this).attr("data-rail-color");
          }
          if ($(this).attr("data-always-visible")) {
            attrList["data-always-visible"] = $(this).attr("data-always-visible");
          }
          if ($(this).attr("data-rail-visible")) {
            attrList["data-rail-visible"] = $(this).attr("data-rail-visible");
          }

          var slimScrollBar = $(this).parent().find('.slimScrollBar:first');
          var slimScrollRail = $(this).parent().find('.slimScrollRail:first');

          $(this).slimScroll({
            wrapperClass: (
              $(this).attr("data-wrapper-class") ? $(
                this).attr("data-wrapper-class") : 'slimScrollDiv'),
            destroy: true
          });

          slimScrollBar.remove();
          slimScrollRail.remove();

          var the = $(this);

          // reassign custom attributes
          $.each(attrList, function (key, value) {
            the.attr(key, value);
          });

        }
      });
    },

    // function to scroll to the top
    scrollTop: function () {
      App.scrollTo();
    },

    // wrApper function to  block element(indicate loading)
    blockUI: function (options) {
      options = $.extend(true, {}, options);
      var html = '';
      if (options.animate) {
        html =
          '<div class="loading-message ' + (
            options.boxed ? 'loading-message-boxed' : '')
          + '">'
          + '<div class="block-spinner-bar"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>'
          + '</div>';
      } else if (options.iconOnly) {
        html =
          '<div class="loading-message ' + (
            options.boxed ? 'loading-message-boxed' : '')
          + '"><i class="fa fa-spinner fa-pulse fa-2x fa-fw"></i></div>';
      } else if (options.textOnly) {
        html =
          '<div class="loading-message ' + (
            options.boxed ? 'loading-message-boxed' : '')
          + '"><span>' + (
            options.message ? options.message : 'LOADING...')
          + '</span></div>';
      } else {
        html =
          '<div class="loading-message ' + (
            options.boxed ? 'loading-message-boxed' : '')
          + '"><i class="fa fa-spinner fa-pulse fa-2x fa-fw"></i><span>' + (
            options.message
              ? options.message : 'LOADING...') + '</span></div>';
      }

      if (options.target) { // element blocking
        var el = $(options.target);
        if (el.height() <= (
            $(window).height())) {
          options.cenrerY = true;
        }
        el.block({
          message: html,
          baseZ: options.zIndex ? options.zIndex : 1000,
          centerY: options.cenrerY !== undefined ? options.cenrerY : false,
          css: {
            width: '50%',
            top: '10%',
            border: '0',
            padding: '0',
            backgroundColor: 'none'
          },
          overlayCSS: {
            backgroundColor: options.overlayColor ? options.overlayColor
              : '#555',
            opacity: options.boxed ? 0.05 : 0.1,
            cursor: 'wait'
          }
        });
      } else { // page blocking
        $.blockUI({
          message: html,
          baseZ: options.zIndex ? options.zIndex : 1000,
          css: {
            border: '0',
            padding: '0',
            backgroundColor: 'none'
          },
          overlayCSS: {
            backgroundColor: options.overlayColor ? options.overlayColor
              : '#555',
            opacity: options.boxed ? 0.05 : 0.1,
            cursor: 'wait'
          }
        });
      }
    },

    // wrApper function to  un-block element(finish loading)
    unblockUI: function (target) {
      if (target) {
        $(target).unblock({
          onUnblock: function () {
            $(target).css('position', '');
            $(target).css('zoom', '');
          }
        });
      } else {
        $.unblockUI();
      }
    },

    startPageLoading: function (options) {
      if (options && options.animate) {
        $('.page-spinner-bar').remove();
        $('body').append(
          '<div class="page-spinner-bar"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>');
      } else {
        $('.page-loading').remove();
        $('body').append('<div class="page-loading"><i class="fa fa-spinner fa-pulse fa-2x fa-fw"></i>&nbsp;&nbsp;<span>' + (
            options
            && options.message
              ? options.message : 'Loading...') + '</span></div>');
      }
    },

    stopPageLoading: function () {
      $('.page-loading, .page-spinner-bar').remove();
    },

    alert: function (options) {

      options = $.extend(true, {
        container: "", // alerts parent container(by default placed after the page
                       // breadcrumbs)
        place: "append", // "append" or "prepend" in container
        type: 'success', // alert's type
        message: "", // alert's message
        close: true, // make alert closable
        reset: true, // close all previouse alerts first
        focus: true, // auto scroll to the alert after shown
        closeInSeconds: 0, // auto close after defined seconds
        icon: "" // put icon before the message
      }, options);

      var id = App.getUniqueID("App_alert");

      var html = '<div id="' + id + '" class="custom-alerts alert alert-' + options.type
        + ' fade in">' + (
          options.close
            ? '<button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button>'
            : '') + (
          options.icon !== "" ? '<i class="fa-lg fa fa-' + options.icon
          + '"></i>  ' : '') + options.message + '</div>';

      if (options.reset) {
        $('.custom-alerts').remove();
      }

      if (!options.container) {
        if ($('body').hasClass("page-container-bg-solid") || $('body')
            .hasClass("page-content-white")) {
          $('.page-title').after(html);
        } else {
          if ($('.page-bar').size() > 0) {
            $('.page-bar').after(html);
          } else {
            $('.page-breadcrumb').after(html);
          }
        }
      } else {
        if (options.place == "append") {
          $(options.container).append(html);
        } else {
          $(options.container).prepend(html);
        }
      }

      if (options.focus) {
        App.scrollTo($('#' + id));
      }

      if (options.closeInSeconds > 0) {
        setTimeout(function () {
          $('#' + id).remove();
        }, options.closeInSeconds * 1000);
      }

      return id;
    },

    initUniform: function (els) {
      if (els) {
        $(els).each(function () {
          if ($(this).parents(".checker").size() === 0) {
            $(this).show();
            $(this).uniform();
          }
        });
      } else {
        handleUniform();
      }
    },

    updateUniform: function (els) {
      $.uniform.update(els);
    },

    getURLParameter: function (paramName) {
      var searchString = window.location.search.substring(1),
        i, val, params = searchString.split("&");

      for (i = 0; i < params.length; i++) {
        val = params[i].split("=");
        if (val[0] == paramName) {
          return unescape(val[1]);
        }
      }
      return null;
    },

    getUniqueID: function (prefix) {
      return prefix + '_' + Math.floor(Math.random() * (
            new Date()).getTime());
    },

    getGlobalImgPath: function () {
      return assetsPath + globalImgPath;
    },

    // check IE8 mode
    isIE8: function () {
      return isIE8;
    },

    // check IE9 mode
    isIE9: function () {
      return isIE9;
    },

    getViewPort: function () {
      var e = window,
        a = 'inner';
      if (!(
        'innerWidth' in window)) {
        a = 'client';
        e = document.documentElement || document.body;
      }

      return {
        width: e[a + 'Width'],
        height: e[a + 'Height']
      };
    },

    addResizeHandler: function (func) {
      resizeHandlers.push(func);
    },

    runResizeHandlers: function () {
      _runResizeHandlers();
    },

    setAssetsPath: function (path) {
      assetsPath = path;
    },

    initLayoutContentScrollbar: function (title, $pane) {
      var $layoutContent = $pane.find("div.ui-layout-content:first");
      var $layoutPortlet = $layoutContent.find(".portlet:first");
      var $layoutScroller = $layoutContent.find(".portlet-scroller:first");
      if ($layoutScroller.length > 0) {
        App.destroySlimScroll($layoutScroller);
        var $layoutPortletTitle = $layoutPortlet.find(".portlet-title");
        var titleHeight = 0;
        var portletLightheight = 0;
        if ($layoutPortletTitle.length > 0) {
          titleHeight = $layoutPortletTitle.height() + 10;
        }

        if ($layoutPortlet.hasClass('light')) {
          portletLightheight = 30;
        }

        $layoutPortlet.height($layoutContent.parent().height() - portletLightheight - 20);
        $layoutScroller.height(
          $layoutContent.parent().height() - titleHeight - portletLightheight - 20);
        App.initSlimScroll($layoutScroller);
      }
      else {
        App.destroySlimScroll($layoutContent);
        $layoutContent.height($layoutContent.parent().height() - 20);
        App.initSlimScroll($layoutContent);
      }
    }
  };

}();

jQuery(document).ready(function () {
  App.init();
});