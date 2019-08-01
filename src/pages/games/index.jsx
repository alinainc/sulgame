// Copyright (C) 2019 Alina Inc. All rights reserved.

import React from 'react';
import { Route, Switch } from 'react-router';

import shapes from '../../shapes';
import Sequence from './Sequence';

const Game = ({ match }) => (
  <Switch>
    <Route exact path={`${match.url}/sequence`} component={Sequence} />
  </Switch>
);

Game.propTypes = {
  match: shapes.match.isRequired,
};

export default Game;
