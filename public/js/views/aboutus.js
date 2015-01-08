define([
    'jquery',
    'underscore',
    'backbone',
    'app/menu',
    'text!/partials/aboutUs/frank-reuter.html',
    'text!/partials/aboutUs/assistenz.html',
    'text!/templates/team.html',
    'text!/partials/aboutUs/chronik.html',
    'text!/partials/aboutUs/partner.html',
    'text!/partials/aboutUs/ohne-uns.html',
    'text!/partials/aboutUs/lebensaufgabe.html',
], function($, _, Backbone, menu, frankReuterPartial, assistenzPartial, teamTemplate, chronikPartial,
        partnerPartial, ohneUnsPartial, lebensaufgabePartial) {
    var employees = [{
        name: 'Karl-Heinz Dumke',
        image: 'Dumke.jpg',
        title: 'Malergeselle',
        bio: 'geboren 1947, verheiratet',
        exp: 48,
        expInHouse: 25,
        specialty: 'Moderne Beschichtungs-systeme, Altbausanierung.',
        favorite: 'Wohnungsrenovierung und Bestandsrestauration im Altbau.'
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
        name: 'Sascha Knippschild',
        image: 'Knippschild_S.jpg',
        title: 'Malergeselle',
        bio: 'geboren 1992, ledig',
        specialty: '… es bleibt spannend.',
        favorite: '… bis jetzt: Streichen! …Tapeten entfernen jedenfalls nicht.'
    }, {
        name: 'Viktor Neubauer',
        image: 'Neubauer.jpg',
        title: 'Malergeselle',
        bio: 'geboren 1970, verheiratet, 2 Kinder',
        exp: 14,
        expInHouse: 4,
        specialty: 'Restaurationen in Putz, WDVS, moderne Anstrichsysteme, Bodenbeläge.',
        favorite: '…alles! - Aber am liebsten an der frischen Luft.'
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
        name: 'Jürgen Schinzel',
        image: 'Schinzel.jpg',
        title: 'Malergeselle',
        bio: 'geboren 1960 , verheiratet, 1 Kind',
        exp: 33,
        expInHouse: 7,
        specialty: 'Moderne Anstrichsysteme und Lackierungen.',
        favorite: 'Fassadenrenovierung am Altbau.'
    }, {
        name: 'Dieter Schmidt',
        image: 'Schmidt.jpg',
        title: 'Malergeselle',
        bio: 'geboren 1960',
        exp: 35,
        specialty: 'Decor-Putzarbeiten, aktuelle Lacktechniken'
    }, {
        name: 'Rafael Szumny',
        image: 'Szumny.jpg',
        title: 'Malergeselle',
        bio: 'geboren 1983, ledig',
        exp: 6,
        expInHouse: 1,
        specialty: 'Bodenbelagsarbeiten, Trockenbau, WDVS, Restauration in Putz, moderne Anstrichsysteme.',
        favorite: 'Großbaustellen.'
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
        name: 'Julian Reh',
        image: 'Reh.jpg',
        title: '2. Ausbildungsjahr zum Maler und Lackierer',
        bio: 'geboren 1992, ledig',
        specialty: '… entwickelt sich konstant.',
        favorite: 'Streichen.'
    }];

    var IndexView = Backbone.View.extend({
        el: "#page",

        render: function(subIndex) {
            var self = this;
            var compiledTeam = _.template(teamTemplate);
            var subPages = [frankReuterPartial, assistenzPartial, compiledTeam({employees: employees}),
                chronikPartial, partnerPartial, ohneUnsPartial, lebensaufgabePartial
            ];

            menu.init(1, subIndex, function() {
                self.$el.html(subPages[subIndex]);
                $('[data-toggle="tooltip"]').tooltip()
            });

        }
    });

    return IndexView;
});