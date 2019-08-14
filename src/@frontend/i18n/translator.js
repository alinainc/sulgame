// Copyright (C) 2019 Alina Inc. All rights reserved.

import { useIntl } from 'react-intl';

export const t = (intl, message, args) => {
  if (!message || !message.id) {
    return 'N/A';
  }
  return intl.formatMessage(message, args);
};

export const useT = (message, args) => t(useIntl(), message, args);
