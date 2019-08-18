// Enemies our player must avoid
// Enemy constructor takes a single parameter, y representing the vertical position on the canvas
// Enemy properties - sprite: the image used to in the game which must be preloaded by the Resource object
//                  - x: the horizontal postion in pixels which is randomly set between 0 to 400
//                  - y: the vertical postion in pixels
//                  - imageWidth: width of the sprite image in pixels (used in collision function)
//                  - imageHeight: height of the sprite image in pixels (used in collision function)
//                  - speedFactor used as factor when incrementing the x property to simulate movement
//
var Enemy = function(y) {
    this.sprite = 'images/enemy-bug-c.png';
    this.x = Math.random() * 400;
    this.y = y;
    this.imageWidth = 99;
    this.imageHeight = 72;
    this.speedFactor = 0.1;
};

// Parameter: dt, a time delta between ticks
// update(dt) method increments the enemy.x property effectively achieving horizontal movement of the enemy objects
// The increment on each iteration of the game engine is 120 px multiplied by:
//  - dt representing the delta t (seconds) for refreshing the engine loop to refresh the game
//  - speedFactor is determined by the player status
//  - randomisedDeltax is a random factor between 0 and 1 to prevent the enemy objects from grouping
//
Enemy.prototype.update = function(dt) {
    let randomisedDeltaX = Math.random();

    if (player.status == 'COMMENCED' || player.status == 'WON') {
        this.speedFactor = 0.1;
    }
    if (player.status == 'LEVEL0') {
        this.speedFactor = 1.0;
    }
    if (player.status == 'LEVEL1') {
        this.speedFactor = 4.0;
    }
    if (player.status == 'LEVEL2') {
        this.speedFactor = 8.0;
    }

    this.x += 120 * dt * randomisedDeltaX * this.speedFactor;
    //  The enemy are permitted to move off the canvas but then wrap back to just before the start
    if (this.x > 600) {
        this.x = -200;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class represents the single object manipulated by the keyboard arrow keys
// sprite: image preloaded by the Resources object
// x: the vertical position of the player object in pixels
// y: the horizontal position of the player object in pixels
// These properties are passed in as constructor parameters but also have defaults
// imageWidth: width of the sprite image in pixels (used in collision function)
// imageHeight: height of the sprite image in pixels (used in collision function)
// status: used to define the state of the player and hence the game

class Player {

    constructor(x = 218, y = 485, sprite = 'images/char-boy-c.png') {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.imageWidth = 69;
        this.imageHeight = 79;
        this.status = "COMMENCED";
    }

    // reset() method is called the event handler if the game is won
    //
    reset() {
        this.x = 218;
        this.y = 485;
        this.status = "COMMENCED";
    }

    // update() method is called from within the game loop and updates the player.status
    update() {

        if (player.y < 54) {
            player.status = 'WON';
        }
        else if (this.y < 220) {
            this.status = 'LEVEL2';
        }
        else if (this.y < 300) {
            this.status = 'LEVEL1';
        }
    }

    // render() method draws the player image using the updated position (x and y)
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // handleInput() method takes a direction parameter from the event handler and updates the position of the player
    // The size of the player horizontal (x) and vertical (y) "steps" are defined based on the size of the tiles in the
    // canvas along with factors to enable an adjusment. The min max constants set the boundaries to prevent the player from moving
    // off the canvas
    // Note that the initial step by the player results in the status being updated from 'COMMENCED' to 'LEVEL0'
    handleInput(direction) {
        const horizontalStepFactor = 0.5;
        const verticalStepFactor = 0.5;
        const stepHorizontal = 101 * horizontalStepFactor;
        const stepVertical = 83 * verticalStepFactor;
        const xMin = 2;
        const xMax = 450;
        const yMin = 1;
        const yMax = 485;

        if ((direction === 'left') && (this.x - stepHorizontal >= xMin)) {
            this.x += -stepHorizontal;
        }
        else if ((direction === 'right')&& (this.x + stepHorizontal <= xMax))  {
            this.x += stepHorizontal;
        }
        else if ((direction === 'up') && (this.y - stepVertical >= yMin)) {
            this.y += -stepVertical;
        }
        else if ((direction === 'down') && (this.y + stepVertical <= yMax)) {
            this.y += stepVertical;
        }
        if (player.status == 'COMMENCED') {
            player.status = 'LEVEL0';
        }
    }
}

// enemy objects are created globally
// The allEnemies array is a container for the 3 enemy objects
// The Enemy constructor is called with the y parameter which remains constant for each enemy constant
const allEnemies = [];
allEnemies.push(new Enemy(143));
allEnemies.push(new Enemy(226));
allEnemies.push(new Enemy(309));

// The player object is instantiated globally
const player = new Player();

// A global function is created which takes the player object as a parameter and returns a boolean; true if a collision is detected
// between the player and any enemy object. The collision detection is based on a bounding box algorithm with a collisionBuffer to compensate
// for irregular shapes
//
function checkCollision(player) {
    let collision = false;
    let horizontalCollision = false;
    let verticalCollision = false;
    let collisionBuffer = 10;

    for (var enemy of allEnemies) {
        horizontalCollision = ((player.x <= enemy.x) && (enemy.x <= (player.x + player.imageWidth - collisionBuffer))) ||
            ((enemy.x <= player.x) && (player.x <= (enemy.x + enemy.imageWidth -collisionBuffer)));
        verticalCollision = ((player.y <= enemy.y) && (enemy.y <= player.y + player.imageHeight - collisionBuffer)) ||
            ((enemy.y <= player.y) && (player.y <= enemy.y + enemy.imageHeight - collisionBuffer));
        collision = horizontalCollision && verticalCollision;

        if (collision) {
            break;
        }
    }

    return collision;
}

// This listens for key presses and calls the player.handleInput() method if an arrow key is pressed
// If any keyup is detected while the player.status is 'WON" the game is reset
//
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    if (player.status == "WON") {
        player.reset();
    }
    else {
        player.handleInput(allowedKeys[e.keyCode]);
    }
});
