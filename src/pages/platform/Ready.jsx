// Copyright (C) 2019 Alina Inc. All rights reserved.

import React from 'react';

const Ready = () => {
  const [status, setStatus] = React.useState('ready');
  const timer = setTimeout(() => setStatus('start'), 3000);
  
  return (
    <div className="container">
      <h2>게임 제목</h2>
      {status}
    </div>
  )
}

export default Ready;