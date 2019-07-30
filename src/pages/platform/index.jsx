// Copyright (C) 2019 Alina Inc. All rights reserved.

import React from 'react';
import { Route, Switch } from 'react-router';

import Entry from './Entry';
import Ranking from './Ranking';
import WaitingRoom from './WaitingRoom';

const Platform = ({ match }) => (
  <Switch>
    <Route exact path={`${match.url}/entry`} component={Entry} />
    <Route exact path={`${match.url}/ranking`} component={Ranking} />
    <Route path={`${match.url}/waiting_room`} component={WaitingRoom} />
  </Switch>
);

export default Platform;
