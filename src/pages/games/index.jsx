// Copyright (C) 2019 Alina Inc. All rights reserved.

import React from 'react';
import { Route, Switch } from 'react-router';

import shapes from '../../shapes';
import Choose from './choose';
import Click from './click';
import Sequence from './sequence';

const Game = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/choose`} component={Choose} />
    <Route path={`${match.url}/click`} component={Click} />
    <Route path={`${match.url}/sequence`} component={Sequence} />
  </Switch>
);

Game.propTypes = {
  match: shapes.match.isRequired,
};

export default Game;
