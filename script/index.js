// Copyright (C) 2019 Alina Inc. All rights reserved.

import yargs from 'yargs';

const { argv } = yargs.commandDir('cmds').demandCommand(1).help();

// eslint-disable-next-line no-console
Promise.resolve(argv.promise).catch(console.error).then(() => {
  // eslint-disable-next-line no-console
  console.log('Done.');
});
