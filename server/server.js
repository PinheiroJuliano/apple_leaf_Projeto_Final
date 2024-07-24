require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3001;

// String de conexão do MongoDB a partir do arquivo .env
const uri = process.env.MONGODB_URI;

// Conectar ao MongoDB usando Mongoose
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB!'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

app.use(express.json());

// Modelo genérico para acessar a coleção 'produtos'
const GenericModel = mongoose.model('GenericModel', new mongoose.Schema({}, { strict: false }), 'produtos');

// Rota para a raiz da aplicação
app.get('/', (req, res) => {
  res.send('Bem-vindo à API');
});

// Rota para criar um novo item na coleção 'produtos'
app.post('/produtos', async (req, res) => {
  try {
    console.log('Recebendo POST /produtos:', req.body);
    const newItem = new GenericModel(req.body);
    const savedItem = await newItem.save();
    console.log('Item salvo:', savedItem);
    res.status(201).json(savedItem);
  } catch (error) {
    console.error('Erro em POST /produtos:', error);
    res.status(400).json({ message: error.message });
  }
});

// Rota para obter todos os itens da coleção 'produtos'
app.get('/produtos', async (req, res) => {
  try {
    console.log('Recebendo GET /produtos');
    const items = await GenericModel.find();
    console.log('Itens encontrados:', items);
    res.status(200).json(items);
  } catch (error) {
    console.error('Erro em GET /produtos:', error);
    res.status(500).json({ message: error.message });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
