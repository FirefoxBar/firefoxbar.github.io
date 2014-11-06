(function(){
	var fxb = {};
	fxb.conf = (function(){
		var main = document.querySelector("#main");
		var load = document.querySelector(".loading");
		var nav = document.querySelector("#nav");
		var logo = document.querySelector("#logo");
		return{
			template : "template",
			domMain : main,
			domLoad : load,
			domNav : nav,
			domLogo : logo
		}
	})();

	fxb.getXhrUrl = function(href){
		var cout = href.indexOf("#") + 1;
		name = href.slice(cout);
		return fxb.conf.template+"/"+name+".html";
	}

	fxb.ajax = function(url,callback){
		var xhr = new XMLHttpRequest();
		xhr.onload = callback;
		xhr.onprogress = function(){
			fxb.loadToggle(true);
		}
		xhr.onerror = function(){
			alert("网络错误！");
		}
		xhr.open("GET", url);
		xhr.responseType = "text";
		xhr.send();		
	}

	fxb.conf.domNav.addEventListener("click",function(e){
		var target = e.target;
		if(target.nodeName === "A"){
			fxb.conf.domLogo.classList.contains("change")
			? fxb.conf.domLogo.classList.remove("change")
			: fxb.conf.domLogo.classList.add("change");
			target.parentNode.parentNode.querySelector(".cu").classList.remove("cu");
			target.parentNode.classList.add("cu");
		}
	},false);

	fxb.loadToggle = function(flag){
		fxb.conf.domLoad.style.display = 
		flag ? "block" : "none";
	}

	fxb.init = function(){
		fxb.ajax(fxb.getXhrUrl(location.hash || "home"),function(e) {
			fxb.loadToggle(false);
		 	fxb.conf.domMain.innerHTML=this.responseText;
			fxb.appendScripts(this.responseText);
		});		
		!location.hash && (document.title = document.title + "home");
		changeNav();
		window.addEventListener("hashchange", function(){
			changeNav();
			fxb.ajax(fxb.getXhrUrl(location.hash),function(e) {
				fxb.loadToggle(false);
				if(200 === this.status){
				 	fxb.conf.domMain.innerHTML=this.responseText;
					fxb.appendScripts(this.responseText);
				}
				else{
					fxb.conf.domMain.innerHTML = "<h2>_(:з」∠)__ 这里神马也木有……</h2>";
				}
			});
			var title = document.title;
			var index = title.indexOf("_");
			document.title = title.slice(0,index+1) + location.hash.replace("#","");
		}, false);
	}
	
	fxb.appendScripts = function(html){
		var reg = /<script[^>]*>([^\x00]+)$/i;
		var htmlBlock = html.split("<\/script>");
		for (var i in htmlBlock){
			var blocks;
			if (blocks = htmlBlock[i].match(reg)){
				var code = blocks[1].replace(/<!--/, '');
				var script = document.createElement("script");
				script.innerHTML = code;
				script = document.head.appendChild(script);
				document.head.removeChild(script);				
			}
		}
	}

	function changeNav(){
		var hash = location.hash.replace("#","");
		if(hash){
			var nav = fxb.conf.domNav.querySelectorAll("a");
			Array.prototype.forEach.call(nav,function(i){
				var parentClass = i.parentNode.classList;
				var cout = i.href.indexOf("#") + 1;
				if(parentClass.contains("cu")){
					parentClass.remove("cu");
				}				
				if(hash === i.href.slice(cout)){
					parentClass.add("cu");
				}
			});
		}
		else{
			fxb.conf.domNav.querySelector("li").classList.add("cu");
		}		
	}
	window.fxb = fxb;
	fxb.init();
})();