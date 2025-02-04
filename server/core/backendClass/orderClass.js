import BaseClass from "../BaseClass.js";

export default class OrderClass extends BaseClass {

    json = {
        ...this.json,
        shipping: "",
        destination: "",
        package: "",
        protection: "",
        output: "",
        cost: "",
        quantity: "",
        price: ""
    }

    mods = [];

    getProtection(shipping) {
        let protection = this.json.shipping.getJson().protection;
        if (!protection) {
            protection = this.json.shipping.getProtection(shipping);
        }

        this.json.protection = protection;
    }

    calculateTotalCost() {
        let q = this.json.quantity;
        let price = this.json.price;

        let cost = q * price;

        // Apply 20% discount for orders > 100 units
        if (q > 100) {
            let discount = cost * 0.2;
            this.mods.push({ amount: -discount, description: `20% discount for orders over 100 units` });
        }

        // Package surcharge or discount
        let packageMod = this.json.package.getJson().mod;
        let packageCharge = this.json.package.getCharge(cost);
        this.mods.push({
            amount: packageCharge,
            description: `${Math.abs(packageMod * 100)}% ${packageMod > 0 ? 'surcharge' : 'discount'} for ${this.json.package.getJson().mode} packaging`
        });

        // Destination surcharge
        let destinationMod = this.json.destination.getJson().mod;
        let destinationCharge = this.json.destination.getCharge(cost);
        this.mods.push({
            amount: destinationCharge,
            description: `${Math.abs(destinationMod * 100)}% surcharge for shipping to ${this.json.destination.getJson().mode.toUpperCase()}`
        });

        // Shipping cost
        let shippingCharge = this.json.shipping.getShippingCost(cost, q);
        this.mods.push({
            amount: shippingCharge,
            description: `Shipping cost for ${this.json.shipping.getJson().mode} shipment`
        });

        // Calculate the total cost
        const sum = this.mods.reduce((acc, mod) => acc + mod.amount, 0);
        this.json.cost = cost + sum;

    }

    getMods() {
        return this.mods;
    }

    //     i. The total cost is calculated as quantity * price.
    // ii. If the order is greater than 100 units, apply a 20% discount to the total cost.
    // iii. If the package is made of wood, add 5% of the total cost.
    // iv. If the package is made of plastic, add 10% of the total cost.
    // v. If the package is made of cardboard, apply a 1% discount to the total cost.
    // vi. If the destination country is the USA, add 18% of the total cost.
    // vii. If the destination country is Bolivia, add 13% of the total cost.
    // viii. If the destination country is India, add 19% of the total cost.
    // ix. For any other country, add 15% of the total cost.
    // x. If the shipment is by sea, add 400 US dollars.
    // xi. If the shipment is by land, add 10 US dollars per order quantity.
    // xii. If the shipment is by air, add 30 US dollars per order quantity minus 15% if the order
    // exceeds 1000 units.

}