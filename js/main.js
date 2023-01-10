import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Background } from "./background.js";
import {
  FlyingEnemy,
  GroundEnemy,
  ClimbingEnemy,
  EnemyBat,
  EnemyGhost1,
  EnemyGhost2,
  EnemyWorm,
  EnemyGhost3,
  EnemyRaven,
  EnemyHand,
} from "./enemies.js";
import { UI } from "./ui.js";

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 1500;
  canvas.height = 500;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.groundMargin = 83;
      this.speed = 0;
      this.maxSpeed = 6;
      this.background = new Background(this);
      this.player = new Player(this);
      this.input = new InputHandler(this);
      this.UI = new UI(this);
      this.enemies = [];
      this.particles = [];
      this.collisions = [];
      this.floatingMessages = [];
      this.maxParticles = 50;
      this.enemyTimer = 0;
      this.enemyInterval = 1000;
      this.debug = false;
      this.score = 0;
      this.fontColor = "black";
      this.time = 0;
      this.maxTime = 1000;
      this.gameOver = false;
      this.lives = 5;
      this.level = 1;
      this.levelUp = 10000;
      this.player.currentState = this.player.states[0];
      this.player.currentState.enter();
    }

    update(deltaTime) {
      this.background.update();
      this.player.update(this.input.keys, deltaTime);

      if (this.player.currentState !== this.player.states[0]) {
        this.time += deltaTime;

        this.enemies.forEach((enemy) => {
          enemy.update(deltaTime);
        });

        // handleEnemies
        if (this.enemyTimer > this.enemyInterval) {
          this.enemyTimer = 0;
          this.addEnemy();
        } else this.enemyTimer += deltaTime;
      }

      // handleParticles
      this.particles.forEach((particle, index) => {
        particle.update();
      });
      if (this.particles.length > this.maxParticles)
        this.particles.length = this.maxParticles;

      // handleFloatingMessages
      this.floatingMessages.forEach((message) => {
        message.update(deltaTime);
      });

      // handleCollisions
      this.collisions.forEach((collision, index) => {
        collision.update(deltaTime);
      });

      this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
      this.particles = this.particles.filter(
        (particle) => !particle.markedForDeletion
      );
      this.collisions = this.collisions.filter(
        (collision) => !collision.markedForDeletion
      );
      this.floatingMessages = this.floatingMessages.filter(
        (message) => !message.markedForDeletion
      );

      if (this.score == 200000) this.gameOver = true;
    }

    draw(context) {
      this.background.draw(context);
      this.player.draw(context);

      this.enemies.forEach((enemy) => {
        enemy.draw(context);
      });

      this.particles.forEach((particle) => {
        particle.draw(context);
      });

      this.collisions.forEach((collision) => {
        collision.draw(context);
      });

      this.floatingMessages.forEach((message) => {
        message.draw(context);
      });

      this.UI.draw(context);
    }

    addEnemy() {
      if (this.speed > 0 && Math.random() < 0.5) {
        this.enemies.push(new GroundEnemy(this));
      }

      this.enemies.push(new FlyingEnemy(this));
      this.enemies.push(new EnemyBat(this));

      if (this.speed > 0 && this.level >= 2) {
        this.enemies.push(new ClimbingEnemy(this));
      }

      if (this.speed > 0 && this.level >= 3) {
        this.enemies.push(new EnemyGhost1(this));
      }

      if (this.speed > 0 && this.level >= 4) {
        this.enemies.push(new EnemyWorm(this));
      }

      if (this.speed > 0 && this.level >= 5) {
        this.enemies.push(new EnemyRaven(this));
      }

      if (this.speed > 0 && this.level >= 6) {
        this.enemies.push(new EnemyGhost2(this));
      }

      if (this.speed > 0 && this.level >= 7) {
        this.enemies.push(new EnemyGhost3(this));
      }

      if (this.speed > 0 && this.level >= 8) {
        this.enemies.push(new EnemyHand(this));
      }

      if (this.speed > 0 && this.level >= 9) {
        this.enemyInterval = 750;
      }
    }

    reset() {
      if (
        this.gameOver &&
        window.addEventListener("keydown", (e) => {
          if (e.key === "r") {
            location.reload();
          }
        })
      );
    }
  }

  const game = new Game(canvas.width, canvas.height);
  console.log(game);
  let lastTime = 0;

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);
    game.reset();
    if (!game.gameOver) requestAnimationFrame(animate);
  }

  animate(0);
});
