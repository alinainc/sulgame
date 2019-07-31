// Copyright (C) 2019 Alina Inc. All rights reserved.

import React from 'react';
import { Route, Switch } from 'react-router';

import shapes from '../../shapes';
import Play from './Play';

const Platform = ({ match }) => (
  <Switch>
    <Route exact path={`${match.url}/play`} component={Play} />
  </Switch>
);

Platform.propTypes = {
  match: shapes.match.isRequired,
};

export default Platform;
