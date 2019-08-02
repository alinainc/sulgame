// Copyright (C) 2019 Alina Inc. All rights reserved.

import { get } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { Container, Row } from 'reactstrap';

const GameList = ({ rows, title, value }) => {
  const items = Object.values(value);

  return (
    <Container>
      <Row key={title.key}>{title.key}</Row>
      {items.map(item => (
        rows.map(row => (
          <Row key={row.key}>
            {row.host ? row.host(item) : get(item, row.key, '')}
          </Row>
        ))
      ))}
    </Container>
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
