// Copyright (C) 2019 Alina Inc. All rights reserved.

import readline from 'readline';

export const wrap = fn => (argv) => {
  const start = Date.now();
  argv.promise = Promise.resolve(fn(argv)) // eslint-disable-line no-param-reassign
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('time elapsed: ', Date.now() - start, '(ms)');
    });
};

export const question = str => new Promise((resolve, reject) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.on('SIGINT', () => {
    rl.close();
    reject(new Error('SIGINT'));
  });
  rl.question(str, (answer) => {
    rl.close();
    resolve(answer);
  });
});
