import {Stage1} from "./scenes/stage1.js"
import {GameOver} from "./scenes/game-over.js"
// Make a game of 800x600 with advanced physics
// @TODO make the game able to scale to the browser size
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics:{
      default:`matter`,
      matter:{
        gravity:{y : 0, x : 0},
        debug: false
      }
    },
    scene: [Stage1,GameOver]
};

const game = new Phaser.Game(config);
