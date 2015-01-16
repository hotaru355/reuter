define([
	'jquery',
	'bootstrap'
], function($) {

	var Grid = {
		dimension: {
			rows: 5,
			cols: 8
		},

		isValidRow: function(row) {
			return row >= 0 && row < this.dimension.rows;
		},

		isValidCol: function(col) {
			return col >= 0 && col < this.dimension.cols;
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

