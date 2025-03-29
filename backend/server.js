import express from 'express';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import routes from './routes.js'; // Importamos las rutas
import cors from 'cors';

dotenv.config();

const allowedOrigins = ['http://localhost:5173/'];

const app = express();

app.use(express.json()); // allows us to accept JSON data in the req.body

app.use(cors());

app.use("/api", routes);

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