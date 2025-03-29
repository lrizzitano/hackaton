import express from 'express';
import mongoose from "mongoose";
import Product from "./models/product.model.js";
import Company from "./models/company.model.js";
import Category from "./models/category.model.js";

const router = express.Router();

// Obtener todos los productos de una categoria
router.get('/productos/categoria/:id', async (req, res) => {
    try {
        // Encontramos todos los productos cuya categoría coincida con el ID proporcionado
        const products = await Product.find({ category: req.params.id })
            .populate('category')  // Poblar el campo 'category'
            .populate('company');  // Poblar el campo 'company'

        // Devolvemos el array de productos con las referencias pobladas
        res.send(products);
    } catch (error) {
        console.error("Error al obtener los productos por categoría:", error);
        res.status(404).send({ error: "Productos no encontrados para la categoria especificada." });
    }
});

// Obtener todos los productos de una empresa
router.get('/productos/empresa/:id', async (req, res) => {
    try {
        // Encontramos todos los productos cuya empresa coincida con el ID proporcionado
        const products = await Product.find({ company: req.params.id })
            .populate('category')  // Poblar el campo 'category'
            .populate('company');  // Poblar el campo 'company'

        // Devolvemos el array de productos con las referencias pobladas
        res.send(products);
    } catch (error) {
        console.error("Error al obtener los productos por categoría:", error);
        res.status(404).send({ error: "Productos no encontrados para la empresa especificada." });
    }
});

// ver empresas ordenadas por puntaje
router.get('/empresas', async (req, res) => {
    try {
      // Encontramos todas las empresas
      const companies = await Company.find()
  
    // Ordenamos las empresas por el campo 'rating' de mayor a menor
    const sortedCompanies = companies.sort((a, b) => b.rating - a.rating);
    
    // Devolvemos el array de empresas con los productos poblados
    res.send(sortedCompanies);
    } catch (error) {
        console.error("Error del servidor", error);
        res.status(404).send({ error: "No se encontrar empresas" });
    }
  });

// Ver todos los productos
router.get('/productos', async (req, res) => {
    try {
        // Encontramos todos los productos
        const products = await Product.find()
            .populate('category')  // Poblar el campo 'category'
            .populate('company');  // Poblar el campo 'company'

        // Devolvemos el array de productos con las referencias pobladas
        res.send(products);
    } catch (error) {
        console.error("Error del servidor", error);
        res.status(404).send({ error: "No se encontraron productos" });
    }
});

export default router;