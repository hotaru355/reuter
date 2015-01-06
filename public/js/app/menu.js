define([
	'jquery',
	'bootstrap'
], function($) {

	var navItems = ['start','aboutus','values','work','customers','contact'];

	var selector = {
		tileTable: '.tile-table',
		tileRow: '.tile-row',
		tile: '.tile',
		navRow: '.nav-row',
		navTile: '.nav-tile'
	}

	var fadeInOut = function(isIn) {
		var tiles = $('.blind');
		tiles.each(function() {
			$(this).css({
				'transition-delay': +Math.random().toFixed(2) * 1 + 1 +'s',
				'transition-duration': '0.5s',
				opacity: isIn ? 0 : 1,
				transform: isIn ? 'rotateY(90deg)' : 'rotateY(0deg)'
			});
		});
	};
	var highlightNav = function(navIndex) {
			var navs = $(selector.navRow + ' > .tile-cell');
			navs.each(function(index) {
				if (navIndex == 0) {
					if (index > 0) {
						$(this).addClass('nav-disabled');
					}
				} else {
					$(this).removeClass('nav-disabled');
					if (navIndex == index) {
						$(this).addClass('selected');
					} else {
						$(this).removeClass('selected');
					}
				}
			});
		};
	var setBackground = function(navIndex){
			$(selector.tileTable).css({
				'background-image': 'url("/images/hintergrund/background-' + navItems[navIndex] + '.jpg")'
			})
		};

	var addContentTiles = function() {
		var startFrom = [2,3,3,3,5];
		var rows = $(selector.tileRow);
		rows.each(function(rowIndex) {
			$(this).find('.tile').each(function(colIndex) {
				if (colIndex >= startFrom[rowIndex]) {
					$(this).addClass('content-tile');
				}
			});
		});
	};
	var removeContentTiles = function() {
		var rows = $(selector.tileRow);
		rows.each(function(rowIndex) {
			$(this).find('.tile').each(function(colIndex) {
				$(this).removeClass('content-tile');
			});
		});
	};
	var getIndex = function() {
		var navs = $(selector.navRow + ' > .tile-cell');
		var index = 0;
		navs.each(function(tmpIndex) {
			if ($(this).hasClass('selected')) {
				index = tmpIndex;
			}
		});
		return index;
	};
	var Menu = {
		init: function(navIndex) {
			var lastNavIndex = getIndex();
			if (navIndex != lastNavIndex) {
				fadeInOut(false);
				setTimeout(function() {
					highlightNav(navIndex);
					setBackground(navIndex);
					if (navIndex == 0 && lastNavIndex != 0) {
						removeContentTiles();
					}
					if (navIndex != 0 && lastNavIndex == 0) {
						addContentTiles();
					}
					fadeInOut(true);
					
				}, 2000);
			}
		},
	};

	return Menu;
});
