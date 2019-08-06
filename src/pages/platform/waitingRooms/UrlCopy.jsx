// Copyright (C) 2019 Alina Inc. All rights reserved.

import PropTypes from 'prop-types';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button, Container, Row } from 'reactstrap';

import domain from '../../../domain.config';
import { button, waitingRoom } from '../../../messages';

const UrlCopy = ({ roomId }) => (
  <Container className="section urlcopy">
    <Row className="bar">{`${waitingRoom.url}`}</Row>
    <Row className="warper">
      <textarea defaultValue={`${domain.default}/platform/entry/${roomId}`} disabled />
      <CopyToClipboard text={`${domain.default}/platform/entry/${roomId}`}>
        <Button className="contents">
          <span>{button.copy}</span>
        </Button>
      </CopyToClipboard>
    </Row>
  </Container>
);

UrlCopy.propTypes = {
  roomId: PropTypes.string,
};
UrlCopy.defaultProps = {
  roomId: 'host',
};
export default UrlCopy;
