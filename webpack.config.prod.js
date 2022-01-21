const CompressionPlugin = require('compression-webpack-plugin');
const createConfig = require('./webpack.config.common');

module.exports = createConfig({
  devtool: false,
  mode: 'production',
  plugins: [
    new CompressionPlugin(),
  ],
});
