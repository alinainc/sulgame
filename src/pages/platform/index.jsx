// Copyright (C) 2019 Alina Inc. All rights reserved.

import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter} from 'react-router-dom';
import WaitingRoom from './WaitingRoom';

const Platform = ({ match }) => (
  <BrowserRouter>
    <Switch>
      <Route exact path={`${match.url}/waiting_room`} component={WaitingRoom} />
    </Switch>
  </BrowserRouter>
);

export default Platform;
