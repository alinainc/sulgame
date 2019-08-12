// Copyright (C) 2019 Alina Inc. All rights reserved.

import PropTypes from 'prop-types';
import React from 'react';

import domain from '../../../domain.config';
import { waitingRoom } from '../../../i18n/messages';
import Qrcode from './Qrcode';
import UrlCopy from './UrlCopy';

const InviteList = ({ roomId }) => (
  <table className="enter">
    <thead>
      <tr>
        <td colSpan="2">{waitingRoom.invite}</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><Qrcode roomId={roomId} value={`${domain.default}/platform/entry/${roomId}`} /></td>
        <td><UrlCopy roomId={roomId} /></td>
      </tr>
    </tbody>
  </table>
);

InviteList.propTypes = {
  roomId: PropTypes.string.isRequired,
};

export default InviteList;
