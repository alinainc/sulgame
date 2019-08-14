// Copyright (C) 2019 Alina Inc. All rights reserved.

import React from 'react';
import { useIntl } from 'react-intl';

import { messages, t } from '@frontend/i18n';

const Footer = () => {
  const intl = useIntl();
  return (
    <div id="footer-rating">
      <span>{t(intl, messages.feedback.copyright)}</span>
      <br />
      <span>{t(intl, messages.feedback.intern)}</span>
    </div>
  );
};

export default Footer;
