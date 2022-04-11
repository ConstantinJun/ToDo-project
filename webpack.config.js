const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    static: './app',
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'app'),
  },
};