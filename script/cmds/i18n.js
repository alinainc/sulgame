// Copyright (C) 2019 Alina Inc. All rights reserved.

/* eslint-disable global-require, import/no-dynamic-require */

import fs from 'fs';
import { sync as globSync } from 'glob';
import stringify from 'json-stable-stringify';
import { mapKeys } from 'lodash';
import mkdirp from 'mkdirp';
import path from 'path';

import { wrap } from '../util';

const langs = ['en', 'ko'];

const getFilename = lang => `${lang}.json`;
const getFilepath = (dir, lang) => path.join(dir, getFilename(lang));

// eslint-disable-next-line operator-linebreak
const indexFile =
`// Copyright (C) 2019 Alina Inc. All rights reserved.

${langs.map(lang => `import ${lang} from './${getFilename(lang)}';`).join('\n')}

export default { ${langs.join(', ')} };
`;

const readJsonFile = (filepath) => {
  if (fs.existsSync(filepath)) {
    return JSON.parse(fs.readFileSync(filepath));
  }

  return {};
};

const toJsonString = obj => (`${stringify(obj, { space: ' ' })}\n`);

const defaultReplacer = json => mapKeys(json, (_, key) => key.replace(/\.default/g, ''));

const writeOutput = (messages, outputDir) => {
  mkdirp.sync(outputDir);
  fs.writeFileSync(path.join(outputDir, 'index.js'), indexFile);

  langs.forEach((lang) => {
    const merged = Object.assign({}, messages);
    const filepath = getFilepath(outputDir, lang);
    const old = readJsonFile(filepath);
    Object.keys(messages).forEach((key) => {
      if (old[key]) {
        merged[key] = old[key];
      }
    });
    fs.writeFileSync(filepath, toJsonString(merged));
  });
};

const sync = () => {
  globSync('./**/i18n/messages', { absolute: true }).forEach(msg => writeOutput(
    defaultReplacer(require(msg).default),
    path.resolve(msg, '../translated'),
  ));
};

export const command = 'i18n';
export const desc = 'translate i18n messages';
export const handler = wrap(sync);
