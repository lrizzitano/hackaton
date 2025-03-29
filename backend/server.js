import express from 'express';
import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config();

const app = express();

app.use(express.json()); // allows us to accept JSON data in the req.body

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(5000, () => {
    connectDB();    // conectamos a la database
    console.log('Server is running on port 5000');
});

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.error(`Error: ${error.message}`);
		process.exit(1); // process code 1 code means exit with failure, 0 means success
	}
};