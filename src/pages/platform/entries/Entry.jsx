// Copyright (C) 2019 Alina Inc. All rights reserved.

import { isEmpty } from 'lodash';
import React, { useRef, Fragment } from 'react';
import { toast } from 'react-toastify';
import {
  Button,
  Col,
  Container,
  Input,
  Row,
  Spinner,
} from 'reactstrap';
import 'react-toastify/dist/ReactToastify.css';

import { FirebaseDatabaseMutation, FirebaseDatabaseNode } from '@react-firebase/database';

import messages, { entry } from '../../../messages';
import shapes from '../../../shapes';

const Entry = ({ history, match: { params } }) => {
  const inputRef = useRef(null);
  const isHost = isEmpty(params);
  const path = isEmpty(params) ? '/rooms/' : `/rooms/${params.roomId}/players`;
  const makeOrEnterRoom = runMutation => async () => {
    if (inputRef.current.value.length > 6) {
      toast.warning(messages.entry.overmax);
      return null;
    }
    if (!inputRef.current.value) {
      toast.error(messages.entry.noinput);
      return null;
    }
    if (isHost) {
      const res = await runMutation({
        players: { host: { connect: 1, name: inputRef.current.value, start: 0 } },
      });
      history.push(`/platform/waiting_room/${res.key}/host`);
    } else {
      const res = await runMutation({ connect: 1, name: inputRef.current.value });
      history.push(`/platform/waiting_room/${params.roomId}/user/${res.key}`);
    }
    return null;
  };

  const enter = () => (
    <FirebaseDatabaseMutation path={path} type="push">
      {({ runMutation }) => (
        <Fragment>
          <Input
            innerRef={inputRef}
            placeholder={entry.nickName}
            id="input"
            onKeyPress={e => (e.key === 'Enter') && makeOrEnterRoom(runMutation)()}
          />
          <button
            type="button"
            id="button"
            onClick={makeOrEnterRoom(runMutation)}
          >
            {isEmpty(params) ? entry.enter : entry.enter}
          </button>
        </Fragment>
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
          <div className="entry">
            <Row>
              <h2 id="header">{isEmpty(params) ? entry.make.room : entry.enter}</h2>
            </Row>
            <Col>
              <Row>
                {enter()}
              </Row>
            </Col>
          </div>
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
