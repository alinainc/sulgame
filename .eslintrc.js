// Copyright (C) 2019 Alina Inc. All rights reserved.

const curly = { minProperties: 6, multiline: true, consistent: true };
const path = require('path');

module.exports = {
  env: {
    browser: true,
  },
  globals: {
    config: true,
    REVISION: true,
  },
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
    'import/no-named-as-default-member': 0,
    // temporary rule
    // https://github.com/benmosher/eslint-plugin-import/issues/389
    'import-helpers/order-imports': [
      'error',
      {
        'newlinesBetween': 'always', // new line between groups
        groups: [
          'module',
          ['/^@/', '/^components/', '/^pages/'],
          ['parent', 'sibling', 'index'],
        ],
        alphabetize: { order: 'asc', ignoreCase: false },
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
  },
  settings: {
    'import/resolver': {
      node: {
        paths: [
          path.resolve(__dirname),
        ],
      },
    },
  },
};