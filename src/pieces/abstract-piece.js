//this links to the messageSystem classs instance, which is held in the util folder
import {messageSystem} from "../util/message-system.js"

// this exports the class AbstractPiece. which is shared among all pieces. it links to the engine
//it fowards the configerations as objects, which are filled by indivifual pieces or provides defaults
export class AbstractPiece {
    constructor(engine, providedConfig = {}, defaultConfig = {}) {
        this.engine = engine;
        
        // this links a instance of the message system, which is shared among all pieces 
        this.messageSystem = messageSystem;
        //this subscribes the the class to the message system
        this.messageSystem.subscribe(this.onMessage.bind(this));
    // shortens the parameters neededin the arguements of onmessage
        this.postMessage = this.messageSystem.postMessage.bind(this.messageSystem, this);
        // lodash changes the defaults of this to include provided config, if not provided 
        //will reset to defualt config
        _.defaults(this, providedConfig, defaultConfig);
    } 
    //onmessage is defined here , to accept arguments of sender, sub and contents
    onMessage(sender, subject, contents) {}
}
