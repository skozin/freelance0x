var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ManifestPlugin = require('webpack-manifest-plugin')
var rimraf = require('rimraf')
var path = require('path')

var options = require('./options')

if (!options.isDevServer) {
  console.error('Removing output directory:', options.paths.output)
  rimraf.sync(options.paths.output)
}


module.exports = {
  context: options.paths.context,

  entry: {
    main: skipFalsy([
      options.isDevServer && 'react-hot-loader/patch',
      // activate HMR for React

      options.isDevServer && ('webpack-dev-server/client?http://localhost:' + options.devServerPort),
      // bundle the client for webpack-dev-server
      // and connect to the provided endpoint

      options.isDevServer && 'webpack/hot/only-dev-server',
      // bundle the client for hot reloading
      // only- means to only hot reload for successful updates

      require.resolve('./polyfills'),

      options.paths.appEntryPoint,
      // the entry point of our app
    ]),
  },

  output: {
    filename: options.isDevServer ? '[name].dev.js' : '[name].[chunkhash:8].js',
    path: options.paths.output,
    publicPath: options.publicUrl,
    pathinfo: options.dev,
  },

  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      '~': path.resolve(options.paths.context, 'src'),
      'styles': path.resolve(options.paths.context, 'styles'),
      'assets': path.resolve(options.paths.context, 'assets'),
    }
  },

  module: {
    rules: [
      { test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader', options: {
            presets: [
              ['es2015', {modules: false}],
              'react-app',
            ],
            plugins: skipFalsy([
              options.isDevServer && 'babel-plugin-styled-components',
              options.isDevServer && 'react-hot-loader/babel',
            ]),
          }},
        ],
      },
      { test: /\.s[ca]ss$/,
        use: styleLoader([
          { loader: 'css-loader', options: {
            sourceMap: true,
            minimize: options.uglify,
          }},
          postcssLoader(),
          { loader: 'resolve-url-loader', options: {
            root: options.paths.context,
            debug: false,
            keepQuery: true,
            sourceMap: true,
          }},
          { loader: 'sass-loader', options: {
            sourceMap: true,
          }},
        ])
      },
      { test: /\.css$/,
        use: styleLoader([
          { loader: 'css-loader', options: {
            sourceMap: true,
            minimize: options.uglify,
            importLoaders: 1,
          }},
          postcssLoader(),
        ]),
      },
      { test: /\.svg$/,
        use: [
          { loader: 'file-loader', options: {
            name: 'media/[name].[hash:8].[ext]'
          }},
        ],
      },
      { test: /\.ico$/,
        use: [
          { loader: 'file-loader', options: {
            name: '[name].[ext]'
          }},
        ],
      },
      { exclude: [/\.(html|jsx?|css|s[ca]ss|json|svg|ico)$/],
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'media/[name].[hash:8].[ext]',
          },
        }],
      },
    ],
  },

  plugins: skipFalsy([
    new InterpolateHtmlPlugin({
      PUBLIC_URL: options.publicUrl.replace(/[/]$/, '')
    }),

    new HtmlWebpackPlugin({
      inject: true,
      template: options.paths.indexHtml,
      minify: !options.uglify ? undefined : {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
    }),

    new webpack.DefinePlugin(options.env),

    !options.isDevServer && new ExtractTextPlugin({
      filename: '[name].[contenthash:8].css',
      allChunks: true,
    }),

    options.uglify && new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true, // React doesn't support IE8
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      },
      sourceMap: true,
    }),

    !options.isDevServer && new ManifestPlugin({
      fileName: 'asset-manifest.json'
    }),

    options.isDevServer && new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates
  ]),

  bail: !options.isDevServer,

  devtool: options.isDevServer ? 'cheap-module-eval-source-map' : 'source-map',

  devServer: {
    port: options.devServerPort,

    hot: true,
    // enable HMR on the server

    contentBase: options.paths.output,
    // match the output path

    publicPath: options.publicUrl,
    // match the output `publicPath`

    historyApiFallback: {
      rewrites: [
        { from: /./, to: options.publicUrl + 'index.html' },
      ]
    },

    stats: 'minimal',
  },
}


function postcssLoader() {
  return {
    loader: 'postcss-loader',
    options: {
      plugins: [
        autoprefixer({
          browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9']
          // React doesn't support IE8 anyway
        })
      ]
    }
  }
}


function styleLoader(loaders) {
  if (options.isDevServer) {
    return [{ loader: 'style-loader' }].concat(loaders)
  }
  return ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: loaders,
  })
}


function skipFalsy(array) {
  return array.filter(item => !!item)
}
