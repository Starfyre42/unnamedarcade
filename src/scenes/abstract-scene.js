//this imports the same instance of ms
import {messageSystem} from "../util/message-system.js"
// this creates a exportable class called abstract scene to interacte as a foward to phase.scene
export class AbstractScene extends Phaser.Scene {
    constructor() {
         super(...arguments);
        this.pieces = [];
        this.rnd=Phaser.Math.Between;
        
        this.messageSystem = messageSystem;
        this.messageSystem.subscribe(this.onMessage.bind(this));
        this.postMessage = this.messageSystem.postMessage.bind(this.messageSystem, this);
    }
     addDistort(image,imageName, x = 0.01, y = 0.01, duration = 0.35*1000){
      const fx = image.preFX.addDisplacement(imageName , -x, -y);

        this.tweens.add({
            targets: fx,
            x,
            y,
            yoyo: true,
            loop: -1,
            duration,
            ease: 'sine.inout'
        });
    }
    addBloom(image, color=0xffffff, offsetX= 0, offsetY=0, blurStrength=1,strength=1,steps=4){
              image.preFX.addBloom(color, offsetX, offsetY, blurStrength, strength, steps);
    }
    // Pieces is an array of objects containing a name and value
    setup(pieces) {
        for(let i = 0; i < pieces.length; i++) {
            this.pieces.push(pieces[i].value);
            this[pieces[i].name] = pieces[i].value;
        }
    }
    
    preload() {
        for(let i = 0; i < this.pieces.length; i++) {
            if(this.pieces[i].preload != undefined)
                this.pieces[i].preload();
        }
    }
    
    create() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.matter.world.on('collisionstart', this.handleCollision.bind(this));
        
        for(let i = 0; i < this.pieces.length; i++) {
            if(this.pieces[i].create != undefined)
                this.pieces[i].create();
        }
    }
    
    update() {
        for(let i = 0; i < this.pieces.length; i++) {
            if(this.pieces[i].update != undefined)
                this.pieces[i].update();
        }
    }
    
    center() {
        let x = this.cameras.main.centerX;
        let y = this.cameras.main.centerY;

        return {
            x,
            y
        }
    }
    
    screenSize() {
        return {
            width: this.game.config.width,
            height: this.game.config.height,
        };
    }
    
    loopAroundCheck(image) {
        
        if(image.isDestroyed)
            return;
            
        let {width, height} = this.screenSize();
        
        if (image.x > width) {
            image.x = 0; // If beyond right edge, move to left edge
        } else if (image.x < 0) {
            image.x = width; // If beyond left edge, move to right edge
        }

        if (image.y > height) {
            image.y = 0; // If beyond bottom edge, move to top edge
        } else if (image.y < 0) {
            image.y = height; // If beyond top edge, move to bottom edge
        }
    }
    
    move(image, force, direction) {
        if(direction == undefined)
            direction = image.curDir;
            
        if(direction == "up" || direction == undefined)
            this.moveUp(image, force);
        else if(direction == "down")
            this.moveDown(image, force);
        else if(direction == "left")
            this.moveLeft(image, force);
        else if(direction == "right")
            this.moveRight(image, force);
    }
    
    moveUp(image, force) {
        image.setAngle(0);
        
        image.applyForce({
            x: 0,
            y: -force
         });
         
         image.curDir = "up";
    }
    
    moveDown(image, force) {
        image.setAngle(180);
        
        image.applyForce({
            x: 0,
            y: force
        });
        
        image.curDir = "down";
    }
    
    moveLeft(image, force) {
        image.setAngle(-90);
        
        image.applyForce({
            x: -force,
            y: 0
        });
        
        image.curDir = "left";
    }
    
    moveRight(image, force) {
        image.setAngle(90);
        
        image.applyForce({
            x: force,
            y: 0
        });
        
        image.curDir = "right";
    }
    
    handleCollision(pair){
       this.postMessage("collision", pair)
    }
    
    onMessage(sender, subject, contents) {}
}
