/**
 * work.js
 * 
 * Darstellung der "Unsere Arbeiten"-Seite. 
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'app/work',
    'app/menu',
    'text!partials/work/innen-aussen.html',
    'text!partials/work/leistungsspektrum.html',
    'text!partials/work/pressestimmen.html'
], function($, _, Backbone, work, menu, innenAussenPartial, leistungsspektrumPartial, pressestimmenPartial) {

    var IndexView = Backbone.View.extend({
        el: "#page",

        /**
         * Rendert die Seite.
         * 
         * @param  {number} subIndex
         *         der Index der Unterseite. 0: raum.html,
         *         1: aussenbereich.html, 2: leistungsspektrum.html,
         *         3: pressestimmen.html
         * @return {void}
         */
        render: function(subIndex) {
            var self = this;

            var subPages = [innenAussenPartial, innenAussenPartial, leistungsspektrumPartial, pressestimmenPartial];

            menu.init(3, subIndex, function() {
                self.$el.html(subPages[subIndex]);
                if (subIndex == 0) {
                    work.initGallery('1');
                } else if (subIndex == 1) {
                    work.initGallery('2');
                }
            }, function() {
                work.fadeInThumbs();
            });
        }
    });

    return IndexView;
});