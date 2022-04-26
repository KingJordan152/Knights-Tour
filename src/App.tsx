import React from "react";
import "./App.css";
// Components
import Board from "./components/Board/Board";

function App() {
  return (
    <main className='main-page'>
      <div>
        <h1>Knight's Tour</h1>
      </div>
      <div className='board-area'>
        <Board />
      </div>
    </main>
  );
}

export default App;
