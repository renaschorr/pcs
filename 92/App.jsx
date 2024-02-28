
import React from 'react';
import Person from './Person';

function App() {
  const personInfo = {
    name: 'John Doe',
    address: '123 Main St',
    email: 'john.doe@example.com',
  };

  return (
    <div>
      <h1>Hello Vite React!</h1>
      <Person {...personInfo} />
    </div>
  );
}

export default App;
