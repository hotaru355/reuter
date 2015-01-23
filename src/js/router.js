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
            '': 'showIndex',
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
            'kontakt': 'showContact',
            'tool': 'showTool',

            // Default
            // '*actions': 'defaultAction'
        }
    });

    var initialize = function() {

        var app_router = new AppRouter;

        app_router.on('route:showIndex', function() {
            var indexView = new IndexView();
            indexView.render();
        });
        app_router.on('route:showCustomers', function() {
            var customerView = new CustomersView();
            customerView.render();
        });
        app_router.on('route:showContact', function() {
            var contactView = new ContactView();
            contactView.render();
        });
        app_router.on('route:showAboutUs', function() {
            var aboutusView = new AboutUsView();
            aboutusView.render(0);
        });
        app_router.on('route:showAssistant', function() {
            var aboutusView = new AboutUsView();
            aboutusView.render(1);
        });
        app_router.on('route:showTeam', function() {
            var aboutusView = new AboutUsView();
            aboutusView.render(2);
        });
        app_router.on('route:showChronicle', function() {
            var aboutusView = new AboutUsView();
            aboutusView.render(3);
        });
        app_router.on('route:showPartner', function() {
            var aboutusView = new AboutUsView();
            aboutusView.render(4);
        });
        app_router.on('route:showWithoutUs', function() {
            var aboutusView = new AboutUsView();
            aboutusView.render(5);
        });
        app_router.on('route:showChallenge', function() {
            var aboutusView = new AboutUsView();
            aboutusView.render(6);
        });
        app_router.on('route:showValues', function() {
            var valuesView = new ValuesView();
            valuesView.render();
        });
        app_router.on('route:showRoom', function() {
            var workView = new WorkView();
            workView.render(0);
        });
        app_router.on('route:showOutdoors', function() {
            var workView = new WorkView();
            workView.render(1);
        });
        app_router.on('route:showPerformance', function() {
            var workView = new WorkView();
            workView.render(2);
        });
        app_router.on('route:showPress', function() {
            var workView = new WorkView();
            workView.render(3);
        });

        // admin tool, not client facing
        app_router.on('route:showTool', function() {
            var valuesView = new ValuesView();
            valuesView.compileSvg();
        });

        Backbone.history.start({
            //pushState: true
        });
    };
    return {
        initialize: initialize
    };
});