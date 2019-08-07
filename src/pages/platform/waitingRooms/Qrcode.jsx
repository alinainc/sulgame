// Copyright (C) 2019 Alina Inc. All rights reserved.

import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import React from 'react';

import domain from '../../../domain.config';

const Qrcode = ({ roomId }) => (
  <table>
    <tbody>
      <QRCode value={`${domain.default}/platform/entry/${roomId}`} id="qr" />
    </tbody>
    <thead>
      <tr>
        <td>QR code</td>
      </tr>
    </thead>
  </table>
);

Qrcode.propTypes = {
  roomId: PropTypes.string,
};
Qrcode.defaultProps = {
  roomId: 'host',
};

export default Qrcode;
