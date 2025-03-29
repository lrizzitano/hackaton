import mongoose from "mongoose"; // Importamos Mongoose para manejar MongoDB

// Definimos el esquema del producto
const productSchema = new mongoose.Schema({
    name: {
        type: String,  // Tipo de dato: String (texto)
        required: true // Es obligatorio
    },
    price: {
        type: Number,  // Tipo de dato: Número (precio del producto)
        required: true // Es obligatorio
    },
    image: {
        type: String,  // Tipo de dato: String (URL de la imagen)
        required: true // Es obligatorio
    },
    category: {
        type : mongoose.Schema.Types.ObjectId, // Tipo de dato: ObjectId (referencia a otro documento)
        ref: "Category", // Referencia al modelo "Category"
        required: true // Es obligatorio
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,  // Tipo de dato: ObjectId (referencia a otro documento)
        ref: "Company", // Referencia al modelo "Category"
        required: true // Es obligatorio
    },
});

// Creamos el modelo "Product" basado en el esquema
const Producto = mongoose.model("Product", productoSchema);

// Exportamos el modelo para usarlo en otros archivos
export default Producto;