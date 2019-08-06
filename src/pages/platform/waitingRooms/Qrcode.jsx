// Copyright (C) 2019 Alina Inc. All rights reserved.

import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import React from 'react';
import { Container, Row } from 'reactstrap';

import domain from '../../../domain.config';

const Qrcode = ({ roomId }) => (
  <Container className="section qrcode">
    <Row>
      <QRCode value={`${domain.default}/platform/entry/${roomId}`} className="contents" />
    </Row>
    <Row className="bar">QR code</Row>
  </Container>
);

Qrcode.propTypes = {
  roomId: PropTypes.string,
};
Qrcode.defaultProps = {
  roomId: 'host',
};

export default Qrcode;
