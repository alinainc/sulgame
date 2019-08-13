// Copyright (C) 2019 Alina Inc. All rights reserved.

/* eslint-disable no-undef */

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

const App = () => {
  let init = 'ko';
  if (document.cookie.indexOf('language=') < 0) {
    document.cookie = `language=${init}`;
  } else {
    document.cookie.split('; ').forEach((item) => {
      const parts = item.split('=');
      if (parts[0] === 'language') {
        [, init] = parts;
      }
    });
  }
  const [locale, setLocale] = useState(init);
  const localeCallback = (localeFromChild) => {
    setLocale(localeFromChild);
  };
  const messages = translated[locale];
  document.cookie = `language=${locale}`;
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
