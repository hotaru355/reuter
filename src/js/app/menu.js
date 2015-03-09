/**
 * menu.js
 *
 * Allgemeine Funktinalität die auf jeder Seite benötigt wird, wie etwa das Ein-
 * und Ausblenden der Seiten, das Ändern des Hintergrundbildes und anderes.
 */

define([
	'jquery'
], function($) {

	var navItems = ['nav-start', 'nav-aboutus', 'nav-values', 'nav-work', 'nav-customers', 'nav-contact'];

	var subMenu = {
		start: [{
			background: 'background-start.jpg'
		}],
		aboutus: [{
			label: 'Frank Reuter',
			url: 'ueber-uns/frank-reuter',
			background: 'background-aboutus.jpg'
		}, {
			label: 'Assistenz',
			url: 'ueber-uns/assistenz',
			background: 'background-aboutus.jpg'
		}, {
			label: 'Das Team',
			url: 'ueber-uns/team',
			background: 'background-aboutus.jpg'
		}, {
			label: 'Chronik',
			url: 'ueber-uns/chronik',
			background: 'background-aboutus.jpg'
		}, {
			label: 'Partner',
			url: 'ueber-uns/partner',
			background: 'background-aboutus.jpg'
		}, {
			label: 'ohne uns',
			url: 'ueber-uns/ohne-uns',
			background: 'background-aboutus.jpg'
		}, {
			label: 'Lebens&shy;aufgabe',
			url: 'ueber-uns/lebensaufgabe',
			background: 'background-aboutus.jpg'
		}],
		values: [{
			background: 'background-values.jpg'
		}],
		work: [{
			label: 'Farbe im Raum',
			url: 'unsere-arbeiten/raum',
		}, {
			label: 'Farbe im Außenbereich',
			url: 'unsere-arbeiten/aussenbereich',
		}, {
			label: 'Leistuns&shy;spektrum',
			url: 'unsere-arbeiten/leistungsspektrum',
			background: 'background-spectrum.jpg'
		}, {
			label: 'Presse&shy;stimmen',
			url: 'unsere-arbeiten/pressestimmen',
			background: 'background-press.jpg'
		}],
		customers: [{
			background: 'background-customers.jpg'
		}],
		contact: [{
			label: 'Kontakt / Impressum',
			url: 'kontakt/kontakt-impressum',
			background: 'background-contact.jpg'
		}, {
			label: 'Sponsoring',
			url: 'kontakt/sponsoring',
			background: 'background-contact.jpg'
		}, {
			label: 'Jobs - Gesellen',
			url: 'kontakt/jobs-gesellen',
			background: 'background-contact.jpg'
		}, {
			label: 'Jobs - Lehre',
			url: 'kontakt/jobs-lehre',
			background: 'background-contact.jpg'
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
				'transition-delay': +Math.random().toFixed(2) * delayRange + 's',
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
	 * @param {nuber} subNavIndex Index der Unterseite. Nur sinnvoll für
	 *                            navIndex=[1,3,5].
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
		var subnavs = subMenu[navItem.substr(4)];
		// only redraw sub nav if different to previous
		if (!$('#nav-sub .tile:first-child').hasClass(navItem)) {
			$('#nav-sub').addClass('faded-out'); // fade out
			setTimeout(function() {
				$('#nav-sub a:not(.mail-icon)').remove();
				$('#nav-sub .tile:not(.hidden-greater-sm)').each(function(index) {
					$(this).attr('class', 'tile'); // clear previous navs
					if (index < subnavs.length && subnavs[index].label) {
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
	 *
	 * @param {number} navIndex    Index der Hauptseite. 0: Startseite, 1: "Über
	 *                             Uns", 2: "Unsere Werte", 3: "Unsere Arbeit",
	 *                             4: "Kunden", 5: "Kontakt"
	 * @param {nuber} subNavIndex Index der Unterseit. Nur sinnvoll für
	 *                            navIndex=[1,3].
	 */
	var setBackground = function(navIndex, subNavIndex) {
		subNavIndex = subNavIndex || 0;
		var imgUrl = subMenu[Object.keys(subMenu)[navIndex]][subNavIndex].background;
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
	var addContentTiles = function(startFrom) {
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

	var bindScrollButtons = function() {
		var scroller = $('.content-scroller:visible');
		$('.scroll-up').prop('disabled', true);
		$('.scroll-down').prop('disabled', false);
		if (scroller.length) {
			$('.scroll-buttons').show();
			scroller.scroll(function() {
				var maxY = scroller.prop('scrollHeight') - scroller.prop('offsetHeight') - 1;
				if (scroller.scrollTop() <= 0) {
					$('.scroll-up').prop('disabled', true);
				} else if (scroller.scrollTop() >= maxY) {
					$('.scroll-down').prop('disabled', true);
				} else {
					$('.scroll-up').prop('disabled', false);
					$('.scroll-down').prop('disabled', false);
				}
			})
		} else {
			$('.scroll-buttons').hide();
		}
	}

	var bindSlideButtons = function() {
		var slideIdx = 0;
		var slider = $('.content-slider:visible');
		var maxIdx = $('.sliding-list li').length;

		function prev(idx, num) {
			return (idx - num) >= 0 ? (idx - num) : (idx - num + maxIdx);
		}

		function next(idx, num) {
			return (idx + num) < maxIdx ? (idx + num) : (idx + num - maxIdx);
		}

		function slidePics(slideIdx) {
			$('.sliding-list li').each(function(index) {
				var item = $(this);
				item.attr('class', '');
				switch (index) {
					case prev(slideIdx, 2):
						item.addClass('slided-preleft');
						break;
					case prev(slideIdx, 1):
						item.addClass('slided-left');
						break;
					case slideIdx:
						item.addClass('slided-middle');
						break;
					case next(slideIdx, 1):
						item.addClass('slided-right');
						break;
					case next(slideIdx, 2):
						item.addClass('slided-preright');
						break;
				}
			})
		}

		if (slider.length) {
			$('.slide-buttons').show();
			$('.slide-left').click(function() {
				slideIdx = prev(slideIdx, 1);
				slidePics(slideIdx);
				// finden wir ein Touchscreen, dann rufen wir tooltip('show') direkt auf
				if (Modernizr.touch) {
					$('.slided-middle img:eq(0)').tooltip('show');
					$('.slided-right img:eq(0)').tooltip('hide');
				}
			});
			$('.slide-right').click(function() {
				slideIdx = next(slideIdx, 1);
				slidePics(slideIdx);
				if (Modernizr.touch) {
					$('.slided-middle img:eq(0)').tooltip('show');
					$('.slided-left img:eq(0)').tooltip('hide');
				}
			});
		} else {
			$('.slide-buttons').hide();
		}
	}

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
			var isPartnerPage = (navIndex == 1 && subNavIndex == 4);
			var startFrom = isPartnerPage ? [1, 2, 2, 2, 4] : [2, 3, 3, 3, 5];

			setNavs(navIndex, subNavIndex);
			fadeInOut(false, function() {
				setBackground(navIndex, subNavIndex);
				removeLinks();
				if (navIndex == 0) {
					removeContentTiles();
					$('#page').hide();
					$('#page-large').hide();
					$('.menu-icon').hide();
					$('#nav-main').removeClass('slided-out')
				} else {
					addContentTiles(startFrom);
					if (isPartnerPage) {
						$('#page').hide();
						$('#page-large').show();
					} else {
						$('#page').show();
						$('#page-large').hide();
					}
					$('.menu-icon').show();
				}
				if (onFadedOut) {
					onFadedOut.call();
					bindScrollButtons();
					bindSlideButtons();
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
				var subMenu = '#sub-' + $(this).parent().attr('class').split(' ').filter(function(classValue) {
					return classValue.substr(0, 4) == 'nav-';
				})[0];
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
			$('.scroll-up').click(function() {
				var y = $('.content-scroller').scrollTop() - 25;
				y = (y > 0) ? y : 0;
				$('.content-scroller').scrollTop(y);
			});
			$('.scroll-down').click(function() {
				var scroller = $('.content-scroller');
				var maxY = scroller.prop('scrollHeight') - scroller.prop('offsetHeight');
				var y = scroller.scrollTop() + 25;
				y = (y < maxY) ? y : maxY;
				scroller.scrollTop(y);
			});
		},

		/**
		 * Läd Bilder in den Browsercache
		 * @param {Array} imageUrls die URLs der Bilder die zu cachen sind
		 */
		preloadImages: function(imageUrls) {
			var images = [];
			imageUrls.forEach(function(url, index) {
				images.push(new Image());
				images[index].src = url;
			})
		}
	};


	return Menu;
});