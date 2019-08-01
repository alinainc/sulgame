// Copyright (C) 2019 Alina Inc. All rights reserved.

import React from 'react';
import { Route, Switch } from 'react-router';

import shapes from '../../shapes';
import Ranking from './Ranking';
import Ready from './Ready';
import WaitingRoom from './WaitingRoom';
import Entry from './entries';

const Platform = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/entry`} component={Entry} />
    <Route exact path={`${match.url}/ranking`} component={Ranking} />
    <Route exact path={`${match.url}/ready`} component={Ready} />
    <Route path={`${match.url}/waiting_room/:roomId/:isHost`} component={WaitingRoom} />
    <Route path={`${match.url}/waiting_room/:roomId/user/:userId`} component={WaitingRoom} />
  </Switch>
);

Platform.propTypes = {
  match: shapes.match.isRequired,
};

export default Platform;
