var numberOfEnemies;
var allEnemies = [];
var player;
var enemy;
var possibleY = [40, 135, 210];

//Variables declared!

// Enemies our player must avoid
var Enemy = function(xPosition, yPosition, velocity) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.xPos = xPosition;
    this.yPos = yPosition;
    this.vel = velocity;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var difference = this.vel * dt;
    this.xPos += difference;
    //Use the dt parameter for movement.
    if (this.xPos >= 505){
        this.xPos = -50;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.xPos, this.yPos);
    this.checkCollision();
};

//Function checkCollision takes an enemy bug as an input and checks collisions with the player object!
Enemy.prototype.checkCollision = function(){
  if (player.yPos <= this.yPos + 50 && player.xPos <= this.xPos + 75 && player.xPos+60 >= this.xPos && player.yPos + 50 >= this.yPos) {
      //decrement the score by 5 in case of collision
      player.score -= 5;
      console.log("5 Points reduced on collision");
      console.log("Score: " + player.score);
      console.log("Level: " + player.level);
      player.reset();
      //Reset the position of the player in case of collision
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(xPosition, yPosition, velocity) {
    //The player class declares the characteristics of the Player
    this.xPos = xPosition;
    this.yPos = yPosition;
    this.vel = velocity;
    this.sprite = 'images/char-boy.png';
    this.score;
    this.level;
};

Player.prototype.update = function(){
    //Following if statement increments score once the doodle reaches the top of the canvas.
    if (this.yPos <= 0){
        this.reset();
        this.score += 20;
        numberOfEnemies += 1;
        this.level += 1;
        addEnemy();
        console.log("Score:" + this.score);
        console.log("Level: " + this.level);
    }
    //Following three if cases prevent the doodle from moving off the screen
    if (this.xPos >= 402.5){
        this.xPos = 402.5;
    }
    if (this.xPos <= 2.5){
        this.xPos = 2.5;
    }
    if (this.yPos >= 435){
        this.yPos = 435;
    }
};

//Following function will reset the player to default location
Player.prototype.reset = function(){
    this.xPos = 202.5;
    this.yPos = 410;
};

//This method increases the number of enemies which is passed as a parameter. It gives them random values for Y axis and velocity.
function addEnemy(){
      allEnemies.push(new Enemy(-50, possibleY[Math.floor(Math.random() *3) + 0], Math.floor(Math.random() * 175) + 25));
};

//This is a required method
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.xPos, this.yPos);
};

Player.prototype.handleInput = function(key){
    if (key == 'up'){
        this.yPos -= 25;
    }
    if (key == 'down'){
        this.yPos += 25;
    }
    if (key == 'left'){
        this.xPos -= 25;
    }
    if (key == 'right'){
        this.xPos += 25; //Change the players velocity parameter upon keyPress
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//Here the initialize method instantiates the variables and objects.
function initialize() {
    player = new Player(202.5,410,50);
    enemy = new Enemy(-50, possibleY[Math.floor(Math.random() *3) + 0], Math.floor(Math.random() * 200) + 25);
    player.score = 0;
    player.level = 1;
    allEnemies.push(enemy);
};

initialize();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
