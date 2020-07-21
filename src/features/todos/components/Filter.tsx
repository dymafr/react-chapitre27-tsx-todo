import React from 'react';
import { Link } from 'react-router-dom';

const Filter = () => {
  return (
    <>
      <Link to="/todos/all" className="btn btn-primary mr-2">
        Tout
      </Link>
      <Link to="/todos/done" className="btn btn-primary mr-2">
        Fini
      </Link>
      <Link to="/todos/active" className="btn btn-primary">
        En cours
      </Link>
    </>
  );
};

export default Filter;
