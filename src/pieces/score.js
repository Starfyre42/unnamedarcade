import {AbstractPiece} from "./abstract-piece.js"

export class Score extends AbstractPiece {
    constructor(engine, config = {}) {
        super(engine, config, {});

        this.score = 0;
        this.scoreText;
    }

    preload() {}

    create() {
        let xpos = this.engine.screenSize().width -10
        this.scoreText = this.engine.add.text(xpos, 10, `Score: 0`, {
            fontFamily: 'Courier', fontSize: 24, color: '#ffffff'
        });
        this.scoreText.setOrigin(1, 0); // Set the origin to the top-right corner
        this.scoreText.setAlign('right'); // Set the text alignment to right
        
        this.scoreText.piece = this;
    }
    
    update() {
        this.updateScoreText();
    }
    
    updateScoreText() {
        this.scoreText.setText('Score: ' + this.score); // Update the displayed score text
    }

    onMessage(sender, subject, contents) {}
}
