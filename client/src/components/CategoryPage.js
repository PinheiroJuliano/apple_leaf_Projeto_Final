import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import fetchProducts from './fetchProducts';
import '../styles/categorypage.css';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [clickedCard, setClickedCard] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      console.log('Carregando produtos com categoria:', categoryName);
      const productsList = await fetchProducts({
        category: categoryName === 'Todos' ? undefined : categoryName,
      });
      console.log('Produtos recebidos:', productsList);
      setProducts(productsList);
    };

    loadProducts();
  }, [categoryName]);

  const handleCardClick = (id) => {
    setClickedCard((prevClickedCard) => (prevClickedCard === id ? null : id));
  };

  return (
    <div className='category-page'>
      <h1>Categoria: {categoryName || 'Todos'}</h1>
      <div className='product-grid'>
        {products.length === 0 ? (
          <p>Nenhum produto encontrado.</p>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className={`product-card ${clickedCard === product._id ? 'clicked' : ''}`}
              onClick={() => handleCardClick(product._id)}
            >
              <img
                className='product-image'
                src={product.image}
                alt={product.name}
              />
              <h3 className='product-name'>{product.name}</h3>
              <button className='product-price'>
                <span className='price-value'>
                  R$ {product.price.toFixed(2)}
                </span>
                <span className='buy-text'>Comprar</span>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
