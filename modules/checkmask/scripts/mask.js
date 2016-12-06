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
        back: function(date){},
        complete: function(data){},
        definitions: {
            "9": "[0-9]",
            a: "[A-Za-z]",
            "*": "[A-Za-z0-9]",
            w: "[A-Za-z0-9_|.]",
            p:[/[A-Z]/,/[a-z]/,/[^\w]/]
        },
        autoclear: !0,
        dataName: "rawMaskFn",
        placeholder: "_"
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
        checkmask: function(options){
            var input, defs, tests, partialPosition, firstNonMaskPos, lastRequiredNonMaskPos, len, oldVal,caretTimeoutId;

            this.VERSION = "1.0.0";

            return  this.trigger("unmask").each(function(){
                var settings = $.extend({}, $.checkmask, options, $(this).data()), mask = settings.mask;

                defs = settings.definitions;
                input = $(this);

                var tests = [], partialPosition = len = mask.length,
                firstNonMaskPos = null;

                $.each(mask.split(""), function(i, c) {
                    "?" == c ? (len--, partialPosition = i) : defs[c] ? (tests.push(new RegExp(defs[c])),
                    null === firstNonMaskPos && (firstNonMaskPos = tests.length - 1), partialPosition > i && (lastRequiredNonMaskPos = tests.length - 1)) : tests.push(null);
                });



                if (!settings.mask) return;

                function tryFireCompleted() {
                    if (settings.completed) {
                        for (var i = firstNonMaskPos; lastRequiredNonMaskPos >= i; i++) if (tests[i] && buffer[i] === getPlaceholder(i)) return;
                        settings.completed.call(input);
                    }
                }
                // Focus Event
                function focusEvent(e){
                    if(input.prop("readonly")) return;
                    clearTimeout(caretTimeoutId);
                    var pos;
                    focusText = input.val(), pos = checkVal(), caretTimeoutId = setTimeout(function() {
                        console.log(checkVal());
                        input.get(0) === document.activeElement && (writeBuffer(), pos == mask.replace("?", "").length ? input.caret(0, pos) : input.caret(pos));
                    }, 10);
                }

                function blurEvent(){
                    // blur Event
                    if(input.prop("readonly")) return;
                    checkVal(), input.val() != focusText && input.change();


                }

                function keypressEvent(e){
                    //keypress Event
                    if(input.prop("readonly")) return;

                    var p, c, next, k = e.which || e.keyCode, pos = input.caret();
                    if (!(e.ctrlKey || e.altKey || e.metaKey || 32 > k) && k && 13 !== k) {
                        if (pos.end - pos.begin !== 0 && (clearBuffer(pos.begin, pos.end), shiftL(pos.begin, pos.end - 1)),
                        p = seekNext(pos.begin - 1), len > p && (c = String.fromCharCode(k), tests[p].test(c))) {
                            if (shiftR(p), buffer[p] = c, writeBuffer(), next = seekNext(p), android) {
                                var proxy = function() {
                                    $.proxy($.fn.caret, input, next)();
                                };
                                setTimeout(proxy, 0);
                            } else input.caret(next);
                            pos.begin <= lastRequiredNonMaskPos && tryFireCompleted();
                        }
                        e.preventDefault();
                    }

                    settings.back && settings.back(this);
                    input.caret().begin == len && typeof settings.complete == "function" && settings.complete(this);
                }

                function keydownEvent(e){
                    //keydown Event
                    if(input.prop("readonly")) return;

                    var pos, begin, end, k = e.which || e.keyCode;
                    oldVal = input.val(), 8 === k || 46 === k || iPhone && 127 === k ? (pos = input.caret(),
                    begin = pos.begin, end = pos.end, end - begin === 0 && (begin = 46 !== k ? seekPrev(begin) : end = seekNext(begin - 1),
                    end = 46 === k ? seekNext(end) : end), clearBuffer(begin, end), shiftL(begin, end - 1),
                    e.preventDefault()) : 13 === k ? blurEvent.call(this, e) : 27 === k && (input.val(focusText),
                    input.caret(0, checkVal()), e.preventDefault());
                }

                function seekNext(pos){

                    for (;++pos < len && !tests[pos]; ) ;
                    return pos;
                }

                function seekPrev(pos){
                    for (;--pos >= 0 && !tests[pos]; ) ;
                    return pos;
                }
                function shiftL(begin, end) {
                    var i, j;
                    if (!(0 > begin)) {
                        for (i = begin, j = seekNext(end); len > i; i++) if (tests[i]) {
                            if (!(len > j && tests[i].test(buffer[j]))) break;
                            buffer[i] = buffer[j], buffer[j] = getPlaceholder(j), j = seekNext(j);
                        }
                        writeBuffer(), input.caret(Math.max(firstNonMaskPos, begin));
                    }
                }
                function shiftR(pos) {
                    var i, c, j, t;
                    for (i = pos, c = getPlaceholder(pos); len > i; i++) if (tests[i]) {
                        if (j = seekNext(i), t = buffer[i], buffer[i] = c, !(len > j && tests[j].test(t))) break;
                        c = t;
                    }
                }
                function writeBuffer(){
                    // set Checkmask
                    input.val(buffer.join(""));
                }
                function clearBuffer(start, end){
                    var i;
                    for (i = start; end > i && len > i; i++) tests[i] && (buffer[i] = getPlaceholder(i));
                }
                function setRule(mask_cell){
                    var define = settings.definitions[mask_cell];
                    rules.push(define ? new RegExp(define) : "");
                }
                function getPatterns(){
                    // get Patterns
                    var define = settings.definitions, mask = settings.mask;

                    return patterns = $.map(mask.split(""), function(str, i){
                            // create regular rule array  and patterns
                            return setRule(str), define[str] ? getPlaceholderIndex(i) : str;
                        });
                }
                function getPatternsForInput(input, index){
                    // get Patterns
                    var define = settings.definitions, patterns = patterns;

                    patterns[seekNext(index)] = input;
                    return  patterns.join("");
                }
                //get placeholder by index
                function getPlaceholderIndex(i){
                    var holder = settings.placeholder;
                    return holder.charAt(i<holder.length ? i : 0);
                }
                // get placeholder
                function getPlaceholder(i) {
                    return settings.placeholder.charAt(i < settings.placeholder.length ? i : 0);
                };
                function checkVal(allow) {
                    var i, c, pos, test = input.val(), lastMatch = -1;
                    for (i = 0, pos = 0; len > i; i++) if (tests[i]) {
                        for (buffer[i] = getPlaceholder(i); pos++ < test.length; ) if (c = test.charAt(pos - 1),
                        tests[i].test(c)) {
                            buffer[i] = c, lastMatch = i;
                            break;
                        }
                        if (pos > test.length) {
                            clearBuffer(i + 1, len);
                            break;
                        }
                    } else buffer[i] === test.charAt(pos) && pos++, partialPosition > i && (lastMatch = i);
                    return allow ? writeBuffer() : partialPosition > lastMatch + 1 ? settings.autoclear || buffer.join("") === defaultBuffer ? (input.val() && input.val(""),
                    clearBuffer(0, len)) : writeBuffer() : (writeBuffer(), input.val(input.val().substring(0, lastMatch + 1))),
                    partialPosition ? i : firstNonMaskPos;
                }

                var input = $(this), buffer = $.map(mask.split(""), function(c, i) {
                    return "?" != c ? defs[c] ? getPlaceholder(i) : c : void 0;
                }), defaultBuffer = buffer.join(""), focusText = input.val();


                //event
            input
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
