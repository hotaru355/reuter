({
    baseUrl: ".",
    mainConfigFile: 'svgCompiler.js',
    name: "svgCompiler",
    paths: {
    	requireLib : "../libs/require/require"
    },
    include: "requireLib",
    out: "../../../public/svgCompiler/svgCompiler-min.js",
})