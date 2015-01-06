define([
    'jquery',
    'underscore',
    'backbone',
    'app/menu',
    'app/values'
], function($, _, Backbone, menu, values) {

    var IndexView = Backbone.View.extend({
        el: "#page",

        render: function() {
            this.$el.html(values.renderPage());
            values.bindListeners();

            menu.init(1);
            // var compiled = _.template(template);

            // this.$el.html(compiled({}));

        }
    });

    return IndexView;
});