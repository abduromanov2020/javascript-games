export class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 30;
    this.fontFamily = "Creepster";
    this.livesImage = document.getElementById("lives");
  }

  draw(context) {
    context.save();
    context.shadowOffsetX = 1;
    context.shadowOffsetY = 1;
    context.shadowBlur = 7;
    context.shadowColor = "white";
    context.font = this.fontSize + "px " + this.fontFamily;
    context.textAlign = "left";
    context.fillStyle = this.game.fontColor;

    // Score
    context.fillText("Score " + this.game.score, 20, 50);

    // timer
    context.font = this.fontSize * 0.8 + "px " + this.fontFamily;
    context.fillText("Time " + (this.game.time * 0.001).toFixed(1), 20, 80);

    // lives
    for (let i = 0; i < this.game.lives; i++) {
      context.drawImage(this.livesImage, 30 * i + 20, 95, 25, 25);
    }

    // level
    if (
      this.game.score % this.game.levelUp < 1200 &&
      this.game.score !== 0 &&
      this.game.score < 100000
    ) {
      context.textAlign = "center";
      context.font = this.fontSize * 2 + "px " + this.fontFamily;
      this.game.level = Math.floor(this.game.score / this.game.levelUp + 1);
      context.fillText(
        "Level " + this.game.level,
        this.game.width * 0.5,
        this.game.height * 0.5 - 180
      );
    }

    // game over
    if (this.game.gameOver) {
      context.textAlign = "center";
      context.font = this.fontSize * 3 + "px " + this.fontFamily;
      if (this.game.lives !== 0 && this.game.score !== 0) {
        context.fillText(
          "Winner Chiken Dinner",
          this.game.width * 0.5,
          this.game.height * 0.5 - 20
        );
        context.font = this.fontSize * 1 + "px " + this.fontFamily;
        context.fillText(
          'Press "R" to play again',
          this.game.width * 0.5,
          this.game.height * 0.5 + 20
        );
      } else {
        context.font = this.fontSize * 3 + "px " + this.fontFamily;
        context.fillText(
          "Game Over",
          this.game.width * 0.5,
          this.game.height * 0.5 - 20
        );
        context.font = this.fontSize * 1 + "px " + this.fontFamily;
        context.fillText(
          'Press "R" to play again',
          this.game.width * 0.5,
          this.game.height * 0.5 + 20
        );
      }
    }

    // Cover
    if (
      this.game.player.currentState === this.game.player.states[0] &&
      this.game.player.x == 0
    ) {
      context.textAlign = "center";
      context.fillStyle = "#111";
      context.shadowColor = "white";
      context.shadowOffsetX = 1;
      context.shadowOffsetY = 1;
      context.shadowBlur = 7;
      context.font = this.fontSize * 3.5 + "px " + this.fontFamily;
      context.fillText(
        "Momob lost in jungle",
        this.game.width * 0.5,
        this.game.height * 0.5 - 150
      );

      context.font = this.fontSize * 1 + "px " + this.fontFamily;
      context.fillText(
        `Press 🡸 or 🡺  to play 
      Press   "SHIFT"  to use power up 
      Press 🡻 to pause`,
        this.game.width * 0.5,
        this.game.height * 0.5 + 220
      );
    }
    context.restore();
  }
}
