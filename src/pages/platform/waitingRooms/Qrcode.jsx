// Copyright (C) 2019 Alina Inc. All rights reserved.

import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import React from 'react';
import { useIntl } from 'react-intl';

import domain from '../../../domain.config';
import { messages, t } from '../../../i18n';

const Qrcode = ({ roomId }) => {
  const intl = useIntl();
  return (
    <div>
      <h3>
        {t(intl, messages.waitingRoom.qrcode)}
      </h3>
      <div>
        <QRCode value={`http://${domain.default}/platform/entry/${roomId}`} id="qr" />
      </div>
    </div>
  );
};

Qrcode.propTypes = {
  roomId: PropTypes.string,
};
Qrcode.defaultProps = {
  roomId: 'host',
};

export default Qrcode;
