define([
	'jquery',
	'app/utils/responsive',
	'bootstrap'
], function($, Responsive) {

	var Grid = {
		getExcludeTileSelector: function() {
			var mediaSize = Responsive.getMediaSize();

			var excludedSelector = '';
			var excludedSizes = Responsive.mediaSizes.slice(Responsive.mediaSizes.indexOf(mediaSize) + 1);
			if (excludedSizes.length) {
				excludedSelector = ':not(' + excludedSizes.map(function(size) {
					return '.show-' + size;
				}).join(',') + ')';
			}
			return excludedSelector;
		},

		getDimension: function() {
			var mediaSize = Responsive.getMediaSize();
				switch (mediaSize) {
				case 'lg':
					return {
						rows: 6,
						cols: 10
					};
				case 'md':
					return {
						rows: 5,
						cols: 8
					};
				case 'sm':
					return {
						rows: 4,
						cols: 6
					};
				case 'xs':
					return {
						rows: 4,
						cols: 6
					};
			}
		},

		getCornerTiles: function(menuTile, gridDimensions) {
			var idParts = menuTile.attr('id').split('-');
			var row = parseInt(idParts[1]);
			var col = parseInt(idParts[2]);
			var corners = [];
			[-1, 1].forEach(function(rowPrefix) {
				[-1, 1].forEach(function(colPrefix) {
					if ((row + rowPrefix >= 0)
						&& (row + rowPrefix <= gridDimensions.rows)
						&& (col + colPrefix >= 0)
						&& (col + colPrefix <= gridDimensions.cols)) {
						corners.push(
							'tile-' + (row + rowPrefix) + '-' + col,
							'tile-' + (row + rowPrefix) + '-' + (col + colPrefix),
							'tile-' + row + '-' + (col + colPrefix)
						);
					}
				})
			})
			return corners;
		}
	};

	return Grid;

});

