import express from 'express';
import { createOrder } from '../controllers/storeController.js';
import DuckModel from '../core/duckModel.js';

const router = express.Router();

// POST /api/store/order
router.post('/order', createOrder);
router.get('/ducks', async (req, res) => {
    try {
        const ducks = await DuckModel.find();  // Fetch all ducks from the database
        res.status(200).json(ducks);  // Return the list of ducks
    } catch (err) {
        console.error('Error fetching ducks:', err);
        res.status(500).json({ error: err.message });
    }
});

router.post('/ducks/add', async (req, res) => {
    console.log('Received request body:', req.body);  // Log why is this not working

    try {
        const { _id, ...duckData } = req.body;  // Strip _id from the data
        const newDuck = new DuckModel(duckData);
        const savedDuck = await newDuck.save();
        res.status(201).json(savedDuck);
    } catch (err) {
        console.error('Error adding duck:', err);
        res.status(500).json({ error: err.message });
    }
});

router.put('/ducks/:id', async (req, res) => {
    try {
        const updatedDuck = await DuckModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }  // Return the updated document
        );

        if (!updatedDuck) {
            return res.status(404).json({ message: "Duck not found." });
        }

        res.status(200).json({ message: "Duck updated successfully.", updatedDuck });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;