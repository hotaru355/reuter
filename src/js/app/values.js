define([
    'jquery',
    'underscore',
    'backbone',
    'text!partials/animation-0.html',
    'text!partials/animation-1.html',
    'text!partials/animation-2.html'
], function($, _, Backbone, animation0Partial, animation1Partial, animation2Partial) {

    var values = {
        bindListeners: function() {
            var animations = [animation0Partial, animation1Partial, animation2Partial];
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
                    $('#sheet-btn-' + index).click(function() {
                        $('#sheet-' + index).html(animations[index]);
                        $('#sheet-' + index)[0].offsetWidth;
                        valuesListener(index);
                        $('#values-animation-' + index).find('path').attr('stroke-dashoffset', 0);
                    })
                })(i);
            }
        },
    }

    return values;
});
