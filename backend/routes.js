import express from 'express';

const router = express.Router();

// Obtener todos los productos de una categoria
router.get('/productos/categoria/:id', async (req, res) => { });

// Obtener todos los productos de una empresa
router.get('/productos/empresa/:id', async (req, res) => { });

// Buscar producto por nombre
router.get('/productos/buscar/:nombre', async (req, res) => { });

// ver empresas ordenadas por puntaje
router.get('/empresas', async (req, res) => { });

 export default router;