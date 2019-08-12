// Copyright (C) 2019 Alina Inc. All rights reserved.

import { unflatten } from 'flat';
import { mapValues, merge } from 'lodash';

export default (...args) => {
  const translated = merge({}, ...args);
  const messages = unflatten(mapValues(translated.en, (value, key) => ({
    id: key,
    temp: value,
  })));
  return {
    messages,
    translated,
  };
};
