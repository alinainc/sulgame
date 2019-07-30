import React, { useRef } from 'react';
import { Button, Input, Row } from 'reactstrap';

import entry from './../../messages/entry';
import { FirebaseDatabaseMutation } from '@react-firebase/database';

const Entry = ({ history, match }) => {
  const inputRef = useRef(null);
  return (
    <div className="containers">
      <h2>{entry.title}</h2>
      <Row>
        <Input innerRef={inputRef} placeholder={entry.nickName} />
      </Row>
      <Row>
        <FirebaseDatabaseMutation path="/rooms/" type="push">
          {({ runMutation }) => (
            <Button type="button" onClick={async () => {
              const res = await runMutation({ players: { nickname: inputRef.current.value } });
              history.push(`waiting_room/${res.key}`);
              }}>
              {entry.button}
            </Button>
          )}
        </FirebaseDatabaseMutation>
      </Row>
    </div>
  );
}

export default Entry;