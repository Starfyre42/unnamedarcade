import {AbstractPiece} from "./abstract-piece.js"

export class Astroids extends AbstractPiece {
    constructor(engine, config = {}) {
        super(engine, config, {
            startingCount: 5,
            minScale: 5,
            maxScale: 15,
            maxMass: 200,
            driftSpeed: 0.001,
            loopAround: true,
            scaleMass: false
        });
        
        this.astroids = [];
        
        this.tileCount = 4;
        this.tileWidth = 512;
        this.tileHeight = 512;
    }
    
    preload() {
        this.engine.load.spritesheet(`astroids`, `/assets/images/astroidss.png`, {
            frameWidth: this.tileWidth,
            frameHeight: this.tileHeight,
        });
    }
    
    create() {
        
        let {width, height} = this.engine.screenSize();
        
        for(let i=0; i<this.startingCount; i++){
            let astroid = this.engine.matter.add.image(
                this.engine.rnd(0,width),
                this.engine.rnd(0,height),
                `astroids`,
                this.engine.rnd(0,this.tileCount - 1)
            );
            
            astroid.piece = this;
            
            let size = this.engine.rnd(this.minScale,this.maxScale);
            let sizePercentOfMax = size / this.maxScale;
            
            astroid.setScale(size * 0.01);
            astroid.setFrictionAir(0.00);
            
            if(this.scaleMass)
                astroid.setMass(sizePercentOfMax * this.maxMass);
            else
                astroid.setMass(this.maxMass);
                
            astroid.direction={x: this.engine.rnd(-1,1)*this.driftSpeed, y: this.engine.rnd(-1,1)*this.driftSpeed};
            this.astroids.push(astroid);
            
            astroid.setOnCollide(this.astroidOnCollide.bind(this, astroid));
        }
    }
    astroidOnCollide(astroid,pair){
        this.postMessage("astroid.collision", {astroid,pair});
    }
    update() {
        for(let i=0; i<this.astroids.length; i++) {
            let astroid = this.astroids[i];
            
            if(astroid.isDestroyed)
                continue;
            
            astroid.applyForce(astroid.direction);
            
            if(this.loopAround)
                this.engine.loopAroundCheck(astroid);
        }
    }
    
    onDestroyed(astroid) {
        for(let i = 0; i < this.astroids.length; i++) {
            if(this.astroids[i] != astroid)
               continue;
               
            // Remove it from the astroid lineup
            this.astroids.splice(i, 1);
        }
    }
    
    onMessage(sender, subject, contents) {
        if(subject == "astroid.destroyed")
            this.onDestroyed(contents.astroid);
    }
}
