/* *******************************
 * Checkmask.js v1.0.0
 * Creator: Carl Liu
 * Date: 2016.11.28
 * Notice: Refer maskinput plugin
 * ******************************* */

+function(window, $, document, undefined) {
    'use strict';

    var agent = navigator.userAgent,
    iPhone = /iphone/i.test(agent),
    chrome = /chrome/i.test(agent),
    android = /android/i.test(agent);
    $.checkmask = {

    }
     $.fn.extend({
        caret: function(begin, end) {
            var range;
            if (0 !== this.length && !this.is(":hidden")) return "number" == typeof begin ? (end = "number" == typeof end ? end : begin,
            this.each(function() {
                this.setSelectionRange ? this.setSelectionRange(begin, end) : this.createTextRange && (range = this.createTextRange(),
                range.collapse(!0), range.moveEnd("character", end), range.moveStart("character", begin),
                range.select());
            })) : (this[0].setSelectionRange ? (begin = this[0].selectionStart, end = this[0].selectionEnd) : document.selection && document.selection.createRange && (range = document.selection.createRange(),
            begin = 0 - range.duplicate().moveStart("character", -1e5), end = begin + range.text.length),
            {
                begin: begin,
                end: end
            });
        },
        checkmask: function(settings){
            var rules,INPUT,defs,len,patterns,oldVal,
            DEFAULTS={
                definitions: {
                    "9": "[0-9]",
                    a: "[A-Za-z]",
                    "*": "[A-Za-z0-9]",
                    w:"[A-Za-z0-9_|.]"
                },
                autoclear: !0,
                dataName: "rawMaskFn",
                placeholder: "_"
            };

            this.VERSION = "1.0.0";

            return rules = [],
            this.each(function(){
                var OPTIONS = $.extend({}, DEFAULTS, settings, $(this).data());
                INPUT = $(this);

                console.log(OPTIONS);

                if (!OPTIONS.mask) return;

                // traversal input array
                writeBuffer();

                // Focus Event
                function focusEvent(e){
                    if(INPUT.prop("readonly")) return;


                }

                function blurEvent(){
                    // Focus Event
                    if(INPUT.prop("readonly")) return;

                }

                function keypressEvent(e){
                    //keypress Event
                    if(INPUT.prop("readonly")) return;

                    var p, c, next, k = e.which || e.keyCode, pos = INPUT.caret();

                    if (!(e.ctrlKey || e.altKey || e.metaKey || 32 > k) && k && 13 !== k) {

                        if (
                                pos.end - pos.begin !== 0 && (clearBuffer(pos.begin, pos.end), shiftL(pos.begin, pos.end - 1)),
                                p = seekNext(pos.begin - 1),
                                len > p && (c = String.fromCharCode(k),
                                tests[p].test(c))
                            ){

                            if (shiftR(p), buffer[p] = c, writeBuffer(), next = seekNext(p), android) {

                                var proxy = function() {$.proxy($.fn.caret, input, next)();};
                                setTimeout(proxy, 0);

                            } else{
                                INPUT.caret(next);
                            }

                            if(pos.begin <= lastRequiredNonMaskPos){
                                tryFireCompleted();
                            }
                        }

                        e.preventDefault();
                    }


                }

                function keydownEvent(e){
                    //keydown Event
                    console.log("keydown");
                    if(INPUT.prop("readonly")) return;
                    // var p, c, next, key = e.which || e.keyCode, pos = INPUT.caret();
                    //
                    //
                    // var dd =this.getPatternsForInput(e.key, pos.begin-pos.end===0 ? pos.begin : pos.end);
                    // INPUT.val(dd);

                    var pos, begin, end, k = e.which || e.keyCode;
                    oldVal = INPUT.val();

                    if(8 === k || 46 === k || iPhone && 127 === k){
                        //8 Delete left key
                        //46 Delete right
                        //127 end key
                       pos = INPUT.caret();
                       begin = pos.begin;
                       end = pos.end;

                       if(end - begin === 0){

                           if(46 !== k){
                               begin = seekPrev(begin)
                           }else{
                               begin = end = seekNext(begin - 1)
                           }

                           if(46 === k){
                               end = seekNext(end);
                           }else{
                               end = end;
                           }

                       }
                       clearBuffer(begin, end);
                       shiftL(begin, end - 1);
                       e.preventDefault();
                   }else{
                       if(13 === k ){
                           //Enter key
                            blurEvent.call(this, e)
                       }else{
                           if(27 === k){
                               //ESC key
                               INPUT.val(focusText);
                               INPUT.caret(0, checkVal()),
                               e.preventDefault()
                           }
                       }
                   }
                }

                function seekNext(pos){

                    for (;++pos < len && !rules[pos]; ) ;
                    return pos;
                }

                function seekPrev(pos){
                    for (;--pos >= 0 && !rules[pos]; )
                    return pos;
                }
                function writeBuffer(){
                    // set Checkmask
                    INPUT.val(getPatterns().join(""));
                }
                function clearBuffer(start, end){
                    var i;
                    for (i = start; end > i && len > i; i++) rules[i] && (buffer[i] = getPlaceholder(i));
                }
                function setRule(mask_cell){
                    var define = OPTIONS.definitions[mask_cell];
                    rules.push(define ? new RegExp(define) : "");
                }
                function getPatterns(){
                    // get Patterns
                    var define = OPTIONS.definitions, mask = OPTIONS.mask;

                    return patterns = $.map(mask.split(""), function(str, i){
                            // create regular rule array  and patterns
                            return setRule(str), define[str] ? getPlaceholderIndex(i) : str;
                        });
                }
                function getPatternsForInput(input, index){
                    // get Patterns
                    var define = OPTIONS.definitions, patterns = patterns;

                    patterns[seekNext(index)] = input;
                    return  patterns.join("");
                }
                //get placeholder by index
                function getPlaceholderIndex(i){
                    var holder = OPTIONS.placeholder;
                    return holder.charAt(i<holder.length ? i : 0);
                }

                //event
            INPUT
                .on("focus.mask", focusEvent)
                .on("blur.mask", blurEvent)
                .on("keydown.mask", keydownEvent)
                .on("keypress.mask", keypressEvent);

            });
            // :end return
        }
        // :end checkmask
})
// :end extend
}(window, jQuery, document);
