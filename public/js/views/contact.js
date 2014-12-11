define([
    'jquery',
    'underscore',
    'backbone',
    'app/index'
], function($, _, Backbone, Index) {

    var ContactView = Backbone.View.extend({
        el: "#page",
        render: function() {
            $('.menu li').removeClass('active');
            $('.menu li a[href="' + window.location.hash + '"]').parent().addClass('active');
            //this.$el.html(gridTemplate);

            Index.displayMenu();


        }
    });

    return ContactView;
});