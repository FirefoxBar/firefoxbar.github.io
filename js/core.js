(function () {
  var fxb = {};
  fxb.conf = (function () {
    return {
      template: "template",
      dom: {
        main: document.querySelector("#main"),
        nav: document.querySelector("#nav"),
        logo: document.querySelector("#logo"),
        loading: document.querySelector("#loading"),
      },
    }
  })();

  fxb.loading = function (loading) {
      fxb.conf.dom.loading.style.display = loading ? 'block' : 'none';
  };

  fxb.ajax = function (details, onload) {

    if (typeof details === 'string') details = { 'url': details };
    if (onload) details.onload = onload;
    details.method = details.method || 'GET';
    details.body = details.body || '';

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (details.onreadystatechange) details.onreadystatechange(xhr);
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if (details.onload) details.onload.call(xhr);
        } else {
          console.error('Network fail: [%s] %s', details.method, details.url);
          if (details.onerror) details.onerror.call(xhr);
        }
      }
    }
    xhr.open(details.method, details.url, true);
    xhr.responseType = "text";
    xhr.send(details.body);
  }

  fxb.load = function () {
    var page = location.hash.replace(/^(#?)([^?#]*)((\?|#).*)?$/, '$2') || 'home';
    fxb.conf.dom.main.innerHTML = '';
    fxb.loading(true);
    fxb.ajax({
      url: fxb.conf.template + '/' + page + '.html',
      onload: function () {
        fxb.loading(false);
        var addScript = function (script) {
          var s = document.createElement('script');
          s.innerHTML = script.innerHTML;
          document.head.appendChild(s);
          setTimeout(function () { s.parentNode.removeChild(s); }, 0);
        };
        var dom = new DOMParser().parseFromString(this.responseText, 'text/html');
        fxb.conf.dom.main.innerHTML = dom.querySelector('body').innerHTML;
        var scripts = dom.querySelectorAll('head script.exec');
        for (var i = 0, l = scripts.length; i < l; i++) addScript(scripts[i]);
      },
      onerror: function () {
        fxb.loading(false);
        fxb.conf.domMain.innerHTML = "<h2>_(:з」∠)__ 这里神马也木有……</h2>";
      },
    });
  };

  fxb.init = function () {
    fxb.load();
    window.addEventListener("hashchange", fxb.load);
  }

  window.fxb = fxb;
  fxb.init();
})();