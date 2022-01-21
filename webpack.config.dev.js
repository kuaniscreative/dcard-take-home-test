const createConfig = require('./webpack.config.common.js');

module.exports = createConfig({
  mode: 'development',
  entry: {
    app: ['react-hot-loader/patch'],
  },
  devServer: {
    compress: true,
    port: 5050,
    hot: true,
    historyApiFallback: true,
  },
});
