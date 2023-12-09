const WebpackBar = require('webpackbar');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const resolve = require('path').resolve;

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'swc-loader',
        exclude: /node_modules/
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        minify: TerserPlugin.swcMinify,
        terserOptions: {
          compress: {
            unused: true
          },
          mangle: true
        }
      })
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        mode: 'write-references'
      }
    }),
    new EslintWebpackPlugin({ failOnError: true, extensions: ['ts', 'js'] }),
    new WebpackBar()
  ],
  watchOptions: {
    ignored: /node_modules/
  }
};
