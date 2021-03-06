/**
 * vectorizer.js
 *
 * Ein Werkzeug zum Erstellen der animierten Schrift als SVG-Dateien. Das
 * Erstellen der Dateien erfolgt in 2 Schritten:
 *
 * 1. Eine Inkscape-Datei wird eingelesen, welche alle Buchstaben des
 * gewünschten Fonts in Vektoren nachgezeichnet enthaelt. Diese Datei wird in
 * ein JSON umgewandelt welches für den zweiten Schritt benötigt wird.
 *
 * 2. Mit jeden Buchstaben als Vektor in einem JSON definiert, wird im zweiten
 * Schritt Text eingelesen und mit Hilfe der Vektoren ein SVG generiert. Hier
 * gehen die Abspielgeschwindigkeit, Farbe und anderes ein. 
 */

define([
	'jquery',
	'underscore',
	'snap',
	'../text!svg-template.html'
], function($, _, Snap, valuesTemplate) {
	var stanHandFont = {
		"0": {
			"vectors": [{
				"path": "m 7.1138915 -1.1213354c -7.137 6.867 -6.368 12.958 -5.65 14.947l 1.0412184 0.685537c 10.805 -3.387 8.904 -18.373 2.777 -17.04",
				"length": 41.493,
				"strokeWidth": 2.5
			}],
			"width": 11.578
		},
		"1": {
			"vectors": [{
				"path": "m 5.5242722 -1.3786198l -4.961 16.263",
				"length": 17.003,
				"strokeWidth": 2.5
			}],
			"width": 6.234
		},
		"2": {
			"vectors": [{
				"path": "m 3.7948518 1.5165895c 3.098 -1.676 8.223 -1.592 9.353 -0.543c -1.715 5.955 -10.731 10.511 -12.383 11.76c -0.227 0.227 0.059 0.651 -0.153 0.892c 5.046 -0.7 9.422 -2.005 13.783 -3.324",
				"length": 42.253,
				"strokeWidth": 2.5
			}],
			"width": 16.453
		},
		"3": {
			"vectors": [{
				"path": "m 1.6088032 2.6146895c 5.564 -0.916 10.106 -1.069 12.475 0.398c -2.639 3.049 -6.636 3.448 -10.136 4.815c 3.917 -0.472 7.572 -0.352 9.811 1.959c -0.401 2.16 -2.26 2.66 -3.866 3.752c -3.877 0.734 -7.598 0.273 -11.305 -0.299",
				"length": 51.398,
				"strokeWidth": 2.5
			}],
			"width": 15.516
		},
		"4": {
			"vectors": [{
				"path": "m 6.7844123 -0.72462947c -1.973 2.213 -3.772 3.726 -5.92 6.638c 5.256 2.227 9.182 0.438 13.538 0.319",
				"length": 22.635,
				"strokeWidth": 2.5
			}, {
				"path": "m 14.787069 -0.15253577c -1.438 2.418 -2.744 4.892 -3.903 7.106c -0.875 2.17 -1.402 5.166 -2.514 7.632",
				"length": 16.15,
				"strokeWidth": 2.5
			}],
			"width": 16.406
		},
		"5": {
			"vectors": [{
				"path": "m 7.1342302 1.8570256l -4.0141958 3.6050519l -0.0116 1.1719337c 4.11 0.588 6.136 1.365 6.913 2.621c 0.31 0.754 -0.111 2.068 -0.093 2.803c -6.336 3.912 -7.126 0.166 -9.271 -0.826",
				"length": 27.426,
				"strokeWidth": 2.5
			}, {
				"path": "m 5.4831402 5.1383824l 3.435 -2.88l 9.752 -1.607",
				"length": 14.366,
				"strokeWidth": 2.5
			}],
			"width": 18.938
		},
		"6": {
			"vectors": [{
				"path": "m 10.280206 -1.3949146c -7.323 4.981 -8.779 9.028 -9.618 12.976l 5.698 2.261c 3.635 -1.475 7.846 -1.949 8.959 -6.095c -1.362 -1.08 -7.414 -2.612 -11.084 4.678c 0.8364211 0.358355 1.6434722 0.568586 2.2898717 0.860807",
				"length": 50.184,
				"strokeWidth": 2.5
			}],
			"width": 17.484
		},
		"7": {
			"vectors": [{
				"path": "m 0.29183408 1.8401939l 12.519 -1.575c -2.729 4.024 -5.129 8.856 -7.229 13.569",
				"length": 28.011,
				"strokeWidth": 2.5
			}],
			"width": 14.813
		},
		"8": {
			"vectors": [{
				"path": "m 9.4289518 1.4660373c -0.309 -0.571 0.123 -0.654 -0.406 -0.739c -2.657 -0.78 -6.784 1.059 -8.157 2.267l 0.033 1.195c 1.054 1.064 2.759 1.305 4.209 1.894c 1.336 0.542 2.383 1.435 2.682 2.291c 0.503 4.76 -3.961 5.432 -5.108 5.679c -2.965 -3.005 -1.821 -4.591 -0.345 -7.738c 3.814 -2.203 7.548 -4.411 11.273 -5.214",
				"length": 48.832,
				"strokeWidth": 2.5
			}],
			"width": 14.203
		},
		"9": {
			"vectors": [{
				"path": "m 9.6157284 0.54800003c -0.285 -0.411 -0.309 -0.965 -0.734 -0.912c -6.069 0.754 -8.043 4.827 -8.492 7.277c 4.474 0.034 8.15 -2.43 10.582 -4.551c -2.908 4.023 -2.999 9.137 -6.803 14.811",
				"length": 41.407,
				"strokeWidth": 2.5
			}],
			"width": 12.703
		},
		"_": {
			"vectors": [{
				"path": "m 0.06313453 14.52515l 19.319 0.221",
				"length": 19.32,
				"strokeWidth": 2
			}],
			"width": 19.312
		},
		"-": {
			"vectors": [{
				"path": "m 0 9.058617l 3.527 -0.089",
				"length": 3.528,
				"strokeWidth": 2
			}],
			"width": 4.734
		},
		"+": {
			"vectors": [{
				"path": "m 0.1894036 5.0233978l 12.059 0.694",
				"length": 12.079,
				"strokeWidth": 2
			}, {
				"path": "m 7.5761441 -1.100652l -1.957 14.205",
				"length": 14.339,
				"strokeWidth": 2
			}],
			"width": 13.313
		},
		"=": {
			"vectors": [{
				"path": "m 0.25253814 4.1395143l 8.586 -0.063",
				"length": 8.587,
				"strokeWidth": 2
			}, {
				"path": "m 0.06313453 7.4225101l 9.218 -0.253",
				"length": 9.221,
				"strokeWidth": 2
			}],
			"width": 10.078
		},
		"!": {
			"vectors": [{
				"path": "m 6.4584396 -7.1935678c -1.414 5.063 -4.607 17.562 -5.674 23.03",
				"length": 23.722,
				"strokeWidth": 2.5
			}],
			"width": 8.578
		},
		"?": {
			"vectors": [{
				"path": "m 0.1839664 0.08865392c 5.376 -2.116 10.524 -2.589 12.712 -1.307c -0.563 2.917 -3.433 3.282 -10.647 10.639c 0.064122 1.3222389 2.7330082 4.6541739 2.77954 4.5246829c 0 0 -1.6026061 1.021404 -2.6081361 1.345608",
				"length": 36.636,
				"strokeWidth": 2.5
			}],
			"width": 13.359
		},
		":": {
			"vectors": [{
				"path": "m 2.6516505 4.9602632l -2.652 2.841",
				"length": 3.886,
				"strokeWidth": 2.5
			}, {
				"path": "m 2.5885159 10.579237l -1.957 2.21",
				"length": 2.952,
				"strokeWidth": 2.5
			}],
			"width": 4.453
		},
		".": {
			"vectors": [{
				"path": "m -0.05107379 12.534322l 2.379 1.687",
				"length": 2.916,
				"strokeWidth": 2.5
			}],
			"width": 3.844
		},
		",": {
			"vectors": [{
				"path": "m 2.5892857 12.697002l -2.455 5.112",
				"length": 5.671,
				"strokeWidth": 2.5
			}],
			"width": 3.844
		},
		"A": {
			"vectors": [{
				"path": "m 0.35241088 13.912955c 2.09 -5.412 5.471 -10.664 8.905 -15.908c -1.423 5.65 -1.116 11.156 0.546 16.549",
				"length": 35.038,
				"strokeWidth": 2.5
			}, {
				"path": "m 2.9242281 7.2738532l 5.69 -0.898",
				"length": 5.761,
				"strokeWidth": 2.5
			}],
			"width": 10.781
		},
		"Ä": {
			"vectors": [{
				"path": "m 0.33169988 14.179418c 1.857 -5.766 5.493 -10.786 9.022 -15.868c -2.085 9.062 -0.79 12.515 0.283 16.57",
				"length": 35.134,
				"strokeWidth": 2.5
			}, {
				"path": "m 3.0898714 7.6430558l 5.473 -0.645",
				"length": 5.511,
				"strokeWidth": 2.5
			}, {
				"path": "m 7.4616725 -5.4793735l -0.065 2.805",
				"length": 2.806,
				"strokeWidth": 2.5
			}, {
				"path": "m 10.959113 -5.6728245l -0.06477 2.9662495",
				"length": 2.967,
				"strokeWidth": 2.5
			}],
			"width": 10.828
		},
		"B": {
			"vectors": [{
				"path": "m 3.0221723 0.45713507c -0.777 4.54 -1.692 9.079 -2.549 13.619",
				"length": 13.856,
				"strokeWidth": 2.5
			}, {
				"path": "m 1.9155238 0.25879981c 4.24 -1.74 8.098 -1.908 11.804 -1.454c -0.633 4.126 -7.791 5.489 -11.938 7.602c 3.847 -0.684 7.727 -1.477 10.53 1.356c -0.439 3.176 -4.001 4.193 -6.439 5.454l -4.99668613 0.198334",
				"length": 51.658,
				"strokeWidth": 2.5
			}],
			"width": 14.203
		},
		"C": {
			"vectors": [{
				"path": "m 12.225164 -0.71921219c -7.116 2.893 -14.463 10.44 -10.756 14.103c 4.457 0.904 9.249 -1.065 13.179 -2.62",
				"length": 33.575,
				"strokeWidth": 2.5
			}],
			"width": 15.422
		},
		"D": {
			"vectors": [{
				"path": "m 4.7594993 0.75986269c -2.266 4.655 -3.266 8.687 -4.272 13.258",
				"length": 13.966,
				"strokeWidth": 2.5
			}, {
				"path": "m 2.3276542 -0.74969292c 7.459 0.826 12.297 2.046 13.277 6.53c -4.23 5.46 -9.269 5.379 -14.066 6.958",
				"length": 31.895,
				"strokeWidth": 2.5
			}],
			"width": 15.703
		},
		"E": {
			"vectors": [{
				"path": "m 5.8120783 0.40540718c -0.259 6.258 -3.339 9.056 -5.018 13.573c 4.718 -1.448 8.057 -1.03 11.905 -1.302",
				"length": 26.631,
				"strokeWidth": 2.5
			}, {
				"path": "m 6.1072456 0.89365362c 3.502 -2.002 6.758 -2.135 10.003 -2.181",
				"length": 10.366,
				"strokeWidth": 2.5
			}, {
				"path": "m 4.7625949 7.4361565l 7.346 -0.781",
				"length": 7.388,
				"strokeWidth": 2.5
			}],
			"width": 15.703
		},
		"F": {
			"vectors": [{
				"path": "m 4.243715 1.0856063c -0.916 4.148 -1.855 10.181 -3.994 13.259",
				"length": 13.926,
				"strokeWidth": 2.5
			}, {
				"path": "m 2.0962544 2.853971c 6.146 -5.713 8.661 -3.923 12.02 -4.123",
				"length": 13.267,
				"strokeWidth": 2.5
			}, {
				"path": "m 0.99469833 7.2361713l 12.085 -2.435",
				"length": 12.328,
				"strokeWidth": 2.5
			}],
			"width": 13.031
		},
		"G": {
			"vectors": [{
				"path": "m 11.336395 -1.8341229c -5.443 3.504 -8.988 7.762 -10.81 14.551c 3.825 2.874 12.275 -0.841 11.957 -3.663c -1.062 -2.469 -4.045 -1.359 -6.65 -1.132",
				"length": 40.037,
				"strokeWidth": 1.8
			}],
			"width": 13.641
		},
		"H": {
			"vectors": [{
				"path": "m 6.9802879 -1.6882206c -1.671 5.685 -4.48 11.983 -6.817 17.341",
				"length": 18.645,
				"strokeWidth": 1.7
			}, {
				"path": "m 2.9769237 7.3854309c 4.509 -0.314 7.152 -1.514 10.443 -2.292",
				"length": 10.715,
				"strokeWidth": 2
			}, {
				"path": "m 13.67741 -1.9369423c -1.557 6.673 -3.745 9.782 -4.944 15.768",
				"length": 16.543,
				"strokeWidth": 1.7
			}],
			"width": 13.641
		},
		"I": {
			"vectors": [{
				"path": "m 5.7164163 -2.3377841l -5.426 16.776",
				"length": 17.632,
				"strokeWidth": 2.5
			}],
			"width": 5.906
		},
		"J": {
			"vectors": [{
				"path": "m 10.013466 -1.6620271l -2.934 14.926c -1.08 0.875 -2.199 0.699 -3.033 0.456l -3.391 -3.063",
				"length": 22.988,
				"strokeWidth": 1.8
			}],
			"width": 10.359
		},
		"K": {
			"vectors": [{
				"path": "m 4.9084323 -3.7174114c 0.368 7.48 -2.378 12.707 -4.806 18.123",
				"length": 18.968,
				"strokeWidth": 2
			}, {
				"path": "m 12.036112 -0.69699188c -5.036 1.609 -7.978 5.75 -8.566 9.294c 7.424126 0.462729 8.377695 3.5938022 8.762468 4.8459472",
				"length": 23.999,
				"strokeWidth": 2
			}],
			"width": 13.031
		},
		"L": {
			"vectors": [{
				"path": "m 5.6812059 -3.9709349c -0.044 6.661 -3.279 12.485 -5.059 17.624l 11.509 0.23",
				"length": 29.961,
				"strokeWidth": 2.5
			}],
			"width": 11.859
		},
		"M": {
			"vectors": [{
				"path": "m -0.47565178 15.859815c 1.902 -3.711 4.583 -9.522 6.089 -16.187l 1.9785943 -1.4e-7l 2.0445456 7.1770297c 1.9316351 -3.1787945 3.7124231 -8.8162683 5.8038751 -9.3902105c 1.013885 0.6574366 1.204237 1.70966196 1.549899 2.68743396c -0.971 4.654 -2.455 9.246 -2.803 13.975",
				"length": 55.431,
				"strokeWidth": 2.5
			}],
			"width": 17.203
		},
		"N": {
			"vectors": [{
				"path": "m -0.43983213 14.810941l 8.905 -15.653c 1.662 0.601 -0.511 9.831 0.953 14.719c 1.3501396 -1.59962 2.5492476 -3.757517 4.3375056 -6.9888945c 0.974908 -4.7700948 2.279014 -9.0024271 3.77889 -12.9149616",
				"length": 54.686,
				"strokeWidth": 2
			}],
			"width": 17.203
		},
		"O": {
			"vectors": [{
				"path": "m 9.1657142 -2.1385923c -9.178 1.905 -11.019 16.518 -5.806 16.147c 5.393 -0.418 7.44 -3.609 7.44 -3.609c 1.778 -2.658 2.719 -12.387 -2.587 -12.773",
				"length": 45.118,
				"strokeWidth": 1.8
			}],
			"width": 12.75
		},
		"Ö": {
			"vectors": [{
				"path": "m 6.379206 -1.464141c -9.157 9.902 -5.568 14.733 -3.348 15.627c 3.599 -0.116 5.976 -1.968 8.15 -4.107c 2.645 -7.054 0.86 -9.651 -1.184 -11.987c -1.668 -0.566 -3.336 0.431 -5.004 1.235",
				"length": 45.897,
				"strokeWidth": 2
			}, {
				"path": "m 7.6304909 -6.4040346l 0 2.502797",
				"length": 2.503,
				"strokeWidth": 2
			}, {
				"path": "m 11.19337 -6.4984798l 0.02391 2.6680761",
				"length": 2.668,
				"strokeWidth": 2
			}],
			"width": 12.75
		},
		"P": {
			"vectors": [{
				"path": "m 3.5143155 -0.21600446c -0.097 8.184 -2.355 11.061 -4.065 15.004",
				"length": 15.723,
				"strokeWidth": 2.5
			}, {
				"path": "m 2.1374484 -0.31301234c 5.408 -1.591 9.639 -0.909 12.949 1.552c 0.533 3.05 -3.307 4.274 -11.703 4.074",
				"length": 27.38,
				"strokeWidth": 2.5
			}],
			"width": 15.094
		},
		"Q": {
			"vectors": [{
				"path": "m 7.8652243 -1.7591616c -10.701 7.483 -7.99 15.582 -6.131 15.891c 6.513 0.51 11.712 -9.658 6.375 -15.459c -0.406 -0.441 -0.916 1.346 -2.164 2.622",
				"length": 43.693,
				"strokeWidth": 2
			}, {
				"path": "m 6.0125537 6.8104221l 4.042 10.31",
				"length": 11.074,
				"strokeWidth": 2
			}],
			"width": 11.297
		},
		"R": {
			"vectors": [{
				"path": "m 4.2050254 -0.16759208c -0.296 4.083 -1.724 5.029 -2.282 6.571c -0.962 2.658 -0.978 4.603 -1.537 7.883",
				"length": 15.085,
				"strokeWidth": 2
			}, {
				"path": "m 1.9993096 0.32073031c 4.887 -2.76 9.461 -1.545 10.864 -0.065c -0.686 3.023 -5.638 4.118 -10.008 5.86c -0.023 0.659 -0.326 1.227 -0.443 1.995c 4.412 1.581 8.745 5.148 9.266 7.055",
				"length": 37.476,
				"strokeWidth": 2
			}],
			"width": 12.422
		},
		"S": {
			"vectors": [{
				"path": "m 12.67189 -1.9257131c -4.36 0.647 -8.578 1.688 -11.998 4.937c 2.878 3.392 7.837 2.877 11.868 5.924c 0.086 4.059 -2.408 4.088 -3.859 5.068c -2.719 -0.216 -5.328 -1.258 -8.204 -1.941",
				"length": 41.997,
				"strokeWidth": 1.8
			}],
			"width": 13.312
		},
		"T": {
			"vectors": [{
				"path": "m -0.36205705 1.1982651c 10.301 -4.599 13.744 -3.047 18.613 -3.2c -3.731 0.425 -7.684 -0.305 -11.11 1.718c -1.614 4.346 -2.57 9.282 -3.606 14.146",
				"length": 45.114,
				"strokeWidth": 2.5
			}],
			"width": 12.422
		},
		"U": {
			"vectors": [{
				"path": "m 4.8139561 -0.24310618c -3.085 7.344 -5.415 13.763 -3.886 14.537c 4.452 -0.49 8.706 -5.519 10.678 -8.249l 1.994 -7.843l -4.596 17.749",
				"length": 55.713,
				"strokeWidth": 2
			}],
			"width": 13.922
		},
		"Ü": {
			"vectors": [{
				"path": "m 4.5957928 0.29783478c -1.683 4.575 -4.928 8.673 -4.107 14.011c 4.288 -0.771 9.034 -5.076 10.731 -8.143c 1.002 -2.835 1.257 -4.894 1.519 -6.96l 1.092064 0c -4.015 11.131 -4.111 11.672 -4.914 16.741",
				"length": 54.366,
				"strokeWidth": 2
			}, {
				"path": "m 7.5158768 -4.2739194l -0.095 2.684",
				"length": 2.686,
				"strokeWidth": 2
			}, {
				"path": "m 11.076953 -4.0464689l -0.142 2.729",
				"length": 2.733,
				"strokeWidth": 2
			}],
			"width": 13.922
		},
		"V": {
			"vectors": [{
				"path": "m 1.6364295 -2.5889341c -1.911 8.628 -0.995 11.972 -0.779 16.717c 2.471 -0.854 4.366 -4.402 7.205 -10.087c 2.34 -5.855 4.785 -7.821 6.588 -8.761",
				"length": 40.651,
				"strokeWidth": 2
			}],
			"width": 12.469
		},
		"W": {
			"vectors": [{
				"path": "m 1.5178574 -2.3476404l -1.138 17.522l 0.87 -0.826c 0.492506 -2.583547 2.374507 -5.658225 3.080358 -7.388393c 1.4009247 1.6552972 1.23643 6.757592 1.8526778 8.839285c 5.5642596 -2.152912 8.5369556 -16.23990385 9.4196426 -21.361606",
				"length": 59.918,
				"strokeWidth": 2
			}],
			"width": 14.484
		},
		"X": {
			"vectors": [{
				"path": "m 1.3661248 -2.1343974c 3.688 5.109 5.709 10.897 8.212 16.488",
				"length": 18.46,
				"strokeWidth": 2
			}, {
				"path": "m 13.189244 -1.2563188c -5.977 5.106 -10.102 10.374 -13.101 15.74",
				"length": 20.589,
				"strokeWidth": 2
			}],
			"width": 13.313
		},
		"Y": {
			"vectors": [{
				"path": "m 0.37513985 -1.8644334l 5.388 7.165",
				"length": 8.965,
				"strokeWidth": 1.7
			}, {
				"path": "m 12.287769 -1.8962791c -5.009 7.438 -8.133 9.615 -11.166 15.031l 0.1622974 1.910746",
				"length": 20.664,
				"strokeWidth": 2
			}],
			"width": 12.422
		},
		"Z": {
			"vectors": [{
				"path": "m 4.1743736 -1.4161429l 10.163 1.75c -3.762 5.143 -9.247 8.513 -13.888 12.751l 16.894 -0.672",
				"length": 46.124,
				"strokeWidth": 2
			}, {
				"path": "m 5.0893626 5.6158905l 7.908 -0.673",
				"length": 7.937,
				"strokeWidth": 2
			}],
			"width": 15.094
		},
		"a": {
			"vectors": [{
				"path": "m 9.3303571 4.0586188c -2.999 -0.214 -6.722 1.757 -8.973 7.991l 0.66964284 0.892857c 3.316909 0.584791 5.8171958 -2.153125 7.4776785 -8.035714l 0.96 0.536c -1.595 3.547 -3.839 7.143 -3.951 10.58",
				"length": 38.576,
				"strokeWidth": 2
			}],
			"width": 10.219
		},
		"ä": {
			"vectors": [{
				"path": "m 9.5338129 4.0143323c -4.3 0.095 -8.201 4.804 -8.764 7.881l 0.652 0.953c 4.743 0.268 6.854 -4.706 7.455 -8.43l 0.858 0.017c -1.741 5.718 -4.241 8.522 -3.774 11.467",
				"length": 39.125,
				"strokeWidth": 2
			}, {
				"path": "m 5.4562988 -1.6661097l -0.445 2.409",
				"length": 2.449,
				"strokeWidth": 2
			}, {
				"path": "m 8.9714825 -1.7123389l -0.427 2.565",
				"length": 2.601,
				"strokeWidth": 2
			}],
			"width": 10.219
		},
		"b": {
			"vectors": [{
				"path": "m 6.90441 -1.38233c -1.2 2 -3.948 6.811 -5.958 11.611c 0.461 0.182 0.766 0.497 0.959 0.07c 1.241 -2.757 1.296 -5.555 7.229 -5.28c 1.997 1.95 -3.529 8.438 -7.706 8.61c -0.98146914 0 -1.19534311 -1.666743 -0.92051321 -2.171819",
				"length": 39.833,
				"strokeWidth": 2
			}],
			"width": 10.219
		},
		"c": {
			"vectors": [{
				"path": "m 9.8455357 2.7955359c -2.027 1.165 -9.045 4.509 -9.221 9.468c 2.549 1.906 8.8 -1.31 11.351 -2.413",
				"length": 25.804,
				"strokeWidth": 2
			}],
			"width": 12
		},
		"d": {
			"vectors": [{
				"path": "m 7.5561215 6.6632781c -0.9 -0.1 -2.8048543 0.1156727 -4.0048543 0.9156727c -2.443 2.323 -3.405 4.487 -2.776 5.136c 2.146 -0.034 5.109 -3.347 6.555 -4.678c 0.7 -0.1 4.3362036 -8.87747525 5.7362036 -11.4774752c -6.97 13.881 -6.369 17.338 -3.937 18.198",
				"length": 51.409,
				"strokeWidth": 2
			}],
			"width": 12
		},
		"e": {
			"vectors": [{
				"path": "m 2.5615108 8.142857c 1.768 -0.496 5.911 -0.636 7.911 -3.536c -0.016 -1.221 -3.018 -1.509 -7.543 2.359c -1.83 2.4 -2.643 4.32 -2.373 5.32c 0.88621665 2.22608 5.59896185 1.26121 8.29071345 0.6875",
				"length": 32.555,
				"strokeWidth": 2.5
			}],
			"width": 11.391
		},
		"f": {
			"vectors": [{
				"path": "m 13.137676 -3.647552c -1.3 -1.0096086 -4.1164759 0.3076948 -5.9642929 3.50535715c -1.1 3.19999995 -2.0017857 11.39464285 -2.0017857 14.39464285",
				"length": 22.174,
				"strokeWidth": 2
			}, {
				"path": "m -0.827299 8.4378191c 3.412 -0.691 7.869 -0.819 10.539 -1.446",
				"length": 10.643,
				"strokeWidth": 2.5
			}],
			"width": 12.562
		},
		"g": {
			"vectors": [{
				"path": "m 11.338875 3.9470023c -2.507 -0.291 -7.674 1.208 -9.132 3.322l -0.109 1.031c 3.5695826 0.5034518 4.5437497 0.665736 6.1237262 2.116706c 1.1145573 5.964638 -4.4509665 12.962766 -6.8380122 12.660078c -1.7796052 0.301524 -4.2129531 -2.442192 -4.7321421 -3.504462",
				"length": 39.37,
				"strokeWidth": 2.5
			}],
			"width": 11.719
		},
		"h": {
			"vectors": [{
				"path": "m 6.5500806 -5.9637118c -1.57 5.595 -4.814 16.367 -6.585 19.71c 1.655 -2.056 6.447 -9.917 8.505 -10.625c 0.903 2.587 -1.374 10.592 -1.518 13.393",
				"length": 48.048,
				"strokeWidth": 2
			}],
			"width": 10.359
		},
		"i": {
			"vectors": [{
				"path": "m 3.9955359 -2.9949618l -0.871 3.393",
				"length": 3.503,
				"strokeWidth": 2.5
			}, {
				"path": "m 3.1473215 2.607717l -3.01339288 11.875",
				"length": 12.251,
				"strokeWidth": 2.5
			}],
			"width": 5.344
		},
		"j": {
			"vectors": [{
				"path": "m 3.494893 2.5184309c 0.294 6.746 0.623 5.739 0.402 12.455c -2.046 8.554 -5.303 7.416 -6.317 7.701c -1.607 -0.487 -3 -3.816 -3.639 -4.933",
				"length": 29.593,
				"strokeWidth": 2.5
			}, {
				"path": "m 3.5841787 -5.4056669l -0.714 5.714",
				"length": 5.759,
				"strokeWidth": 2.5
			}],
			"width": 7.125
		},
		"k": {
			"vectors": [{
				"path": "m 7.7232143 -4.4235333c -2.251 3.678 -6.367 14.222 -7.612 18.906",
				"length": 20.419,
				"strokeWidth": 2.5
			}, {
				"path": "m 11.763393 3.9693239c -1.835 0.606 -5.815 1.831 -6.205 3.326c -0.496 2.886 5.441 8.41 6.16 11.406",
				"length": 20.358,
				"strokeWidth": 2.5
			}],
			"width": 12.75
		},
		"l": {
			"vectors": [{
				"path": "m 7.5899421 -6.1646046l -7.411 22.232",
				"length": 23.435,
				"strokeWidth": 2.5
			}],
			"width": 8.016
		},
		"m": {
			"vectors": [{
				"path": "m 2.8538811 3.4105755l -2.817 9.787l 6.09 -6.299l 2.989 -1.111c -0.303 2.124 -0.801 5.029 -1.104 6.673l 7.21 -7.81l 1.079 0.18l -1.362 9.731",
				"length": 50.447,
				"strokeWidth": 2.5
			}],
			"width": 17.484
		},
		"n": {
			"vectors": [{
				"path": "m 3.5158843 2.4063048c -1.632 3.815 -2.171 8.988 -2.997 10.095c 3.509 -2.68 6.013 -7.896 7.83 -8.098c -0.631 2.987 -1.109 7.682 -1.222 10.817",
				"length": 32.824,
				"strokeWidth": 2.5
			}],
			"width": 9.609
		},
		"o": {
			"vectors": [{
				"path": "m 5.6327526 3.4105654c -2.655 3.232 -3.859 4.402 -5.149 7.661c -0.179 1.606 0.784 2.803 1.692 3.084c 2.423 -0.788 4.049 -1.861 5.577 -6.317c 0.327 -2.565 -1.418 -4.549 -3.062 -5.087",
				"length": 28.318,
				"strokeWidth": 2.5
			}],
			"width": 8.578
		},
		"ö": {
			"vectors": [{
				"path": "m 5.4895148 3.8610539c -4.942 5.817 -5.558 7.143 -4.271 10.021c 5.598 0.613 8.412 -8.365 4.876 -10.379l -1.6927751 0.092754",
				"length": 27.893,
				"strokeWidth": 2.5
			}, {
				"path": "m 4.274577 -1.370515l -0.446 2.595",
				"length": 2.633,
				"strokeWidth": 2.5
			}, {
				"path": "m 7.663956 -1.3335317l -0.26 2.453",
				"length": 2.467,
				"strokeWidth": 2.5
			}],
			"width": 8.578
		},
		"p": {
			"vectors": [{
				"path": "m 2.6562499 4.3041448c -0.443 5.176 -2.181 14.91 -2.545 19.174",
				"length": 19.345,
				"strokeWidth": 2.5
			}, {
				"path": "m 3.169643 5.5541453c 2.564 -1.963 7.9 -1.549 9.286 1.027c -1.143 2.716 -7.518 3.635 -8.887 3.798c -0.4 0.048 -0.199 -3.1 0.047 -4.423",
				"length": 24.774,
				"strokeWidth": 2.5
			}],
			"width": 12.75
		},
		"q": {
			"vectors": [{
				"path": "m 9.1495994 4.7253164c -1.907 -1.362 -6.963 0.276 -8.054 4.371c -0.703 4.376 1.762 4.53 3.755 3.504c 1.548 -1.305 2.291 -3.036 2.412 -7.318c 0.151 0.462 1.737 -0.407 1.6 0.042c -2.691 8.861 -7.345 17.306 -6.592 22.669c 0.845 1.583 1.898 1.541 2.619 1.04",
				"length": 54.239,
				"strokeWidth": 2.5
			}],
			"width": 10.5
		},
		"r": {
			"vectors": [{
				"path": "m 3.9508929 2.8086096c -1.197 2.634 -3.142 9.112 -3.862 11.585c 1.44 -3.522 2.827 -7.463 4.375 -10.112c 1.427 -1.209 4.159 -1.206 5.536 -0.536",
				"length": 29.057,
				"strokeWidth": 2.3
			}],
			"width": 10.5
		},
		"s": {
			"vectors": [{
				"path": "m 11.789676 3.3889668c -2.182 -0.049 -7.367 1.54 -10.134 3.259c 3.949493 0.9097766 9.0074579 2.8832979 7.633943 5.3794642c -1.9009728 2.083985 -4.5140789 2.395196 -5.2009073 2.209822c -1.664407 -0.238564 -4.50627776 -1.744711 -6.052936 -2.395396",
				"length": 33.524,
				"strokeWidth": 2.5
			}],
			"width": 12
		},
		"t": {
			"vectors": [{
				"path": "m 7.9872416 -0.84061548c -0.247 1.022 -0.381 3.689 -0.743 4.576c -0.771 1.708 -1.3 8.357 -2.244 10.502",
				"length": 15.401,
				"strokeWidth": 2
			}, {
				"path": "m 0.16773927 5.5764668l 15.749 -3.127",
				"length": 16.057,
				"strokeWidth": 2
			}],
			"width": 12.891
		},
		"u": {
			"vectors": [{
				"path": "m 3.3354106 5.8065239c -2.723 1.714 -2.492 5.358 -2.618 7.388c 6.694 -0.229 10.197 -8.528 11.05 -11.229",
				"length": 24.919,
				"strokeWidth": 2.5
			}],
			"width": 12.891
		},
		"ü": {
			"vectors": [{
				"path": "m 3.6016159 5.9645561c -2.831 1.404 -1.907 4.927 -2.596 7.158c 8.275 -0.911 9.974 -8.836 10.867 -10.968",
				"length": 24.476,
				"strokeWidth": 2.5
			}, {
				"path": "m 5.578738 -1.864102l -0.594 2.512",
				"length": 2.582,
				"strokeWidth": 2
			}, {
				"path": "m 9.0754303 -1.7441783l -0.559 2.563",
				"length": 2.624,
				"strokeWidth": 2
			}],
			"width": 12.891
		},
		"v": {
			"vectors": [{
				"path": "m 2.0908263 3.2704114l -1.019 10.141c 4.579 -4.503 9.165 -9.06 13.571 -11.942",
				"length": 28.297,
				"strokeWidth": 2.5
			}],
			"width": 12.891
		},
		"w": {
			"vectors": [{
				"path": "m 2.3262645 3.1816773c -0.081 3.584 -0.941 6.813 -1.886 9.79c 2.873 -1.355 4.847 -2.999 6.481 -4.353c -0.697 1.615 -0.075 3.593 0.132 4.732c 5.152 -0.607 4.736 -4.33 5.475 -6.545",
				"length": 32.069,
				"strokeWidth": 2.5
			}],
			"width": 13.5
		},
		"x": {
			"vectors": [{
				"path": "m 2.1205351 4.5273595c 3.968 1.191 6.775 6.647 7.277 9.219",
				"length": 12.202,
				"strokeWidth": 2
			}, {
				"path": "m 11.785712 4.1478953c -2.569 0.676 -9.675 7.254 -12.054 9.598",
				"length": 15.484,
				"strokeWidth": 2.5
			}],
			"width": 12.609
		},
		"y": {
			"vectors": [{
				"path": "m 1.7009777 2.6041125c 0.334 1.634 2.054 6.592 3.259 8.537",
				"length": 9.162,
				"strokeWidth": 2.5
			}, {
				"path": "m 13.219293 2.4121932c -5.537 7.201 -13.592 16.727 -16.362 23.785",
				"length": 28.952,
				"strokeWidth": 2.5
			}],
			"width": 13.781
		},
		"z": {
			"vectors": [{
				"path": "m 2.6864734 4.480934c 5.31 0.403 7.7 0.553 10.634 1.772c -4.25 2.568 -8.934 3.902 -13.008 5.987c 5.627 1.679 12.662 0.778 19.117 0.94",
				"length": 44.373,
				"strokeWidth": 2.5
			}],
			"width": 16.406
		},
		" ": {
			"vectors": [],
			"width": 15.141
		}
	};

	/**
	 * Verringert die Nachkommastellen der gebrochenrationalen Zahlenwerte der
	 * Vektoren.
	 * 
	 * @param  {object} font     Das Objekt welches Vektoren für jeden
	 *                           Buchstaben enthält
	 * @param  {number} decimals Die Anzahl der gewünschten Nachkommastellen. 1
	 *                           bis 2 Nachkommastellen sollten reichen - mehr
	 *                           Nachkommastellen sollten visuell keinen
	 *                           Unterschied mehr machen.
	 * @return {object}          Das Objekt welches die Vektoren mit gewünschter
	 *                           Nachkommazahl enthält
	 */
	function limitFontPrecision(font, decimals) {
		var pathSegs;
		Object.keys(font).forEach(function(letter) {
			font[letter].vectors.forEach(function(vector) {
				pathSegs = Snap.parsePathString(vector.path);
				vector.path = '';
				pathSegs.forEach(function(points) {
					points.forEach(function(coord, index, all) {
						if (!isNaN(coord)) {
							coord = +coord.toFixed(decimals);
							if (index < all.length-1) {
								coord += ',';
							}
						}
						vector.path += coord;
					})
				})
			})
		});
		return font;
	}

	var vectorizer = {
		/**
		 * Konvertiert den text-Parameter zu einem SVG-Bild in welchen CSS-Werte
		 * enthalten sind, die das Animieren des SVG erlauben.
		 * 
		 * @param {string} id    Das id-Attribut des genrierten SVG-Elements
		 * @param {string} text  Der Text der zu einem SVG umgewandelt werden
		 *                       soll. '/n' und '/t' werden unterstützt.
		 * @param {string} mask  Pfad und Dateiname der Datei, die als Maske
		 *                       verwendet werden soll.
		 * @param {number} speed Geschwindigkeit mit der die Animation ablaufen
		 *                       soll. Default: 300.
		 * @return {object} Das SVG-Element
		 */
		textToSvg: function(id, text, mask, speed) {
			var compiled = _.template(valuesTemplate);
			return compiled({
				id: id,
				text: text,
				mask: mask,
				font: limitFontPrecision(stanHandFont, 1),
				color: '#454545',
				speed: speed || 300,
				lineHeight: 30.0,
				tabWidth: 140.4
			})
		},

		/**
		 * Liest eine entsprechend gegliederte Inkscape-Datei und genriert
		 * daraus ein Objekt, welches die Vektoren für jeden Buchstaben enthält.
		 * 
		 * @return {object} Das Objekt mit den Vektoren für jeden Buchstaben
		 */
		pathToJson: function() {
			var groups = $($('#svg-export').get(0).contentDocument).find('svg > g');
			var font = {};
			var width = {};
			var label, letter, relPath, paths, d0, d1, x0, x1;

			groups.each(function (index) {
				label = $(this).attr('inkscape:label');
				console.log(label);
				if (label) {
					letter = label[0];
					if (label.substring(2) == 'path') {
						font[letter] = {
							vectors: []
						};
						$(this).find('path').each(function() {
							relPath = '';
							Snap.path.toRelative($(this).attr('d'))
								.forEach(function(point) {
									if (point[0] === 'M') {
										point[0] = 'm';
									}
									relPath += point.join(' ');
								});
							font[letter].vectors.push({
								path: relPath,
								length: +this.getTotalLength().toFixed(3),
								strokeWidth: +(+$(this).attr('style').match(/stroke-width:(\d+(.\d+)?)/i)[1]).toFixed(1)
							});
						})
					} else if (label.length == 1) {
						paths = $(this).find('path');
						d0 = paths.get(0).attributes.d.value;
						d1 = paths.get(1).attributes.d.value;
						x0 = d0.substring(d0.indexOf(' '), d0.indexOf(','));
						x1 = d1.substring(d1.indexOf(' '), d1.indexOf(','));
						width[letter] = parseFloat(x1) - parseFloat(x0);
					} else if (label == 'space') {
						paths = $(this).find('path');
						d0 = paths.get(0).attributes.d.value;
						d1 = paths.get(1).attributes.d.value;
						x0 = d0.substring(d0.indexOf(' '), d0.indexOf(','));
						x1 = d1.substring(d1.indexOf(' '), d1.indexOf(','));
						width[' '] = parseFloat(x1) - parseFloat(x0);
					}
				}
			})
			Object.keys(font).forEach(function(letter) {
				font[letter].width = +width[letter].toFixed(3);
			})
			font[' '] = {
				vectors: [],
				width: +(width[' '] - width['a']).toFixed(3)
			}
			return font;
		},

		/**
		 * Berechnet die Zeilenhöhe von einer entsprechend gegliederten
		 * Inkscape-Datei.
		 * 
		 * @return {string} die Zeilenhöhe mit 3 Nachkommastellen
		 */
		getLineHeight: function() {
			var groups = $($('#svg-export').get(0).contentDocument).find('svg > g');
			var lineHight, label, paths, d0, d1, y0, y1;

			groups.each(function (index) {
				label = $(this).attr('inkscape:label');
				if (label && label == 'line height') {
					paths = $(this).find('path');
					d0 = paths.get(0).attributes.d.value;
					d1 = paths.get(1).attributes.d.value;
					y0 = d0.substring(d0.indexOf(',') + 1, d0.indexOf(' ', d0.indexOf(',')));
					y1 = d1.substring(d1.indexOf(',') + 1, d1.indexOf(' ', d1.indexOf(',')));
					lineHight = parseFloat(y1) - parseFloat(y0);
				}
			})
			return lineHight.toFixed(3);
		}

	}

	return vectorizer;
})