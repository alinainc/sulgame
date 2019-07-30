// Copyright (C) 2019 Alina Inc. All rights reserved.


import * as firebase from 'firebase';
import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { FirebaseDatabaseProvider } from '@react-firebase/database';

import MainPage from './MainPage';
import Platform from './platform';
import config from '../firebase.config';

const App = () => (
  <FirebaseDatabaseProvider firebase={firebase} {...config}>
    <div className="container">
      <ToastContainer />
      <BrowserRouter>
        <Switch>
          <Route path="/platform" component={Platform} />
          <Route component={MainPage} />
        </Switch>
      </BrowserRouter>
    </div>
  </FirebaseDatabaseProvider>
);

export default App;
