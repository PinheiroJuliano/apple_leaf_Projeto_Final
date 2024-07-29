// fetchProducts.js
import axios from 'axios';

const fetchProducts = async (filters = {}) => {
  try {
    const response = await axios.get('http://localhost:3001/produtos'); // Certifique-se de usar a URL correta
    console.log('Dados recebidos da API:', response.data); // Log para depuração

    // Filtrar os produtos com base nos filtros passados
    let filteredProducts = response.data;

    if (filters.destaque) {
      filteredProducts = filteredProducts.filter(produto => produto.destaque === filters.destaque);
    }

    return filteredProducts;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return [];
  }
};

export default fetchProducts;

