/**
 * work.js
 *
 * Initialisiert die "Unsere Arbeiten"-Seite.
 */

define([
	'jquery', 'app/menu'
], function($, menu) {
	var work = {

		/**
		 * Initialisiert die Gallerie indem sich die Bilder unterschiedlich
		 * schnell und ungeordnet einblenden.
		 * 
		 * @param {number|string} folder Verzeichnisname in dem sich die
		 *                               Galleriebilder befinden
		 */
		initGallery: function(folder) {
			var imgIdx = 0;
			var randIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
			var imageUrls = [];

			$('.tile-row').each(function() {
				$(this).find('.tile:not(.content-tile, .content-tile-top, .content-tile-right, .content-tile-topRight)').each(function() {
					var baseUrl = 'images/gallerie/' + folder + '/image' + (++imgIdx);
					var rand = Math.floor(Math.random() * randIndexes.length);
					var randIndex = randIndexes[rand];
					randIndexes.splice(rand, 1);
					$(this).append('<a class="thumb-container" href="javascript:"><img class="thumb faded-out fade-in-rand-'
						+ randIndex + '" src="' + baseUrl + '_.jpg" /></a>');
					imageUrls.push(baseUrl + '.jpg');
				})
			})

			// Lade Bilder in den Browsercache
			menu.preloadImages(imageUrls);

			// Mit hilfe von 2 DIVs wird ein Bild ausgeblendet und das nächste
			// eingeblendet
			$('.thumb-container').click(function() {
				var src = $(this).find('img').attr('src').replace('_', '');
				var visible = $('.work-detail:not(.faded-out)');
				$('.work-detail.faded-out').attr('src', src)
					.removeClass('faded-out');
				visible.addClass('faded-out');
			})

			// Zeige das erste Bild durch Klicken eines Thumbnails
			if (folder == '1') {
				$('.thumb-container:eq(8)').click(); // Reuter-Extrawurst ;)
			} else {
				$('.thumb-container:eq(0)').click();				
			}
		},

		/**
		 * Startet die Animation zum Einblenden der Galleriebilder.
		 */
		fadeInThumbs: function() {
			$('.thumb').removeClass('faded-out');
		}
	}

	return work;
});