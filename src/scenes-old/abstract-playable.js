// Abstract class that encompasses a game with a ship
// Child classes are expected to provide extra stuff like backgrounds and music
export class AbstractPlayable extends Phaser.Scene {

    // Class members
    cursors; // Cursor keys
    ship; // Controllable ship

    // Constructor that just passes on whatever arguments are
    // Given to it from the child
    constructor() {

        // Expand out all given arguments into function parameters and forward
        // Them to the parent (super)
        super(...arguments); // Provide a unique key for the scene
    }

    preload() {
        // Just load a ship
        this.load.image(`ship`, `/assets/images/ship.png`);
    }

    // Get the center coordinates
    center() {
        let x = this.cameras.main.centerX;
        let y = this.cameras.main.centerY;

        return {
            x,
            y
        }
    }

    create() {
        this.playerHealth = 100;
        this.healthBar = this.add.graphics();
        this.updateHealthBar();
        // Get center coordinates
        let {
            x,
            y
        } = this.center();

        // Create ship in center
        this.ship = this.matter.add.image(x, y, "ship");

        // Set it's scale and mass
        this.ship.setScale(5);
        this.ship.setMass(10);

        // Flip the ship up, this is needed for controls to work correctly
        // Otherwise up will move the ship down and vice versa which we dont want
        this.ship.flipY = true;

        // Set the world bounds to be the camra bounds
        this.matter.world.setBounds(0, 0, 0, 0);

        // Get cursor keys
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.cursors.space.isDown) {
            this.playerHealth -= 1;
            this.updateHealthBar();
        }
        // These move the ship up and down when up and down
        // are pressed

        // Thrust forward
        if (this.cursors.up.isDown) {
            let angle = this.ship.rotation - Math.PI / 2;
            let forceMagnitude = 0.01;
            let force = {
                x: forceMagnitude * Math.cos(angle),
                y: forceMagnitude * Math.sin(angle)
            };
            this.ship.applyForce(force);
        }

        // Thrust backward
        if (this.cursors.down.isDown) {
            let angle = this.ship.rotation - Math.PI / 2;
            let forceMagnitude = -0.01;
            let force = {
                x: forceMagnitude * Math.cos(angle),
                y: forceMagnitude * Math.sin(angle)
            };
            this.ship.applyForce(force);
        }

        // These rotate the ship left and right when
        // Left and right are pressed
        // It does so using physics

        // Steer left
        if (this.cursors.left.isDown) {
            this.ship.setAngularVelocity(-0.02);
        } else if (this.cursors.right.isDown) {
            this.ship.setAngularVelocity(0.02);
        } else {
            this.ship.setAngularVelocity(0);
        }
        if (this.ship.x > 800) {
            this.ship.x = 0; // If beyond right edge, move to left edge
        } else if (this.ship.x < 0) {
            this.ship.x = 800; // If beyond left edge, move to right edge
        }

        if (this.ship.y > 600) {
            this.ship.y = 0; // If beyond bottom edge, move to top edge
        } else if (this.ship.y < 0) {
            this.ship.y = 600; // If beyond top edge, move to bottom edge
        }
    }
    updateHealthBar() {
        this.healthBar.clear();

        // Draw the background of the health bar
        this.healthBar.fillStyle(0x000000, 1); // Background color
        this.healthBar.fillRect(10, 10, 200, 20); // Background rectangle (x, y, width, height)

        // Draw the health amount as a green bar
        this.healthBar.fillStyle(0x00FF00, 1); // Health bar color
        this.healthWidth = (this.playerHealth / 100) * 200; // Calculate the width based on player's health
        this.healthBar.fillRect(10, 10, this.healthWidth, 20); // Health bar rectangle (x, y, width, height)
    }

}