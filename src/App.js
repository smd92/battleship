import React from "react";
import logo from "./logo.svg";
import "./css//App.css";
import Gameboard from "./js/Gameboard";
import Player from "./js/Player";
import BotPlayer from "./js/BotPlayer";

const Grid = (props) => {
  const [gridNodes, setGridNodes] = React.useState(null);

  const getClassName = (x, y) => {
    let className = "gridField";
    //set className for fields that are ships
    props.board.ships.forEach((ship) => {
      ship.coordinates.forEach((set) => {
        if (set.x == x && set.y === y) className = className + " ship";
      });
    });
    //set className for fields that have been shot already
    props.board.allShots.forEach((set) => {
      if (set.x == x && set.y == y) className = className + " hit";
    });
    return className;
  };

  const handleClick = (event) => {
    const x = event.target.getAttribute("x");
    const y = event.target.getAttribute("y");
    props.attackBoard(x, y);
  };

  const buildGridNodes = () => {
    const nodes = [];
    for (let i = props.grid; i > 0; i--) {
      for (let j = 0; j < props.grid; j++) {
        const coords = `(${j + 1}, ${i})`;
        const xVal = j + 1;
        const yVal = i;
        const className = getClassName(xVal, yVal);
        nodes.push(
          <div
            key={coords}
            id={coords}
            className={className}
            x={xVal}
            y={yVal}
            player-id={props.playerId}
            onClick={(event) => handleClick(event)}
          ></div>
        );
      }
    }
    setGridNodes(nodes);
  };

  React.useEffect(() => {
    buildGridNodes();
  }, [props.turn]);

  return (
    <div>
      <h2>{props.player.playerName}</h2>
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
  const [turn, setTurn] = React.useState(true);

  const attackHumanBoard = () => {
    player2.attackEnemyGameboard(player1Board);
  };

  const attackBotBoard = (x, y) => {
    player2Board.receiveAttack(x, y);
    setTurn(!turn)
    attackHumanBoard();
  };

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
        xMax: 32,
        yMin: 1,
        yMax: 32,
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
            {turn ? (
              <p>{`It's ${player1.playerName}'s turn`}</p>
            ) : (
              <p>{`It's ${player2.playerName}'s turn`}</p>
            )}
            <Grid
              grid={grid}
              board={player1Board}
              turn={turn}
              player={player1}
              playerId={1}
              setTurn={setTurn}
              attackBoard={attackBotBoard}
            />
            <Grid
              grid={grid}
              board={player2Board}
              turn={turn}
              player={player2}
              playerId={2}
              setTurn={setTurn}
              attackBoard={attackBotBoard}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
