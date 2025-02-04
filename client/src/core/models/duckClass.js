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

    updateQuantity(){
        this.updateJson({quantity:this.json.quantity + 1 });
        //Isaac this needs to Update  APIService.js    
    }
}