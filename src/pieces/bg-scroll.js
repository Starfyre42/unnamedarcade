import {AbstractPiece} from "./abstract-piece.js"

export class BgScroll extends AbstractPiece {
    constructor(engine, config = {}) {
        super(engine, config, {
            bgPath: `/assets/images/scrollbg.png`,
            bgName: `bg`,
            speed: 2,
            direction: `down`,
        });
    }
    
    preload() {
        this.engine.load.image(this.bgName, this.bgPath);
    }
    
    create() {
        let {width, height} = this.engine.screenSize();
        this.background = this.engine.add.tileSprite(0,0,width,height,this.bgName).setOrigin(0,0);
        this.background.piece = this;
    }
    
    update() {
        if(this.direction == `down`)
            this.background.tilePositionY -= this.speed;
        else if(this.direction == `up`)
            this.background.tilePositionY += this.speed;
        else if(this.direction == `left`)
            this.background.tilePositionX -= this.speed;
        else if(this.direction == `right`)
            this.background.tilePositionX += this.speed;
    }
    
    onMessage(sender, subject, contents) {
        
    }
}
