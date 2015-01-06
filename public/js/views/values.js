define([
    'jquery',
    'underscore',
    'backbone',
    'app/menu',
    'app/values',
    'text!/templates/our-values.html'
], function($, _, Backbone, menu, values, valuesTemplate) {

    var IndexView = Backbone.View.extend({
        el: "#page",

        render: function() {
            var compiled = _.template(valuesTemplate);
            this.$el.html(compiled({}));

            values.bindListeners();

            menu.init(2);
            // this.$el.html(vectorizer.toSvg('mut', 'aaääbbccddeeffgghhiijjkkllmmnnooööppqqrrssttuuüü/nvvwwxxyyzz11223344556677889900..,,!!??/n'
            //     + 'AAÄÄBBCCDDEEFFGGHHIIJJKKLLMMNNOOÖÖPPQQ/nRRSSTTUUÜÜVVWWXXYYZZ'));
            setTimeout(function() {
                $('#sheet-btn-0').click();
            }, 2000);
            // var compiled = _.template(template);

            // this.$el.html(compiled({}));

        }
    });

    return IndexView;
});