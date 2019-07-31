// Copyright (C) 2019 Alina Inc. All rights reserved.

import React from 'react';
import { Route, Switch } from 'react-router';

import shapes from '../../../shapes';
import Entry from './Entry';

const UserEntry = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/:roomId`} component={Entry} />
    <Route exact path={`${match.url}`} component={Entry} />
  </Switch>
);

UserEntry.propTypes = {
  match: shapes.match.isRequired,
};

export default UserEntry;
