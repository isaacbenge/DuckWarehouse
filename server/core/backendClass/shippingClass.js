import BaseFactory from "./backendFactory.js";
import BaseClass from "../BaseClass.js";

class ShippingClass extends BaseClass {


    getShippingCost(cost,quantity) {
        return this.json.mod;
    }

}

class SeaShipping extends ShippingClass {
    json = {
        mode: 'sea',
        mod: 400, //flat cost dont multiply
        protection: "moisture-absorbing beads, bubble wrap bags"
    }

    getShippingCost(cost , quantity) {
        return this.json.mod;
    }

}

class LandShipping extends ShippingClass {
    json = {
        mode: 'land',
        mod: 10,
        protection: "polystyrene balls"
    }

    getShippingCost(cost , quantity) {
        return this.json.mod * quantity
    }

   
}

class AirShipping extends ShippingClass {
    json = {
        mode: 'air',
        mod: 30,
        protection:""
    }

    getProtection(packageType){
        let protect = "polystyrene balls"
        if (packageType === 'plastic'){
            protect = "bubble wrap bags"
        }
        this.json.protection = protect;
        return protect;
    }

    getShippingCost(cost , quantity) {

        let newCost = this.json.mod * quantity
        if (quantity > 1000){
            cost *= 0.85;  // Apply 15% discount if quantity > 1000
        }
        return newCost
    }

}

export default class ShippingFactory extends BaseFactory {
    factoryMap = {
        air: AirShipping,
        sea: SeaShipping,
        land: LandShipping
    }
}
