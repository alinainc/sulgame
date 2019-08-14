// Copyright (C) 2019 Alina Inc. All rights reserved.

import React from 'react';
import { Route, Switch } from 'react-router';

import shapes from '../../shapes';
import Choose from './choose';
import Click from './click';
import Roulette from './roulette';
import Sequence from './sequence';
import Subway from './subway';

const Game = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/choose`} component={Choose} />
    <Route path={`${match.url}/click`} component={Click} />
    <Route path={`${match.url}/roulette`} component={Roulette} />
    <Route path={`${match.url}/sequence`} component={Sequence} />
    <Route path={`${match.url}/subway`} component={Subway} />
  </Switch>
);

Game.propTypes = {
  match: shapes.match.isRequired,
};

export default Game;
