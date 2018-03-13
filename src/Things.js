import React from 'react';
import { Link } from 'react-router-dom';

const Things = ({ things })=> {
  return (
    <ul>
    {
      things.map( thing => {
        return (
          <li key={thing.id}>
          <Link to = {`/things/${thing.id}`}>
          { thing.name }
          </Link>
          </li>
        );
      })
    }
    </ul>
  );
}

export default Things;
