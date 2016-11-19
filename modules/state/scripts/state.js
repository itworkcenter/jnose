/* *******************************
 * state.js v1.0.0
 * Creator: Carl Liu
 * Date: 2016.11.18
 * Notice: State control have one trigger.
 * Useage:
 <button class="nbtn nbtn--primary nstate nstate--active">state active</button>
 <div class="nstate-box">
     The state has actived;
 </div>
 * ******************************* */
 function nstate(win){
    //  Just have one instance
     if(win.nStateId) return;
     $(document)
         .on("click.n.state", ".nstate", function(e){
             $(this).toggleClass("nstate--active");
             return false;
         });
         win.nStateId = 1;
 }
 nstate(window);
