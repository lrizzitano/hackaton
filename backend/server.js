import express from 'express';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import routes from './routes.js'; // Importamos las rutas
import cors from 'cors';
import path from 'path';

dotenv.config();

const allowedOrigins = ['http://localhost:5173/'];

const app = express();

const __dirname = path.resolve();

app.use(express.json()); // allows us to accept JSON data in the req.body

app.use(cors(
	{
		origin: '*', // Ajusta con la URL correcta
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		credentials: true
	}
));

app.use("/api", routes);

if(process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/frontend/dist')));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
	});
}

app.listen(process.env.PORT || 5000, () => {
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