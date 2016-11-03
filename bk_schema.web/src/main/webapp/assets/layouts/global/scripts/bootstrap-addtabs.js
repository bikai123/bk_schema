$.fn.addTabs = function (options) {
  var el = this;
  var opts = $.extend({
    id: '',
    title: '',
    url: '',
    content: '',
    close: true,
    tabMonitor: 'body'
  }, options || {});

  if (!opts.id) {
    opts.id = $(el).attr('data-addtab');
  }

  if (!opts.title) {
    opts.title = $(el).attr('title') ? $(this).attr('title') : $(this).html();
  }

  if (!opts.url) {
    opts.url = $(el).attr('url');
  }

  addTabs.add(opts);

  var dropdwon = $(el).closest('.dropdown-menu');
  if (dropdwon.length > 0) {
    dropdwon.addClass('hide');
    var timeoutHover = setTimeout(function () {
      dropdwon.removeClass('hide');
      window.clearTimeout(timeoutHover)
    }, 50);
  }
};

var addTabs = function () {
  var add = function (opts) {
    App.startPageLoading();

    if (opts.url.indexOf('frame:') === 0) {
      opts.iframeUse = opts.url.indexOf('frame:') === 0;
    }
    
    var height = $('[content-height]').height();
    var id = opts.id;
    $('li[role = "presentation"].active').removeClass('active');
    $('div[role = "tabpanel"].active').removeClass('active');
    //如果TAB不存在，创建一个新的TAB
    if (!$("#tab-page-content-" + id)[0]) {
      //创建新TAB的title
      var title = $('<li>', {
        'role': 'presentation',
        'id': 'tab-page-nav-' + id
      }).append(
        $('<a>', {
          'href': '#tab-page-content-' + id,
          'role': 'tab',
          'data-toggle': 'tab',
          'class': 'close-tab-link'
        }).html(opts.title)
      );

      //是否允许关闭
      if (opts.close) {
        title.append(
          $('<i>', {
            'class': 'close-tab fa fa-close'
          }).on('click', function () {
            close(id)
          })
        );
      }

      var pageContent = $('<div>', {
        'id': 'page-content-' + id,
        'content-height': '',
        'style': 'height:' + height + 'px'
      });

      //创建新TAB的内容
      var content = $('<div>', {
        'class': 'tab-pane',
        'id': 'tab-page-content-' + id,
        'role': 'tabpanel',
        'content-height': '',
        'style': 'height:' + height + 'px'
      }).append(pageContent);

      //是否指定TAB内容
      if (opts.content) {
        pageContent.append(opts.content);
      } else if (opts.iframeUse) { //没有内容，使用IFRAME打开链接
        pageContent.append(
          $('<iframe>', {
            'class': 'iframeClass',
            'height': height + 'px',
            'width': '100%',
            'frameborder': "no",
            'border': "0",
            'src': opts.url.replace('frame:', ''),
            'content-height': ''
          })
        );
      } else {
        if (opts.url) {
          $.ajax({
            type: "GET",
            cache: false,
            url: opts.url,
            dataType: "html",
            async: false,
            success: function (res) {
              App.stopPageLoading();
              pageContent.append(res);
            },
            error: function (xhr, ajaxOptions, thrownError) {
              pageContent.append('<h4>找不到指定页面！</h4>');
            }
          });
        } else {
          pageContent.append('<h4>菜单没有指定连接！</h4>');
        }
      }

      //加入TABS
      opts.tabMonitor.children('.nav-tabs').append(title);
      opts.tabMonitor.children(".tab-content").append(content);
    }

    App.initSlimScroll($('#tab-page-content-' + id).find('#page-content-' + id));
    App.stopPageLoading();
    //激活TAB
    $("#tab-page-nav-" + id).addClass('active');
    $("#tab-page-content-" + id).addClass("active");

    drop();
  };

  var close = function (id) {
    var el = $("#tab-page-nav-" + id);
    var nextSelect = el.closest("li").prev('li:not(.dropdown)');
    if (nextSelect.length === 0) {
      nextSelect = el.closest("li").next('li:not(.dropdown)')
    }

    if (nextSelect.length === 0) {
      nextSelect = el.closest("ul.close-tab-nav")
        .children('li:not(.dropdown)')
        .last();
    }

    el.remove();
    $("#tab-page-content-" + id).remove();

    $('li[role = "presentation"].active').removeClass('active');
    $('div[role = "tabpanel"].active').removeClass('active');
    if (nextSelect.length > 0) {
      $(nextSelect).find('a').tab('show');
    }

    drop();
  };

  var drop = function () {
    if ($().tabdrop) {
      $('.tabbable-tabdrop .nav-tabs').tabdrop('layout');
    }
  };

  return {
    add: add,
    close: close,
    drop: drop
  }
}();