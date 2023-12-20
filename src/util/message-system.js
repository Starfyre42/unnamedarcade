//creates a export class named MessageSystem 
export class MessageSystem {
    // in the constructor adds a array named listeners  And defines debug as off
    constructor() {
        this.listeners = [];
        this.debug = false;
    }
    // this passes the cb function to subscribe, then pushes it into the back of the array
    subscribe(cb) {
        this.listeners.push(cb);
    }
    /*this creates a async function which allows for the arguments of sender,sub and cont to be fowarded to it as undefined data if debug is true sends message output to console                      */
    async postMessage(sender, subject, contents = undefined) {
        if(this.debug)
            console.log("Message:", sender, subject, contents);
            //this loops over functions, fowarded to the message system in array
        for(let i = 0; i < this.listeners.length; i++) {
            await this.listeners[i](sender, subject, contents);
        }
    }
}
// this exports the messageSystem as a usuable class instance and includes browser window
export let messageSystem = new MessageSystem();
window.messageSystem = messageSystem;
