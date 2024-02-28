import React from 'react';

const Person = ({ name, address, email }) => {
  return (
    <div>
      <h2>Person Information</h2>
      <p>Name: {name}</p>
      <p>Address: {address}</p>
      <p>Email: {email}</p>
    </div>
  );
};

export default Person;
