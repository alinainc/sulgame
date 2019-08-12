// Copyright (C) 2019 Alina Inc. All rights reserved.

import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import domain from '../../../domain.config';
import { messages, t } from '../../../i18n';

const UrlCopy = ({ roomId }) => {
  const intl = useIntl();
  return (
    <div>
      <div>
        {t(intl, messages.waitingRoom.url)}
      </div>
      <div>
        <textarea defaultValue={`http://${domain.default}/platform/entry/${roomId}`} disabled />
      </div>
      <div>
        <CopyToClipboard text={`http://${domain.default}/platform/entry/${roomId}`}>
          <button type="button">{t(intl, messages.button.copy)}</button>
        </CopyToClipboard>
      </div>
    </div>
  );
};

UrlCopy.propTypes = {
  roomId: PropTypes.string,
};
UrlCopy.defaultProps = {
  roomId: 'host',
};

export default UrlCopy;
