// Copyright (C) 2019 Alina Inc. All rights reserved.

import yargs from 'yargs';

const { argv } = yargs.commandDir('cmds').demandCommand(1).help();

Promise.resolve(argv.promise).catch(console.error).then(() => {
  console.log('Done.');
});
