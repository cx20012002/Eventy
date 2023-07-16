import React from 'react';
import './styles.css';
import NavBar from "./NavBar";

function App() {
  return (
      <>
        <NavBar/>
        <h1 className={"text-2xl font-bold text-red-500"}>Hello World</h1>
      </>
  );
}

export default App;
