/**
 * contact.js
 * 
 * Darstellung der "Unsere Kunden"-Seite. 
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'app/menu',
    'text!templates/customers.html'
], function($, _, Backbone, menu, customersTemplate) {

    // Die Kunden als JSON zum einfacheren Editieren. Dieses JSON wird
    // an customersTemplate übergeben. In einer dynamischen Anwendung würden diese
    // Daten von einer Datenbank kommen.
    var customers = [{
        name: 'Stadt Kassel',
        job: 'Museum Fridericianum',
        imgUrls: ['1.jpg'],
        alt: 'Museum Fridericianum Stadt Kassel',
    }, {
        name: 'Gemeinnützige Wohnungsbaugesellschaft Hessen GWH',
        job: 'Fassadensanierung',
        imgUrls: ['2.jpg'],
        alt: 'Gemeinnützige Wohnungsbaugesellschaft Hessen GWH',
    },{
        name: 'Kasseler Sparkasse, Filiale im DEZ',
        imgUrls: ['3.jpg'],
        alt: 'Kasseler Sparkasse',
    },{
        name: 'Anthrosophisches Zentrum',
        job: 'Fassade, großer Saal, alle Innenräume',
        imgUrls: ['4.jpg'],
        alt: 'Anthrosophisches Zentrum',
    },{
        name: 'Privat',
        job: 'Flurbereich',
        imgUrls: ['5.jpg'],
        alt: 'Flurbereich, Privat',
    },{
        name: 'Privat',
        job: 'Fassadensanierung, Landgraf-Karl-Str.',
        imgUrls: ['6.jpg'],
        alt: 'Fassadensanierung, Privat',
    },{
        name: 'Gemeinnützige Wohnungsbaugesellschaft Hessen GWH',
        job: 'Fassadenimprägnierung und -lasur',
        imgUrls: ['7.jpg'],
        alt: 'Gemeinnützige Wohnungsbaugesellschaft Hessen GWH',
    },{
        name: 'Reuter &amp; Sohn, Kassel',
        job: 'Bürogestaltung und Komplettrenovierung',
        imgUrls: ['8a.jpg', '8a.jpg'],
        alt: 'Reuter &amp; Sohn, Kassel',
    },{
        name: 'Privat',
        job: 'Wärmedämmung WDVS',
        imgUrls: ['9.jpg'],
        alt: 'Wärmedämmung WDVS, Privat',
    },{
        name: 'Universität Kassel, AVZ',
        job: 'Kunst am Objekt',
        imgUrls: ['10a.jpg', '10b.jpg'],
        alt: 'Universität Kassel, AVZ',
    }];

    var IndexView = Backbone.View.extend({
        el: "#page",

        render: function() {
            var self = this;
            var compiled = _.template(customersTemplate);

            menu.init(4, null, function() {
                self.$el.html(compiled({
                    customers: customers
                }));
            });
        }
    });

    return IndexView;
});