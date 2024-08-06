import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Importa useParams
import fetchProducts from './fetchProducts'; // Importe a função fetchProducts
import '../categorypage.css'; // Importando o arquivo de estilo

const CategoryPage = () => {
  const { categoryName } = useParams(); // Obtém o parâmetro da URL
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Buscar produtos da categoria
    const loadProducts = async () => {
      const productsList = await fetchProducts({ category: categoryName });
      setProducts(productsList);
    };

    loadProducts();
  }, [categoryName]); // Dependência para recarregar os produtos se a categoria mudar

  return (
    <div className='category-page'>
      <h1>Categoria: {categoryName}</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img className='product-image' src={product.image} alt={product.name} />
            <h3 className='product-name '>{product.name}</h3>
            <p className='product-price'>R$ {product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
