// Copyright (C) 2019 Alina Inc. All rights reserved.

import React from 'react';
import { Route, Switch } from 'react-router';

import shapes from '@frontend/shapes';

import RatingPage from './RatingPage';

const Rating = ({ match }) => (
  <Switch>
    <Route exact path={`${match.url}`} component={RatingPage} />
  </Switch>
);

Rating.propTypes = {
  match: shapes.match.isRequired,
};

export default Rating;
