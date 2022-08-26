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
        const coords = `(${j + 1}, ${i})`;
        const xVal = j + 1;
        const yVal = i;
        let className = "gridField";
        props.board.ships.forEach((ship) => {
          ship.coordinates.forEach((set) => {
            if (set.x == xVal && set.y === yVal) className = "gridField ship";
          });
        });
        nodes.push(
          <div
            key={coords}
            id={coords}
            className={className}
            x={xVal}
            y={yVal}
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

  const fillBoards = () => {
    const board1 = new Gameboard();
    const board2 = new Gameboard();
    board1.placeShip(5, 17, 3, "vertical");
    board2.placeShip(9, 23, 3, "horizontal");
    setPlayer1Board(board1);
    setPlayer2Board(board2);
  };

  const startGame = () => {
    setGrid(32);
    fillBoards();
    setPlayer1(new Player("Human", player1Board));
    setPlayer2(
      new BotPlayer("Bot", player2Board, {
        xMin: 1,
        xMax: grid,
        yMin: 1,
        yMax: grid,
      })
    );
    setIsGame(true);
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
            <Grid
              playerName={player1.playerName}
              grid={grid}
              board={player1Board}
            />
            <Grid
              playerName={player2.playerName}
              grid={grid}
              board={player2Board}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
