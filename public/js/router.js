define([
  'jquery',
  'underscore',
  'backbone',
  'views/index',
  'views/contact',
  'views/values',
  'views/aboutus',
  'bootstrap',
], function($, _, Backbone, IndexView, ContactView, ValuesView, AboutUsView) {

  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'showIndex',
      'unsere-kunden': 'showCustomers',
      'unsere-arbeiten': 'showWork',
      'kontakt': 'showContact',
      'unsere-werte': 'showValues',
      'ueber-uns': 'showAboutUs'
      
      // Default
      // '*actions': 'defaultAction'
    }
  });
  
  var initialize = function(){

    var app_router = new AppRouter;
    
    app_router.on('route:showIndex', function(){
        var indexView = new IndexView();
        indexView.render();
    });
    app_router.on('route:showCustomers', function(){
        var contactView = new ContactView();
        contactView.render();
    });
    app_router.on('route:showWork', function(){
        var contactView = new ContactView();
        contactView.render();
    });
    app_router.on('route:showContact', function(){
        var contactView = new ContactView();
        contactView.render();
    });
    app_router.on('route:showValues', function(){
        var contactView = new ValuesView();
        contactView.render();
    });
    app_router.on('route:showAboutUs', function(){
        var contactView = new AboutUsView();
        contactView.render();
    });

    Backbone.history.start({ 
      //pushState: true
    });
  };
  return { 
    initialize: initialize
  };
});