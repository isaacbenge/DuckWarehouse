import FactoryInterface from "./factoryInterface.js";
import SizeBridge from "./sizeBridge.js";
import OrderClass from "./backendClass/orderClass.js"


export default class OrderBuilderService {
    factInterface = undefined;
    bridge = {};

    constructor() {
        this.factInterface = new FactoryInterface();
        this.bridge = new SizeBridge();
    }

    buildOrder(size, shippingMode, destination, quantity, price) {
        console.log("Received size:", size);
        console.log("Received shipping mode:", shippingMode);
        console.log("Received destination:", destination);

        let destFact = this.factInterface.getFactory('destinationFactory');
        let shipFact = this.factInterface.getFactory('shipFactory');
        let packFact = this.factInterface.getFactory('packageFactory')

        let packageMode = this.bridge.getFromBridge(size);
        // console.log("I got here")

        let arr = ["usa", "india", "bolivia"]
        if (!arr.includes(destination)) {
            destination = "other";
        }
        

        let dest = destFact.create(destination);
        
        let ship = shipFact.create(shippingMode);
        

        let packType = packFact.create(packageMode);
        
        console.log(dest+"::"+ship+"::"+packType);

        let order = new OrderClass();
        order.updateJson({
            shipping: ship,
            destination: dest,
            package: packType,
            quantity: quantity,
            price: price,
        })

        order.getProtection(shippingMode);

        return order
    }
}