import mongoose from "mongoose"; // Importamos Mongoose para manejar MongoDB

// Definimos el esquema de la empresa
const companySchema = new mongoose.Schema({
    name: {
        type: String,  // Tipo de dato: String (nombre de la empresa)
        required: true // Es obligatorio
    },
    image: {
        type: String,  // Tipo de dato: String (URL del logo)
        required: true // Es obligatorio
    },
    description: {
        type: String,  // Tipo de dato: String (descripción de la empresa)
        required: true // Es obligatorio
    },
    rating: {
        type: Number,  // Tipo de dato: Número (calificación de la empresa)
        required: true // Es obligatorio
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId, // Tipo de dato: ObjectId (referencia a otro documento)
        ref: "Product" // Referencia al modelo "Product"
    }]
});

// Creamos el modelo "Company" basado en el esquema
const Company = mongoose.model("Company", companySchema);

// Exportamos el modelo para usarlo en otros archivos
export default Company;