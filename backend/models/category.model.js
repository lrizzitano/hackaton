import mongoose from "mongoose";

// Definimos el esquema de la categoría
const categorySchema = new mongoose.Schema({
    name: {
        type: String,  // Tipo de dato: String (nombre de la categoría)
        required: true // Es obligatorio
    },
    image: {
        type: String,  // Tipo de dato: String (URL de la imagen)
        required: true // Es obligatorio
    }
});

// Creamos el modelo "Category" basado en el esquema
const Category = mongoose.model("Category", categorySchema);

// Exportamos el modelo para usarlo en otros archivos
export default Category;