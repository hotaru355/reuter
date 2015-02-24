/**
 * contact.js
 * 
 * Darstellung der "Kontakt"-Seite. 
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'app/menu',
    'text!partials/contact/contact.html',
    'text!partials/contact/sponsoring.html',
    'text!partials/contact/jobs.html'
], function($, _, Backbone, menu, contactPartial, sponsoringPartial, jobsPartial) {

    var ContactView = Backbone.View.extend({
        el: "#page",

        render: function(subIndex) {
            var self = this;

            var subPages = [contactPartial, sponsoringPartial, jobsPartial];

            menu.init(5, subIndex, function() {
                self.$el.html(subPages[subIndex]);
            });
        }
    });

    return ContactView;
});