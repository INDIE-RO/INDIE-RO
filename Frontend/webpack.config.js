const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.svg$/,
        oneOf: [
          {
            use: [{ loader: '@svgr/webpack' }], // svg를 컴포넌트로 사용
            issuer: /\.[jt]sx$/,
            resourceQuery: { not: [/url/] },
          },
          {
            type: 'asset', // svg를 url로 사용
            resourceQuery: /url/, // *.svg?url
          },
        ],
      },
      {
        test: /\.(png|jpeg|jpg)$/,
        type: 'asset/resource',
      },
    ],
  },
  mode: 'none',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/assets', to: 'assets' },
        { from: 'public/mockServiceWorker.js', to: '.' },
      ],
    }),
    new Dotenv(),
  ],
  devServer: {
    host: 'localhost',
    port: 3000,
    static: path.resolve(__dirname, 'dist'),
    historyApiFallback: true,
    hot: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};
