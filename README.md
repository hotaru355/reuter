# Webseite der Malerei Reuter und Sohn

Dies ist eine statische Singe-Page-App. Zum Genrieren der Javascript und CSS-Dateien bitte folgende Schritte durchführen.

  - Installation des Javascript-Optimierungstools [r.js].
  - Zum Generieren des Javascript-Datei folgenden Befehl ausführen 
```sh
$ r.js -o path/to/project/src/js/app.build.js
```
  - Installation des CSS-Compilers [scss].
  - Zum Genrieren der CSS-Datei den folgenden Befehl ausführen
```sh
$ cd /path/to/project
$ sass --cache-location src/scss/.sass-cache --style compressed src/scss/site.scss public/css/site.css"
```

### Werkzeug zum Erstellen der animierten Schrift als `SVG`-Datei
Das Projekt enthält eine Seite unter `public/svgCompiler/index.html` die zur Entwicklung gedacht ist und nicht auf den Server geladen werden sollte. Weitere Instruktionen zum Genrieren der Animation befinden sich auf genannter Seite.

[r.js]:http://requirejs.org/docs/optimization.html
[scss]:http://sass-lang.com/
