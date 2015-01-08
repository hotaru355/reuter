define([
    'jquery',
    'underscore',
    'backbone',
    'app/menu',
    'app/index'
], function($, _, Backbone, menu, index) {

    var IndexView = Backbone.View.extend({
        el: "#page",

        render: function() {
            var self = this;
            menu.init(0, null, function() {
                self.$el.html('');
                index.randomizeMenu('.tile-table');
            });
        }
    });

    return IndexView;
});