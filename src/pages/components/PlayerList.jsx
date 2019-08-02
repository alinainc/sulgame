// Copyright (C) 2019 Alina Inc. All rights reserved.

import { get, remove } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { Col, Container, Row, Spinner } from 'reactstrap';

import { ranking } from '../../messages';
import RankLogic from './RankLogic';

const PlayerList = ({ cols, isRank, value }) => {
  let items;

  if (value) {
    if (value.players) {
      items = Object.values(value.players);
      remove(items, ({ end }) => (end === 0));
      if (isRank) {
        RankLogic(items);
      }
    }
  }

  return (
    <Container>
      <Row className="divider">
        {cols.map(col => <Col key={col.name} xs={col.xsHead}>{col.name}</Col>)}
      </Row>
      {!value
        ? <Spinner color="primary" />
        : items.map((item, i) => (
          <Row key={item.name || item.nickname}>
            {cols.map(col => (
              <Col key={col.name} xs={col.xsChild}>
                {col.key === 'rank' ? `${(i + 1)} ${ranking.rank.postfix}` : get(item, col.key, '')}
              </Col>
            ))}
          </Row>
        ))}
    </Container>
  );
};

PlayerList.propTypes = {
  cols: PropTypes.arrayOf(PropTypes.shape({
    className: PropTypes.string,
    key: PropTypes.string,
    name: PropTypes.string.isRequired,
    xsChild: PropTypes.number,
    xsHead: PropTypes.number,
  })),
  isRank: PropTypes.bool,
  value: PropTypes.shape({
    players: PropTypes.shape({}),
  }),
};

PlayerList.defaultProps = {
  cols: [],
  isRank: undefined,
  value: undefined,
};

export default PlayerList;
