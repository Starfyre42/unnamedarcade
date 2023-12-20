import {AbstractPiece} from "./abstract-piece.js"

export class Bullet extends AbstractPiece {
    constructor(engine, config = {}) {
        super(engine, config, {
            life: 5*1000,
            moveForce: 0.1,
        });
    }
    
    preload(){
        this.engine.load.image(`bullet`, `/assets/images/vlaser.png`);
    }
    
    spawnBullet(image, distance) {
        let bullet;
        
        if(image.curDir == "up" || image.curDir == undefined)
            bullet = this.engine.matter.add.image(
                image.getTopCenter().x,
                image.getTopCenter().y - distance,
                'bullet'
            );
        else if(image.curDir == "left")
            bullet = this.engine.matter.add.image(
                image.getLeftCenter().x - distance - 40,
                image.getLeftCenter().y - 40,
                'bullet'
            );
        else if(image.curDir == "right")
            bullet = this.engine.matter.add.image(
                image.getRightCenter().x + distance + 40,
                image.getRightCenter().y - 40,
                'bullet'
            );
        else if(image.curDir == "down")
            bullet = this.engine.matter.add.image(
                image.getBottomCenter().x,
                image.getBottomCenter().y + distance + 80.0,
                'bullet'
            );
            
        bullet.setScale(.25);
        bullet.setOrigin(0.5, 1);
        bullet.piece = this;
        
        this.engine.move(bullet, this.moveForce, image.curDir);
        
        bullet.setOnCollide(this.bulletOnCollide.bind(this, bullet));
        this.engine.time.delayedCall(this.life, this.autoDestroyBullet.bind(this, bullet));
    }

    bulletOnCollide(bullet, pair) {
        this.postMessage("bullet.collision", {bullet,pair});
    }
    
    autoDestroyBullet(bullet) {
        if (bullet && !bullet.isDestroyed) {
            bullet.destroy();
            this.postMessage("bullet.auto-destroyed", bullet)
        }
    }
}
