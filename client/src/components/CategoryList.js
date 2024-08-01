import React, { useEffect } from 'react';

const CategoryList = ({ setCategories }) => {
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3001/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
      }
    };

    fetchCategories();
  }, [setCategories]);

  return null; // Este componente não renderiza nada visivelmente
};

export default CategoryList;
