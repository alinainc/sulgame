// Copyright (C) 2019 Alina Inc. All rights reserved.

import { get } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { Col, Row, Spinner } from 'reactstrap';

const WaitingList = ({ col, value }) => {
  let items;

  if (value) {
    if (value.players) {
      items = Object.values(value.players);
    } else {
      items = Object.values(value);
    }
  }

  return (
    <div className="simple-list grid-border">
      <Row className="header">
        <Col key={col.name} xs={col.xsHead}>{col.name}</Col>
      </Row>
      {!value ? <Spinner color="primary" /> : items.map(item => (
        <Row className="row-hover" key={item.name || item.nickname}>
          <Col className="col truncate-hover" key={col.name} xs={col.xsChild}>
            {get(item, col.key, '')}
          </Col>
        </Row>
      ))}
    </div>
  );
};

WaitingList.propTypes = {
  col: PropTypes.shape({
    className: PropTypes.string,
    key: PropTypes.string,
    name: PropTypes.string.isRequired,
    xsChild: PropTypes.number,
    xsHead: PropTypes.number,
  }),
  value: PropTypes.shape({
    players: PropTypes.shape({}),
  }),
};

WaitingList.defaultProps = {
  col: undefined,
  value: undefined,
};

export default WaitingList;
