import DestinationFactory from "./backendClass/destinationClass.js";
import PackageFactory from "./backendClass/packageClass.js";
import ShippingFactory from "./backendClass/shippingClass.js";

export default class FactoryInterface {

    shipFactory = undefined;
    packageFactory = undefined;
    destinationFactory = undefined;
    factoryTypes = {shipFactory: ShippingFactory, packageFactory: PackageFactory, destinationFactory: DestinationFactory}

    constructor(){
        for (let type of Object.keys(this.factoryTypes)){
            this.getFactory(type)
        }
    }

    getFactory(type){ 
        if (!this[type]){
            this[type] = new this.factoryTypes[type]();
        }
        return this[type]
    }
}