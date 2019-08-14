// Copyright (C) 2019 Alina Inc. All rights reserved.

import PropTypes from 'prop-types';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useIntl } from 'react-intl';

import domain from '@frontend/domain.config';
import { messages, t } from '@frontend/i18n';

const UrlCopy = ({ roomId }) => {
  const intl = useIntl();

  return (
    <div>
      <h4>
        {`${t(intl, messages.waitingRoom.option.two)}. `}
        {t(intl, messages.waitingRoom.description.two)}
      </h4>
      <div>
        <textarea defaultValue={`http://${domain.default}/platform/entry/${roomId}`} disabled />
      </div>
      <div>
        <CopyToClipboard text={`http://${domain.default}/platform/entry/${roomId}`}>
          <button type="button" id="copy-btn">{t(intl, messages.button.copy)}</button>
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
