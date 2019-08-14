// Copyright (C) 2019 Alina Inc. All rights reserved.

import path from 'path';

const config = {
  entry: {'./src/index.js'},

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },

  module: {
    rules : [
      {
        exclude: /node_modules/,
        test: /\.jsx$/,
        use: ['babel-loader'],
      }
    ]
  },

  resolve: {
    alias: {
      '@frontend': path.resolve(__dirname, './src/@frontend'),
      'components': path.resolve(__dirname, './src/components'),
      'pages': path.resolve(__dirname, './src/pages'),
    }
  }
};

module.exports = config;
