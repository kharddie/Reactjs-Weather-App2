//const debug = process.env.NODE_ENV !== "production"; //if developement
console.log("This is the Webpack 4 testing 'mode':" + process.env.NODE_ENV !== "production");
console.log("process.env.NODE_ENV:" + process.env.NODE_ENV);
const webpack = require('webpack');
const merge = require("webpack-merge");
const path = require('path');
const CleanWebpackPlugin = require("clean-webpack-plugin");

const PATHS = {
  app: path.join(__dirname, "src"),
  build: path.join(__dirname, "dist"),
};
const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const parts = require("./webpack.parts");





const commonConfig = merge([
  {
    context: PATHS.app,

    plugins: [
      new HtmlWebpackPlugin({
        template: 'templates/index.template.ejs',
        inject: 'body',
      }),
    ],

    entry: [
      'react-hot-loader/patch',
      './js/index.js'
    ],

    output: {
      path: PATHS.build,
      filename: "client.min.js"
    },

    resolve: {
      extensions: ['*', '.js', '.jsx']
    },
  },

  parts.loadJavaScript({ include: PATHS.app }),
  parts.loadImages(),

]);



//::::PRODUCTION::::
const productionConfig = merge([

  {
    output: {
      chunkFilename: "[name].[chunkhash:8].js",
      filename: "[name].[chunkhash:8].js",
      publicPath: "/reactjs/Reactjs-Weather-App/"
    },
    plugins: [
      new webpack.NamedModulesPlugin(),
      new CopyWebpackPlugin([
        { from: PATHS.app + '/img', to: 'images' }
      ]),

    ],
  },

  parts.extractCSS({
    use: [
      {
        loader: 'css-loader', options: { minimize: true },
      },
      parts.autoprefix()
    ],
  }),

  parts.purifyCSS({
    paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true }),
  }),

  parts.loadImages({
    options: {
      limit: 15000,
      name: "[name].[hash:8].[ext]",
    },
  }),
  parts.generateSourceMaps({ type: "source-map" }),

  {
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
            chunks: "all",
          },
        },
      },
      runtimeChunk: {
        name: "manifest",
      },
    },
    recordsPath: path.join(__dirname, "records.json"),
  },
  parts.clean(PATHS.build),
  parts.attachRevision(),
  parts.setFreeVariable("ENVPROD", "hello from PRODUCTION Config"),

]);

//::::DEVELPMENT::::
const developmentConfig = merge(
  [
    parts.devServer({
      inline: true,
      host: '127.0.0.1', // in this section, I have tried to change IP address by server IP
      port: 3000
    }),
    parts.setFreeVariable("ENVPROD", "hello from developm onfig"),
    parts.loadCSS(),
  ]);




  module.exports = mode => {
    process.env.BABEL_ENV = mode;

    if (mode === "production") {
        return merge(commonConfig, productionConfig, { mode });
    }

    return merge(commonConfig, developmentConfig, { mode });
};
