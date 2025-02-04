import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import storeRoutes from './routes/storeRoutes.js';


const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());  // Use raw "JSON" not Text
// Use x-www-form-urlencoded in Postman to test
app.use(express.urlencoded({ extended: true }));



mongoose.connect('mongodb://localhost:27017/rubberduckdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Failed to connect to MongoDB:", err));


// Routes
app.use('/api/store', storeRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
