/**
 * menu.js
 *
 * Allgemeine Funktinalität die auf jeder Seite benötigt wird, wie etwa das Ein-
 * und Ausblenden der Seiten, das Ändern des Hintergrundbildes und anderes.
 */

define([
	'jquery'
], function($) {

	var navItems = ['nav-start','nav-aboutus','nav-values','nav-work','nav-customers','nav-contact'];

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
		start: [],
		values: [],
		customers: [],
		contact: [],
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
			label: 'Lebens&shy;aufgabe',
			url: 'ueber-uns/lebensaufgabe',
		}],
		work: [{
			label: 'Farbe im Raum',
			url: 'unsere-arbeiten/raum',
		}, {
			label: 'Farbe im Aussenbereich',
			url: 'unsere-arbeiten/aussenbereich',
		}, {
			label: 'Leistuns&shy;spektrum',
			url: 'unsere-arbeiten/leistungsspektrum',
		}, {
			label: 'Presse&shy;stimmen',
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

	/**
	 * Lüftet den "Vorhang" bzw lässt ihn fallen.
	 * 
	 * @param {boolean} isIn    	Lüftet den Vorhang wenn 'true', ansonsten lässt
	 *                           	ihn fallen
	 * @param {function}  onFaded 	Callback, wenn der Effekt zu ende ist
	 * @return {void}  
	 */
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
		setTimeout(onFaded, (delayRange + duration) * 1000);
	};

	/**
	 * Passt die obere und untere Navigationsleiste der ausgewählten Seite an.
	 * 
	 * @param {number} navIndex    Index der Hauptseite. 0: Startseite, 1: "Über
	 *                             Uns", 2: "Unsere Werte", 3: "Unsere Arbeit",
	 *                             4: "Kunden", 5: "Kontakt"
	 * @param {nuber} subNavIndex Index der Unterseit. Nur sinnvoll für
	 *                            navIndex=[1,3].
	 */
	var setNavs = function(navIndex, subNavIndex) {
		var navItem = navItems[navIndex];

		// main nav
		if (navIndex == 0) {
			$('#nav-main').addClass('faded-out');
		} else {
			$('#nav-main').removeClass('faded-out');

			$('#nav-main-content > .tile').each(function(index) {
				if (navIndex == index) {
					$(this).addClass('selected');
				} else {
					$(this).removeClass('selected');
				}
			});
		}

		// sub nav
		var subnavs = submenu[navItem.substr(4)];
		// only redraw sub nav if different to previous
		if (! $('#nav-sub .tile:first-child').hasClass(navItem)) {
			$('#nav-sub').addClass('faded-out'); // fade out
			setTimeout(function() {
				$('#nav-sub a:not(.mail-icon)').remove();
				$('#nav-sub .tile:not(.hidden-greater-sm)').each(function(index) {
					$(this).attr('class', 'tile'); // clear previous navs
					if (index < subnavs.length) {
						$(this).addClass(navItem)
						.append('<a class="nav-link" href="#/' + subnavs[index].url + '">' + subnavs[index].label + '</a>');
						if (subNavIndex == index) {
							$(this).addClass('selected');
						}
					}
				});
				$('#nav-sub')[0].offsetHeight;
				$('#nav-sub').removeClass('faded-out'); // fade in
			}, 1000);
		} else {
			$('#nav-sub > .tile').each(function(index) {
				$(this).attr('class', 'tile'); // clear previous navs
				if (index < subnavs.length) {
					$(this).addClass(navItem)
					if (subNavIndex == index) {
						$(this).addClass('selected');
					}
				}
			});
		}

		navItems.forEach(function(item) {
			$('#sub-' + item + ' > .tile').each(function(index) {
				$(this).removeClass('selected');
				if (item == navItem && subNavIndex == index) {
					$(this).addClass('selected');
				}
			});
		})

		// logo
		$('.logo-background').removeClass(navItems.join(' '))
			.addClass(navItem)
			.addClass('selected');

	};

	/**
	 * Passt das Hintergrundbild der ausgewählten Seite an.
	 * Zuordnung definiert durch 'imagesByNavIndex'.
	 *  
	 * @param {number} navIndex    Index der Hauptseite. 0: Startseite, 1: "Über
	 *                             Uns", 2: "Unsere Werte", 3: "Unsere Arbeit",
	 *                             4: "Kunden", 5: "Kontakt"
	 * @param {nuber} subNavIndex Index der Unterseit. Nur sinnvoll für
	 *                            navIndex=[1,3].
	 */
	var setBackground = function(navIndex, subNavIndex) {
		subNavIndex = subNavIndex || 0;
		var imgUrl = imagesByNavIndex[navIndex][subNavIndex];
		var fullUrl = 'none';
		if (imgUrl) {
			fullUrl = 'url("/images/hintergrund/' + imgUrl + '")';
		}
		$(selector.tileTable).css({
			'background-image': fullUrl
		})
	};

	/**
	 * Fügt transparent-weisse Kacheln hinzu auf denen der eigentliche
	 * Seiteninhalt dargestellt wird.
	 */
	var addContentTiles = function() {
		var startFrom = [2,3,3,3,5];
		$(selector.tileRow).each(function(rowIndex) {
			$(this).find('.tile').each(function(colIndex) {
				if (colIndex >= startFrom[rowIndex]) {
					if (rowIndex == 0) {
						if (colIndex == 7) {
							$(this).addClass('content-tile-topRight');
						} else {
							$(this).addClass('content-tile-top');
						}
					} else if (colIndex == 7) {
						$(this).addClass('content-tile-right');
					} else {
						$(this).addClass('content-tile');
					}
				}
			});
		});
	};

	/**
	 * Entfernt die transparent-weissen Kacheln.
	 */
	var removeContentTiles = function() {
		$(selector.tile).removeClass('content-tile')
			.removeClass('content-tile-top')
			.removeClass('content-tile-topRight')
			.removeClass('content-tile-right');
	};

	/**
	 * Entfernt die Links der Startseite und der "Unsere Arbeiten"-Seite
	 */
	var removeLinks = function() {
		$('.start-link,.thumb-container').remove();
		$(selector.tileRow + ' > ' + selector.tile).attr('class', 'tile');
	};

	var Menu = {

		/**
		 * Initialisiert jede Seite durch übergebenen Index. Abfolge:
		 *
		 * 1. Vorhang fällt.
		 * 2. onFadedOut wird ausgeführt
		 * 3. Vorhang lüftet sich
		 * 4. onFadedIn wird ausgeführt
		 * 
		 * @param {number} navIndex    Index der Hauptseite. 0: Startseite, 1:
		 *                             "Über Uns", 2: "Unsere Werte",
		 *                             3: "Unsere Arbeit", 4: "Kunden",
		 *                             5: "Kontakt"
		 * @param {nuber} subNavIndex Index der Unterseit. Nur sinnvoll für
		 *                            navIndex=[1,3].
		 * @param {function} onFadedOut  Callback, wenn der Vorhang gefallen ist
		 * @param {function} onFadedIn   Callback, wenn der Vorhang sich wieder
		 *                               lüftet
		 * @return {void} 
		 */
		init: function(navIndex, subNavIndex, onFadedOut, onFadedIn) {
			setNavs(navIndex, subNavIndex);
			fadeInOut(false, function() {
				setBackground(navIndex, subNavIndex);
				removeLinks();
				if (navIndex == 0) {
					removeContentTiles();
					$('#page').hide();
					$('.menu-icon').hide();
					$('#nav-main').removeClass('slided-out')
				} else {
					addContentTiles();
					$('#page').show();
					$('.menu-icon').show();
				}
				if (onFadedOut) {
					onFadedOut.call();
				}
				fadeInOut(true, onFadedIn);
			});
		},

		/**
		 * Verbindet Menüknöpfe mit entsprechender Funktionalität.
		 */
		bindControls: function() {
			$('.collapse-icon').click(function() {
				var icon;
				var subMenu = $(this).parent().hasClass('nav-aboutus') ? '#sub-nav-aboutus' :
					($(this).parent().hasClass('nav-work') ? '#sub-nav-work' : '');
				if (subMenu) {
					if ($(subMenu).hasClass('collapsed')) {
						icon = '/images/icons/minus.svg';
					} else {
						icon = '/images/icons/plus.svg';
					}
					$(this).find('img').attr('src', icon)
					$(subMenu).toggleClass('collapsed')
				}
			});
			$('.close-icon').click(function() {
				$('#nav-main').removeClass('slided-out')
			});
			$('.menu-icon').click(function() {
				$('#nav-main').toggleClass('slided-out')
			});
		}
	};

	return Menu;
});
