// Copyright (C) 2019 Alina Inc. All rights reserved.

const curly = { minProperties: 6, multiline: true, consistent: true };

module.exports = {
  extends: ['airbnb', 'plugin:jest/recommended'],
  parser: 'babel-eslint',
  plugins: [
    'eslint-plugin-import-helpers',
    'header',
    'jest',
    'react-hooks',
    'sort-destructure-keys',
  ],
  rules: {
    'header/header': ['error', 'line', ' Copyright (C) 2019 Alina Inc. All rights reserved.'],
    'max-len': ['error', { code: 100 }],
    'object-curly-newline': ['error', {
      ObjectExpression: { minProperties: 6, multiline: true, consistent: true },
      ObjectPattern: { minProperties: 6, multiline: true, consistent: true },
      ImportDeclaration: { minProperties: 6, multiline: true, consistent: true },
      ExportDeclaration: { minProperties: 6, multiline: true, consistent: true },
    }],
    'sort-destructure-keys/sort-destructure-keys': ['error', {
      caseSensitive: true,
    }],
    'sort-imports': ['error', {
      ignoreDeclarationSort: true,
    }],
    'sort-keys': ['error', 'asc'],
  },
};
