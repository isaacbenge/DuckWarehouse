// If the package is made of wood, add 5% of the total cost.
// iv. If the package is made of plastic, add 10% of the total cost.
// v. If the package is made of cardboard, apply a 1% discount to the total cost.
import BaseClass from "../BaseClass.js";

import BaseFactory from "./backendFactory.js";

class PackageClass extends BaseClass {

}

class WoodPackage extends PackageClass {
    json = {
        mode: 'wood',
        mod: .05,
    }
}

class PlasticPackage extends PackageClass {
    json = {
        mode: 'plastic',
        mod: .1,
    }
}

class CardboardPackage extends PackageClass {
    json = {
        mode: 'cardboard',
        mod: -.01,
    }
}


export default class PackageFactory extends BaseFactory {
    factoryMap={
        wood: WoodPackage,
        plastic: PlasticPackage,
        cardboard: CardboardPackage,
    }
}