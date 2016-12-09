/* *******************************
 * dropdown.js v1.0.0
 * Creator: Carl Liu
 * Date: 2016.12.7
 * ******************************* */

+function(window, $, document, undefined) {
    'use strict';

    // Create Common Object
     var  OBJ= function(element, option) {
         this.init(element, option);
     }

     // Default option define
     OBJ.VERSION = "1.0.0";
     OBJ.NAME = "dropdown";
     OBJ.DOMAIN = "n." +OBJ.NAME;
     OBJ.EVENT_KEY = "." + OBJ.DOMAIN;
     OBJ.API_KEY = ".api";
     OBJ.EVENT = {
         hide: "hide" + OBJ.EVENT_KEY,
         hidden: "hidden" + OBJ.EVENT_KEY,
         show: "show" + OBJ.EVENT_KEY,
         shown: "shown" + OBJ.EVENT_KEY,
         click: "click" + OBJ.EVENT_KEY,
         click_api: "click" + OBJ.EVENT_KEY + OBJ.API_KEY,
         mouseover: "mouseover" + OBJ.EVENT_KEY,
         mouseover_api: "mouseover" + OBJ.EVENT_KEY + OBJ.API_KEY,
         mouseleave: "mouseleave" + OBJ.EVENT_KEY,
         mouseleave_api: "mouseleave" + OBJ.EVENT_KEY + OBJ.API_KEY
     };
     OBJ.KEYCODE = {
         MOUSE_RIGHT_BUTTON_WHICH: 3
     };
     OBJ.SELECTOR = {
         toggle: "[data-toggle = '"+ OBJ.NAME+"']",
         container: ".ndropdown",
         menu: ".ndropdown-menu"
     };
     OBJ.CLASSNAME = {
         open: "open",
         disabled: "disabled"
     };
     OBJ.DEFAULT = {};

     // Alias
     OBJ.fn = OBJ.prototype;

     //Initialization
     OBJ.fn.init = function(element, option) {
         this.$el = $(element);
         //Option priority: data > incoming > default
         this.option = $.extend({}, OBJ.DEFAULT, option);

         this.addEventListeners();
     };

     OBJ.fn.addEventListeners = function addEventListeners(){
         this.$el.on(OBJ.EVENT.click, this.toggle);
     }

     OBJ.toggle = OBJ.fn.toggle = function toggle () {
        //  if disabled
        if(this.disabled || $(this).hasClass(OBJ.CLASSNAME.disabled)){
            return false;
        }

        var container = OBJ.fn.getContainerByElement(this);
        var isActive = $(container).hasClass(OBJ.CLASSNAME.open);

        OBJ.clearMenus();

        if(isActive){
            return false;
        }

        /**mobile fix
        * coding coming soon
        */


        //trigger show event
        var relatedTarget = { relatedTarget: this };
        var showEvent = $.Event(OBJ.EVENT.show, relatedTarget);

        $(container).trigger(showEvent);

        if(showEvent.isDefaultPrevented()){
            return false;
        }

        $(container).toggleClass(OBJ.CLASSNAME.open);
        $(container).trigger($.Event(OBJ.EVENT.shown, relatedTarget));

        return false;
     }

OBJ.getContainerByElement = OBJ.fn.getContainerByElement = function getContainerByElement (element) {
         var container = element.getAttribute('data-target');

         return container || element.parentNode;
     }

OBJ.clearMenus = OBJ.fn.clearMenus = function clearMenus (event) {
         if(event && event.which === OBJ.KEYCODE.MOUSE_RIGHT_BUTTON_WHICH){
             return;
         }

        //  convert to array
         var toggles = $.makeArray($(OBJ.SELECTOR.toggle));

        //  :start for toggles
         for (var i = 0; i < toggles.length; i++){
             var container = OBJ.getContainerByElement(toggles[i]);
             var relatedTarget = { relatedTarget: toggles[i]};

             if(!$(container).hasClass(OBJ.CLASSNAME.open)){
                 continue;
             }

             if (event && event.type === 'click' && /input|textarea/i.test(event.target.tagName) && $.contains(parent, event.target)) {
               continue;
             }

             var hideEvent = $.Event(OBJ.EVENT.hide, relatedTarget);
             $(container).trigger(hideEvent);

             if(hideEvent.isDefaultPrevented()){
                 continue;
             }

             $(container).removeClass(OBJ.CLASSNAME.open).trigger($.Event(OBJ.EVENT.hidden, relatedTarget));
         }
        //  :end for toggles
     }

     // jQuery Port Definition
    OBJ.jQueryAPI = function(option) {
         return this.each(function() {
             var $this = $(this);
             var API = $this.data(OBJ.DOMAIN);
             var option = $.extend({}, option, $this.data());

             if(!API){
                 $this.data(OBJ.DOMAIN, (API = new OBJ(this, option)));
             }

             if(typeof option == 'string'){
                 API[option]();
             }
         })
     }

    // jQuery plugin
     var old = $.fn[OBJ.NAME];
     $.fn[OBJ.NAME] = OBJ.jQueryAPI;
     $.fn[OBJ.NAME].Constructor = OBJ;
     $.fn[OBJ.NAME].noConflict = function() {
         $.fn[OBJ.NAME] = old;
         return this
     }

     // POPOUT DATA-API
     var Handler = {
         toggle: function(e){

             if ($(this).is('a')) e.preventDefault();

             Plugin.call($(this), "toggle");
         },
         mouseover: function(e){

         },
         mouseleave: function(e){

         }
     };

     $(document)
         .on(OBJ.EVENT.click_api, OBJ.clearMenus)
         .on(OBJ.EVENT.click_api, OBJ.SELECTOR.toggle, OBJ.toggle)
         .on(OBJ.EVENT.mouseover_api, OBJ.SELECTOR.toggle, Handler.mouseover)
         .on(OBJ.EVENT.mouseleave_api, OBJ.SELECTOR.toggle, Handler.mouseleave);

 }(window, jQuery, document);
