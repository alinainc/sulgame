// Copyright (C) 2019 Alina Inc. All rights reserved.

import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';

import domain from '@frontend/domain.config';
import { messages, t } from '@frontend/i18n';

import Qrcode from './Qrcode';
import UrlCopy from './UrlCopy';

const InviteList = ({ handleClose, roomId, show }) => {
  const intl = useIntl();
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <div id="modal-invite">
        <div>
          <button id="invite-close-btn" onClick={handleClose} type="button">×</button>
        </div>
        <h1>
          {t(intl, messages.waitingRoom.invite)}
        </h1>
        <div>
          <Qrcode roomId={roomId} value={`${domain.default}/platform/entry/${roomId}`} />
          <UrlCopy roomId={roomId} />
        </div>
      </div>
    </div>
  );
};

InviteList.propTypes = {
  handleClose: PropTypes.func.isRequired,
  roomId: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
};

export default InviteList;
