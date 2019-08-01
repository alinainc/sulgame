// Copyright (C) 2019 Alina Inc. All rights reserved.

const path = require('path');

module.exports = {
  rules: {
    'import/no-named-as-default-member': 0,
    // temporary rule
    // https://github.com/benmosher/eslint-plugin-import/issues/389
    'import-helpers/order-imports': [
      'error',
      {
        'newlinesBetween': 'always', // new line between groups
        groups: [
          'module',
          ['/^@/', '/^components/', '/^messages/', '/^platform/', '/^pages/'],
          ['parent', 'sibling', 'index'],
        ],
        alphabetize: { order: 'asc', ignoreCase: false },
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: [
          path.resolve(__dirname, './'),
        ]
      },
    },
  },
};
