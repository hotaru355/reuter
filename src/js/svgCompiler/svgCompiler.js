/**
 * svgCompiler.js
 *
 * Ein Werkzeug zum Erstellen der animierten Schrift als SVG-Dateien. Für
 * Anweisungen siehe public/svgCompiler/index.html.
 */

require.config({
    paths: {
        jquery: '../libs/jquery/jquery.1.11.1.min',
        underscore: '../libs/underscore/underscore-min',
        snap: '../libs/snap/snap.svg-min',
    },
});

require([
    'vectorizer',
], function(vectorizer) {
    var svgs = [
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
    ];

    var compiler = {
        /**
         * Setzt die href für die Links in der Seite.
         */
        setHrefs: function() {
            $(document).ready(function() {
                var content, encodedUri;

                for (var i = 0; i < 3; i++) {
                    content = 'data:text/csv;charset=utf-8,' + svgs[i];
                    encodedUri = encodeURI(content);
                    $('#animation-' + i).attr('href', encodedUri);
                };

                $('#svg-export').get(0).addEventListener('load', function() {
                    var content = 'data:text/csv;charset=utf-8,' + JSON.stringify(vectorizer.pathToJson());
                    var encodedUri = encodeURI(content);
                    $('#path-json').attr('href', encodedUri);

                    $('#get-line-height').click(function() {
                        $('#line-height').html(vectorizer.getLineHeight());
                    })

                    $('#svg-export').hide();
                });
            });
        }
    }

    compiler.setHrefs();
});