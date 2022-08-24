class Ship {
  constructor(shipLength) {
    this.shipLength = shipLength;
    this.hits = [];
  }

  hit(number) {
    if (this.hits.indexOf(number) === -1) {
      this.hits.push(number);
    }
  }

  isSunk() {
    return this.hits.length === this.shipLength;
  }
}

export default Ship;
