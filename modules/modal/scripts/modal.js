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
        this.init("Modal", element, options);
    }

    // Default options define
    Modal.VERSION = "1.2.4";
    Modal.SELECTORS = {
        modalSelector: ".modal",
        modalBoxSelector: ".modal-box",
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

        //Option priority: data - options > incoming - options > default -options
        this.options = $.extend({}, Modal.DEFAULTS, Modal.SELECTORS, options);

        this.type = type || this.options.type;
        this.$element = $(element);
        this.$source = this.getSource();
        this.globalState = {
            scroll: true,
            resize: true
        };

        // Trigger init event
        this.trigger(type, this.options.toggleSelector);
    };

    //Trigger bind
    Modal.fn.trigger = function(type, selector) {

    }

    // Event
    Modal.fn.toggle = function() {};

    // Set position
    Modal.fn.setPosition = function() {};

    //Set position
    Modal.fn.setArrow = function() {};

    // Set effect
    Modal.fn.setEffect = function($target, json) {}
        //Get mask
    Modal.fn.getMask = function() {};

    // Get Target
    Modal.fn.getTarget = function() {}

    //leave event
    Modal.fn.leave = function() {
        this.hide();
    };

    // Close Modal
    Modal.fn.hide = function() {};

    // show
    Modal.fn.show = function() {};

    //Set mask
    Modal.fn.setMask = function() {}

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
                data = $this.data("ng.Modal");

            options = typeof option == "object" ? $.extend({}, option, $this.data()) : $this.data();

            if (!data && /destroy|hide/.test(option)) return;

            if (!data) $this.data('ng.Modal', (data = new Modal(this, options)));

            if (typeof option == 'string') data[option]();
        })
    }

    var old = $.fn.Modal;

    $.fn.Modal = Plugin;
    $.fn.Modal.Constructor = Modal;

    // POPOVER NO CONFLICT
    // ===================
    $.fn.Modal.noConflict = function() {
        $.fn.Modal = old
        return this
    }

    // POPOUT DATA-API
    var Handler = {};

    $(document)
        .on("click.n.Modal", Modal.SELECTORS.toggleSelector, Handler.toggle)
        .on("click.n.Modal", Modal.SELECTORS.closeSelector, Handler.hide);

    // $(window)
    //     .resize(Handler.resizeUpdate)
    //     .scroll(Handler.scrollUpdate);

}(window, jQuery, document);
