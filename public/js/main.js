require.config({
  paths: {
    jquery: 'libs/jquery/jquery.1.11.1.min',
    underscore: 'libs/underscore/underscore-min',
    backbone: 'libs/backbone/backbone-min',
    bootstrap: 'libs/bootstrap/bootstrap.min',
    templates: '../templates'
  },
  shim : {
    "bootstrap" : { "deps" :['jquery'] }
  },

});

require([
  // Load our app module and pass it to our definition function
  'app',

], function(App){
  App.initialize();
});