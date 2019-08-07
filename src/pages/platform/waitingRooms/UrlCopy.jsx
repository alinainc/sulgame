// Copyright (C) 2019 Alina Inc. All rights reserved.

import PropTypes from 'prop-types';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import domain from '../../../domain.config';
import { button, waitingRoom } from '../../../messages';

const UrlCopy = ({ roomId }) => (
  <table>
    <thead>
      <tr>
        <td>{waitingRoom.url}</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <textarea defaultValue={`${domain.default}/platform/entry/${roomId}`} disabled />
        </td>
      </tr>
      <tr>
        <td className="btn-warp">
          <CopyToClipboard text={`${domain.default}/platform/entry/${roomId}`}>
            <button type="button">{button.copy}</button>
          </CopyToClipboard>
        </td>
      </tr>
    </tbody>
  </table>
);

UrlCopy.propTypes = {
  roomId: PropTypes.string,
};
UrlCopy.defaultProps = {
  roomId: 'host',
};

export default UrlCopy;
