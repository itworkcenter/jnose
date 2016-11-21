/* *******************************
 * modal.js v1.0.0
 * Creator: Carl Liu
 * Date: 2016.11.16
 * Notice: Modal windon with the modal.
 * ******************************* */

/* *******************************
   Update Note:
    1. Fist one.
 * ******************************* */

/*
*Modal Useage:*
*/

+function(window, $, document, undefined) {
    'use strict';

    var Modal = function(element, options) {
        this.init("modal", element, options);
    }

    // Default options define
    Modal.VERSION = "1.1.0";
    Modal.SELECTORS = {
        toggleSelector: "[data-toggle='modal']",
        modalSelector: ".nmodal",
        closeSelector: ".nmodal-close",
        bodySelector: ".nmodal-box-body",
        modalBoxSelector: ".nmodal-box",
        maskSelector: "#overlay"
    };

    Modal.TRANSITION_DURATION = 150;
    Modal.BACKDROP_TRANSITION_DURATION = 100;

    Modal.DEFAULTS = {};

    // Alias
    Modal.fn = Modal.prototype;

    //Initialization
    Modal.fn.init = function(type, element, options) {
        var ths = this;
        this.$el = $(element);

        //Option priority: data - options > incoming - options > default -options
        this.options = $.extend({}, Modal.DEFAULTS, Modal.SELECTORS, options, ths.$el.data());
        this.type = type || this.options.type;

        this.$target = $(this.options.target).data("n.modal", this);
        this.$box = $(this.options.modalBoxSelector, this.$target);
        this.$close = $(this.options.closeSelector, this.$target);
        this.$body  =  $(this.options.bodySelector, this.$target);
        this.$mask = $(this.options.maskSelector);

        // box event stop
        this.$box.click(function(e){
            e.preventDefault();
            e.stopPropagation();
            return false;
        });
        // close event
        this.$close.click(function(){
            ths.close();
        });
        // mask event
        this.$target.on("click",function(e){
            e.preventDefault();
            e.stopPropagation();
            ths.close();
            return false;
        });

        if (this.options.remote) {
         this.$body.load(this.options.remote, $.proxy(function () {
              this.$el.trigger('loaded.n.modal')
            }, this))
        }
    };

    // Event
    Modal.fn.toggle = function() {
        var ths = this;

        if(this.$target.hasClass("open")){
            this.close();
        }else{
            this.open();
        }
    };

    // show();
    Modal.fn.open = function() {
        var ths = this;
        this.$target.addClass("open");
        this.$mask.addClass("open");
        this.$el.trigger($.Event('open.n.modal'));
    };
    // close
    Modal.fn.close = function() {
        this.$target.removeClass("open");
        this.$mask.removeClass("open");
        this.$el.trigger($.Event('close.n.modal'));
    };

    //Update
    Modal.fn.update = function() {};

    // General Modal Id
    Modal.fn.getUID = function(prefix) {
        do prefix += ~~(Math.random() * 1000000)
        while (document.getElementById(prefix))
        return prefix
    }


    // Plugin Definition
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this),
                  api = $this.data("n.modal");

            if (!api && /destroy|hide/.test(option)) return;

            if (!api) $this.data('n.modal', (api = new Modal(this, option)));

            if (typeof option == 'string') api[option]();
        })
    }

    var old = $.fn.Modal;

    $.fn.Modal = Plugin;
    $.fn.Modal.Constructor = Modal;

    // POPOVER NO CONFLICT
    // ===================
    $.fn.Modal.noConflict = function() {
        $.fn.Modal = old;
        return this;
    }

    // POPOUT DATA-API
    var Handler = {
        toggle: function(e){

            if ($(this).is('a')) e.preventDefault();

            Plugin.call($(this), "toggle");
        }
    };

    $(document)
        .on("click.n.modal", Modal.SELECTORS.toggleSelector, Handler.toggle);

}(window, jQuery, document);
