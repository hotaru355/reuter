define([
	'jquery'
], function($) {

	var navItems = ['start','aboutus','values','work','customers','contact'];
	var imagesByNavIndex = [
		['background-start.jpg'],
		['background-aboutus.jpg', 'background-aboutus.jpg', 'background-aboutus.jpg',
			'background-aboutus.jpg', 'background-aboutus.jpg', 'background-aboutus.jpg',
			'background-aboutus.jpg'],
		['background-values.jpg'],
		[null, null, 'background-spectrum.jpg', 'background-press.jpg'],
		['background-customers.jpg'],
		['background-contact.jpg'],
	];

	var submenu = {
	 	aboutus: [{
			label: 'Frank Reuter',
			url: 'ueber-uns/frank-reuter',
		}, {
			label: 'Assistenz',
			url: 'ueber-uns/assistenz',
		}, {
			label: 'Das Team',
			url: 'ueber-uns/team',
		}, {
			label: 'Chronik',
			url: 'ueber-uns/chronik',
		}, {
			label: 'Partner',
			url: 'ueber-uns/partner',
		}, {
			label: 'ohne uns',
			url: 'ueber-uns/ohne-uns',
		}, {
			label: 'Lebensaufgabe',
			url: 'ueber-uns/lebensaufgabe',
		}],
		work: [{
			label: 'Farbe im Raum',
			url: 'unsere-arbeiten/raum',
		}, {
			label: 'Farbe im Aussenbereich',
			url: 'unsere-arbeiten/aussenbereich',
		}, {
			label: 'Leistuns- spektrum',
			url: 'unsere-arbeiten/leistungsspektrum',
		}, {
			label: 'Presse- stimmen',
			url: 'unsere-arbeiten/pressestimmen',
		}]
	};

	var selector = {
		tileTable: '.tile-table',
		tileRow: '.tile-row',
		tile: '.tile',
		navRow: '.nav-row',
		navTile: '.nav-tile'
	}

	var fadeInOut = function(isIn, onFaded) {
		var delayRange = 1;
		var duration = 0.5;
		var blinds = $('.blind');
		blinds.each(function() {
			$(this).css({
				'transition-delay': +Math.random().toFixed(2) * delayRange +'s',
				'transition-duration': duration + 's',
				opacity: isIn ? 0 : 1,
				transform: isIn ? 'rotateY(90deg)' : 'rotateY(0deg)'
			});
		});

		// hack: transition one blind last and listen to event
		// var lastBlind = Math.floor(Math.random() * blinds.length);
		// $('.blind:eq(' + lastBlind + ')').css({
		// 	'transition-delay': delayRange + 0.1 +'s',
		// }).one($.support.transition.end, onFaded);

		setTimeout(onFaded, (delayRange + duration) * 1000);
	};
	var setNavs = function(navIndex, subNavIndex) {
		if (navIndex == 0) {
			$('#nav-main').addClass('faded-out');
		} else {
			$('#nav-main').removeClass('faded-out');

			$('#nav-main > .tile').each(function(index) {
				if (navIndex == index) {
					$(this).addClass('selected');
				} else {
					$(this).removeClass('selected');
				}
			});
		}
		var subnavs = [];
		switch (navIndex) {
			case 1:
				subnavs = submenu.aboutus;
				break;
			case 3:
				subnavs = submenu.work;
				break;
			default:
				break;
		}
		
		$('#nav-sub a').remove();
		$('#nav-sub > .tile').each(function(index) {
			$(this).attr('class', 'tile');
			if (index < subnavs.length) {
				$(this).addClass('nav-' + navItems[navIndex])
				.append('<a href="#/' + subnavs[index].url + '">' + subnavs[index].label + '</a>');
				if (subNavIndex == index) {
					$(this).addClass('selected');
				}
			}
		})

	};
	var setBackground = function(navIndex, subNavIndex) {
		var imgUrl = imagesByNavIndex[navIndex][subNavIndex];
		if (imgUrl) {
			$(selector.tileTable).css({
				'background-image': 'url("/images/hintergrund/' + imgUrl + '")'
			})
		}
	};

	var addContentTiles = function() {
		var startFrom = [2,3,3,3,5];
		var rows = $(selector.tileRow);
		$('.tile-row a').remove();
		rows.each(function(rowIndex) {
			$(this).find('.tile').each(function(colIndex) {
				$(this).attr('class', 'tile')
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


	var Menu = {
		init: function(navIndex, subNavIndex, onFadedOut, onFadedIn) {
			setNavs(navIndex, subNavIndex);
			fadeInOut(false, function() {
				setBackground(navIndex, subNavIndex);
				if (navIndex == 0) {
					removeContentTiles();
					$('#page').hide();
				} else {
					addContentTiles();
					$('#page').show();
				}
				if (onFadedOut) {
					onFadedOut.call();
				}
				fadeInOut(true, onFadedIn);
			});
		},
	};

	return Menu;
});
