// Copyright (C) 2019 Alina Inc. All rights reserved.

import React, { useRef } from 'react';
import { Button, Input, Row } from 'reactstrap';

import { FirebaseDatabaseMutation } from '@react-firebase/database';

import entry from '../../messages/entry';
import shapes from '../../shapes';

const Entry = ({ history }) => {
  const inputRef = useRef(null);
  const makeRoom = runMutation => async () => {
    const res = await runMutation({ players: { nickname: inputRef.current.value } });
    history.push(`waiting_room/${res.key}`);
  };
  return (
    <div className="containers">
      <h2>{entry.title}</h2>
      <Row>
        <Input innerRef={inputRef} placeholder={entry.nickName} />
      </Row>
      <Row>
        <FirebaseDatabaseMutation path="/rooms/" type="push">
          {({ runMutation }) => (
            <Button
              type="button"
              onClick={makeRoom(runMutation)}
            >
              {entry.button}
            </Button>
          )}
        </FirebaseDatabaseMutation>
      </Row>
    </div>
  );
};

Entry.propTypes = {
  history: shapes.history.isRequired,
};

export default Entry;
