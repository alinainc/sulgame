// Copyright (C) 2019 Alina Inc. All rights reserved.

import React from 'react';
import { Route, Switch } from 'react-router';

import shapes from '../../shapes';
import Ready from './Ready';
import Entry from './entries';
import Ranking from './rankings';
import WaitingRoom from './waitingRooms';

const Platform = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/entry`} component={Entry} />
    <Route path={`${match.url}/ranking`} component={Ranking} />
    <Route exact path={`${match.url}/ready`} component={Ready} />
    <Route path={`${match.url}/waiting_room`} component={WaitingRoom} />
  </Switch>
);

Platform.propTypes = {
  match: shapes.match.isRequired,
};

export default Platform;
