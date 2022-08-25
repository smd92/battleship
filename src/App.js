import React from "react";
import logo from "./logo.svg";
import "./css//App.css";
import Gameboard from "./js/Gameboard";
import Player from "./js/Player";
import BotPlayer from "./js/BotPlayer";

const Grid = (props) => {
  const [gridNodes, setGridNodes] = React.useState(null);

  const buildGridNodes = () => {
    const nodes = [];

    for (let i = props.grid; i > 0; i--) {
      for (let j = 0; j < props.grid; j++) {
        nodes.push(
          <div
            key={`(${j + 1}, ${i})`}
            id={`(${j + 1}, ${i})`}
            className="gridField"
            x={j + 1}
            y={i}
          ></div>
        );
      }
    }
    setGridNodes(nodes);
  };

  React.useEffect(() => {
    buildGridNodes();
  }, []);

  return (
    <div>
      <h2>{props.playerName}</h2>
      <div className="Grid">{gridNodes}</div>
    </div>
  );
};

function App() {
  const [isGame, setIsGame] = React.useState(false);
  const [grid, setGrid] = React.useState(null);
  const [player1Board, setPlayer1Board] = React.useState(null);
  const [player2Board, setPlayer2Board] = React.useState(null);
  const [player1, setPlayer1] = React.useState(null);
  const [player2, setPlayer2] = React.useState(null);

  const startGame = () => {
    setIsGame(true);
    setGrid(32);
    setPlayer1Board(new Gameboard());
    setPlayer2Board(new Gameboard());
    setPlayer1(new Player("Human", player1Board));
    setPlayer2(
      new BotPlayer("Bot", player2Board, {
        xMin: 1,
        xMax: grid,
        yMin: 1,
        yMax: grid,
      })
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <a href="/">
          <img src={logo} className="App-logo" alt="logo" />
        </a>
        <h1>Battleship</h1>
      </header>
      <main className="App-body">
        {!isGame ? (
          <button type="button" onClick={startGame}>
            Start Game
          </button>
        ) : (
          <div className="gridsContainer">
            <Grid playerName={player1.playerName} grid={grid} />
            <Grid playerName={player2.playerName} grid={grid} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
