/**
 * values.js
 *
 * Funktionalität der "Unsere Werte"-Seite.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!partials/animation-0.html',
    'text!partials/animation-1.html',
    'text!partials/animation-2.html'
], function($, _, Backbone, animation0Partial, animation1Partial, animation2Partial) {

    var values = {

        /**
         * Ordnet Knöpfen Funktionalität zu.
         */
        bindListeners: function() {
            var animations = [animation0Partial, animation1Partial, animation2Partial];
            var timeoutId = 0;
            var valuesListener = function(index) {
                for (var i = 0; i < 3; i++) {
                    if (i == index) {
                        $('#sheet-' + i).css({
                            opacity: 1
                        });
                        $('#sheet-btn-' + i).addClass('active');
                    } else {
                        $('#sheet-' + i).css({
                            opacity: 0
                        });
                        $('#sheet-btn-' + i).removeClass('active');
                    }
                };
            };
            for (var i = 0; i < 3; i++) {
                (function(index) {
                    // Klick-Handler für Knöpfe um Animation zu starten
                    $('#sheet-btn-' + index).click(function() {
                        $('#sheet-' + index).html(animations[index]);
                        $('#sheet-' + index)[0].offsetWidth; // Trick um die Änderungen zu flushen
                        valuesListener(index);
                        $('#values-animation-' + index).find('path').attr('stroke-dashoffset', 0);
                        
                        // automatisches Weiterblättern
                        clearTimeout(timeoutId);
                        if (index < 2) {
                            // ermittel Zeit aus der Verzögerung des letzten Buchstabens
                            var autoTimeoutSecs = Math.ceil(parseFloat($('#sheet-' + index + ' path:last-child').css('transition-delay')));
                            timeoutId = setTimeout(function() {
                                $('#sheet-btn-' + (index + 1)).click();
                            }, autoTimeoutSecs * 1000);
                        }
                    })

                })(i);
            }
        },
    }

    return values;
});
