// Copyright (C) 2019 Alina Inc. All rights reserved.

import React from 'react';
import { Route, Switch } from 'react-router';

import shapes from '../../shapes';
import Ranking from './Ranking';
import Ready from './Ready';
import Entry from './entries';
import WaitingRoom from './waitingRoom';

const Platform = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/entry`} component={Entry} />
    <Route
      exact
      path={`${match.url}/ranking/:roomId/user/host`}
      render={props => <Ranking {...props} isHost key={props.match.params.roomId} />}
    />
    <Route exact path={`${match.url}/ranking/:roomId/user/:userId`} component={Ranking} />
    <Route exact path={`${match.url}/ready`} component={Ready} />
    <Route path={`${match.url}/waiting_room`} component={WaitingRoom} />
  </Switch>
);

Platform.propTypes = {
  match: shapes.match.isRequired,
};

export default Platform;
