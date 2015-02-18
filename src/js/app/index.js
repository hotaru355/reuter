/**
 * index.js
 *
 * Generiert ein zufälliges Startseitenmenü.
 */

define([
	'jquery',
	'app/utils/grid',
], function($, Grid) {

	var Index = {

		/**
		 * Generiert das Startseitenmenü mit folgenden Eigenschaften:
		 *
		 * - Die Menülinks erscheinen bei jedem Ausführen der Funktion an
		 * zuälliger Stelle.
		 *
		 * - Jeder Link definiert per CSS 3 angrenzende Kacheln, deren
		 * Hintergrund bei :hover sich mit ändert. Diese können sich für 2 Links
		 * überlappen. Auch Links auf Rand- und Eckkacheln haben immer 3
		 * hover-Kacheln.
		 *
		 * - Links sind nie benachbart, sodass die angrenzenden hover-Kacheln
		 * nicht einen Link überlagern.
		 * 
		 * @param {string} containerSelector Der CSS-Selektor welcher das
		 * Element mit allen Kacheln beschreibt.
		 * @return {void}
		 */
		randomizeMenu : function(containerSelector) {
			var menuTiles = [{
				className: 'customers',
				label: 'Unsere Kunden',
				url: 'unsere-kunden',
			}, {
				className: 'work',
				label: 'Unsere Arbeiten',
				url: 'unsere-arbeiten/raum'
			}, {
				className: 'contact',
				label: 'Kontakt',
				url: 'kontakt/kontakt-impressum'
			}, {
				className: 'values',
				label: 'Unsere Werte',
				url: 'unsere-werte'
			}, {
				className: 'aboutus',
				label: 'Über uns',
				url: 'ueber-uns/frank-reuter'
			}];
			var container = $(containerSelector);

			// zuerst erstellen wir alle IDs für alle Kacheln
			var availableTileIds = [];
			for (var row = 0; row < 5; row++) {
				for (var col = 0; col < 8; col++) {
					availableTileIds.push('tile-' + row + '-' + col);
				}
			}

			// dann wählen wir für jeden Menülink eine ID sowie 3 IDs für die
			// hover-Kacheln und entfernen sie von den verfügbaren IDs
			menuTiles.forEach(function(menu) {
				var randIndex = Math.floor(Math.random() * availableTileIds.length);
				// entferne die Menülink-ID von den verfügbaren IDs
				var menuId = availableTileIds.splice(randIndex, 1)[0];
				var cornerIds = Grid.getCornerTiles(menuId);
				var hoverIds = cornerIds[Math.floor(Math.random() * cornerIds.length)];

				hoverIds.forEach(function(hoverId, index) {
					container.find('#' + hoverId)
						.addClass('tile-' + menu.className + '-hover-' + index)
				});
				container.find('#' + menuId)
					.addClass('tile-' + menu.className)
					.append('<a class="start-link" href="#/' + menu.url + '">' + menu.label + '</a>')
					.hover(function() {
						$('#' + hoverIds.join(',#')).addClass('hover-' + menu.className);
					}, function() {
						$('#' + hoverIds.join(',#')).removeClass('hover-' + menu.className);
					})

				// entferne die hover-Kacheln von den verfügbaren IDs
				Grid.getCornerTilesUnique(menuId).forEach(function(cornerId) {
					var aIdx = availableTileIds.indexOf(cornerId);
					if (aIdx != -1) {
						availableTileIds.splice(aIdx, 1);
					}
				});
			});
		}
	};

	return Index;
});