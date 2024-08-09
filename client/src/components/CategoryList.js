import React, { useEffect } from 'react';

const CategoryList = ({ setCategories, filterMain }) => {
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        let url = 'http://localhost:3001/categories';

        // Se filterMain for true, adicionar o parâmetro de consulta à URL
        if (filterMain) {
          url += '?main=true';
        }

        const response = await fetch(url);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
      }
    };

    fetchCategories();
  }, [setCategories, filterMain]);

  return null; // Este componente não renderiza nada visivelmente
};

export default CategoryList;
