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
            index.displayMenu('.tile-table');
            menu.init(0);

        }
    });

    return IndexView;
});