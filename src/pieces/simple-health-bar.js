import {AbstractPiece} from "./abstract-piece.js"

export class SimpleHealthBar extends AbstractPiece {
    constructor(engine, config = {}) {
        super(engine, config, {
            bgColor: 0x000000,
            fgColor: 0x00FF00,
            maxHealth: 100,
            curHealth: 100,
            position: {x: 10, y: 10, width: 200, height: 20},
        });
    }
    
    create() {
        this.healthBar = this.engine.add.graphics();
        this.updateHealthBar();
        this.healthBar.piece = this;
    }
    
    updateHealthBar() {
        this.healthBar.clear();

        // Draw the background of the health bar
        this.healthBar.fillStyle(this.bgColor, 1); // Background color
        this.healthBar.fillRect(
            this.position.x,
            this.position.y,
            this.position.width,
            this.position.height
        ); // Background rectangle (x, y, width, height)

        // Draw the health amount as a green bar
        this.healthBar.fillStyle(this.fgColor, 1); // Health bar color
        this.healthBar.fillRect(
            this.position.x,
            this.position.y,
            (this.curHealth / this.maxHealth) * this.position.width,
            this.position.height
        );
    }
    offsetHealth(change){
        this.curHealth += change
        this.curHealth == Phaser.Math.Clamp(this.curHealth,0,this.maxHealth)
        this.postMessage("hp.offset", change);
        this.postMessage("hp.change",this.curHealth)
        if (this.curHealth == 0)
            this.postMessage("hp.empty")
        if (this.curHealth == this.maxHealth)
            this.postMessage("hp.full")
            
        this.updateHealthBar()
    }
    setFull(){this.offsetHealth(this.maxHealth)}
    setEmpty(){this.offsetHealth(-this.maxHealth)}
    onMessage(sender, subject, contents) {
        
    }
};
