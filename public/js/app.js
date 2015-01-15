define([
    'router',
    'app/menu',
], function(Router, menu) {
    var App = {
        initialize: function() {
            Router.initialize();
            menu.bindControls();
        }
    }

    return App;
});