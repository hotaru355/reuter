require.config({
    paths: {
        jquery: 'libs/jquery/jquery.1.11.1.min',
        underscore: 'libs/underscore/underscore-min',
        backbone: 'libs/backbone/backbone-min',
        bootstrap: 'libs/bootstrap/bootstrap.min',
        modernizr: 'libs/modernizr/modernizr.custom',
        templates: '../html/templates',
        partials: '../html/partials'
    },
    shim: {
        bootstrap: {
            deps: ['jquery']
        },
        modernizr: {
            exports: 'Modernizr'
        }                
    },

});

require([
    'app'
], function(App) {
    App.initialize();
});