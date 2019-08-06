// Copyright (C) 2019 Alina Inc. All rights reserved.

import PropTypes from 'prop-types';
import React from 'react';
import { Spinner } from 'reactstrap';

const PlayerList = ({ value }) => {
  let items;

  if (value) {
    if (value.players) {
      items = Object.values(value.players);
    }
  }

  return (
    <div className="section">
      <div className="bar">
        <span>플레이어</span>
      </div>
      {!items
        ? <Spinner color="primary" /> : items.map(item => (
          <div key={item.name} className="players">
            <div>
              <span role="img" aria-label="face" className="face"> 🧞‍</span>
            </div>
            <div>
              {item.name}
            </div>
          </div>
        ))}
    </div>
  );
};

PlayerList.propTypes = {
  value: PropTypes.shape({
    players: PropTypes.shape({}),
  }),
};

PlayerList.defaultProps = {
  value: undefined,
};

export default PlayerList;
