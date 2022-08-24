import Ship from "../js/Ship";

test("create ship object with length of 3", () => {
  expect(new Ship(3)).toMatchObject({
    shipLength: 3,
    hits: [],
  });
});

test("sink ship with length 3", () => {
  const ship = new Ship(3);
  ship.hit(1);
  ship.hit(2);
  ship.hit(3);
  expect(ship.isSunk()).toBeTruthy();
});

test("allow positions to be hit only once", () => {
  const ship = new Ship(3);
  ship.hit(1);
  ship.hit(1);
  ship.hit(2);
  expect(ship.hits.length).toBe(2);
});
