/* *******************************
 * Checkmask.js v1.0.0
 * Creator: Carl Liu
 * Date: 2016.11.28
 * Notice: Form input mask validate. Support english mode.
 * ******************************* */

/* *******************************
   Update Note:
    1. None.
 * ******************************* */

/*
*Checkmask Useage:*
*/

+function(window, $, document, undefined) {
    'use strict';

    var Checkmask = function(element, options) {
        this.init(element, options);
    }

    Checkmask.fn = Checkmask.prototype ={
        init: function(element, options){
            var ths = this, $el;

            this.$el = $el = $(element);
            //Option priority: ths data> default
            this.options = $.extend({}, Checkmask.DEFAULTS, options, $el.data());
            this.rules = []; //mask string  to rules array;
            this.patterns = []; //mask string to patterns array;
            this.len = 0; //patterns length;
            this.writeBuffer();

            $el
            .on("focus.mask", $.proxy(ths.focusEvent, ths))
            .on("blur.mask", $.proxy(ths.blurEvent, ths))
            .on("keydown.mask", $.proxy(ths.keydownEvent, ths))
            .on("keypress.mask", $.proxy(ths.keypressEvent, ths));
        },
        readOnly: function(){
            return this.$el.prop("readonly");
        },
        focusEvent: function(e){
            // Focus Event
            if(this.readOnly()){return};

        },
        blurEvent: function(){
            // Focus Event
            if(this.readOnly()){return};

        },
        keypressEvent: function(e){
            //keypress Event
            if(this.readOnly()){return};


        },
        keydownEvent: function(e){
            //keydown Event
            if(this.readOnly()){return};
            var p, c, next, key = e.which || e.keyCode, pos = this.$el.caret();


            var dd =this.getPatternsForInput(e.key, pos.begin-pos.end===0 ? pos.begin : pos.end);
            this.$el.val(dd);
        },
        check: function(){
            // check holder
        },
        seekNext: function(pos){
            var ths = this, len = ths.len;

            for (;++pos < len && !ths.rules[pos]; ) ;
            return pos;
        },
        seekPrev: function(pos){
            var ths = this;

            for (;--pos >= 0 && !ths.rules[pos]; )
            return pos;
        },
        writeBuffer: function(){
            // set Checkmask
            this.$el.val(this.getPatterns().join(""));
        },
        setRule: function(mask_cell){
            var define = this.options.definition[mask_cell];
            this.rules.push(define ? new RegExp(define) : "");
        },
        getPatterns: function(){
            // get Patterns
            var ths = this,define = this.options.definition, mask = this.options.mask;

            return this.patterns = $.map(mask.split(""), function(str, i){
                    // create regular rule array  and patterns
                    return ths.setRule(str), define[str] ? ths.getPlaceholderIndex(i) : str;
                });
        },
        getPatternsForInput: function(input, index){
            // get Patterns
            console.log(input +" "+ index);
            var ths = this,define = this.options.definition, patterns = this.patterns;

            patterns[ths.seekNext(index)] = input;
            console.log(patterns);

            return  patterns.join("");
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
