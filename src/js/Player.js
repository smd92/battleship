class Player {
  constructor(playerName, playerGameboard) {
    this.playerName = playerName;
    this.playerGameboard = playerGameboard;
  }

  attackEnemyGameboard(enemyGameboard, x, y) {
    enemyGameboard.receiveAttack(x, y);
  }
}

export default Player;
