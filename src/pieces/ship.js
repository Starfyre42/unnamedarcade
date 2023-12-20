import {AbstractPiece} from "./abstract-piece.js"

export class Ship extends AbstractPiece {
    constructor(engine, config = {}) {
        super(engine, config, {
            position: {x: 0, y: 0},
            moveForce: 0.01,
            turnForce: 0.02,
            loopAround: true,
            centerShip: true,
        });
    }
    
    preload() {
        this.engine.load.image(`ship`, `/assets/images/ship.png`);
    }
    
    create() {
        
        if(this.centerShip) {
            this.position = this.engine.center();
        }
        
        this.ship = this.engine.matter.add.image(this.position.x, this.position.y, "ship");
        this.ship.setScale(5);
        this.ship.setMass(25);
        this.ship.setFrictionAir(0);
        this.ship.flipY = true;
        this.ship.piece = this;
    }
    
    update() {
        if(this.loopAround)
            this.engine.loopAroundCheck(this.ship);
            
        /// Keep the ship with no rotation
        this.engine.move(this.ship, 0);
    }
    
    moveUp() {
        this.engine.moveUp(this.ship, this.moveForce);
    }
    
    moveDown() {
        this.engine.moveDown(this.ship, this.moveForce);
    }
    
    moveLeft() {
        this.engine.moveLeft(this.ship, this.moveForce);
    }
    
    moveRight() {
        this.engine.moveRight(this.ship, this.moveForce);
    }
    
    onMessage(sender, subject, contents) {
        
    }
}
