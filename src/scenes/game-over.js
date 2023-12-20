import {
    AbstractScene
} from "./abstract-scene.js"
import {
    BgSimple
} from "../pieces/bg-simple.js"
export class GameOver extends AbstractScene {
    constructor() {
        super(`game-over`);
        this.setup([{
            name: "bg", value: new BgSimple(this)
        }])
    }
    preload() {
        this.load.image("distort", "/assets/images/distortion.png")
        super.preload()
    }
    create() {
        super.create()
        this.addDistort(this.bg.background, `distort`)
        this.addBloom(this.bg.background,0xffffff,0,0,1,4,6);
    }
}