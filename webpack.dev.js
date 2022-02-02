var webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {

  // This option controls if and how source maps are generated.
  // https://webpack.js.org/configuration/devtool/
  devtool: 'eval-cheap-module-source-map',

  // https://webpack.js.org/concepts/entry-points/#multi-page-application
  entry: {
    index: './src/pages/index/main.js'
  },

  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    port: 8080,
    writeToDisk: false // https://webpack.js.org/configuration/dev-server/#devserverwritetodisk-
  },

  // https://webpack.js.org/concepts/loaders/
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  esmodules: true
                }
              }
            ]
          ]
        }
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader'
          // Please note we are not running postcss here
        ]
      },
      {
        test: /\.scss$/i,
        use: [
          {
            loader: 'style-loader',
            options: {
              injectType: 'styleTag'
            }
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                    {
                      // Options
                    }
                  ]
                ]
              }
            }
          },
          {
            loader: 'sass-loader', options: { sourceMap: true }
          }
        ]
      },
      {
        // Load all images as base64 encoding if they are smaller than 8192 bytes
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              // On development we want to see where the file is coming from, hence we preserve the [path]
              name: '[name].[ext]',
              outputPath: 'assets/img/',
              esModule: false,
              limit: false
            }
          }
        ]
      },
      {
        // Fonts
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/font/'
            }
          }
        ]
      }
    ]
  },

  // https://webpack.js.org/concepts/plugins/
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/index/tmpl.html',
      inject: true,
      chunks: ['index'],
      filename: 'index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets', to: 'assets'
        }
      ]
    })
  ]
}
