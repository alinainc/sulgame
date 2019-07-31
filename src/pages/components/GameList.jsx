// Copyright (C) 2019 Alina Inc. All rights reserved.

import { get } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { Row, Spinner } from 'reactstrap';

const GameList = ({ rows, title, value }) => {
  let items;

  if (value) {
    items = Object.values(value);
  }

  return (
    <div className="simple-list grid-border">
      <Row className="header" key={title.key}>{title.key}</Row>
      {!value
        ? <Spinner color="primary" />
        : items.map(item => (
          rows.map(row => (
            <Row key={row.key}>
              {get(item, row.key, '')}
            </Row>
          ))
        ))}
    </div>
  );
};

GameList.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
  })),
  title: PropTypes.shape({ key: PropTypes.string }),
  value: PropTypes.shape({
    players: PropTypes.shape({}),
  }),
};

GameList.defaultProps = {
  rows: [],
  title: undefined,
  value: undefined,
};

export default GameList;
