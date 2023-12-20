import {
    AbstractPiece
} from "./abstract-piece.js"

export class BgSimple extends AbstractPiece {
    constructor(engine, config = {}) {
        super(engine, config, {
            bgPath: `/assets/images/gameover.png`,
            bgName: `bg-simple`,
        });
        console.log(this.bgName, this.bgPath)
        
    }

    preload() {
        this.engine.load.image(this.bgName, this.bgPath);
    }

    create() {
        let {
            width,
            height
        } = this.engine.screenSize();
        this.background = this.engine.add.image(0, 0,this.bgName).setOrigin(0, .125);
        this.background.piece = this;
    }
    onMessage(sender, subject, contents) {}
}