define([
  'jquery',
  'underscore',
  'backbone',
  'views/contact',
  'bootstrap',
], function($, _, Backbone, ContactView) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      'kontakt': 'showContact'
      
      // Default
      // '*actions': 'defaultAction'
    }
  });
  
  var initialize = function(){

    var app_router = new AppRouter;
    
    app_router.on('route:showContact', function(){
   
        var contactView = new ContactView();
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