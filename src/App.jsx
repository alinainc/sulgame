// Copyright (C) 2019 Alina Inc. All rights reserved.

import firebase from 'firebase/app';
import 'firebase/database';
import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { FirebaseDatabaseProvider } from '@react-firebase/database';

import { test } from './firebase.config';
import { translated } from './i18n';
import MainPage from './pages/MainPage';
import Game from './pages/games';
import Platform from './pages/platform';

import './stylesheets/main.scss';
// import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [locale, setLocale] = useState('ko');
  const localeCallback = (localeFromChild) => {
    setLocale(localeFromChild);
  };
  const messages = translated[locale];
  return (
    <FirebaseDatabaseProvider firebase={firebase} {...test}>
      <ToastContainer />
      <IntlProvider locale={locale} messages={messages}>
        <BrowserRouter>
          <Switch>
            <Route path="/games" component={Game} />
            <Route path="/platform" component={Platform} />
            <Route
              render={props => (
                <MainPage
                  {...props}
                  localeCallback={localeCallback}
                  key="MainPage"
                />
              )}
            />
          </Switch>
        </BrowserRouter>
      </IntlProvider>
    </FirebaseDatabaseProvider>
  );
};

export default App;
