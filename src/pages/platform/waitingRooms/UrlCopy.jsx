// Copyright (C) 2019 Alina Inc. All rights reserved.

import PropTypes from 'prop-types';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Container, Row } from 'reactstrap';

import domain from '../../../domain.config';
import { button, waitingRoom } from '../../../messages';

const UrlCopy = ({ roomId }) => (
  <div className="section urlcopy">
    <div className="bar">{`${waitingRoom.url}`}</div>
    <div className="warper">
      <textarea defaultValue={`${domain.default}/platform/entry/${roomId}`} disabled />
      <CopyToClipboard text={`${domain.default}/platform/entry/${roomId}`}>
        <button type="button" className="contents">
          <span>{button.copy}</span>
        </button>
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
