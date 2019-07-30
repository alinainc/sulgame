// Copyright (C) 2019 Alina Inc. All rights reserved.

import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import Platform from './platform';

import MainPage from './MainPage';

const App = () => {
  return (
    <div className="container">
      <ToastContainer />
      <BrowserRouter>
        <Switch>
          <Route path={'/platform'} component={Platform} />
          <Route component={MainPage} />          
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;