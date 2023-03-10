class Enemy {
  constructor() {
    this.frameX = 0;
    this.frameY = 0;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.markedForDeletion = false;
  }

  update(deltaTime) {
    // movement
    this.x -= this.speedX + this.game.speed;
    this.y += this.speedY;
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else this.frameTimer += deltaTime;

    // remove if off screen
    if (this.x + this.width < 0) this.markedForDeletion = true;
  }

  draw(context) {
    if (this.game.debug)
      context.strokeRect(this.x, this.y, this.width, this.height);
    context.drawImage(
      this.image,
      this.frameX * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

export class FlyingEnemy extends Enemy {
  constructor(game) {
    super();
    this.game = game;
    this.width = 60;
    this.height = 44;
    this.x = this.game.width + Math.random() * this.game.width * 0.5;
    this.y = Math.random() * this.game.height * 0.5;
    this.speedX = Math.random() + 1;
    this.speedY = 0;
    this.maxFrame = 5;
    this.image = document.getElementById("enemy_fly");
    this.angle = 0;
    this.va = Math.random() * 0.1 + 0.1;
  }

  update(deltaTime) {
    super.update(deltaTime);
    this.angle += this.va;
    this.y += Math.sin(this.angle);
  }
}

export class GroundEnemy extends Enemy {
  constructor(game) {
    super();
    this.game = game;
    this.width = 60;
    this.height = 87;
    this.x = this.game.width;
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.image = document.getElementById("enemy_plant");
    this.speedX = 0;
    this.speedY = 0;
    this.maxFrame = 1;
  }
}

export class ClimbingEnemy extends Enemy {
  constructor(game) {
    super();
    this.game = game;
    this.width = 120;
    this.height = 144;
    this.x = this.game.width;
    this.y = Math.random() * this.game.height * 0.5;
    this.image = document.getElementById("enemy_spider");
    this.speedX = 0;
    this.speedY = Math.random() > 0.5 ? 1 : -1;
    this.maxFrame = 5;
  }

  update(deltaTime) {
    super.update(deltaTime);
    if (this.y > this.game.height - this.height - this.game.groundMargin) {
      this.speedY *= -1;
    }

    if (this.y < -this.height) this.markedForDeletion = true;
  }

  draw(context) {
    super.draw(context);
    context.beginPath();
    context.moveTo(this.x + this.width / 2, 0);
    context.lineTo(this.x + this.width / 2, this.y + 50);
    context.stroke();
  }
}

export class EnemyBat extends FlyingEnemy {
  constructor(game) {
    super(game);
    this.game = game;
    this.width = 83;
    this.image = document.getElementById("enemy_bat");
  }
}

export class EnemyGhost1 extends FlyingEnemy {
  constructor(game) {
    super(game);
    this.game = game;
    this.width = 87;
    this.image = document.getElementById("enemy_ghost_1");
  }
}

export class EnemyGhost2 extends FlyingEnemy {
  constructor(game) {
    super(game);
    this.game = game;
    this.width = 60.1;
    this.image = document.getElementById("enemy_ghost_2");
  }
}

export class EnemyWorm extends GroundEnemy {
  constructor(game) {
    super(game);
    this.game = game;
    this.width = 80.3;
    this.height = 60;
    this.image = document.getElementById("enemy_worm");
    this.x = this.game.width + Math.random() * this.game.width * 0.5;
    this.speedX = Math.random() + 1;
    this.y = this.game.height - this.height - this.game.groundMargin;
  }
}

export class EnemyGhost3 extends FlyingEnemy {
  constructor(game) {
    super(game);
    this.game = game;
    this.width = 80;
    this.height = 89;
    this.image = document.getElementById("enemy_ghost_3");
    this.maxFrame = 1;
  }
}

export class EnemyRaven extends FlyingEnemy {
  constructor(game) {
    super(game);
    this.game = game;
    this.speedX = Math.random() + 5;
    this.width = 133.3;
    this.height = 95;
    this.image = document.getElementById("enemy_raven");
  }
}

export class EnemyHand extends GroundEnemy {
  constructor(game) {
    super(game);
    this.game = game;
    this.width = 55.75;
    this.height = 80;
    this.image = document.getElementById("enemy_hand");
    this.x = this.game.width + Math.random() * this.game.width * 0.5;
    this.y = this.game.height - this.height - this.game.groundMargin;
  }
}
