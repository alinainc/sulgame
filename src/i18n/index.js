// Copyright (C) 2019 Alina Inc. All rights reserved.

import merge from './merge';
import bo from './translated';
import { t } from './translator';

const { messages, translated } = merge(bo);

export {
  messages,
  t,
  translated,
};
