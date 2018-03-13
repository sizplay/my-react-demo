import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ path, thingsCount }) => {
  return (
    <ul>
      <li>
        {
          path === '/'
          ? (<span>Things { thingsCount }</span>)
          : (<Link to='/'>Things { thingsCount }</Link>)
        }
      </li>
      <li >
        {
          path === '/things/create'
          ? (<span>Create</span>)
          : (<Link to='/things/create'>Create</Link>)
        }
        </li>
    </ul>
  );
}

export default Nav;
