/**
 * router.js
 * 
 * Hier werden URLs den view-Objekten zugeordnet, welche das Darstellen der
 * der einzelnen Seiten übernehmen.
 */

define([
    'backbone',
    'views/index',
    'views/customers',
    'views/work',
    'views/contact',
    'views/values',
    'views/aboutus',
    'bootstrap',
], function(Backbone, IndexView, CustomersView, WorkView, ContactView, ValuesView, AboutUsView) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            'maler-kassel': 'showIndex',
            'ueber-uns/frank-reuter': 'showAboutUs',
            'ueber-uns/assistenz': 'showAssistant',
            'ueber-uns/team': 'showTeam',
            'ueber-uns/chronik': 'showChronicle',
            'ueber-uns/partner': 'showPartner',
            'ueber-uns/ohne-uns': 'showWithoutUs',
            'ueber-uns/lebensaufgabe': 'showChallenge',
            'unsere-werte': 'showValues',
            'unsere-arbeiten/raum': 'showRoom',
            'unsere-arbeiten/aussenbereich': 'showOutdoors',
            'unsere-arbeiten/leistungsspektrum': 'showPerformance',
            'unsere-arbeiten/pressestimmen': 'showPress',
            'unsere-kunden': 'showCustomers',
            'kontakt/kontakt-impressum': 'showContact',
            'kontakt/sponsoring': 'showSponsoring',
            'kontakt/jobs-gesellen': 'showJobsGesellen',
            'kontakt/jobs-lehre': 'showJobsLehre',

            // Default
            '*ROUTE': 'defaultRoute'
        }
    });

    var initialize = function() {

        var appRouter = new AppRouter;

        appRouter.on('route:showIndex', function() {
            var indexView = new IndexView();
            indexView.render();
        });
        appRouter.on('route:showCustomers', function() {
            var customerView = new CustomersView();
            customerView.render();
        });
        appRouter.on('route:showContact', function() {
            var contactView = new ContactView();
            contactView.render(0);
        });
        appRouter.on('route:showSponsoring', function() {
            var contactView = new ContactView();
            contactView.render(1);
        });
        appRouter.on('route:showJobsGesellen', function() {
            var contactView = new ContactView();
            contactView.render(2);
        });
        appRouter.on('route:showJobsLehre', function() {
            var contactView = new ContactView();
            contactView.render(3);
        });
        appRouter.on('route:showAboutUs', function() {
            var aboutusView = new AboutUsView();
            aboutusView.render(0);
        });
        appRouter.on('route:showAssistant', function() {
            var aboutusView = new AboutUsView();
            aboutusView.render(1);
        });
        appRouter.on('route:showTeam', function() {
            var aboutusView = new AboutUsView();
            aboutusView.render(2);
        });
        appRouter.on('route:showChronicle', function() {
            var aboutusView = new AboutUsView();
            aboutusView.render(3);
        });
        appRouter.on('route:showPartner', function() {
            var aboutusView = new AboutUsView();
            aboutusView.render(4);
        });
        appRouter.on('route:showWithoutUs', function() {
            var aboutusView = new AboutUsView();
            aboutusView.render(5);
        });
        appRouter.on('route:showChallenge', function() {
            var aboutusView = new AboutUsView();
            aboutusView.render(6);
        });
        appRouter.on('route:showValues', function() {
            var valuesView = new ValuesView();
            valuesView.render();
        });
        appRouter.on('route:showRoom', function() {
            var workView = new WorkView();
            workView.render(0);
        });
        appRouter.on('route:showOutdoors', function() {
            var workView = new WorkView();
            workView.render(1);
        });
        appRouter.on('route:showPerformance', function() {
            var workView = new WorkView();
            workView.render(2);
        });
        appRouter.on('route:showPress', function() {
            var workView = new WorkView();
            workView.render(3);
        });

        appRouter.on('route:defaultRoute', function(path) {
            this.navigate('#/maler-kassel', {trigger: true});
        });

        Backbone.history.start({
            //pushState: true
        });
    };
    return {
        initialize: initialize
    };
});