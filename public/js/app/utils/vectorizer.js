define([
	'jquery',
	'underscore',
	'backbone',
	'text!/templates/our-values-1.html'
], function($, _, Backbone, valuesTemplate) {
	var stanHandFont = {
		' ': {
			vectors: [{
				path: "",
				length: 61,
				strokeWidth: 1.7
			}],
			width: 8
		},
		"0": {
			"vectors": [{
				"path": "m 4.44 4.64c -4.912 4.69 -3.846 8.56 -3.458 9.76l 0.738 0.4c 6.96 -2.2 6.17 -12.52 1.96 -11.61",
				"length": 27.588,
				"strokeWidth": 1.5
			}],
			"width": 8
		},
		"1": {
			"vectors": [{
				"path": "m 3.42 3.92l -3.331 10.98",
				"length": 11.474,
				"strokeWidth": 1.3
			}],
			"width": 4.6875
		},
		"2": {
			"vectors": [{
				"path": "m 2.46 5.98c 2.06 -1.24 5.52 -1.3 6.36 -0.36c -1.14 4.03 -5.81 5.28 -8.53 8.28c 3.43 -0.4 6.41 -1.3 9.38 -2.1",
				"length": 28.4,
				"strokeWidth": 1.3
			}],
			"width": 10.671875
		},
		"3": {
			"vectors": [{
				"path": "m 2.14 6.63c 3.83 -0.62 6.95 -0.72 8.56 0.26c -1.8 2.05 -4.54 2.32 -6.95 3.21c 2.69 -0.29 5.2 -0.21 6.75 1.3c -0.3 1.5 -1.56 1.8 -2.67 2.6c -2.66 0.5 -5.22 0.2 -7.763 -0.2",
				"length": 35.232,
				"strokeWidth": 1.3
			}],
			"width": 10.015625
		},
		"4": {
			"vectors": [{
				"path": "m 4.6 4.3l -4.042 4.42c 3.262 1.48 5.912 0.44 8.902 0.41",
				"length": 15.021,
				"strokeWidth": 1.3
			}, {
				"path": "m 9.82 4.73c -0.94 1.7 -1.91 3.17 -2.67 4.72c -0.58 1.55 -0.86 3.45 -1.59 5.15",
				"length": 10.818,
				"strokeWidth": 1.3
			}],
			"width": 11.34375
		},
		"5": {
			"vectors": [{
				"path": "m 4.67 6.2l -2.46 2.3l 0 0.96c 4.18 0 4.45 1.94 4.49 3.54c -4.28 2.6 -4.78 0.1 -6.43 -0.5",
				"length": 18.087,
				"strokeWidth": 1.5
			}, {
				"path": "m 4.06 7.94l 1.81 -1.47l 6.33 -1.07",
				"length": 8.752,
				"strokeWidth": 1.5
			}],
			"width": 12.671875
		},
		"6": {
			"vectors": [{
				"path": "m 6.9 3.75c -4.97 3.39 -5.952 6.15 -6.521 8.85l 3.861 1.5c 2.46 -1 5.32 -1.3 6.06 -4.13c -0.91 -0.73 -5.01 -1.78 -7.5 3.23c 0.57 0.2 1.11 0.3 1.55 0.5",
				"length": 34.042,
				"strokeWidth": 1.2
			}],
			"width": 12.015625
		},
		"7": {
			"vectors": [{
				"path": "m 0 6.13l 8.5 -1.04c -1.85 2.68 -3.48 5.91 -4.91 9.01",
				"length": 18.837,
				"strokeWidth": 1.2
			}],
			"width": 10.015625
		},
		"8": {
			"vectors": [{
				"path": "m 6.27 5.89c -0.2 -0.39 0.08 -0.44 -0.27 -0.5c -1.77 -0.52 -4.53 0.71 -5.442 1.53l 0.02 0.8c 0.702 0.71 1.842 0.88 2.812 1.27c 0.89 0.37 1.59 0.97 1.79 1.51c 0.33 3.2 -2.64 3.7 -3.41 3.8c -1.978 -2 -1.215 -3 -0.23 -5.15c 2.54 -1.48 5.04 -2.97 7.52 -3.51",
				"length": 32.613,
				"strokeWidth": 1.2
			}],
			"width": 10
		},
		"9": {
			"vectors": [{
				"path": "m 6.34 5.11c -0.19 -0.3 -0.21 -0.7 -0.5 -0.66c -4.09 0.54 -5.425 3.5 -5.728 5.28c 3.018 0.02 5.498 -1.77 7.138 -3.31c -1.87 3.05 -1.7 6.18 -4.48 9.98",
				"length": 28.321,
				"strokeWidth": 1.3
			}],
			"width": 8.671875
		},
		"!": {
			"vectors": [{
				"path": "m 4.37 0.13c -1.41 5.06 -2.83 10.07 -3.901 15.57",
				"length": 16.056,
				"strokeWidth": 1
			}],
			"width": 5.34375
		},
		"?": {
			"vectors": [{
				"path": "m 0.045 5.02c 3.685 -1.39 7.115 -1.85 8.615 -1.01c -0.42 1.84 -4.65 4.05 -7.23 7.29c 0 0.9 1.84 2.8 1.87 2.7c 0 0 -1 0.9 -1.69 1.1",
				"length": 24.595,
				"strokeWidth": 1
			}],
			"width": 8.6875
		},
		".": {
			"vectors": [{
				"path": "m 0.246 13.3l 1.384 1.2",
				"length": 1.832,
				"strokeWidth": 1.5
			}],
			"width": 2.6875
		},
		",": {
			"vectors": [{
				"path": "m 1.79 13.4l -1.656 3.3",
				"length": 3.692,
				"strokeWidth": 1.3
			}],
			"width": 2.6875
		},
		"A": {
			"vectors": [{
				"path": "m 0.089 14.4c 1.451 -3.8 3.801 -7.45 6.181 -11.1c -0.99 3.93 -0.77 7.8 0.38 11.5",
				"length": 24.385,
				"strokeWidth": 1.2
			}, {
				"path": "m 1.87 9.75l 3.96 -0.62",
				"length": 4.008,
				"strokeWidth": 1.2
			}],
			"width": 7.34375
		},
		"Ä": {
			"vectors": [{
				"path": "m 0.063 14.6c 1.277 -4 3.787 -7.48 6.217 -11c -1.44 6.28 -0.33 8.5 0.41 11.3",
				"length": 24.17,
				"strokeWidth": 1.2
			}, {
				"path": "m 1.96 10.1l 3.78 -0.48",
				"length": 3.81,
				"strokeWidth": 1.2
			}, {
				"path": "m 4.98 0.978l -0.05 1.942",
				"length": 1.943,
				"strokeWidth": 1.2
			}, {
				"path": "m 7.39 0.844l -0.05 2.056",
				"length": 2.057,
				"strokeWidth": 1.2
			}],
			"width": 7.359375
		},
		"B": {
			"vectors": [{
				"path": "m 1.87 5.17c -0.51 3.07 -1.121 6.13 -1.691 9.23",
				"length": 9.384,
				"strokeWidth": 1.2
			}, {
				"path": "m 1.14 5.04c 2.82 -1.17 5.39 -1.29 7.86 -0.98c -0.43 2.79 -5.19 3.71 -7.95 5.13c 2.56 -0.46 5.14 -0.99 7.01 0.91c -0.29 2.2 -2.67 2.8 -4.29 3.7l -3.324 0.1",
				"length": 34.493,
				"strokeWidth": 1.2
			}],
			"width": 10
		},
		"C": {
			"vectors": [{
				"path": "m 8.93 4.06c -4.92 2 -10 7.24 -7.43 9.74c 3.08 0.6 6.39 -0.7 9.1 -1.8",
				"length": 23.186,
				"strokeWidth": 1.5
			}],
			"width": 10.015625
		},
		"D": {
			"vectors": [{
				"path": "m 3.04 5.35c -1.54 3.17 -2.223 5.95 -2.906 9.05",
				"length": 9.53,
				"strokeWidth": 1.5
			}, {
				"path": "m 1.38 4.33c 5.07 0.56 8.36 1.39 9.02 4.44c -2.87 3.73 -6.29 3.63 -9.552 4.73",
				"length": 21.673,
				"strokeWidth": 1.5
			}],
			"width": 10.671875
		},
		"E": {
			"vectors": [{
				"path": "m 3.86 5.02c -0.17 4.29 -2.27 6.18 -3.414 9.28c 3.214 -1 5.484 -0.7 8.104 -0.9",
				"length": 18.169,
				"strokeWidth": 1.5
			}, {
				"path": "m 4.06 5.35c 2.39 -1.37 4.6 -1.46 6.84 -1.49",
				"length": 7.089,
				"strokeWidth": 1.5
			}, {
				"path": "m 3.15 9.84l 5 -0.54",
				"length": 5.029,
				"strokeWidth": 1.5
			}],
			"width": 10.671875
		},
		"F": {
			"vectors": [{
				"path": "m 2.97 5.91c -0.75 3.09 -1.57 6.69 -2.992 8.69",
				"length": 9.239,
				"strokeWidth": 1.2
			}, {
				"path": "m 1.25 6.71c 4.23 -3.92 5.97 -2.69 8.28 -2.83",
				"length": 9.133,
				"strokeWidth": 1.5
			}, {
				"path": "m 0.491 9.73l 8.329 -1.68",
				"length": 8.497,
				"strokeWidth": 1.5
			}],
			"width": 8.671875
		},
		"G": {
			"vectors": [{
				"path": "m 7.6 3.59c -3.7 2.35 -6.12 5.21 -7.362 9.71c 2.602 2 8.362 -0.5 8.152 -2.4c -0.73 -1.66 -2.76 -0.92 -4.54 -0.8",
				"length": 27.084,
				"strokeWidth": 1.2
			}],
			"width": 9.34375
		},
		"H": {
			"vectors": [{
				"path": "m 4.58 3.66c -1.21 3.94 -2.87 7.84 -4.424 11.84",
				"length": 12.643,
				"strokeWidth": 1.2
			}, {
				"path": "m 1.9 9.82c 3.06 -0.23 4.88 -0.98 7.12 -1.54",
				"length": 7.3,
				"strokeWidth": 0.8
			}, {
				"path": "m 9.11 3.52c -1.06 4.82 -2.31 6.2 -3.13 10.48",
				"length": 10.95,
				"strokeWidth": 1.2
			}],
			"width": 9.34375
		},
		"I": {
			"vectors": [{
				"path": "m 3.73 3.34l -3.44 11.06",
				"length": 11.583,
				"strokeWidth": 1.5
			}],
			"width": 4.015625
		},
		"J": {
			"vectors": [{
				"path": "m 6.79 3.52l -2.01 10.18c -0.74 0.6 -1.51 0.5 -2.08 0.4l -2.321 -2.1",
				"length": 15.702,
				"strokeWidth": 1.2
			}],
			"width": 6.6875
		},
		"K": {
			"vectors": [{
				"path": "m 3.46 2.41c 0.25 5.03 -1.62 8.59 -3.281 12.19",
				"length": 12.776,
				"strokeWidth": 0.8
			}, {
				"path": "m 8.33 4.44c -3.44 1.08 -5.45 3.86 -5.85 6.26c 5.07 0.3 5.72 2.4 5.98 3.2",
				"length": 16.25,
				"strokeWidth": 1.2
			}],
			"width": 8.6875
		},
		"L": {
			"vectors": [{
				"path": "m 3.93 1.98c -0.03 4.54 -2.32 8.52 -3.573 12.02l 8.123 0.1",
				"length": 20.746,
				"strokeWidth": 1.2
			}],
			"width": 8.015625
		},
		"M": {
			"vectors": [{
				"path": "m 0.446 15.5c 1.274 -3.7 2.974 -5.86 3.954 -10.95l 1.34 0l 1.38 5.07c 1.31 -2.25 2.51 -6.23 3.88 -6.63c 0.7 0.46 0.9 1.2 1.1 1.89c -0.7 3.29 -1.7 6.52 -1.9 9.92",
				"length": 38.41,
				"strokeWidth": 1.4
			}],
			"width": 11.34375
		},
		"N": {
			"vectors": [{
				"path": "m 0.223 15.1l 6.047 -10.86c 1.13 0.41 -0.34 6.86 0.65 10.16c 0.92 -1.1 1.73 -2.6 2.95 -4.81c 0.63 -3.3 1.53 -6.23 2.53 -8.947",
				"length": 37.717,
				"strokeWidth": 1.2
			}],
			"width": 11.34375
		},
		"O": {
			"vectors": [{
				"path": "m 6.41 3.57c -6.024 1.27 -7.231 11.03 -3.81 10.73c 4 -1.1 3.11 -1.3 4.88 -2.4c 2.44 -6.24 0.28 -7.83 -1.7 -8.49",
				"length": 29.787,
				"strokeWidth": 1.2
			}],
			"width": 8.671875
		},
		"Ö": {
			"vectors": [{
				"path": "m 4.51 3.97c -6.05 6.63 -3.676 9.83 -2.21 10.43c 2.37 -0.1 3.94 -1.3 5.38 -2.7c 1.74 -4.75 0.57 -6.48 -0.78 -8.04c -1.1 -0.38 -2.21 0.29 -3.31 0.82",
				"length": 30.514,
				"strokeWidth": 1
			}, {
				"path": "m 5.33 0.667l 0 1.673",
				"length": 1.673,
				"strokeWidth": 1
			}, {
				"path": "m 7.69 0.604l 0 1.786",
				"length": 1.786,
				"strokeWidth": 1
			}],
			"width": 9.34375
		},
		"P": {
			"vectors": [{
				"path": "m 2.88 4.71c -0.07 5.69 -1.6 7.59 -2.768 10.39",
				"length": 10.871,
				"strokeWidth": 1.2
			}, {
				"path": "m 1.94 4.64c 3.68 -1.1 6.56 -0.63 8.86 1.07c 0.3 2.11 -2.29 2.95 -8.01 2.81",
				"length": 18.732,
				"strokeWidth": 1.2
			}],
			"width": 10.015625
		},
		"Q": {
			"vectors": [{
				"path": "m 5.6 3.57c -7.09 5.09 -5.292 10.63 -4.06 10.83c 4.32 0.3 7.76 -6.6 4.22 -10.54c -0.26 -0.3 -0.6 0.92 -1.43 1.78",
				"length": 29.481,
				"strokeWidth": 0.8
			}, {
				"path": "m 4.37 9.39l 2.68 7.01",
				"length": 7.505,
				"strokeWidth": 1.2
			}],
			"width": 7.34375
		},
		"R": {
			"vectors": [{
				"path": "m 2.79 4.62c -0.2 2.8 -1.17 3.44 -1.55 4.5c -0.649 1.78 -0.66 3.18 -1.039 5.38",
				"length": 10.305,
				"strokeWidth": 1.2
			}, {
				"path": "m 1.29 4.95c 3.32 -1.89 6.42 -1.06 7.37 -0.04c -0.46 2.07 -3.82 2.82 -6.79 4.01c 0 0.46 -0.22 0.85 -0.3 1.38c 3 1.1 5.93 3.5 6.29 4.8",
				"length": 25.492,
				"strokeWidth": 1.2
			}],
			"width": 8.015625
		},
		"S": {
			"vectors": [{
				"path": "m 8.59 3.48c -3 0.44 -5.9 1.14 -8.255 3.35c 1.985 2.3 5.395 1.95 8.165 3.97c 0.06 2.8 -1.65 2.8 -2.65 3.5c -1.87 -0.2 -3.67 -0.9 -5.649 -1.3",
				"length": 28.822,
				"strokeWidth": 1.2
			}],
			"width": 8.6875
		},
		"T": {
			"vectors": [{
				"path": "m 0.022 5.76c 7.138 -3.05 9.528 -2.02 12.878 -2.13c -2.6 0.29 -5.3 -0.2 -7.68 1.14c -1.12 2.88 -1.78 6.13 -2.5 9.33",
				"length": 30.722,
				"strokeWidth": 1.2
			}],
			"width": 8
		},
		"U": {
			"vectors": [{
				"path": "m 3.44 4.73c -2.04 4.85 -3.579 9.07 -2.569 9.57c 2.939 -0.3 5.749 -3.6 7.049 -5.42l 1.32 -5.18l -3.03 11.7",
				"length": 36.732,
				"strokeWidth": 1.2
			}],
			"width": 10
		},
		"Ü": {
			"vectors": [{
				"path": "m 3.47 4.8c -1.12 3.18 -3.274 6 -2.728 9.7c 2.848 -0.5 6.008 -3.5 7.138 -5.63c 0.66 -1.96 0.83 -3.39 1.01 -4.83l 0.72 0c -2.67 7.76 -2.73 8.06 -3.26 11.66",
				"length": 37.359,
				"strokeWidth": 1.2
			}, {
				"path": "m 5.41 1.63l -0.06 1.86",
				"length": 1.861,
				"strokeWidth": 1.2
			}, {
				"path": "m 7.78 1.79l -0.09 1.89",
				"length": 1.892,
				"strokeWidth": 1.2
			}],
			"width": 9.34375
		},
		"V": {
			"vectors": [{
				"path": "m 1.3 3.02c -1.313 5.88 -0.683 8.18 -0.534 11.38c 1.694 -0.6 3.004 -3 4.954 -6.86c 1.61 -3.99 3.29 -5.33 4.58 -5.97",
				"length": 27.767,
				"strokeWidth": 1.2
			}],
			"width": 8.671875
		},
		"W": {
			"vectors": [{
				"path": "m 1.2946431 -2.1244261l -0.915 17.299l 0.87 -0.826c 0.492506 -2.583547 2.374507 -5.658225 3.080358 -7.388393c 1.4009247 1.6552972 1.23643 6.757592 1.8526778 8.839285c 5.5642596 -2.152912 8.5369556 -16.23990385 9.4196426 -21.361606",
				"length": 59.683,
				"strokeWidth": 2
			}],
			"width": 14.5
		},
		"X": {
			"vectors": [{
				"path": "m 0.982 3.34c 2.578 3.51 3.988 7.46 5.738 11.36",
				"length": 12.756,
				"strokeWidth": 1.2
			}, {
				"path": "m 9.24 3.95c -4.17 3.5 -7.06 7.15 -9.151 10.85",
				"length": 14.272,
				"strokeWidth": 1.2
			}],
			"width": 8.671875
		},
		"Y": {
			"vectors": [{
				"path": "m 0.112 3.5l 3.708 5.02",
				"length": 6.241,
				"strokeWidth": 1.2
			}, {
				"path": "m 8.3 3.48c -3.44 5.21 -5.59 6.72 -7.675 10.52l 0.112 1.4",
				"length": 14.441,
				"strokeWidth": 1.4
			}],
			"width": 8.015625
		},
		"Z": {
			"vectors": [{
				"path": "m 2.88 3.99l 6.94 1.16c -2.57 3.41 -6.31 5.65 -9.485 8.45l 11.565 -0.4",
				"length": 31.345,
				"strokeWidth": 1
			}, {
				"path": "m 3.5 8.66l 5.41 -0.45",
				"length": 5.429,
				"strokeWidth": 1
			}],
			"width": 10.671875
		},
		"a": {
			"vectors": [{
				"path": "m 9.3303571 4.0586188c -2.999 -0.214 -6.722 1.757 -8.973 7.991l 0.66964284 0.892857c 3.316909 0.584791 5.8171958 -2.153125 7.4776785 -8.035714l 0.96 0.536c -1.595 3.547 -3.839 7.143 -3.951 10.58",
				"length": 38.576,
				"strokeWidth": 2
			}],
			"width": 10.22
		},
		"ä": {
			"vectors": [{
				"path": "m 6.03 7.68c -3.98 0.47 -4.46 3.12 -5.841 5.22l 0.742 0.7c 2.399 -0.1 3.739 -1.9 4.799 -5.5l 0.57 -0.09c -0.95 2.59 -2.73 5.89 -2.64 7.49",
				"length": 25.703,
				"strokeWidth": 1.2
			}, {
				"path": "m 3.43 3.71l -0.12 1.79",
				"length": 1.794,
				"strokeWidth": 1.2
			}, {
				"path": "m 5.82 3.56l 0 2.05",
				"length": 2.05,
				"strokeWidth": 1.2
			}],
			"width": 7.359375
		},
		"b": {
			"vectors": [{
				"path": "m 4.6 3.7c -1.2 2 -2.5 4.5 -4.51 9.3c 1.61 -2 2.11 -5.3 6.01 -4.7c 1.3 1.7 -2.5 4.7 -4.8 5.7c -0.64 0 -1.45 -1 -1.55 -1",
				"length": 28.672,
				"strokeWidth": 1.5
			}],
			"width": 6.6875
		},
		"c": {
			"vectors": [{
				"path": "m 7.1 6.3c -2.2 1.9 -6.64 3 -6.52 6.7c 2.12 1 6.32 -1 8.92 -2",
				"length": 19.163,
				"strokeWidth": 1.5
			}],
			"width": 8.015625
		},
		"d": {
			"vectors": [{
				"path": "m 5.2 9.4c -0.9 -0.1 -1.7 -0.2 -2.9 0.6c -2.04 2 -1.83 3 -1.64 4c 1.14 0 2.74 -3 4.44 -4.3c 0.7 -0.1 2.6 -4.9 4 -7.5c -6.8 13.8 -2.6 10.8 -2.8 12.8",
				"length": 36.367,
				"strokeWidth": 1.5
			}],
			"width": 8
		},
		"e": {
			"vectors": [{
				"path": "m 3.1928568 8.142857c 1.768 -0.496 5.911 -0.636 7.911 -3.536c -0.016 -1.221 -3.018 -1.509 -7.543 2.359c -1.83 2.4 -2.643 4.32 -2.373 5.32c 0.8862171 2.22608 5.5989623 1.26121 8.2907139 0.6875",
				"length": 32.555,
				"strokeWidth": 2.5
			}],
			"width": 11.4375
		},
		"f": {
			"vectors": [{
				"path": "m 9.5 2.1c -1.3 0.1 -2.7 0.3 -4 2.3c -1.1 3.2 -1.6 7.6 -1.6 10.6",
				"length": 15.591,
				"strokeWidth": 1.2
			}, {
				"path": "m -0.11 10l 9.11 -1",
				"length": 9.165,
				"strokeWidth": 2.51
			}],
			"width": 8.015625
		},
		"g": {
			"vectors": [{
				"path": "m 9.87 7.52c -2.72 0.2 -5.01 0.58 -6.32 2.36l 0.24 0.62c 1.52 0.2 3.06 0.3 3.93 1.4c -0.8 6.5 -2.94 7.7 -4.64 8.3c -1.71 -0.2 -2.333 -1.3 -2.901 -2.1",
				"length": 25.724,
				"strokeWidth": 1.3
			}],
			"width": 8
		},
		"h": {
			"vectors": [{
				"path": "m 4.62 0.643c -1.4 5.597 -2.88 10.257 -4.709 13.557c 1.629 -1.9 3.769 -5.88 5.919 -7.11c 0.8 2.5 -0.85 6.01 -0.99 8.81",
				"length": 32.637,
				"strokeWidth": 1.5
			}],
			"width": 7.34375
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
			"width": 5.0
		},
		"j": {
			"vectors": [{
				"path": "m 6.79 1.4l -0.79 3.06c 0.75 2.95 0.65 6.04 0.92 9.14c -1.21 7.1 -3.23 6.2 -4.26 6.5c -1.1 -0.6 -1.673 -1.9 -2.481 -3",
				"length": 24.809,
				"strokeWidth": 1.3
			}],
			"width": 4.6875
		},
		"k": {
			"vectors": [{
				"path": "m 5.09 1.69c -1.92 3.81 -3.52 8.21 -5.023 12.81",
				"length": 13.772,
				"strokeWidth": 1.3
			}, {
				"path": "m 8.06 7.5c -1.84 0.6 -4.03 0.62 -4.42 2.12c -0.23 2.78 3.53 4.78 4.19 7.88",
				"length": 14.218,
				"strokeWidth": 1.3
			}],
			"width": 8.6875
		},
		"l": {
			"vectors": [{
				"path": "m 7.9687497 -6.1646046l -7.411 22.232",
				"length": 23.435,
				"strokeWidth": 2.5
			}],
			"width": 8.015625
		},
		"m": {
			"vectors": [{
				"path": "m 2.19 7.01l -2.123 7.09l 4.083 -4.55l 2.18 -0.81c -0.22 1.56 -0.48 3.16 -0.71 4.36l 4.98 -5.16l 0.6 0.1l -1 6.79",
				"length": 34.901,
				"strokeWidth": 1.5
			}],
			"width": 12
		},
		"n": {
			"vectors": [{
				"path": "m 2.17 6.27c -0.71 3.3 -1.295 6.53 -1.947 7.33l 5.157 -5.79c -0.5 2.39 -0.56 4.99 -0.65 7.49",
				"length": 22.895,
				"strokeWidth": 1.3
			}],
			"width": 6.6875
		},
		"o": {
			"vectors": [{
				"path": "m 3.93 7.09c -1.89 2.3 -2.75 3.11 -3.662 5.41c 0.083 0.9 0.326 1.4 0.762 1.9c 1.72 -0.5 3.13 -1.6 4.22 -4.76c -0.1 -1.38 -1.25 -2.06 -1.99 -3.01",
				"length": 18.995,
				"strokeWidth": 1.5
			}],
			"width": 6
		},
		"ö": {
			"vectors": [{
				"path": "m 2.95 8.2c -3.048 3.7 -2.641 4.5 -2.177 6.1c 3.837 0.6 5.617 -6.05 3.437 -6.92l -1.15 0.1",
				"length": 17.78,
				"strokeWidth": 1.3
			}, {
				"path": "m 2.67 3.81l 0 1.92",
				"length": 1.92,
				"strokeWidth": 1.3
			}, {
				"path": "m 5.21 3.93l -0.13 1.79",
				"length": 1.795,
				"strokeWidth": 1.3
			}],
			"width": 6.015625
		},
		"p": {
			"vectors": [{
				"path": "m 1.76 7.92c -0.44 5.18 -1.33 8.18 -1.693 12.48",
				"length": 12.598,
				"strokeWidth": 1.3
			}, {
				"path": "m 1.65 8.77c 2.57 -1.16 5.18 -0.9 6.56 0.58c -1.45 1.85 -4.62 2.35 -5.98 2.55c -0.4 0.1 -0.33 -1.4 -0.09 -2.73",
				"length": 16.541,
				"strokeWidth": 1.5
			}],
			"width": 8.671875
		},
		"q": {
			"vectors": [{
				"path": "m 6.09 7.99c -1.92 -0.88 -4.45 0.43 -5.554 3.01c -0.209 2.1 0.436 2.4 1.984 2.4c 1.2 0.1 2.22 -2.3 2.35 -5.06c 0.15 0.3 0.79 0 0.71 0.32c -1.84 6.64 -4.44 11.84 -4.08 14.94c 0.59 0.7 0.74 0.6 1.69 0.6",
				"length": 35.155,
				"strokeWidth": 1.3
			}],
			"width": 7.359375
		},
		"r": {
			"vectors": [{
				"path": "m 2.57 6.92c -1.39 2.54 -1.743 4.78 -2.436 7.28l 2.856 -6.48c 1.82 -1.01 2.75 -0.75 3.57 -0.36",
				"length": 18.542,
				"strokeWidth": 1.3
			}],
			"width": 7.34375
		},
		"s": {
			"vectors": [{
				"path": "m 9.51 7.23c -2.29 0.13 -4.48 0.68 -7.01 2.01c 2.28 0.61 4.46 1.06 5.36 3.36c -1.11 1.3 -1.96 1.6 -3.02 1.8c -1.66 -0.3 -3.23 -0.9 -4.773 -1.5",
				"length": 22.581,
				"strokeWidth": 1.3
			}],
			"width": 8.015625
		},
		"t": {
			"vectors": [{
				"path": "m 5.29 4.3c -0.2 1.03 -0.11 2.1 -0.43 3.02c -0.84 2.42 -0.98 4.58 -1.42 6.88",
				"length": 10.092,
				"strokeWidth": 1.4
			}, {
				"path": "m 0.089 8.66l 10.411 -2.1",
				"length": 10.621,
				"strokeWidth": 1.4
			}],
			"width": 8.671875
		},
		"u": {
			"vectors": [{
				"path": "m 2.21 8.72c -1.765 1.27 -1.434 3.08 -1.853 4.98c 5.053 -0.7 6.443 -4.67 7.453 -7.5",
				"length": 16.758,
				"strokeWidth": 1.5
			}],
			"width": 8.671875
		},
		"ü": {
			"vectors": [{
				"path": "m 2.26 8.51c -1.843 1.19 -1.518 3.19 -2.023 4.99c 4.623 -0.2 6.443 -4.26 7.603 -7.56",
				"length": 17.062,
				"strokeWidth": 1.5
			}, {
				"path": "m 3.28 3.35l 0 1.72",
				"length": 1.72,
				"strokeWidth": 1.5
			}, {
				"path": "m 5.79 3.49l 0 1.56",
				"length": 1.56,
				"strokeWidth": 1.5
			}],
			"width": 8.6875
		},
		"v": {
			"vectors": [{
				"path": "m 1.03 6.87l -0.829 7.03l 9.129 -8.23",
				"length": 19.37,
				"strokeWidth": 1.5
			}],
			"width": 8.6875
		},
		"w": {
			"vectors": [{
				"path": "m 1.54 6.6c -0.1 2.68 -0.714 4.8 -1.272 7c 1.692 -1 3.592 -2 4.552 -3c -0.41 1.2 -0.48 2.2 -0.36 3c 3.63 0 3.22 -2.3 3.91 -4.01",
				"length": 21.963,
				"strokeWidth": 1.3
			}],
			"width": 9.34375
		},
		"x": {
			"vectors": [{
				"path": "m 1.85 7.72c 3.1 1.58 4.06 3.88 4.8 6.28",
				"length": 8.166,
				"strokeWidth": 1
			}, {
				"path": "m 8.33 7.63c -1.69 0.27 -4.39 3.17 -8.308 6.47",
				"length": 10.599,
				"strokeWidth": 1.5
			}],
			"width": 8.6875
		},
		"y": {
			"vectors": [{
				"path": "m 3.46 6.6c 0.62 1.98 1.26 4 2.34 5.8",
				"length": 6.27,
				"strokeWidth": 1.5
			}, {
				"path": "m 11.1 6.51c -4.98 7.09 -7.41 8.69 -11.033 15.89",
				"length": 19.383,
				"strokeWidth": 1.5
			}],
			"width": 10.015625
		},
		"z": {
			"vectors": [{
				"path": "m 1.83 7.9c 2.78 0 5.38 0.28 7.46 1.09c -3 1.71 -6.26 2.71 -9.134 4.11c 3.964 1.1 8.934 0.5 13.444 0.6",
				"length": 31.103,
				"strokeWidth": 1.2
			}],
			"width": 11.34375
		}
	};

	var vectorizer = {
		toSvg: function(id, text, speed) {
			var compiled = _.template(valuesTemplate);
			return compiled({
				id: id,
				text: text,
				font: stanHandFont,
				color: '#555555',
				speed: speed || 600,
				lineHeight: 40,
				tabWidth: 80
			})
		},
		animate: function(svgEl) {
			$(svgEl).find('path').attr('stroke-dashoffset', 0);
		}
	}

	return vectorizer;
})