// Copyright (C) 2019 Alina Inc. All rights reserved.
import React from 'react';

import m from './../../messages/ranking';

const Ranking = () => {
    let rows_test = [ // FIXME dummy data should be exchaged by real data 
    { rank: 1, title: 'Hong', score: 100 },
    { rank: 2, title: 'Pikachu', score: 90 },
  ];

  const renderData = () => {
    return rows_test.map((user, idx) => {
      const { rank, title, score } = user
      return(
        <tr key={idx}>
          <td>{rank}{m.rank.postfix}</td>
          <td>{title}</td>
          <td>{score}</td>
        </tr>
      )
    })
  }

  return (
    <div className="container">
      <h1>{m.title}</h1>
      <table>
        <thead>
          <tr>
            <th>{m.rank.title}</th>
            <th>{m.name}</th>
            <th>{m.score}</th>
          </tr>
        </thead>
        <tbody>
          {renderData()}
        </tbody>
      </table>
    </div>
  )
}

    
    
export default Ranking;