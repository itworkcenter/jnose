/* *******************************
 * test.js v1.0.0
 * Creator: Carl Liu
 * Date: 2016.11.28
 * ******************************* */

+function(window, $, document, undefined) {
    'use strict';

    // Create Common Object
     var  OBJ= function(element, option) {
         this.init(element, option);
     }

     // Default option define
     OBJ.VERSION = "1.0.0";
     OBJ.NAME = "test";
     OBJ.DOMAIN = "n." +OBJ.NAME;
     OBJ.EVENT_KEY = "." + OBJ.DOMAIN;
     OBJ.EVENT = {
         KEYDOWN: "keydown." + OBJ.EVENT_KEY,
         KEYPRESS: "keypress." + OBJ.EVENT_KEY,
         FOCUS: "focus." + OBJ.EVENT_KEY,
         BLUR: "blur." + OBJ.EVENT_KEY
     };
     OBJ.SELECTOR = {
         toggle: "[data-toggle = '"+ OBJ.NAME+"']"
     };
     OBJ.DEFAULT = {
         rule: {
             text: /\w+/ig,
             name: /\w+/ig,
             phone: /\d+/ig,
             password: /[A-Za-z_0-9]/ig,
             mail: /\w+@\w+\.\w+/ig
         }

     };

     // Alias
     OBJ.fn = OBJ.prototype;

     //Initialization
     OBJ.fn.init = function(element, option) {
         this.$el = $(element);
         //Option priority: data > incoming > default
         this.option = $.extend({}, OBJ.DEFAULT, OBJ.SELECTOR, option);

     };

     OBJ.fn.focus = function (e) {

     }
     OBJ.fn.keydown = function (e) {

     }
     OBJ.fn.keypress = function (e) {

     }
     OBJ.fn.blur = function (e) {

     }

     // Event
     OBJ.fn.show = function() {};

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
 }(window, jQuery, document);
