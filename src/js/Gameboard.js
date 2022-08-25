import Ship from "./Ship";

class Gameboard {
  constructor() {
    this.ships = [];
    this.hits = [];
    this.missedShots = [];
    this.allShots = [];
  }

  placeShip(x, y, shipLength, direction) {
    const ship = new Ship(shipLength);
    const coordinates = [];

    //set x and y values and coordinates
    if (direction === "vertical") {
      for (let i = y; i < y + shipLength; i++) {
        coordinates.push({ x: x, y: i });
      }
    } else if (direction === "horizontal") {
      for (let i = x; i < x + shipLength; i++) {
        coordinates.push({ x: i, y: y });
      }
    }

    this.ships.push({
      ship,
      coordinates,
    });
  }

  receiveAttack(x, y) {
    let missed = true;
    this.ships.forEach((ship) => {
      ship.coordinates.forEach((set) => {
        if (set.x === x && set.y === y) {
          this.hits.push(set);
          const num = ship.coordinates.indexOf(set);
          ship.ship.hit(num + 1);
          missed = false;
        }
      });
    });
    if (missed) this.missedShots.push({ x: x, y: y });
    this.allShots.push({ x: x, y: y });
  }

  reportAllSunk() {
    return this.ships.every((ship) => {
      return ship.ship.shipLength === ship.ship.hits.length;
    });
  }
}

export default Gameboard;
