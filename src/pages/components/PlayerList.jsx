// Copyright (C) 2019 Alina Inc. All rights reserved.

import { remove } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { Spinner } from 'reactstrap';

const PlayerListForm = ({ userId, value }) => {
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
      const host = remove(items, (e => e.key === 'host'));
      items.unshift(host[0]);
    }
  }

  return (
    !items
      ? <Spinner color="primary" /> : items.map(item => (
        <span>
          <div key={item.key} className="players">
            <div key="img">
              <span role="img" aria-label="face" className="face"> 🧞‍</span>
            </div>
            <div key="name" id={item.isMe ? 'me' : null}>
              {item.name}
            </div>
          </div>
        </span>
      ))
  );
};

PlayerListForm.propTypes = {
  userId: PropTypes.string.isRequired,
  value: PropTypes.shape({
    players: PropTypes.shape({}),
  }),
};

PlayerListForm.defaultProps = {
  value: undefined,
};

export default PlayerListForm;
