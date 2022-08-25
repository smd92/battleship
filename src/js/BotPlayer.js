class BotPlayer {
  constructor(playerName, playerGameboard, range) {
    this.playerName = playerName;
    this.playerGameboard = playerGameboard;
    this.range = range;
  }

  //check if coordinates have been shot already
  checkCoords(allShots, x, y) {
    return allShots.some((set) => {
      return set.x === x && set.y === y;
    });
  }

  //generate random attack
  generateAttack() {
    const x = Math.floor(
      Math.random() * (this.range.xMax - this.range.xMin) + this.range.xMin
    );
    const y = Math.floor(
      Math.random() * (this.range.yMax - this.range.yMin) + this.range.yMin
    );
    return { x, y };
  }

  attackEnemyGameboard(enemyGameboard) {
    const attackCoords = this.generateAttack();
    //check if attack is valid
    const checkResult = this.checkCoords(
      enemyGameboard.allShots,
      attackCoords.x,
      attackCoords.y
    );
    if (!checkResult) {
      enemyGameboard.receiveAttack(attackCoords.x, attackCoords.y);
    } else {
      this.attackEnemyGameboard(enemyGameboard);
    }
  }
}

export default BotPlayer;
