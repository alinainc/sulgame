// Copyright (C) 2019 Alina Inc. All rights reserved.

import React from 'react';
import { Route, Switch } from 'react-router';

import shapes from '@frontend/shapes';
import RankingPage from './Ranking';

const Ranking = ({ match }) => (
  <Switch>
    <Route
      exact
      path={`${match.url}/:roomId/user/host`}
      render={props => <RankingPage {...props} isHost key={props.match.params.roomId} />}
    />
    <Route exact path={`${match.url}/:roomId/user/:userId`} component={RankingPage} />
  </Switch>
);

Ranking.propTypes = {
  match: shapes.match.isRequired,
};

export default Ranking;
