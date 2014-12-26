define([
    'jquery',
    'underscore',
    'backbone',
    'app/utils/vectorizer',
    'text!/templates/values.html'
], function($, _, Backbone, vectorizer, template) {

    var IndexView = Backbone.View.extend({
        el: "#page",

        render: function() {
            this.$el.html(vectorizer.toSvg('mut', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'));
            setTimeout(function() {
                vectorizer.animate('#mut');
                
            }, 1000);
            // var compiled = _.template(template);

            // this.$el.html(compiled({}));

        }
    });

    return IndexView;
});