var webpack = require("webpack");
var path = require("path");
var autoprefixer = require("autoprefixer");

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    externals: [
        "react",
        "react-dom",
        "rx",
        "immutable",
        "moment",
        /^rwwa-.*/,
    ],
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            // { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
			{ test: /\.tsx?$/, exclude: /node_modules/, use: ["ts-loader"] },
			{
			test: /\.scss$/,
				use: [
					"style-loader",
					"css-loader?sourceMap&modules",
					"postcss-loader",
					"sass-loader?sourceMap",
				],
			},
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            { test: /\.path$/, loader: "raw-loader" }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
          "classNames": "classnames",
        }),
        new webpack.LoaderOptionsPlugin({
          options: {
            context: __dirname,
            postcss: [autoprefixer],
          },
        }),
    ],

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
};

module.exports.plugins.push(
    new webpack.DefinePlugin({
      PRODUCTION: false,
    }));
