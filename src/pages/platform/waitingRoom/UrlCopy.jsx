// Copyright (C) 2019 Alina Inc. All rights reserved.

import PropTypes from 'prop-types';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button, Col, Row } from 'reactstrap';

import { button, waitingRoom } from '../../../messages';

const UrlCopy = ({ roomId }) => (
  <div className="simple-list grid-border">
    <Row>
      <Col xs={2}>{`${waitingRoom.url}:`}</Col>
      <Col>{`localhost:3000/platform/entry/${roomId}`}</Col>
      <Col>
        <CopyToClipboard text={`localhost:3000/platform/entry/${roomId}`}>
          <Button>{button.copy}</Button>
        </CopyToClipboard>
      </Col>
    </Row>
  </div>
);

UrlCopy.propTypes = {
  roomId: PropTypes.string,
};
UrlCopy.defaultProps = {
  roomId: 'host',
};
export default UrlCopy;
