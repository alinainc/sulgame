// Copyright (C) 2019 Alina Inc. All rights reserved.

import React from 'react';
import { Container, Table } from 'reactstrap';

import m from '../../messages/ranking';

const Ranking = () => {
  const rowsTest = [ // FIXME dummy data should be exchaged by real data
    { rank: 1, score: 100, title: 'Hong' },
    { rank: 2, score: 90, title: 'Pikachu' },
  ];

  const renderData = () => (
    rowsTest.map((user) => {
      const { rank, score, title } = user;
      return (
        <tr key={rank}>
          <th scope="row">
            {rank}
            {m.rank.postfix}
          </th>
          <td>{title}</td>
          <td>{score}</td>
        </tr>
      );
    })
  );

  return (
    <Container>
      <h1>{m.title}</h1>
      <Table hover>
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
      </Table>
    </Container>
  );
};

export default Ranking;
