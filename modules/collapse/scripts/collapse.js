/* *******************************
 * collapse.js v1.0.0
 * Creator: Carl Liu
 * Date: 2016.11.25
 * Notice: Collapse.
 * ******************************* */

/* *******************************
   Update Note:
    1. Fist one.
 * ******************************* */

/*
*Collapse Useage:*
*/

+function(window, $, document, undefined) {
    'use strict';

    var Collapse = function(element, options) {
        this.init(element, options);
    }

    // Default options define
    Collapse.VERSION = "1.0.0";
    Collapse.SELECTORS = {
        toggleSelector: "[data-toggle='collapse']",
        scopeSelector: ".ncollapse-box",// collapse using scope;
        collapseSelector: ".ncollapse",
        collapsePath: "> * >",
    };

    Collapse.TRANSITION_DURATION = 300;
    Collapse.DEFAULTS = {};

    // Alias
    Collapse.fn = Collapse.prototype;

    //Initialization
    Collapse.fn.init = function(element, options) {
        var self = this;

        this.$el = $(element);
        //Option priority: data - options > incoming - options > default -options
        this.options = $.extend({}, Collapse.DEFAULTS, Collapse.SELECTORS, options, self.$el.data());
        this.$scope = this.getScope();
        this.$target = this.getTarget();
        this.transitioning = null;
        this.options.toggle && this.toggle();
    };

    // Event
    Collapse.fn.toggle = function() {
        this[this.$target.hasClass('in') ? 'hide' : 'show']();
    };
    // direct for width or height
    Collapse.fn.dimension = function () {
      var hasWidth = this.$el.hasClass('width')
      return hasWidth ? 'width' : 'height'
    }
    // show();
    Collapse.fn.show = function() {
        var self = this;

        if (this.transitioning || this.$target.hasClass('in')) return;

        var $active = this.getCollapseActive();

        //trigger event
        var startEvent = $.Event('show.n.collapse');
        this.$target.trigger(startEvent);
        if (startEvent.isDefaultPrevented()) return;

        var dimension = this.dimension();

        this.$target
          .removeClass('ncollapse')
          .addClass('ncollapsing')[dimension](0)
          .attr('aria-expanded', true);

          this.$el
            .addClass('ncollapse--open')
            .attr('aria-expanded', true);

        this.transitioning = 1;

        var complete = function () {
          this.$target
            .removeClass('ncollapsing')
            .addClass('ncollapse in')[dimension]('');
          this.transitioning = 0;
          this.$el
            .trigger('shown.n.collapse');
        }
        //whether support  transition on browser
        if (!$.support.transition) return complete.call(this);

        var scrollSize = $.camelCase(['scroll', dimension].join('-'))

        this.$target
          .one('bsTransitionEnd', $.proxy(complete, this))
          .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$target[0][scrollSize])

    };
    // close
    Collapse.fn.hide = function() {
        var self = this;

        if (this.transitioning || !this.$target.hasClass('in')) return;

        //trigger event
        var startEvent = $.Event('hide.n.collapse');
        this.$el.trigger(startEvent);
        if (startEvent.isDefaultPrevented()) return;

        var dimension = this.dimension();

        this.$target[dimension](this.$target[dimension]())[0].offsetHeight;

        this.$target
          .addClass('ncollapsing')
          .removeClass('ncollapse in')
          .attr('aria-expanded', false);

          this.$el
            // .addClass('ncollapsed')
            .removeClass('ncollapse--open')
            .attr('aria-expanded', false);

            this.transitioning = 1;

            var complete = function () {
              this.transitioning = 0
              this.$target
                .removeClass('ncollapsing')
                .addClass('ncollapse')
                .trigger('hidden.n.collapse')
            };

            if (!$.support.transition) return complete.call(this)

            this.$target
              [dimension](0)
              .one('bsTransitionEnd', $.proxy(complete, this))
              .emulateTransitionEnd(Collapse.TRANSITION_DURATION);
    };

    //get element parent
    Collapse.fn.getScope = function() {
        return this.$el.parents(this.options.scopeSelector);
    };
    //get element target
    Collapse.fn.getTarget = function() {
        var self = this;

        function detectTarget($el, $scope){
            var colsltr = self.options.collapseSelector;
            var $collapse =  $($el.siblings(colsltr)[0], $scope);

            if(!$collapse.size()){
                // if  scope, quit
                if($collapse.hasClass(self.options.scopeSelector)) return "";

                detectTarget($el.parent());
            }else{
                return $collapse;
            }
        }
        return detectTarget(self.$el, self.$scope);
    };
    //get element
    Collapse.fn.getTrigger = function($el) {
        var self = this;

        function detectTarget($el, $scope){
            var colsltr = self.options.collapseSelector;
            var $collapse =  $($el.siblings(colsltr)[0], $scope);

            if(!$collapse.size()){
                // if  scope, quit
                if($collapse.hasClass(self.options.scopeSelector)) return "";

                detectTarget($el.parent());
            }else{
                return $collapse;
            }
        }
        return detectTarget($el, self.$scope);
    };
    //get avtive element
    Collapse.fn.getCollapseActive = function(element) {
        var $dd = $(this.options.collapsePath + this.options.toggleSelector, this.$scope).filter(".ncollapse--open").click();
    };

    // Plugin Definition
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this),
                  api = $this.data("n.collapse");

            if (!api && /destroy|hide/.test(option)) return;

            if (!api) $this.data('n.collapse', (api = new Collapse(this, option)));

            if (typeof option == 'string') api[option]();
        })
    }

    var old = $.fn.collapse;

    $.fn.collapse = Plugin;
    $.fn.collapse.Constructor = Collapse;

    // POPOVER NO CONFLICT
    // ===================
    $.fn.collapse.noConflict = function() {
        $.fn.collapse = old;
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
        .on("click.n.collapse", Collapse.SELECTORS.toggleSelector, Handler.toggle);

}(window, jQuery, document);
