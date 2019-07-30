// Copyright (C) 2019 Alina Inc. All rights reserved.
import React from 'react';

const Ranking = () => {
  let rows_test = [
    { rank: 1, title: 'Hong', score: 100 },
    { rank: 2, title: 'Pikachu', score: 90 },
  ];

  const renderData = () => {
    const { rank, title, score } = rows_test
    return(
      <tr key={rank}>
        <td>{rank}</td>
        <td>{title}</td>
        <td>{score}</td>
      </tr>
    )
  } 
  
  return (
    <div className="container">
      <h1>RANK</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>score</th>
          </tr>
        </thead>
        <tbody>
          <td>1</td>
          <td>Hong</td>
          <td>100</td>
        </tbody>
      </table>
    </div>
  )
}
  
export default Ranking;