/**
 * app.js
 * 
 * Die Initialisierung der Anwendung die das Routen und das Menü vorbereiten.
 */

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