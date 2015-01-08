define([
    'jquery',
    'underscore',
    'backbone',
    'app/menu',
    'text!/partials/customers.html'
], function($, _, Backbone, menu, customersPartial) {

    var IndexView = Backbone.View.extend({
        el: "#page",

        render: function() {
            var self = this;

            menu.init(4, null, function() {
                self.$el.html(customersPartial);
            });
        }
    });

    return IndexView;
});