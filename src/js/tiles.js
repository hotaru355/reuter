(function () {
	var mediaSizes = ['xs','sm','md','lg'];

	function fadeTiles(transparent) {
		if (transparent) {
			$('.tile-container > div').addClass('transparent');
		} else {
			$('.tile-container > div').removeClass('transparent');
		}
	}

	function getMediaSize() {
		var containerWidth = window.innerWidth;
		switch (true) {
			case containerWidth >= 1200:
				return 'lg';
			case containerWidth < 1200 && containerWidth >= 992:
				return 'md';
			case containerWidth < 992 && containerWidth >= 768:
				return 'sm';
			case containerWidth < 768 && containerWidth >= 480:
				return 'xs';
		}
	}

	function getExcludeSelector(mediaSize) {
		var excludedSelector = '';
		var excludedSizes = mediaSizes.slice(mediaSizes.indexOf(mediaSize) + 1);
		if (excludedSizes.length) {
			excludedSelector = ':not(' + excludedSizes.map(function(size) {
				return '.show-' + size;
			}).join(',') + ')';
		}
		return excludedSelector;
	}

	function getGridDimension(mediaSize) {
		switch (mediaSize) {
			case 'lg' :
				return {
					rows: 6,
					cols: 10
				};
			case 'md' :
				return {
					rows: 5,
					cols: 8
				};
			case 'sm' :
				return {
					rows: 4,
					cols: 6
				};
			case 'xs' :
				return {
					rows: 4,
					cols: 6
				};
		}
	}

	function getCornerTiles(menuTile, gridDimensions) {
		var idParts = menuTile.attr('id').split('-');
		var row = parseInt(idParts[1]);
		var col = parseInt(idParts[2]);
		var corners = [];
		[-1,1].forEach(function(rowPrefix) {
			[-1,1].forEach(function(colPrefix) {
				if ((row + rowPrefix >= 0) && (row + rowPrefix <= gridDimensions.rows)
					&& (col + colPrefix >= 0) && (col + colPrefix <= gridDimensions.cols)) {
					corners.push([
						'#tile-' + (row + rowPrefix) + '-' + col,
						'#tile-' + (row + rowPrefix) + '-' + (col + colPrefix),
						'#tile-' + row + '-' + (col + colPrefix)
					]);
				}
			})
		})

		return corners;
	}

	function removeNeighborTiles(menuTile, tiles) {

	}

	function fixMenuTiles(mediaSize) {
		var menuClasses = ['tile-customers', 'tile-work', 'tile-contact', 'tile-values', 'tile-about-us'];
		var tiles = $('.tile-container > div' + getExcludeSelector(mediaSize));
		var availableTiles = tiles.slice(0);
		var stashedTiles = [];
		
		menuClasses.forEach(function(menuClass) {
			var index = Math.floor(Math.random() * tiles.length);
			var menuTile = $(tiles.splice(index, 1));
			var cornerTiles = getCornerTiles(menuTile, getGridDimension(mediaSize));
			var hoverTiles = cornerTiles[Math.floor(Math.random() * cornerTiles.length)];

			cornerTiles.forEach(function(corner) {
				corner.forEach(function(cornerTile) {
					tiles.reduce(function(tileSearched) {
						tileSearched.id == 
					})
					stashedTiles.push(tiles.splice(tiles.indexOf()))
				})
			})


			stashedTiles = stashedTiles.concat(removeNeighborTiles(menuTile, tiles));

			menuTile.addClass(menuClass);
			var bgColor = menuTile.css('background-color');
			menuTile.hover(function() {
				hoverTiles.forEach(function(hoverTile, index) {
					$(hoverTile).css({
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

	$(function() {
		// fadeTiles(true);
		var mediaSize = getMediaSize();
		fixMenuTiles(mediaSize);
	});
})();