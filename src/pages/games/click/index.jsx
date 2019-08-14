// Copyright (C) 2019 Alina Inc. All rights reserved.

import React from 'react';
import { Route, Switch } from 'react-router';

import shapes from '@frontend/shapes';
import Play from './Play';

const Click = ({ match }) => (
  <Switch>
    <Route exact path={`${match.url}/play/:roomId/user/:userId`} component={Play} />
  </Switch>
);

Click.propTypes = {
  match: shapes.match.isRequired,
};

export default Click;
