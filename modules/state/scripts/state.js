/* *******************************
 * state.js v1.1.0
 * Creator: Carl Liu
 * Date: 2016.11.18
 * Notice: State control have one trigger.
 * Useage:
 <button class="nbtn nbtn--primary nstate nstate--active hover">state active</button>
 <div class="nstate-box">
     The state has actived;
 </div>
 * ******************************* */
 function nstate(win){
     var NAME = "state";
     var VERSION = "1.1.0";
     var DOMAIN = "n." + NAME;
     var EVENT_KEY = "." + DOMAIN;
     var EVENT = {
         click: "click" + EVENT_KEY,
         mouseover: "mouseover" + EVENT_KEY,
         mouseleave: "mouseleave" + EVENT_KEY
     };
     var SELECTOR = {
         state: ".nstate",
         hover: ".nstate.hover",
         activeClass: "nstate--active"
     };
    //  Just have one instance
     if(win.nStateId) return;

     $(document)
         .on(EVENT.click, SELECTOR.state, function(e){
             $(this).toggleClass(SELECTOR.activeClass);
             return false;
         })
         .on(EVENT.mouseover, SELECTOR.hover, function(e){
                 $(this).addClass(SELECTOR.activeClass);
                 return false;
             })
         .on(EVENT.mouseleave, SELECTOR.hover, function(e){
                 $(this).removeClass(SELECTOR.activeClass);
                 return false;
             });

         win.nStateId = 1;
 }
 nstate(window);
