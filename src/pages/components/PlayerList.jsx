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
      console.log(items);
      remove(items, e => e.name === undefined);
      const host = remove(items, (e => e.key === 'host'));
      items.unshift(host[0]);
    }
  }

  return (
    <div className="horizontal-scroll">
      {!items
        ? <Spinner color="primary" /> : items.map(item => (
          <span key={item.key}>
            <div className="players">
              <div key="img" id={item.key === 'host' ? 'host' : null} className={item.isMe ? 'me' : null}>
                <div>
                  {(item.key === 'host')
                    ? (<span role="img" aria-label="face" className="face">👑</span>)
                    : (<span role="img" aria-label="face" className="face">‍🧞</span>)
                  }
                </div>
                <div>
                  {item.name}
                </div>
              </div>
            </div>
          </span>
        ))}
    </div>
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
