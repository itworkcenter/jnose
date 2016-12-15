jQuery(window).load(function(){
	jQuery(".rating-view").each(function() {
		var $chartCurr = jQuery(".rating-view-chart-current", this),
			$percent = jQuery(".rating-view-percent", this),
			val = $percent.html(),
			regx = /(\d+)%/ig;

		if (regx.test(val)) {
			$chartCurr.css("width", val.match(regx)[0] || "auto");
		}
	});
})
/* *******************************
 * Notice.js v1.0.0
 * Creator: Carl Liu
 * Date: 2016.8.16
 * Notice: This is a message tips tool.
 * ******************************* */
;
! function(window, $, document, undefined) {
	var Notice = {
		set:function(message,type){
			var ths=this,
				template="<ul class='notice-x'></ul>",
				messageTempl="<li class='notice-x-message'><div class='notice-x-progress'><div></div></div><div class='notice-x-info'></div></li>";

			ths.$body=$("body");
			ths.$notice = $(".notice-x");
			ths.$msg = $(messageTempl);
			$(".notice-x-info",ths.$msg).html(message);

			switch (type) {
				case "info":
					ths.$msg.addClass("message-info-");
					break;
				case "warning":
					ths.$msg.addClass("message-warning-");
					break;
				case "success":
					ths.$msg.addClass("message-success-");
					break;
				default:

			}

			if(!ths.$notice.size()){
				ths.$body.append(template);
				ths.$notice = $(".notice-x");
			}

			ths.$notice.prepend(ths.$msg);

			ths.intl = setTimeout(function(){
				ths.$msg.fadeOut(function(){
					ths.$msg.remove();
					clearTimeout(ths.intl);
				});
			},2000);
		},
		post:function(message,type){
			new this.set(message,type);
		}
	}

	window.Notice=Notice;
}(window, jQuery, document);

/* *******************************
 * Detect.js v1.1.0
 * Creator: Carl Liu
 * Date: 2016.8.16
 * Notice: This is a device detect.
 * ******************************* */
;
! function(window, $, document, undefined) {
		var Detect ={
			d:document,
			w:window,
			agent:navigator.userAgent,
			reg:/android|iphone|ipad|Mobile/ig,
			isMobile:function(pass,fail){
				if(this.reg.test(this.agent)){
					pass&&pass();
					return true;
				}else {
					fail&&fail();
					return false;
				}
			},
			size:function(size,pass,fail){
				var t=this;
				deal();
				$(window).resize(function(){
					deal();
				})
				function deal(){
					var curr = t.w.innerWidth ||t.d.documentElement.clientWidth ||	t.d.body.clientWidth;
					if(size&&curr<=size){
						pass&&pass();
					}else{
						fail&&fail();
					}
				}
			}
		}
		window.Detect = Detect;
}(window, jQuery, document);


/* *******************************
 * State.js v1.1.0
 * Creator: Carl Liu
 * Date: 2016.8.13
 * Notice: This is a active state.
 * ******************************* */
/* *State structure:*
<div class="state">
	<a href="javascript:;" class="state-trigger"></a>
		<div class="state-box">
				<!-- your content put here -->
		</div>
</div>
*/
;
! function(window, $, document, undefined) {
		var State = function(element, options) {
				this.init(element, options);
		}

		// Default options define
		State.VERSION = "1.0.0";
		State.SELECTORS = {
				toggleSelector: ".state",
				maskSelector: "#mask"
		};
		State.DEFAULTS = {
			trigger: "click,hover", //click/hover/manual
			domain: "ns.state",
			mask:""
		};
		// Alias
		State.fn = State.prototype;
		//Initialization
		State.fn.init = function(element, options) {
				var ths = this;
				//Option priority: data - options > incoming - options > default -options
				this.options = $.extend({}, State.DEFAULTS, State.SELECTORS, options);
				this.$el = $(element),
				this.$mask = $("#mask");

				// Trigger init event
				this.toggle();
		};
		State.fn.toggle=function(){
			var $el=this.$el,isMask =this.options.mask||"";

			if($el.hasClass("be-active")){
				$el.removeClass("be-active");
				isMask&& this.$mask.hide();
			}else{
				$el.addClass("be-active");
				isMask&& this.$mask.show();
			}
		};

		State.fn.clean=function(){
			$(this.options.toggleSelector).removeClass("be-active");
		};
		// Plugin Definition
		function Plugin(option) {
				return this.each(function() {
						var $this = $(this),
								data = $this.data("ns.state"),
								options = typeof option == "object" ? $.extend({}, option, $this.data()) : $this.data();
						if (!data){
							$this.data('ns.state', (data = new State(this, options)));
						}else{
							data["toggle"]();
						};
				})
		}
		// POPOUT DATA-API
		// you can get API from follow
		var Handler = {
				toggle: function() {
						Plugin.call($(this));
						return false;
				}
		}
		$(document)
				.on("click.ns.state", State.SELECTORS.toggleSelector, Handler.toggle)
				.on("mouseenter.ns.state", State.SELECTORS.toggleSelector, Handler.toggle)
				.on("mouseleave.ns.state", State.SELECTORS.toggleSelector, Handler.toggle);
}(window, jQuery, document);

/* *******************************
 * tab.js v1.1.0
 * Creator: Carl Liu
 * Date: 2016.9.11
 * Notice: This is a active tab.
 * ******************************* */
/* *State structure:*
<div class="tab" data-tab-target="yourtarget"> tab1</div>
<div class="tab" data-tab-target="yourtarget"> tab2</div>
<div id="yourtarget" class="tab-target">
	<div class="tab-item"></div>
</div>
*/
;
! function(window, $, document, undefined) {
		var Tab = function(element, options) {
				this.init(element, options);
		}

		// Default options define
		Tab.VERSION = "1.0.0";
		Tab.SELECTORS = {
			tabSelector:".tab",
			tabIndexSelector: ".tab-index",
			tabTargetSelector:".tab-target",
			tabItemSelector: ".tab-item"
		};
		Tab.DEFAULTS = {
			trigger: "click,hover", //click/hover/manual
			domain: "ns.tab"
		};
		// Alias
		Tab.fn = Tab.prototype;
		//Initialization
		Tab.fn.init = function(element, options) {
				var ths = this;
				//Option priority: data - options > incoming - options > default -options
				this.options = $.extend({}, Tab.DEFAULTS, Tab.SELECTORS, options);
				this.$el = $(element),
				
				// Trigger init event
				this.toggle();
		};
		Tab.fn.toggle=function(){
			var $el=this.$el,index = $el.index(),$target =this.getTarget(),$activeItem=$target.children(this.options.tabItemSelector).eq(index);
			
			$el.addClass("be-active").siblings(".be-active").removeClass("be-active");
			$activeItem.siblings().hide();
			$activeItem.show();
		};
		Tab.fn.getTarget=function(){
			var $el = this.$el;
			if(this.options.tabTarget){
				return $("#"+this.options.tabTarget);
			}

			if( $el.siblings(this.options.tabTargetSelector).size()){
				return $el.siblings(this.options.tabTargetSelector).first();
			}

			if( $el.parent().siblings(this.options.tabTargetSelector).size()){
				return $el.parent().siblings(this.options.tabTargetSelector).first();
			}
			return null;
		}
		// Plugin Definition
		function Plugin(option) {
				return this.each(function() {
						var $this = $(this),
								data = $this.data("ns.tab"),
								options = typeof option == "object" ? $.extend({}, option, $this.data()) : $this.data();
						if (!data){
							$this.data('ns.tab', (data = new Tab(this, options)));
						}else{
							data["toggle"]();
						};
				})
		}
		// POPOUT DATA-API
		// you can get API from follow
		var Handler = {
				toggle: function() {
						Plugin.call($(this));
						return false;
				}
		}
		$(document)
				.on("click.ns.tab", Tab.SELECTORS.tabIndexSelector, Handler.toggle);
}(window, jQuery, document);

/* *******************************
 * Response.js v1.1.0
 * Creator: Carl Liu
 * Date: 2016.9.10
 * Notice: Response web width size.
 * ******************************* */
/* *For example:*
Use single:
Response.set(">=1680","post-list","be-six");
Using multi:
Response.set(">=1680",function(state){
    this.use("post-list","be-six",state)
  });
*/
;(function(win,doc){
	var Response={
		ifRegx:/[<>=]+\d+/ig,
		conds:{},//condition
		set:function(condition,response,className){
			if(typeof response =="function"){
				//function
				this.conds[condition]=response;
			}else if(typeof response =="string"){
				// target, className
				this.conds[condition]={target:response,className:className}
			}
			this.conds[condition].ab=[];
			this.conds[condition].ok;
			this.go();
			return this;
		},
		use:function(target,className,ok){
			this.getElement(target,function(el){
				if(ok){
					this.addClass(el,className);
				}else{
					this.removeClass(el,className);
				}
			})
		},
		getSize:function(){
			return win.innerWith||doc.body&&doc.body.clientWidth||doc.documentElement && doc.documentElement.clientWidth;
		},
		go:function(){
			var currWidth = this.getSize(),ok,ctrl;
			this.getConds(function(condName,condVal){

				ab =condVal.ab;
				ok = this.pass(currWidth,condName);
				ab.push(ok);
				ctrl=this.arrayCtrl(ab);
				if(typeof condVal=="function"){
					ctrl&&condVal.call(this,ok);
				}else if(typeof condVal=="object"){
					if(ctrl){
						this.use(condVal.target,condVal.className,ok);
					}
				}
			})
		},
		arrayCtrl:function(arr){
			var s = arr[arr.length-1]-arr[arr.length-2]
			return (s!=0||isNaN(s));
		},
		getElement:function(target,back){
			var target =doc.getElementsByClassName(target);
			for(var i=0;i<target.length;i++){
				back&&back.call(this,target[i]);
			}
		},
		getConds:function(back){
			var conds=this.conds;
			for(var i in conds){
				back && back.call(this,i,conds[i]); 
			}
			return this;
		},
		addClass:function(el,className){
			if (el.classList){
			 el.classList.add(className);
			}
			else {
			 el.className += ' ' + className;
			}
		},
		removeClass:function(el,className){
			if (el.classList) {
		        el.classList.remove(className);
		    } else {
		        var classes = el.className.split(" ");
		        classes.splice(classes.indexOf(className), 1);
		        el.className = classes.join(" ");
		    }
		},
		pass:function(currWidth,ifs){
			var caseStr =ifs.match(this.ifRegx)||[],
				lens = caseStr.length,
				rsltStr ="";

			if(lens){
				for(var i=0,l=lens-1;i<=l;i++){
					rsltStr +=currWidth+" "+caseStr[i];
					rsltStr +=(i!=l)?" && ":"";
				}
			}
			return rsltStr?eval(rsltStr)?1:0:0;
		}
	}
	win.Response = Response;
	win.onresize=function(){Response.go()};
}(window,document));
