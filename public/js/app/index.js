define([
	'jquery',
	'app/utils/grid',
	'bootstrap',
], function($, Grid) {

	var Index = {
		displayMenu: function() {

			var menuClasses = ['tile-customers', 'tile-work', 'tile-contact', 'tile-values', 'tile-about-us'];
			var tiles = $('.tile-container > div' + Grid.getExcludeTileSelector());
			var availableTiles = tiles.toArray().map(function(tile) {
				return tile.id;
			});
			var stashedTiles = [];

			menuClasses.forEach(function(menuClass) {
				var index = Math.floor(Math.random() * availableTiles.length);
				var menuTile = $(tiles.splice(index, 1));
				var cornerTiles = Grid.getCornerTiles(menuTile, Grid.getDimension());
				var hoverTiles = cornerTiles.slice(Math.floor(Math.random() * cornerTiles.length/3) * 3, 3);

				// remove corner tiles from availble
				availableTiles.forEach(function(avail, availIndex) {
					cornerTiles.forEach(function(corner, cornerIndex) {
						if (avail == corner) {
							availableTiles.splice(availIndex, 1);
							cornerTiles.splice(cornerIndex, 1);
						}
					})
				})

				menuTile.addClass(menuClass);
				var bgColor = menuTile.css('background-color');
				menuTile.hover(function() {
					hoverTiles.forEach(function(hoverTile, index) {
						$('#' + hoverTile).css({
							'background-color': bgColor,
							'transition-delay': (index * 0.1) + 's',
							'transition-duration': '0s'
						});
					});
				}).mouseout(function() {
					hoverTiles.forEach(function(hoverTile, index) {
						$(hoverTile).css({
							'background-color': 'rgba(0,0,0,0.0)'
						});
					});
				});
			});
			tiles.addClass('transparent');
		}
	};

	return Index;
});