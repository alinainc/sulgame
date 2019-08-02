// Copyright (C) 2019 Alina Inc. All rights reserved.

import React from 'react';
import { Route, Switch } from 'react-router';

import shapes from '../../../shapes';
import MainWaitingRoom from './WaitingRoom';

const WaitingRoom = ({ match }) => (
  <Switch>
    <Route
      exact
      path={`${match.url}/:roomId/host`}
      render={props => <MainWaitingRoom {...props} isHost key={props.match.params.roomId} />}
    />
    <Route exact path={`${match.url}/:roomId/user/:userId`} component={MainWaitingRoom} />
  </Switch>
);

WaitingRoom.propTypes = {
  match: shapes.match.isRequired,
};

export default WaitingRoom;
