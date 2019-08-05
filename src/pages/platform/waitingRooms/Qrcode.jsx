// Copyright (C) 2019 Alina Inc. All rights reserved.

import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import React from 'react';
import { Container, Row } from 'reactstrap';

const Qrcode = ({ roomId }) => (
  <Container>
    <Row className="center divider inline y">QR code</Row>
    <Row>
      <QRCode value={`localhost:3000/platform/entry/${roomId}`} />
    </Row>
  </Container>
);

Qrcode.propTypes = {
  roomId: PropTypes.string,
};
Qrcode.defaultProps = {
  roomId: 'host',
};

export default Qrcode;
