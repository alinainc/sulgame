// Copyright (C) 2019 Alina Inc. All rights reserved.

import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import * as firebase from 'firebase';
import { FirebaseDatabaseProvider } from '@react-firebase/database';
import config from '../firebase.config';

import Platform from './platform';

import MainPage from './MainPage';

const App = () => {
  return (
    <FirebaseDatabaseProvider firebase={firebase} {...config}>
      <div className="container">
        <ToastContainer />
        <BrowserRouter>
          <Switch>
            <Route path={'/platform'} component={Platform} />
            <Route component={MainPage} />
          </Switch>
        </BrowserRouter>
      </div>
    </FirebaseDatabaseProvider>
  );
};

export default App;