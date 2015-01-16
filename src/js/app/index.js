define([
	'jquery',
	'app/utils/grid',
], function($, Grid) {

	var Index = {
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
				url: 'kontakt'
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

			// generate all ids first
			var availableTileIds = [];
			for (var row = 0; row < 5; row++) {
				for (var col = 0; col < 8; col++) {
					availableTileIds.push('tile-' + row + '-' + col);
				}
			}

			// randomly place menu tiles
			menuTiles.forEach(function(menu) {
				var randIndex = Math.floor(Math.random() * availableTileIds.length);
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

				// remove corner tiles from availble
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