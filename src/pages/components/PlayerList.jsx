// Copyright (C) 2019 Alina Inc. All rights reserved.

import PropTypes from 'prop-types';
import React from 'react';
import { Spinner } from 'reactstrap';

const PlayerList = ({ userId, value }) => {
  let items;

  if (value) {
    if (value.players) {
      items = Object.keys(value.players).map((player) => {
        const item = Object.assign({}, value.players[player]);
        item.key = player;
        if (player === userId) {
          item.isMe = true;
        }
        return item;
      });
    }
  }

  return (
    <div className="section">
      <div className="bar">
        <span>플레이어</span>
      </div>
      <div className="horizontal-scroll">
        {!items
          ? <Spinner color="primary" /> : items.map(item => (
            <div key={item.key} className="players">
              <div key="img">
                <span role="img" aria-label="face" className="face"> 🧞‍</span>
              </div>
              <div key="name" id={item.isMe ? 'me' : null}>
                {item.name}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

PlayerList.propTypes = {
  userId: PropTypes.string.isRequired,
  value: PropTypes.shape({
    players: PropTypes.shape({}),
  }),
};

PlayerList.defaultProps = {
  value: undefined,
};

export default PlayerList;
