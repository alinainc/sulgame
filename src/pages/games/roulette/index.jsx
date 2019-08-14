// Copyright (C) 2019 Alina Inc. All rights reserved.

import React from 'react';
import { Route, Switch } from 'react-router';

import shapes from '@frontend/shapes';
import Play from './Play';

const RouletteGame = ({ match }) => (
  <Switch>
    <Route
      exact
      path={`${match.url}/play/:roomId/user/:userId`}
      render={props => <Play {...props} isHost key={props.match.params.roomId} />}
    />
  </Switch>
);

RouletteGame.propTypes = {
  match: shapes.match.isRequired,
};

export default RouletteGame;
