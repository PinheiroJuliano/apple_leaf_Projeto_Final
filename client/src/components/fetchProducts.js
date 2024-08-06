// fetchProducts.js
import axios from 'axios';

const fetchProducts = async (filters = {}) => {
  try {
    // Construa a URL com base nos filtros
    let url = 'http://localhost:3001/produtos';
    if (filters.category) {
      url += `?category=${encodeURIComponent(filters.category)}`;
    }
    
    const response = await axios.get(url);
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
