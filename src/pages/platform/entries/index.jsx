// Copyright (C) 2019 Alina Inc. All rights reserved.

import PropTypes from 'prop-types';
import React from 'react';
import { Route, Switch } from 'react-router';

import shapes from '../../../shapes';
import Entry from './Entry';

const UserEntry = ({ localeCallback, match }) => (
  <Switch>
    <Route
      path={`${match.url}/:roomId`}
      component={props => <Entry {...props} localeCallback={localeCallback} />}
    />
    <Route
      exact
      path={`${match.url}`}
      component={props => <Entry {...props} localeCallback={localeCallback} />}
    />
  </Switch>
);

UserEntry.propTypes = {
  localeCallback: PropTypes.func.isRequired,
  match: shapes.match.isRequired,
};

export default UserEntry;
