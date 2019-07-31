// Copyright (C) 2019 Alina Inc. All rights reserved.

import { get } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { Spinner, Col, Row } from 'reactstrap';

const WaitingList = ({ col, value }) => {
  if (value) {
    if (!Array.isArray(value.players)){
      value.players = [value.players];
    };
  };
  
  return (
    <div className="simple-list grid-border">
      <Row className="header">
        <Col key={col.name} xs={col.xs}>{col.name}</Col>
      </Row>
      {!value ? <Spinner color="primary" /> : value.players.map((item, i) => (
        <Row className="row-hover" key={item.name || item.nickname}>
          <Col className="col truncate-hover" key={col.name} xs={col.xs}>
            {col.row ? col.row(item, i) : get(item, col.key, '')}
          </Col>
        </Row>
      ))}
    </div>
  );
};

WaitingList.propTypes = {
  cols: PropTypes.arrayOf(PropTypes.shape({
    className: PropTypes.string,
    key: PropTypes.string,
    name: PropTypes.string.isRequired,
    xs: PropTypes.number,
  })),
  items: PropTypes.arrayOf(PropTypes.shape({})),
};

WaitingList.defaultProps = {
  col: undefined,
  value: undefined,
};

export default WaitingList;
