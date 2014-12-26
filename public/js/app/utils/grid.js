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

		isValidRow: function(row) {
			return row >= 0 && row < this.getDimension().rows;
		},

		isValidCol: function(col) {
			return col >= 0 && col < this.getDimension().cols;
		},

		getCornerTilesUnique: function(menuTileId) {
			var idParts = menuTileId.split('-');
			var row = parseInt(idParts[1]);
			var col = parseInt(idParts[2]);
			var corners = [];
			var rowInc, colInc, flip;
			var self = this;
			[1, -1].forEach(function(colPrefix) {
				[-1 * colPrefix, 1 * colPrefix].forEach(function(rowPrefix) {
					flip = (colPrefix * rowPrefix == -1);
					rowInc = row + (flip ? rowPrefix : 0);
					colInc = col + (!flip ? colPrefix : 0);
					if (self.isValidRow(rowInc) && self.isValidCol(colInc)) {
						corners.push('tile-' + rowInc + '-' + colInc);
					}
					rowInc = row + rowPrefix;
					colInc = col + colPrefix;
					if (self.isValidRow(rowInc) && self.isValidCol(colInc)) {
						corners.push('tile-' + rowInc + '-' + colInc);
					}
				})
			})

			return corners;
		},

		getCornerTiles: function(menuTileId) {
			var idParts = menuTileId.split('-');
			var row = parseInt(idParts[1]);
			var col = parseInt(idParts[2]);
			var corners = [];
			var rowInc, colInc, flip;
			var self = this;
			[1, -1].forEach(function(colPrefix) {
				[1, -1].forEach(function(rowPrefix) {
					if (self.isValidRow(row + rowPrefix) && self.isValidCol(col + colPrefix)) {
						corners.push([
							'tile-' + row + '-' + (col + colPrefix),
							'tile-' + (row + rowPrefix) + '-' + (col + colPrefix),
							'tile-' + (row + rowPrefix) + '-' + col,
						]);
					}
				})
			})

			return corners;
		}
	};

	return Grid;

});

