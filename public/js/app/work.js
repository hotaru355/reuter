define([
	'jquery'
], function($) {
	var work = {
		initGallery: function(folder) {
			var imgIdx = 0;
			var randIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
			$('.tile-row').each(function() {
				$(this).find('.tile:not(.content-tile)').each(function() {
					var src = 'images/gallerie/' + folder + '/image' + (++imgIdx) + '_.jpg';
					var rand = Math.floor(Math.random() * randIndexes.length);
					var randIndex = randIndexes[rand];
					randIndexes.splice(rand, 1);
					$(this).append('<a class="thumb-container" href="javascript:"><img class="thumb faded-out fade-in-rand-'
						+ randIndex + '" src="' + src + '" /></a>');
				})
			})
			$('.tile-row a').click(function() {
				var src = $(this).find('img').attr('src').replace('_', '');
				var visible = $('.work-detail:not(.faded-out)');
				$('.work-detail.faded-out').attr('src', src)
					.removeClass('faded-out');
				visible.addClass('faded-out');
			})
			$('.tile-row a:eq(0)').click();
		},
		fadeInThumbs: function() {
			$('.thumb').removeClass('faded-out');
		}
	}

	return work;
});