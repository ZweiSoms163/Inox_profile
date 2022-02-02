var webpack = require('webpack')

const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')

const buildPath = path.resolve(__dirname, 'dist')

module.exports = {

  // This option controls if and how source maps are generated.
  // https://webpack.js.org/configuration/devtool/
  devtool: 'source-map',

  // https://webpack.js.org/concepts/entry-points/#multi-page-application
  entry: {
    index: './src/pages/index/main.js'
  },

  // how to write the compiled files to disk
  // https://webpack.js.org/concepts/output/
  output: {
    filename: '[name].js',
    path: buildPath,
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
                  esmodules: true,
                },
              },
            ],
          ]
        }
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.scss$/i,
        use: [
          {
            loader: 'style-loader',
            options: {
              injectType: 'styleTag',
              modules: {
                namedExport: true
              }
            }
          },
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: true,
              modules: {
                localIdentName: '[local]'
              }
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
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        // Load all images as base64 encoding if they are smaller than 8192 bytes
        test: /\.(png|jpe?g|gif|webp)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/img/',
            }
          }
        ]
      },
      // {
      //   // Load all images as base64 encoding if they are smaller than 8192 bytes
      //   test: /\.svg$/,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         name: '[name].[ext]',
      //         outputPath: 'assets/img/svg/',
      //         limit: false
      //       }
      //     }
      //   ]
      // },
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
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        options: {
          spriteFilename: 'icons.svg'
        }
      }
    ]
  },

  // https://webpack.js.org/concepts/plugins/
  plugins: [
    new SpriteLoaderPlugin(),
    new CleanWebpackPlugin(), // cleans output.path by default
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets', to: 'assets'
        }
      ]
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/index/tmpl.html',
      inject: 'body',
      chunks: ['index'],
      filename: 'index.html',
      minify: false
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ],

  optimization: {
    minimize: false,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCssAssetsPlugin({})
    ]
  }
}
