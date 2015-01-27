define([
    'jquery',
    'underscore',
    'backbone',
    'app/menu',
    'app/values',
    'text!templates/our-values.html'
], function($, _, Backbone, menu, values, valuesTemplate) {

    var IndexView = Backbone.View.extend({
        el: "#page",

        render: function() {
            var self = this;
            var compiled = _.template(valuesTemplate);

            menu.init(2, null, function() {
                self.$el.html(compiled({}));
                values.bindListeners();
            }, function() {
                $('#sheet-btn-0').click();
            });
        },
    });

    return IndexView;
});