/* *******************************
 * Checkmask.js v1.0.0
 * Creator: Carl Liu
 * Date: 2016.11.28
 * Notice: Form input mask validate.
 * ******************************* */

/* *******************************
   Update Note:
    1. None.
 * ******************************* */

/*
*Collapse Useage:*
*/

+function(window, $, document, undefined) {
    'use strict';

    var Checkmask = function(element, options) {
        this.init(element, options);
    }

    Checkmask.fn = Checkmask.prototype ={
        init: function(element, options){
            var self = this, $el;
            var len;

            this.$el = $el = $(element);
            //Option priority: self data> default
            this.options = $.extend({}, Checkmask.DEFAULTS, options, $el.data());
            this.setCheckmask();

            $el
            .on("focus.mask", focusEvent)
            .on("blur.mask", blurEvent)
            .on("keydown.mask", keydownEvent)
            .on("keypress.mask", keypressEvent);
        },
        readOnly: function(){
            return this.$el.prop("readonly");
        },
        focusEvent: function(){
            // Focus Event
            if(self.readOnly()){return};

        },
        blurEvent: function(){
            // Focus Event
            if(self.readOnly()){return};

        },
        keypressEvent: function(e){
            //keypress Event
            if(self.readOnly()){return};


        },
        keydownEvent: function(e){
            //keydown Event
            if(self.readOnly()){return};


        },
        check: function(){
            // check holder
        },
        seekNext: function(pos){
            var len = this.len;
            for (;++pos < len && !tests[pos]; ) ;
            return pos;
        },
        seekPrev: function(pos){
            for (;--pos >= 0 && !tests[pos]; )
            return pos;
        },
        setCheckmask: function(){
            var dd,aa
            // set Checkmask
            this.$el.val(this.getCheckmask());
        },
        getCheckmask: function(){
            // get mask
            var self = this;
            var definition = this.options.definition;
            var mask = this.options.mask;

            var reslt = $.map(mask.split(""), function(el, index){
                    return definition[el] ? self.getPlaceholderIndex(index) : el;
                }).join(" ");
                this.mask = reslt;
            return reslt;
        },
        getPlaceholderIndex: function(i){
            var holder = this.options.placeholder;
            return holder.charAt(i<holder.length ? i : 0);
        }
    }
    // :end fn

    // Default options define
    Checkmask.VERSION = "1.0.0";
    Checkmask.DEFAULTS = {
        definition: {
            "9": "[0-9]",
            a: "[A-Za-z]",
            "*": "[A-Za-z0-9]",
            w:"[A-Za-z0-9_|.]"
        },
        placeholder: "_"
    };

    // Plugin Definition
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this),
                  api = $this.data("n.checkmask");

            if (!api) $this.data('n.checkmask', (api = new Checkmask(this, option)));
        })
    }

    var old = $.fn.checkmask;

    $.fn.checkmask = Plugin;
    $.fn.checkmask.Constructor = Checkmask;

}(window, jQuery, document);

// element load
$(function(){
    // load Checkmask
    $("[data-mask]").checkmask();
});
