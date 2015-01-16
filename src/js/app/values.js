define([
    'jquery',
    'underscore',
    'backbone',
    'app/utils/vectorizer',
    'text!templates/our-values.html',
    'text!partials/animation-0.html',
    'text!partials/animation-1.html',
    'text!partials/animation-2.html'
], function($, _, Backbone, vectorizer, valuesTemplate, animation0Partial, animation1Partial, animation2Partial) {

    var values = {
        renderPage: function() {
            var compiled = _.template(valuesTemplate);
            return compiled({
                svgs: [
                    vectorizer.textToSvg('values-animation-0',
                        'Menschen\tIm Mittelpunkt unseren\n\tHandelns stehen die Menschen\n\tdie uns umgeben.\n\n'
                        + 'Anspruch\tUnser Anspruch ist es, uns an\n\tden Wünschen unserer Kunden zu\n\torientieren und dabei Lebensqualität\n\tzu vermitteln.\n\n'
                        + 'Entwicklung\tDie permanente Weiterentwicklung\n\tist der Krieg gegen die Mittel-\n\tmässigkeit jedes Unternehmens.\n\n',
                        '/images/unsere_werte/unsereWerte1.svg'),
                    vectorizer.textToSvg('values-animation-1',
                        'Tradition\tTradition + Fortschritt = Zukunft\n\n'
                        + 'Antrieb\tDer Antrieb muss aus Überzeugung\n\tvon Innen kommen, sonst geht man\n\trückwärts.\n\n'
                        + 'Chancen\tChancen hat jeder: Sie erkennen und\n\thandeln ist die Kunst.',
                        '/images/unsere_werte/unsereWerte2.svg'),
                    vectorizer.textToSvg('values-animation-2',
                        'Wille\tErfolgreich zu sein, bedeutet den\n\tWillen zu wahren.\n\n'
                        + 'Mut\tMut macht Helden. Auch heute noch!\n\n'
                        + 'Bedeutung\tHarmonie im Einklang mit der\n\tneuen Umgebung ist das Ziel\n\tunserer Arbeit für unsere Kunden.\n\n'
                        + 'Geschichte\tGeschichte ist Erfahrung -\n\tWir haben über 100 Jahre davon.\n\t1901 ___________ heute.',
                        '/images/unsere_werte/unsereWerte3.svg')
                    ]
                });
        },
        bindListeners: function() {
            var animations = [animation0Partial, animation1Partial, animation2Partial];
            var valuesListener = function(index) {
                for (var i = 0; i < 3; i++) {
                    if (i == index) {
                        $('#sheet-' + i).css({
                            opacity: 1
                        });
                        $('#sheet-btn-' + i).addClass('active');
                    } else {
                        $('#sheet-' + i).css({
                            opacity: 0
                        });
                        $('#sheet-btn-' + i).removeClass('active');
                    }
                };
            };
            for (var i = 0; i < 3; i++) {
                (function(index) {
                    $('#sheet-btn-' + index).click(function() {
                        $('#sheet-' + index).html(animations[index]);
                        $('#sheet-' + index)[0].offsetWidth;
                        valuesListener(index);
                        vectorizer.animate('#values-animation-' + index);
                    })
                })(i);
            }
        },
    }

    return values;
});
