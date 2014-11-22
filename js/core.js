(function() {
	var fxb = {};
	fxb.conf = (function() {
		return {
			template: "template",
			dom: {
				main: document.querySelector("#main"),
				nav: document.querySelector("#nav"),
				logo: document.querySelector("#logo"),
				loading: document.querySelector("#loading"),
                menu: document.querySelector("#menu")
			},
		}
	})();

	fxb.loading = function(loading) {
		fxb.conf.dom.loading.style.display = loading ? 'block': 'none';
	};

    fxb.menu = function(){
        function toggleMenu(){
            fxb.conf.dom.nav.classList.contains('ex') ?
            fxb.conf.dom.nav.classList.remove('ex') :
            fxb.conf.dom.nav.classList.add('ex');        
        }
        fxb.conf.dom.menu.addEventListener('click',function(){
            toggleMenu();
        },false);
        fxb.conf.dom.nav.addEventListener('click',function(){
            toggleMenu();            
        },false);     
    }
    
	fxb.ajax = function(details, onload) {

		if (typeof details === 'string') details = {
			'url': details
		};
		if (onload) details.onload = onload;
		details.method = details.method || 'GET';
		details.body = details.body || '';

		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
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

	fxb.link = function() {
		var n = fxb.conf.dom.nav.querySelectorAll('a');
		var events = ['mousedown', 'focus', 'touchstart'];
		for (var i = 0,
		l = n.length; i < l; i++)(function(a) {
			var updateLink = function() {
				a.href = a.href.replace(/^.*\/([^\/]*)\.html/, '#$1');               
				events.forEach(function(e) {
					a.removeEventListener(e, updateLink);
				});
			};
			events.forEach(function(e) {
				a.addEventListener(e, updateLink);
			});
		} (n[i]));
	};

	fxb.nav = function() {
		var page = location.hash.replace(/^(#?)([^?#]*)((\?|#).*)?$/, '$2') || 'home';
		var cu = document.querySelector('.cu');
		if (cu) cu.classList.remove('cu');
		document.getElementById(page).classList.add('cu');
		return page;
	};

	fxb.load = function() {
		var page = fxb.nav();
		fxb.conf.dom.main.innerHTML = '';
		fxb.loading(true);
		fxb.ajax({
			url: fxb.conf.template + '/' + page + '.html',
			onload: function() {
				fxb.loading(false);
				var addScript = function(script) {
					var s = document.createElement('script');
					s.innerHTML = script.innerHTML;
					document.head.appendChild(s);
					setTimeout(function() {
						s.parentNode.removeChild(s);
					},
					0);
				};
				var dom = new DOMParser().parseFromString(this.responseText, 'text/html');
				fxb.conf.dom.main.innerHTML = dom.querySelector('body').innerHTML;
				var scripts = dom.querySelectorAll('head script.exec');
				for (var i = 0,
				l = scripts.length; i < l; i++) addScript(scripts[i]);
				document.title = dom.querySelector('title').textContent;
			},
			onerror: function() {
				fxb.loading(false);
				fxb.conf.domMain.innerHTML = "<h2>_(:з」∠)__ 这里神马也木有……</h2>";
			},
		});
	};

	fxb.init = function() {
		fxb.load();
		window.addEventListener("hashchange", fxb.load);
		fxb.link();
        fxb.menu();
	}

	window.fxb = fxb;
	fxb.init();
})();