/* *******************************
 * checkholder.js v1.0.0
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

    var Checkholder = function(element) {
        var self = this,
            $this = $(this);

        this.$el = $(element);
        //Option priority: self data> default
        this.options = $.extend({}, Checkholder.DEFAULTS, self.$el.data());

        this.setMask();

        $this
        .on("focus.mask", function(){

        })
        .on("blur.mask", function(){

        })
        .on("keydown.mask", function(){

        })
    }

    Checkholder.fn = Checkholder.prototype ={
        check: function(){
            // check holder
        },
        setMask: function(){
            console.log("setMask");
            // set Mask
            this.$el.val(this.getMask());
        },
        getMask: function(){
            console.log("getmask");
            // get mask
            var self = this,
                definition = this.options.definition,
                mask = this.options.mask,
                reslt = $.map(mask.split(""), function(el, index){
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
    Checkholder.VERSION = "1.0.0";
    Checkholder.DEFAULTS = {
        definition: {
            "9": "[0-9]",
            a: "[A-Za-z]",
            "*": "[A-Za-z0-9]",
            w:"[A-Za-z0-9_|.]"
        },
        placeholder: "_"
    };

// element load
$(function(){
    // load checkholder
    $("[data-mask]").each(function(){
        var $this = $(this);
        var api = $this.data("n.mask");

        if (!api) $this.data('n.collapse', (api = new Checkholder(this)));

        api["check"]();
    })
});
}(window, jQuery, document);
