import Gameboard from "../js/Gameboard";
import BotPlayer from "../js/BotPlayer";

const bot = new BotPlayer("Gizmo", new Gameboard(), {
  xMin: 1,
  xMax: 10,
  yMin: 1,
  yMax: 10,
});

test("check if coordinates have been hit already", () => {
  const allShots = [
    { x: 1, y: 3 },
    { x: 5, y: 8 },
  ];
  expect(bot.checkCoords(allShots, 1, 3)).toBeTruthy();
  expect(bot.checkCoords(allShots, 5, 9)).toBeFalsy();
});

test("generate attack coordinates with 1 <= x/y <= 10", () => {
  for (let i = 0; i < 100; i++) {
    expect(bot.generateAttack().x).toBeGreaterThanOrEqual(1);
    expect(bot.generateAttack().x).toBeLessThanOrEqual(10);
    expect(bot.generateAttack().y).toBeGreaterThanOrEqual(1);
    expect(bot.generateAttack().y).toBeLessThanOrEqual(10);
  }
});
