// Copyright (C) 2019 Alina Inc. All rights reserved.

import { get } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { Col, Row } from 'reactstrap';

const SimpleList = ({ cols, items }) => {
  if (!items.length) {
    return null;
  }
  return (
    <div className="simple-list grid-border">
      <Row className="header">
        {cols.map(col => <Col key={col.name} xs={col.xs}>{col.name}</Col>)}
      </Row>
      {items.map((item, i) => (
        <Row className="row-hover" key={item.name}>
          {cols.map(col => (
            <Col className="col truncate-hover" key={col.name} xs={col.xs}>
              {col.row ? col.row(item, i) : get(item, col.key, '')}
            </Col>
          ))}
        </Row>
      ))}
    </div>
  );
};

SimpleList.propTypes = {
  cols: PropTypes.arrayOf(PropTypes.shape({
    className: PropTypes.string,
    key: PropTypes.string,
    name: PropTypes.string.isRequired,
    xs: PropTypes.number,
  })),
  items: PropTypes.arrayOf(PropTypes.shape({})),
};

SimpleList.defaultProps = {
  cols: [],
  items: [],
};

export default SimpleList;
