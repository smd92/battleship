import Gameboard from "../js/Gameboard";

test("create gameboard and place ship with length = 3 vertical for x = 1 and y = 2", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(1, 2, 3, "vertical");
  expect(gameboard.ships[0].coordinates).toEqual([
    { x: 1, y: 2 },
    { x: 1, y: 3 },
    { x: 1, y: 4 },
  ]);
});

test("receive attack/hit and register hit on gameboard, ship", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(1, 2, 3, "vertical");
  gameboard.receiveAttack(1, 3);
  expect(gameboard.hits.length).toBe(1);
  expect(gameboard.missedShots.length).toBe(0);
  expect(gameboard.hits[0]).toMatchObject({ x: 1, y: 3 });
  expect(gameboard.ships[0].ship.hits).toContain(2);
});

test("receive missed shot and track it", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(1, 2, 3, "vertical");
  gameboard.receiveAttack(1, 5);
  expect(gameboard.missedShots[0]).toMatchObject({ x: 1, y: 5 });
  expect(gameboard.hits.length).toBe(0);
});

test("sink all ships and report that all ships have been sunk", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(1, 2, 3, "vertical");
  gameboard.receiveAttack(1, 2);
  gameboard.receiveAttack(1, 3);
  gameboard.receiveAttack(1, 4);
  gameboard.placeShip(5, 6, 3, "vertical");
  gameboard.receiveAttack(5, 6);
  gameboard.receiveAttack(5, 7);
  gameboard.receiveAttack(5, 8);
  expect(gameboard.reportAllSunk()).toBeTruthy();
});
