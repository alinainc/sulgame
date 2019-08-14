// Copyright (C) 2019 Alina Inc. All rights reserved.

import React from 'react';
import { useIntl } from 'react-intl';

import { messages, t } from '../../../i18n';

const HostOut = () => {
  const intl = useIntl();
  return (
    <div>
      <div>
        {t(intl, messages.ranking.hostout)}
      </div>
    </div>
  );
};

export default HostOut;
