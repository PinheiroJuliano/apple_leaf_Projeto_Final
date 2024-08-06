require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');
app.use(cors());

// String de conexão do MongoDB a partir do arquivo .env
const uri = process.env.MONGODB_URI;

// Conectar ao MongoDB usando Mongoose
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB!'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

app.use(express.json());

// Configurar a sessão
app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret', // Substitua por uma string secreta mais forte
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: uri }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 dia
}));

// Modelo genérico para acessar a coleção 'listingsAndReviews'
const GenericModel = mongoose.model('GenericModel', new mongoose.Schema({}, { strict: false }), 'produtos');

// Modelo para a coleção 'customers'
const customerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  photo: { type: String, default: '/profilelogged.svg' }
});

const Customer = mongoose.model('Customer', customerSchema, 'customers');

// Rota para a raiz da aplicação
app.get('/', (req, res) => {
  res.send('Bem-vindo à API');
});

// Rota para criar um novo item na coleção 'listingsAndReviews'
app.post('/items', async (req, res) => {
  try {
    console.log('Recebendo POST /items:', req.body);
    const newItem = new GenericModel(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error('Erro em POST /items:', error);
    res.status(400).json({ message: error.message });
  }
});

// Rota para obter todos os produtos filtrados pela categoria
app.get('/produtos', async (req, res) => {
  try {
    console.log('Recebendo GET /produtos com filtros:', req.query);
    const { category } = req.query; // Obtém o parâmetro da categoria da query string

    let filter = {}; // Inicializa um filtro vazio

    if (category) {
      filter.category = category; // Adiciona o filtro para categoria se fornecido
    }

    const items = await GenericModel.find(filter); // Aplica o filtro na consulta
    res.status(200).json(items);
  } catch (error) {
    console.error('Erro em GET /produtos:', error);
    res.status(500).json({ message: error.message });
  }
});



// Rota para registrar um novo usuário na coleção 'customers'
app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log('Recebendo POST /register:', req.body);

    // Criptografar a senha antes de salvar
    const hashedPassword = await bcrypt.hash(password, 10);

    const newCustomer = new Customer({
      username,
      email,
      password: hashedPassword,
    });

    const savedCustomer = await newCustomer.save();
    res.status(201).json(savedCustomer);
  } catch (error) {
    console.error('Erro em POST /register:', error);
    res.status(400).json({ message: error.message });
  }
});

// Rota para login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ email });

    if (!customer) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const isMatch = await bcrypt.compare(password, customer.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Senha incorreta' });
    }

    // Iniciar a sessão do usuário
    req.session.userId = customer._id;
    req.session.username = customer.username;

    res.status(200).json({ message: 'Login bem-sucedido' });
  } catch (error) {
    console.error('Erro em POST /login:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Rota para logout
app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao fazer logout' });
    }

    res.status(200).json({ message: 'Logout bem-sucedido' });
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

const categoriesRouter = require('./routes/categories');
app.use('/categories', categoriesRouter);