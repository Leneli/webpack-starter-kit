import webpack				from "webpack";
import path					from "path";
import ExtractTextPlugin	from "extract-text-webpack-plugin";
import HtmlWebpackPlugin	from "html-webpack-plugin";
import HtmlBeautifyPlugin	from "html-beautify-webpack-plugin";
import autoprefixer			from "autoprefixer";
import postcssNext			from "postcss-cssnext";
import postcssImport		from "postcss-import";
import postcssExtend		from "postcss-extend";
import postcssReporter		from "postcss-reporter";
import MinifyPlugin			from "babel-minify-webpack-plugin";

const fs = require("fs");
const extractStyles = new ExtractTextPlugin({ filename: "css/[name].css" });
const supportedBrowsers = [
	"> 0.5%",
	"last 2 versions",
	"not ie <= 10",
];
const postcssProcessors = [
	postcssImport,
	postcssExtend,
	postcssNext({ browsers: supportedBrowsers }),
	postcssReporter({ clearReportedMessages: true }),
];
const scssProcessors = [
	autoprefixer({
		browsers: supportedBrowsers,
		cascade: false,
	}),
	postcssReporter({ clearReportedMessages: true }),
];
const htmlPlugins = generateHtmlWebpackPlugins("./src/pug/pages");

module.exports = () => {
	return {
		context: path.resolve(__dirname, "src"),

		entry: {
			main: "./app.js",
		},

		resolve: {
			alias: {
				"vue$": "vue/dist/vue.runtime.min.js"
			}
		},

		output: {
			path: path.resolve(__dirname, "dist"),
			filename: "js/[name].js",
		},

		watch: false,

		devtool: false,

		module: {
			rules: [
				{
					test: /\.js$/,
					include: path.resolve(__dirname, "src/js"),
					use: [
						{
							loader: "babel-loader",
							options: {
								cacheDirectory: true,
								plugins: [
									"transform-runtime",
									"transform-exponentiation-operator"
								],
							},
						},
						{
							loader: "eslint-loader",
							options: {
								cache: true,
								emitWarning: true,
								configFile: ".eslintrc",
							},
						},
					],
				},
				{
					test: /\.css$/,
					use: extractStyles.extract({
						use: [
							{
								loader: "css-loader",
								options: {
									minimize: true,
								},
							},
							{
								loader: "postcss-loader",
								options: {
									plugins: (loader) => postcssProcessors,
								},
							},
						],
						publicPath: "../",
					}),
				},
				{
					test: /\.scss$/,
					use: extractStyles.extract({
						use: [
							{
								loader: "css-loader",
								options: {
									minimize: true,
								},
							},
							{
								loader: "postcss-loader",
								options: {
									plugins: (loader) => scssProcessors,
								},
							},
							{
								loader: "sass-loader",
							},
						],
						publicPath: "../",
					}),
				},
				{
					test: /\.pug$/,
					use: [
						{
							loader: "html-loader?pretty=true",
							options: {
								minimize: false,
							},
						},
						{
							loader: "pug-html-loader?pretty=true",
							options: {
								exports: false,
								minimize: false,
							},
						},
					],
				},
				{
					test: /.*\.(gif|png|jpe?g|svg)$/i,
					use: [
						{
							loader: "file-loader",
							options: {
								name: "assets/img/[name].[ext]",
							},
						},
						{
							loader: "image-webpack-loader",
							options: {
								pngquant: {
									quality: "85-90",
									speed: 4,
								},
								mozjpeg: {
									quality: 85,
									progressive: true,
								},
								gifsicle: {
									interlaced: true,
								},
							},
						},
					],
				},
				{
					test: /\.(woff2?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
					use: [
						{
							loader: "file-loader",
							options: {
								name: "assets/fonts/[name].[ext]",
							},
						},
					],
				},
			]
		},

		plugins: [
			new webpack.DefinePlugin({
				LANG: JSON.stringify("en"),
				"process.env": { NODE_ENV: "'production'" },
			}),

			new webpack.optimize.CommonsChunkPlugin({
				name: "common",
			}),

			new HtmlBeautifyPlugin({
				config: {
					html: {
						end_with_newline: true,
						indent_size: 2,
						indent_with_tabs: true,
						indent_inner_html: true,
						preserve_newlines: true,
						unformatted: ["p", "i", "b", "span"]
					}
				},
				replace: [ " type='text/javascript'" ]
			}),

			extractStyles,

			new MinifyPlugin,
		].concat(htmlPlugins),
	}
};


// Generate HtmlWebpackPlugin for news Pages
function generateHtmlWebpackPlugins(templateDir) {
	const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));

	return templateFiles.map(item => {
		const parts = item.split(".");
		const name = parts[0];
		const extension = parts[1];

		return new HtmlWebpackPlugin({
			filename: `${name}.html`,
			template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
		});
	});
}
