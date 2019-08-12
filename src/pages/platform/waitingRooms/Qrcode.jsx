// Copyright (C) 2019 Alina Inc. All rights reserved.

import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import React from 'react';

import domain from '../../../domain.config';
import messages from '../../../messages';

const Qrcode = ({ roomId }) => (
  <div>
    <div>
      <QRCode value={`http://${domain.default}/platform/entry/${roomId}`} id="qr" />
    </div>
    <div>
      {messages.waitingRoom.qrcode}
    </div>
  </div>
);

Qrcode.propTypes = {
  roomId: PropTypes.string,
};
Qrcode.defaultProps = {
  roomId: 'host',
};

export default Qrcode;
