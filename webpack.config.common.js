const path = require('path');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const dartSass = require('dart-sass');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader')

const {
  NODE_ENV = 'development',
} = process.env;

const SRC_PATH = path.resolve(__dirname, 'src');
const NODE_MODULES_PATH = path.resolve(__dirname, 'node_modules');

const isProduction = NODE_ENV === 'production';

const commonConfig = {
  entry: {
    app: [path.resolve(SRC_PATH, 'main.tsx')],
  },
  output: {
    filename: '[id].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/', // HTML 中的引用起始路徑
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: path.resolve(__dirname, 'tsconfig.json'),
            },
          },
        ],
        exclude: [NODE_MODULES_PATH],
        include: [SRC_PATH],
      },
      {
        test: /\.(css|s[ac]ss)$/,
        include: [SRC_PATH],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: `${isProduction ? '' : '[name]__[local]--'}[hash:base64:5]`,
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: dartSass, // 強制使用 dart-sass (而不是 node-sass)
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
        include: [NODE_MODULES_PATH],
        exclude: [SRC_PATH],
      },
    ],
  },
  stats: {
    assets: false,
    children: false,
    chunks: false,
    chunkModules: false,
    colors: true,
    entrypoints: false,
    hash: false,
    modules: false,
    timings: false,
    version: false,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CheckerPlugin(),
    new HTMLWebpackPlugin({
      template: path.resolve(SRC_PATH, 'index.html'),
      inject: 'body',
      filename: 'index.html',
      minify: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        quoteCharacter: "'",
        removeComments: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
  ],
  optimization: {
    emitOnErrors: false,
    moduleIds: 'named',
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: 1,
        },
      },
    },
  },
  resolve: {
    mainFields: ['browser', 'main', 'module'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@@core': path.resolve(SRC_PATH, 'core'),
      '@@ui': path.resolve(SRC_PATH, 'ui'),
      '@@domains': path.resolve(SRC_PATH, 'domains'),
      '@@icons': path.resolve(SRC_PATH, 'icons'),
    },
  },
};

module.exports = (config) => merge(config, commonConfig);
