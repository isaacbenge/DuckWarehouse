import BaseClass from "./baseClass";


export default class Duck extends BaseClass {

    json = {
        ...this.json,
        color:"",
        size:"",
        price:0,
        quantity:0,
        deleted:false,
    }

    updateQuantity(quantity){
        this.updateJson({quantity:this.json.quantity + parseInt(quantity) }, true);
        //if duck already in Chart add val you typed
    }

}