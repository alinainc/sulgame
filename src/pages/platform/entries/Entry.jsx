// Copyright (C) 2019 Alina Inc. All rights reserved.

import { isEmpty } from 'lodash';
import React, { useRef } from 'react';
import {
  Button,
  Col,
  Container,
  Input,
  Row,
  Spinner,
} from 'reactstrap';

import { FirebaseDatabaseMutation, FirebaseDatabaseNode } from '@react-firebase/database';

import { entry } from '../../../messages';
import shapes from '../../../shapes';

const Entry = ({ history, match: { params } }) => {
  const inputRef = useRef(null);
  const path = isEmpty(params) ? '/rooms/' : `/rooms/${params.roomId}/players`;
  const makeOrEnterRoom = runMutation => async () => {
    const res = isEmpty(params)
      ? await runMutation({ players: { host: { name: inputRef.current.value, start: 0 } } })
      : await runMutation({ name: inputRef.current.value, start: 0 });
    if (isEmpty(params)) {
      history.push(`/platform/waiting_room/${res.key}/host`);
    } else {
      history.push(`/platform/waiting_room/${params.roomId}/user/${res.key}`);
    }
  };
  const enter = () => (
    <FirebaseDatabaseMutation path={path} type="push">
      {({ runMutation }) => (
        <Button
          type="button"
          onClick={makeOrEnterRoom(runMutation)}
        >
          {isEmpty(params) ? entry.enter : entry.enter}
        </Button>
      )}
    </FirebaseDatabaseMutation>
  );
  const checkRoomExists = () => (
    <FirebaseDatabaseNode path="/rooms/">
      {({ value }) => {
        if (!value) {
          return <Spinner color="primary" />;
        }
        if (!isEmpty(params) && !value[params.roomId]) {
          return <div>{entry.room.not}</div>;
        }
        return (
          <Container>
            <Row>
              <h2>{isEmpty(params) ? entry.make.room : entry.enter}</h2>
            </Row>
            <Col className="entry__setting-area">
              <Row>
                <Input innerRef={inputRef} placeholder={entry.nickName} className="entry__setting--textarea" />
              </Row>
              <Row className="button--bottom-right">
                {enter()}
              </Row>
            </Col>
          </Container>
        );
      }}
    </FirebaseDatabaseNode>
  );

  return (
    <Container>
      {checkRoomExists()}
    </Container>
  );
};

Entry.propTypes = {
  history: shapes.history.isRequired,
  match: shapes.match.isRequired,
};

export default Entry;
