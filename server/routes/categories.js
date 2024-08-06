const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Defina o modelo de Categoria (ajuste conforme necessário)
const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { collection: 'categorias' },
);

const Category = mongoose.model('Category', categorySchema);

// Rota para obter todas as categorias
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error('Erro ao obter categorias:', error);
    res.status(500).json({ message: 'Erro ao obter categorias' });
  }
});

module.exports = router;
