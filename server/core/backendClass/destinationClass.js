// vi. If the destination country is the USA, add 18% of the total cost.
// vii. If the destination country is Bolivia, add 13% of the total cost.
// viii. If the destination country is India, add 19% of the total cost.
import BaseClass from "../BaseClass.js";
import BaseFactory from "./backendFactory.js";

class DestinationClass extends BaseClass {

}


class Other extends DestinationClass {
    json = {
        mode: 'other',
        mod: .15,
    }
}

class USA extends DestinationClass {
    json = {
        mode: 'usa',
        mod: .18,
    }
}

class Bolivia extends DestinationClass {
    json = {
        mode: 'bolivia',
        mod: .13,
    }
}

class India extends DestinationClass {
    json = {
        mode: 'india',
        mod: .19,
    }
}



export default class DestinationFactory extends BaseFactory {
    factoryMap={
        india: India,
        usa: USA,
        bolivia: Bolivia,
        other: Other
    }
}