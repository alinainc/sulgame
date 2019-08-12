// Copyright (C) 2019 Alina Inc. All rights reserved.

import PropTypes from 'prop-types';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import domain from '../../../domain.config';
import { button, waitingRoom } from '../../../i18n/messages';

const UrlCopy = ({ roomId }) => (
  <div>
    <div>
      {waitingRoom.url}
    </div>
    <div>
      <textarea defaultValue={`http://${domain.default}/platform/entry/${roomId}`} disabled />
    </div>
    <div>
      <CopyToClipboard text={`http://${domain.default}/platform/entry/${roomId}`}>
        <button type="button">{button.copy}</button>
      </CopyToClipboard>
    </div>
  </div>
);

UrlCopy.propTypes = {
  roomId: PropTypes.string,
};
UrlCopy.defaultProps = {
  roomId: 'host',
};

export default UrlCopy;
