/* *******************************
 * tab.js v1.0.0
 * Creator: Carl Liu
 * Date: 2016.11.14
 * Description: Tab plugin .
 * ******************************* */

/* *******************************
   Update Note:
    1.
    2.
 * ******************************* */

/*
*Tab Useage:*

 */
;
! function(window, $, document, undefined) {

    var Tab = function(element, options) {
        this.init("tab", element, options);
    }

    // Default options define
    Tab.VERSION = "1.1.0";
    Tab.SELECTORS = {
        tabSelector: ".ntab",
        tabBoxSelector: ".ntab-box",
        tabPaneSelector: ".ntab-pane",
        activeSelectorStr: "active"
    };

    Tab.DEFAULTS = {
        type: "tab",
        domain: "ng.tab"
    };

    // Alias
    Tab.fn = Tab.prototype;

    //Initialization
    Tab.fn.init = function(type, element, options) {
        this.$el = $(element);
        this.$box = this.$el.parents(Tab.SELECTORS.tabBoxSelector);
        //Option priority: data - options > incoming - options > default -options
        this.options = $.extend({}, Tab.DEFAULTS, Tab.SELECTORS, options, this.$box.data());
        this.type = type || this.options.type;
    };
    // upadte element
    Tab.fn.update = function (element) {
        this.$el = $(element);
    }

    // Event
    Tab.fn.show = function() {
        var activeStr = this.options.activeSelectorStr;
        var $target = this.getTarget();
        var tabIndex = this.$el.index();

        if (this.$el.hasClass(activeStr)) return;

        this.$el
        .addClass(activeStr)
        .siblings(this.options.tabSelector)
        .removeClass(activeStr);

        $(this.options.tabPaneSelector+":eq("+tabIndex+")", $target)
        .addClass(activeStr)
        .siblings(this.options.tabPaneSelector)
        .removeClass(activeStr);

        this.$el.trigger('show.n.tab', this.$el);
    };

    // Get Target
    Tab.fn.getTarget = function() {
        return $(this.options.target);
    }

    // Plugin Definition
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this);
            var $box = $this.parents(Tab.SELECTORS.tabBoxSelector);
            var api = $box.data("n.tab");
            var options = typeof option == "object" ? option : {};

            api ? api.update(this) : $box.data('n.tab',(api = new Tab(this, options)));

            if (typeof option == 'string') api[option]();
        })
    }

    var old = $.fn.tab;

    $.fn.tab = Plugin;
    $.fn.tab.Constructor = Tab;

    // POPOVER NO CONFLICT
    // ===================
    $.fn.tab.noConflict = function() {
        $.fn.tab = old
        return this
    }

    // DATA-API
    var clickHandler = function (e) {
      e.preventDefault()
      Plugin.call($(this), 'show')
    }

    $(document)
        .on("click.n.tab", Tab.SELECTORS.tabSelector, clickHandler);

}(window, jQuery, document);
