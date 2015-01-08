define([
    'jquery',
    'underscore',
    'backbone',
    'app/menu',
    'text!/partials/contact.html'
], function($, _, Backbone, menu, contactPartial) {

    var ContactView = Backbone.View.extend({
        el: "#page",

        render: function() {
            var self = this;

            menu.init(5, null, function() {
                self.$el.html(contactPartial);
            });
        }
    });

    return ContactView;
});