/**
 * grid.js
 *
 * Helferfunktionen rund um das Kachelgitter.
 */

define([
	'jquery',
	'bootstrap'
], function($) {

	var Grid = {

		/**
		 * Dimension des Gitters
		 */
		dimension: {
			rows: 5,
			cols: 8
		},

		/**
		 * Prüft ob ein Zeilenidex innerhalb des Gitters liegt.
		 * 
		 * @param {number} row 	Der zu prüfenden Index
		 * @return {bool} 		'true', wenn row innerhalb des Gitters liegt.
		 */
		isValidRow: function(row) {
			return row >= 0 && row < this.dimension.rows;
		},

		/**
		 * Prüft ob ein Spaltenidex innerhalb des Gitters liegt.
		 * 
		 * @param {number} col 	Der zu prüfenden Index
		 * @return {bool} 		'true', wenn col innerhalb des Gitters liegt.
		 */
		isValidCol: function(col) {
			return col >= 0 && col < this.dimension.cols;
		},

		/**
		 * Liefert ein Array aller IDs angrenzender Kacheln für das übergebene
		 * zentrale Kachel.
		 * 
		 * @param {string} menuTileId 	Die ID des zentralen Kachels
		 * @return {array} Array 		aller IDs angrenzender Kacheln
		 */
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

		/**
		 * Liefert ein Array eines Arrays mit 3 IDs für angrenzende Kacheln für
		 * das übergebene zentrale Kachel.
		 * 
		 * @param {string} menuTileId 	Die ID des zentralen Kachels
		 * @return {array} 				Array eines Arrays mit 3 IDs für angrenzende Kacheln
		 */
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

