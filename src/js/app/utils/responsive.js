define([
	'jquery',
	'bootstrap',
], function($) {

	var Responsive = {
		mediaSizes: ['xs', 'sm', 'md', 'lg'],

		getMediaSize: function() {
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
	};

	return Responsive;
});