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
    <Container>
      <Container className="sulGame">
        <h1 className="text--center-horizental">{mainPage.title}</h1>
      </Container>
      <Button type="button" onClick={onClickButton} className="button--bottom-right">
        {mainPage.button}
      </Button>
    </Container>
  );
};

MainPage.propTypes = {
  history: shapes.history.isRequired,
};

export default MainPage;
