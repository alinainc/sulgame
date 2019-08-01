// Copyright (C) 2019 Alina Inc. All rights reserved.

import firebase from 'firebase/app';
import 'firebase/database';
import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { FirebaseDatabaseProvider } from '@react-firebase/database';

import config from 'pages/firebase.config';
import MainPage from 'platform/MainPage';
import ClickGame from 'pages/ClickGame';
import Platform from './platform';

const App = () => (
  <FirebaseDatabaseProvider firebase={firebase} {...config}>
    <div className="container">
      <ToastContainer />
      <BrowserRouter>
        <Switch>
          <Route path="/platform" component={Platform} />
          <Route path="/clickgame" component={ClickGame} />
          <Route component={MainPage} />
        </Switch>
      </BrowserRouter>
    </div>
  </FirebaseDatabaseProvider>
);

export default App;
