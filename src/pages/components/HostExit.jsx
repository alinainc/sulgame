// Copyright (C) 2019 Alina Inc. All rights reserved.

import React from 'react';
import { useIntl } from 'react-intl';

import { messages, t } from '../../i18n';
import shapes from '../../shapes';

const HostExit = ({ history }) => {
  const intl = useIntl();
  return (
    <div>
      <h3>{t(intl, messages.subwayGame.exit.title)}</h3>
      <p>{t(intl, messages.subwayGame.exit.description1)}</p>
      <p>{t(intl, messages.subwayGame.exit.description2)}</p>
      <div>
        <button type="button" onClick={() => history.push('/')}>
          {t(intl, messages.button.toMain)}
        </button>
      </div>
    </div>
  );
};

HostExit.propTypes = {
  history: shapes.history.isRequired,
};

export default HostExit;
