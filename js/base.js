function hideNoticeFx() {
  var notice_fx = document.getElementById('notice_fx');
  notice_fx.parentNode.removeChild(notice_fx);
  if (sessionStorage) sessionStorage.setItem('no_notice_fx', 'hide');
  else document.cookie = 'no_notice_fx=hide';
}

function noticeFx() {
  if (sessionStorage && sessionStorage.getItem('no_notice_fx')) return;
  if (document.cookie.match(/(?:^|; )no_notice_fx=([^;]*)/)) return;
  if (navigator.userAgent.indexOf('Firefox') !== -1) return;
  document.writeln('<div id="notice_fx">建议使用 <a target="_blank" href="https://www.mozilla.org/en-US/firefox/all/#zh-CN">Mozilla Firefox 浏览器</a> 浏览本站<a id="close_notice_fx" href="javascript:hideNoticeFx();">不再显示</a></div>');
}

function header() {
  var items = [
    {'location': 'userscript', 'description': '用户脚本'},
    {'location': 'userstyle', 'description': '用户样式'},
    {'location': 'userchrome', 'description': '用户界面'},
    {'location': 'addon', 'description': '附加组件'},
  ];
  document.writeln('<header>' +
    '<a href="/"><img id="logo" src="/img/logo.png" /></a>' +
    '<h1>Firefox 吧项目组</h1>' +
    '<nav><ul>' + (function () {
      var i, l = items.length, h = location.pathname, s = '';
      for (i = 0; i < l; i++) {
        s += '<li><a ' + (h.indexOf(items[i].location) === 1 ? 'class="active" ' : '') + 'href="/' + items[i].location + '/">' + items[i].description + '</a></li>';
      }
      return s;
    }()) + '</ul></nav>' +
  '</header>');
}

function footer() {
  document.writeln('<footer></footer>');
}