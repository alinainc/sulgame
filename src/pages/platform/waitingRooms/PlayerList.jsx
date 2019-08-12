// Copyright (C) 2019 Alina Inc. All rights reserved.

import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';
import { Spinner } from 'reactstrap';

import { FirebaseDatabaseNode } from '@react-firebase/database';

import { messages, t } from '../../../i18n';
import PlayerListForm from '../../components/PlayerList';

const PlayerList = ({ roomId, userId }) => {
  const intl = useIntl();
  return (
    <FirebaseDatabaseNode path={`/rooms/${roomId}/`}>
      {({ value }) => {
        if (!value) {
          return <Spinner color="primary" />;
        }
        return (
          <table>
            <thead>
              <tr>
                <td>
                  {t(intl, messages.waitingRoom.players)}
                  {` (${Object.values(value.players).length}명)`}
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <PlayerListForm
                    value={value}
                    userId={userId}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        );
      }}
    </FirebaseDatabaseNode>
  )
};

PlayerList.propTypes = {
  roomId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default PlayerList;
