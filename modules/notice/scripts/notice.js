/* *******************************
 * Notice.js v1.1.0
 * Creator: Carl Liu
 * Date: 2016.8.16
 * Notice: This is a message tips tool.
 * ******************************* */
+function(window, $, document, undefined) {
	var Notice = {
		set:function(message,type){
			var ths=this,
				template="<ul class='nnotice'></ul>",
				messageTempl="<li class='nnotice-message'><div class='nnotice-content'></div></li>";

			ths.$body=$("body");
			ths.$notice = $(".nnotice");
			ths.$msg = $(messageTempl);
			$(".nnotice-content",ths.$msg).html(message);

			switch (type) {
				case "info":
					ths.$msg.addClass("message--info");
					break;
				case "warning":
					ths.$msg.addClass("message--warning");
					break;
				case "success":
					ths.$msg.addClass("message--success");
					break;
				default:

			}

			if(!ths.$notice.size()){
				ths.$body.append(template);
				ths.$notice = $(".nnotice");
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
