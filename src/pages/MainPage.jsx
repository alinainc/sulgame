// Copyright (C) 2019 Alina Inc. All rights reserved.

import React from 'react';
import { Button, Container } from 'reactstrap';

import mainPage from '../messages/mainPage';
import shapes from '../shapes';

const MainPage = ({ history }) => {
  const onClickButton = () => {
    history.push('/platform/entry');
  };
  return (
    <Container className="mainpage">
      <Container>
        <div className="block center y moon" />
        <h1 className="center y inline">{mainPage.title}</h1>
      </Container>
      <Container className="center bottom y">
        <div className="block center y">
          <div className="center y inline">{mainPage.button}</div>
        </div>
        <Button type="button" onClick={onClickButton} className="block center y">
          <span>+</span>
        </Button>
      </Container>
    </Container>
  );
};

MainPage.propTypes = {
  history: shapes.history.isRequired,
};

export default MainPage;
