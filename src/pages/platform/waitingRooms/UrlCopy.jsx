// Copyright (C) 2019 Alina Inc. All rights reserved.

import PropTypes from 'prop-types';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button, Container, Row } from 'reactstrap';

import { waitingRoom } from '../../../messages';

const UrlCopy = ({ roomId }) => (
  <Container className="section urlcopy">
    <Row className="bar">{`${waitingRoom.url}`}</Row>
    <Row className="warper">
      <textarea className="contents">{`localhost:3000/platform/entry/${roomId}`}</textarea>
      <CopyToClipboard text={`localhost:3000/platform/entry/${roomId}`}>
        <Button className="contents">
          <span>copy</span>
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
