import {MessageSystem} from "./message-system.js"
import {AiEntity} from "./ai-entity.js"

export class AISystem {
    constructor(engine, player) {
        this.messageSystem = new MessageSystem();
        this.postMessage = this.messageSystem.postMessage.bind(this.messageSystem, this);
        this.engine = engine;
        this.enemies = [];
        this.player = player;
        
        this.messageSystem.subscribe(this.onMessage.bind(this));
    }
    
    addAi(image) {
        const aiEntity = new AiEntity(this);
        this.enemies.push(aiEntity);
        
        aiEntity.ready();
    }
    
    onMessage(sender, subject, contents) {
        
    }
}
