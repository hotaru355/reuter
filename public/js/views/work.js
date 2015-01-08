define([
    'jquery',
    'underscore',
    'backbone',
    'app/menu',
    'text!/partials/work/innen-aussen.html',
    'text!/partials/work/leistungsspektrum.html',
    'text!/partials/work/pressestimmen.html'
], function($, _, Backbone, menu, innenAussenPartial, leistungsspektrumPartial, pressestimmenPartial) {

    var IndexView = Backbone.View.extend({
        el: "#page",

        render: function(subIndex) {
            var self = this;

            var subPages = [innenAussenPartial, innenAussenPartial, leistungsspektrumPartial, pressestimmenPartial
            ];

            menu.init(3, subIndex, function() {
                self.$el.html(subPages[subIndex]);
            });
        }
    });

    return IndexView;
});