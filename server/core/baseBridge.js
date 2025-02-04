

export default class BaseBridge {
    bridge= {

    }

    getFromBridge(type){
        return this.bridge[type];
    }
}