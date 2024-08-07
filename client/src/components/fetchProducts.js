// fetchProducts.js
import axios from 'axios';

const fetchProducts = async (filters = {}) => {
  try {
    let url = 'http://localhost:3001/produtos';
    const params = new URLSearchParams();

    if (filters.category) {
      params.append('category', filters.category);
    }

    // Adiciona a string de consulta (query string) apenas se houver parâmetros
    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    console.log('URL da API:', url); // Log para verificação

    const response = await axios.get(url);
    console.log('Dados recebidos da API:', response.data); // Log para verificação

    let filteredProducts = response.data;

    if (filters.destaque !== undefined) {
      filteredProducts = filteredProducts.filter(
        (produto) => produto.destaque === filters.destaque,
      );
    }

    return filteredProducts;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return [];
  }
};

export default fetchProducts;
