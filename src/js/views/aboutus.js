/**
 * aboutus.js
 * 
 * Darstellung der "Über uns"-Seite. 
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'modernizr',
    'app/menu',
    'text!partials/aboutUs/frank-reuter.html',
    'text!partials/aboutUs/assistenz.html',
    'text!templates/team.html',
    'text!partials/aboutUs/chronik.html',
    'text!partials/aboutUs/partner.html',
    'text!partials/aboutUs/ohne-uns.html',
    'text!partials/aboutUs/lebensaufgabe.html',
], function($, _, Backbone, Modernizr, menu, frankReuterPartial, assistenzPartial, teamTemplate, chronikPartial,
        partnerPartial, ohneUnsPartial, lebensaufgabePartial) {

    // Die Angestellten als JSON zum einfacheren Editieren. Dieses JSON wird
    // an teamTemplate übergeben. In einer dynamischen Anwendung würden diese
    // Daten von einer Datenbank kommen.
    var employees = [{
        name: 'Rafael Szumny',
        image: 'Szumny.jpg',
        title: 'Malergeselle',
        bio: 'geboren 1983, ledig',
        exp: 6,
        expInHouse: 1,
        specialty: 'Bodenbelagsarbeiten, Trockenbau, WDVS, Restauration in Putz, moderne Anstrichsysteme.',
        favorite: 'Großbaustellen.'
    }, {
        name: 'Jürgen Knippschild',
        image: 'Knippschild_J.jpg',
        title: 'Malergeselle',
        bio: 'geboren 1964, verheiratet, 2 Kinder',
        exp: 30,
        expInHouse: 6,
        specialty: 'moderne Gestaltungs-techniken, hochwertigste Tapezierungen und Beschichtungstechniken.',
        favorite: 'Tapezieren und Lackieren.'
    }, {
        name: 'Ralf Obrecht',
        image: 'Obrecht.jpg',
        title: 'Malergeselle',
        bio: 'geboren 1965, ledig, 2 Kinder',
        exp: 28,
        expInHouse: 28,
        specialty: 'Holzwerkstoffe, Lasurtechniken, moderne Gestaltungstechniken, Tapezierungen.',
        favorite: 'Möbelrestaurationen (antik, historisch).'
    }, {
        name: 'Dieter Schmidt',
        image: 'Schmidt.jpg',
        title: 'Malergeselle',
        bio: 'geboren 1960',
        exp: 35,
        specialty: 'Decor-Putzarbeiten, aktuelle Lacktechniken'
    }, {
        name: 'Eckard Unger',
        image: 'Unger.jpg',
        title: 'Malergeselle',
        bio: 'geboren 1950, verheiratet',
        exp: 37,
        expInHouse: 12,
        specialty: 'moderne Gestaltungstechniken, hochwertigste Beschichtungen.',
        favorite: '…einfach streichen und lackieren.'
    }, {
        name: 'Jürgen Schinzel',
        image: 'Schinzel.jpg',
        title: 'Malergeselle',
        bio: 'geboren 1960 , verheiratet, 1 Kind',
        exp: 33,
        expInHouse: 7,
        specialty: 'Moderne Anstrichsysteme und Lackierungen.',
        favorite: 'Fassadenrenovierung am Altbau.'
    }, {
        name: 'Karl-Heinz Dumke',
        image: 'Dumke.jpg',
        title: '„Ehrendoktor“  ;-)',
        bio: 'geboren 1947, verheiratet',
        exp: 48,
        expInHouse: 25,
        specialty: 'Moderne Beschichtungs-systeme, Altbausanierung.',
        favorite: 'Wohnungsrenovierung und Bestandsrestauration im Altbau.'
    }, {
        name: 'Sinan Gezmis',
        image: 'Gezmis.jpg',
        title: '3. Ausbildungsjahr zum Maler und Lackierer',
        bio: 'geboren 1993',
        specialty: '… entwickelt sich konstant gut weiter!',
        future: 'Sehr gutes Potential für die großen Aufgaben eines Malerlebens ;-)!',
        favorite: 'Vliestapeten kleben.'
    }, {
        name: 'Moritz Ehmer',
        image: 'Ehmer.jpg',
        title: '3. Ausbildungsjahr zum Maler und Lackierer',
        bio: 'geboren 1994',
        specialty: '… entwickelt sich konstant gut weiter!',
        future: 'Potential nach ganz weit vorne zu kommen!',
        favorite: 'Streichen und lackieren.'
    }, {
        name: 'Domenic Wilke',
        image: 'Wilke.jpg',
        title: '2. Ausbildungsjahr zum Maler und Lackierer',
        bio: 'geboren 1994',
        specialty: '… entwickelt sich konstant gut weiter!',
        future: 'Erst mal Geselle werden!',
        favorite: 'Streichen und lackieren.'
    }];

    var IndexView = Backbone.View.extend({
        el: "#page",

        /**
         * Rendert die Seite.
         * 
         * @param  {number} subIndex
         *         der Index der Unterseite. 0: frank-reuter.html,
         *         1: assistenz.html, 2: team.html, 3: chronik.html,
         *         4: partner.html, 5: ohne-uns.html, 6: lebensaufgabe.html
         * @return {void}
         */
        render: function(subIndex) {
            var self = this;
            var compiledTeam = _.template(teamTemplate);
            var subPages = [frankReuterPartial, assistenzPartial, compiledTeam({employees: employees}),
                chronikPartial, partnerPartial, ohneUnsPartial, lebensaufgabePartial
            ];
            var percentage, index;
            var numImages = 8;
            var percentileBracket = 100/numImages;

            menu.init(1, subIndex, function() {

                if (subIndex == 4) {
                    $('#page-large').html(partnerPartial);
                } else {
                    // einfach nur die Unterseite einfügen
                    self.$el.html(subPages[subIndex]);
                }

                // nur für die partner.html laden wir die Bootstrap-Tooltips
                if (subIndex == 4) {
                    $('[data-toggle="tooltip"]').tooltip();
                }
            });

        }
    });

    return IndexView;
});