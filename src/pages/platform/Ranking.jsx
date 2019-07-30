// Copyright (C) 2019 Alina Inc. All rights reserved.

import m from '../../messages/ranking';

/* eslint-disable */
const Ranking = () => {
  const rowsTest = [ // FIXME dummy data should be exchaged by real data 
    { rank: 1, score: 100, title: 'Hong' },
    { rank: 2, score: 90, title: 'Pikachu' },
  ];

  const renderData = () => (
    rowsTest.map((user, idx) => {
      const { rank, score, title } = user;
      return(
        <tr key={idx}>
          <td>{rank}{m.rank.postfix}</td>
          <td>{title}</td>
          <td>{score}</td>
        </tr>
      )
    })
  );

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
