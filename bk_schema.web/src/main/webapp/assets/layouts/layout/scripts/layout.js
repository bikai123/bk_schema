/**
 Core script to handle the entire theme and core functions
 **/
var Layout = function () {

  var layoutImgPath = 'layouts/layout/img/';

  var layoutCssPath = 'layouts/layout/css/';

  var resBreakpointMd = 992;

  var resizeContent = [];

  var layoutResize = [];

  var offSet = 42;

  var handleSidebarAndContentHeight = function () {
    var content = $('.page-content');
    var body = $('body');
    var height = _calculateFixedSidebarViewportHeight();
    content.attr('style', 'min-height:' + height + 'px');

    $("[tab-height]").css("height", (
        height) + "px");
    var contentHeight = height - offSet;
    $("[content-height]").css("height", (
        contentHeight) + "px");
    $("[content-height]").closest('.slimScrollDiv').css("height", (
        contentHeight) + "px");
  };

  var handleResizeContent = function () {
    var height = _calculateFixedSidebarViewportHeight();
    var contentHeight = height - offSet;
    $.each(resizeContent, function () {
      $(this).css("height", (
          contentHeight) + "px");
    })
  };

  var handleSidebarMenu = function () {
    $('.page-sidebar-menu')
      .on('click', 'li > a.nav-toggle, li > a > span.nav-toggle', function (e) {
        var that = $(this).closest('.nav-item').children('.nav-link');

        if (App.getViewPort().width >= resBreakpointMd && !$('.page-sidebar-menu')
            .attr("data-initialized") && $('body').hasClass('page-sidebar-closed') && that.parent(
            'li').parent('.page-sidebar-menu').size() === 1) {
          return;
        }

        var hasSubMenu = that.next().hasClass('sub-menu');

        if (App.getViewPort().width >= resBreakpointMd && that.parents(
            '.page-sidebar-menu-hover-submenu').size() === 1) { // exit of hover sidebar menu
          return;
        }

        if (hasSubMenu === false) {
          if (App.getViewPort().width < resBreakpointMd && $('.page-sidebar').hasClass("in")) {
            $('.page-header .responsive-toggler').click();
          }
          return;
        }

        if (that.next().hasClass('sub-menu always-open')) {
          return;
        }

        var parent = that.parent().parent();
        var the = that;
        var menu = $('.page-sidebar-menu');
        var sub = that.next();

        var autoScroll = menu.data("auto-scroll");
        var slideSpeed = parseInt(menu.data("slide-speed"));
        var keepExpand = menu.data("keep-expanded");

        if (!keepExpand) {
          parent.children('li.open').children('a').children('.arrow').removeClass('open');
          parent.children('li.open').children('.sub-menu:not(.always-open)').slideUp(slideSpeed);
          parent.children('li.open').removeClass('open');
        }

        var slideOffeset = -200;

        if (sub.is(":visible")) {
          $('.arrow', the).removeClass("open");
          the.parent().removeClass("open");
          sub.slideUp(slideSpeed, function () {
            if (autoScroll === true && $('body').hasClass('page-sidebar-closed') === false) {
              if ($('body').hasClass('page-sidebar-fixed')) {
                menu.slimScroll({
                  'scrollTo': (
                    the.position()).top
                });
              } else {
                App.scrollTo(the, slideOffeset);
              }
            }
            handleSidebarAndContentHeight();
          });
        } else if (hasSubMenu) {
          $('.arrow', the).addClass("open");
          the.parent().addClass("open");
          sub.slideDown(slideSpeed, function () {
            if (autoScroll === true && $('body').hasClass('page-sidebar-closed') === false) {
              if ($('body').hasClass('page-sidebar-fixed')) {
                menu.slimScroll({
                  'scrollTo': (
                    the.position()).top
                });
              } else {
                App.scrollTo(the, slideOffeset);
              }
            }
            handleSidebarAndContentHeight();
          });
        }

        e.preventDefault();
      });

    $(document)
      .on('click', '.page-header-fixed-mobile .page-header .responsive-toggler', function () {
        App.scrollTop();
      });

    handleFixedSidebarHoverEffect();
  };

  var _calculateFixedSidebarViewportHeight = function () {
    var sidebarHeight = App.getViewPort().height - $('.page-header').outerHeight(true);
    return sidebarHeight;
  };

  // Handles fixed sidebar
  var handleFixedSidebar = function () {
    var menu = $('.page-sidebar-menu');

    App.destroySlimScroll(menu);

    if ($('.page-sidebar-fixed').size() === 0) {
      handleSidebarAndContentHeight();
      return;
    }

    if (App.getViewPort().width >= resBreakpointMd) {
      var footerHeight = 0;
      if ($('.page-sidebar-wrapper .page-footer').length > 0) {
        footerHeight = 33;
      }

      menu.attr("data-height", _calculateFixedSidebarViewportHeight() - footerHeight);
      App.initSlimScroll(menu);
      handleSidebarAndContentHeight();
    }
  };

  var handleFixedSidebarHoverEffect = function () {
    var body = $('body');
    if (body.hasClass('page-sidebar-fixed')) {
      $('.page-sidebar').on('mouseenter', function () {
        if (body.hasClass('page-sidebar-closed')) {
          $(this).find('.page-sidebar-menu').removeClass('page-sidebar-menu-closed');
          $(this).parent().find('.page-footer').addClass('page-footer-hover');
          $(this).parent().find('.page-footer .menu-toggler').addClass('menu-toggler-close-hover');
        }
      }).on('mouseleave', function () {
        if (body.hasClass('page-sidebar-closed')) {
          $(this).find('.page-sidebar-menu').addClass('page-sidebar-menu-closed');
          $(this).parent().find('.page-footer').removeClass('page-footer-hover');
          $(this).parent().find('.page-footer .menu-toggler')
            .removeClass('menu-toggler-close-hover');
        }
      });
    }
  };

  var handleSidebarToggler = function () {
    var body = $('body');
    if ($.cookie && $.cookie('sidebar_closed') === '1' && App.getViewPort().width
      >= resBreakpointMd) {
      $('body').addClass('page-sidebar-closed');
      $('.page-sidebar-menu').addClass('page-sidebar-menu-closed');
    }

    // handle sidebar show/hide
    $('body').on('click', '.sidebar-toggler', function (e) {
      var sidebar = $('.page-sidebar');
      var sidebarMenu = $('.page-sidebar-menu');

      if (body.hasClass("page-sidebar-closed")) {
        $(this).removeClass('responsive-toggler');
        $(this).find('i').removeClass('fa-chevron-circle-right').addClass('fa-chevron-circle-left');
        body.removeClass("page-sidebar-closed");
        sidebarMenu.removeClass("page-sidebar-menu-closed");
        if ($.cookie) {
          $.cookie('sidebar_closed', '0');
        }
      } else {
        $(this).addClass('responsive-toggler');
        $(this).find('i').removeClass('fa-chevron-circle-left').addClass('fa-chevron-circle-right');
        body.addClass("page-sidebar-closed");
        sidebarMenu.addClass("page-sidebar-menu-closed");
        if (body.hasClass("page-sidebar-fixed")) {
          sidebarMenu.trigger("mouseleave");
        }
        if ($.cookie) {
          $.cookie('sidebar_closed', '1');
        }
      }

      $(window).trigger('resize');
    });
  };

  return {
    initSidebar: function () {
      handleFixedSidebar();
      handleSidebarMenu();
      handleSidebarToggler();

      App.addResizeHandler(handleFixedSidebar);
    },

    initContent: function () {
      App.addResizeHandler(handleSidebarAndContentHeight);
      App.addResizeHandler(handleResizeContent);
    },

    init: function () {
      this.initSidebar();
      this.initContent();
    },

    fixContentHeight: function () {
      handleSidebarAndContentHeight();
    },

    initFixedSidebarHoverEffect: function () {
      handleFixedSidebarHoverEffect();
    },

    initFixedSidebar: function () {
      handleFixedSidebar();
    },

    addResizeContent: function (content) {
      resizeContent.push(content);
      var height = _calculateFixedSidebarViewportHeight();
      var contentHeight = height - offSet;
      content.css("height", (
          contentHeight) + "px");
    }
  };

}();

jQuery(document).ready(function () {
  Layout.init();
  Layout.fixContentHeight();
  Layout.initFixedSidebar();

  $('.page-sidebar-menu').on('click', '[data-addtab]', function () {
    $('.page-sidebar-menu li.active').removeClass('active');
    $('.page-sidebar-menu span.selected').remove();
    $(this).parent('li').addClass('active');
    $(this).closest('.nav-top-menu').addClass('active');
    $(this).closest('.nav-top-menu').children('a').append('<span class="selected"></span>');
  });

  $('.tabbable-tabdrop .nav-tabs').tabdrop();

  $('.page-sidebar-menu').on('click', '[data-addtab]', function () {
    $(this).addTabs({
      tabMonitor: $('#main-tab')
    });
  });
});