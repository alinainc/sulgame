// Copyright (C) 2019 Alina Inc. All rights reserved.

import { isEmpty } from 'lodash';
import React, { useRef } from 'react';
import { Button, Input, Row, Spinner } from 'reactstrap';

import { FirebaseDatabaseMutation, FirebaseDatabaseNode } from '@react-firebase/database';

import { entry } from '../../../messages';
import shapes from '../../../shapes';

const Entry = ({ history, match: { params } }) => {
  const inputRef = useRef(null);
  const path = isEmpty(params) ? '/rooms/' : `/rooms/${params.roomId}/players`;
  const makeRoom = runMutation => async () => {
    const res = isEmpty(params)
      ? await runMutation({ players: { host: { name: inputRef.current.value } } })
      : await runMutation({ name: inputRef.current.value });
    if (isEmpty(params)) {
      history.push(`/platform/waiting_room/${res.key}`);
    } else {
      history.push(`/platform/waiting_room/${params.roomId}`);
    }
  };
  const enter = () => (
    <FirebaseDatabaseMutation path={path} type="push">
      {({ runMutation }) => (
        <Button
          type="button"
          onClick={makeRoom(runMutation)}
        >
          {isEmpty(params) ? entry.make.room : entry.enter}
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
          <div>
            <h2>{isEmpty(params) ? entry.make.room : entry.enter}</h2>
            <Row>
              <Input innerRef={inputRef} placeholder={entry.nickName} />
            </Row>
            <Row>
              {enter()}
            </Row>
          </div>
        );
      }}
    </FirebaseDatabaseNode>
  );

  return (
    <div className="containers">
      {checkRoomExists()}
    </div>
  );
};

Entry.propTypes = {
  history: shapes.history.isRequired,
  match: shapes.match.isRequired,
};

export default Entry;