import OrderBuilderService from "../core/orderBuildService.js";


const validSizes = ["xlarge", "large", "medium", "small", "xsmall"];
const validShippingModes = ["air", "land", "sea"];
const validDestinations = ["usa", "bolivia", "india", "other"];

const createOrder = async (req, res) => {
    try {
        let size = req.body?.size;
        let shippingMode = req.body?.shippingMode;
        let destination = req.body?.destination;
        let quantity = req.body?.quantity;
        let price = req.body?.price;

       
        size = size.toLowerCase();
        shippingMode = shippingMode.toLowerCase();
        destination = destination.toLowerCase();

        if (!validSizes.includes(size)) {
            return res.status(400).json({ error: `Invalid size: ${size}. Expected one of ${validSizes.join(", ")}` });
        }
        if (!validShippingModes.includes(shippingMode)) {
            return res.status(400).json({ error: `Invalid shipping mode: ${shippingMode}. Expected one of ${validShippingModes.join(", ")}` });
        }
        if (!validDestinations.includes(destination)) {
            return res.status(400).json({ error: `Invalid destination: ${destination}. Expected one of ${validDestinations.join(", ")}` });
        }

        let orderBuilder = new OrderBuilderService();
        let order = orderBuilder.buildOrder(size, shippingMode, destination, quantity, price);
        order.calculateTotalCost();

        const response = {
            packageType: order.getJson().package.getJson().mode,
            protectionType: order.getJson().protection,
            totalCost: order.getJson().cost,
            appliedModifiers: order.getMods()  // Return detailed messages?? and amounts
        };

        res.status(200).json(response);
    } catch (err) {
        console.error("Error creating order:", err);
        res.status(500).json({ error: err.message });
    }
};

export { createOrder }