define([
	'jquery',
	'app/utils/grid',
	'bootstrap',
], function($, Grid) {

	var Index = {
		fadeInOut: function(isIn) {
			var tiles = $('.tile-container > div' + Grid.getExcludeTileSelector());
			tiles.addClass('greyed');
			$('.tile-container')[0].offsetHeight;
			tiles.each(function() {
				$(this).css({
					'transition-delay': +Math.random().toFixed(2) * 2 + 's',
					'transition-duration': '0.5s'
				});
			});
			setTimeout(function() {
				tiles.removeClass('greyed');
			}, 1000);
			setTimeout(function() {
				tiles.each(function() {
					$(this).css({
						'transition-delay': '',
						'transition-duration': ''
					});
				});
			}, 3000);
			tiles.each(function() {
				//	$(this).css({'transition' : 'none'})
			})

		},

		fadeInOut2: function(isIn) {
			var tiles = $('.blind');
			tiles.each(function() {
				$(this).css({
					'transition-delay': +Math.random().toFixed(2) * 1 + 1 +'s',
					'transition-duration': '0.5s',
					opacity: 0,
					transform: 'rotateY(90deg)'
				});
			});
		},

		displayMenu: function(onDone) {
			var menuTiles = [{
				className: 'customers',
				label: 'Unsere Kunden',
				url: 'kunden',
			}, {
				className: 'work',
				label: 'Unsere Arbeit',
				url: 'unsere-arbeit'
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
				url: 'ueber-uns'
			}];
			var container = $('.tile-container');

			var dim = Grid.getDimension();
			var availableTileIds = [];
			for (var row = 0; row < dim.rows; row++) {
				for (var col = 0; col < dim.cols; col++) {
					availableTileIds.push('tile-' + row + '-' + col);
				}
			}

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
					.append('<a href="#/' + menu.url + '"><div>' + menu.label + '</div></a>')
					.hover(function() {
						$('#' + hoverIds.join(',#')).addClass('hover-' + menu.className);
					}, function() {
						$('#' + hoverIds.join(',#')).removeClass('hover-' + menu.className);
					});

				// remove corner tiles from availble
				Grid.getCornerTilesUnique(menuId).forEach(function(cornerId) {
					var aIdx = availableTileIds.indexOf(cornerId);
					if (aIdx != -1) {
						availableTileIds.splice(aIdx, 1);
					}
				});
			});

			onDone.apply();
		}
	};

	return Index;
});