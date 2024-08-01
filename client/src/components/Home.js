import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import '../styles.css'; // Importando o arquivo de estilo
import Banner from './Banner'; // Importe o componente Banner
import fetchProducts from './fetchProducts'; // Importe a função fetchProducts
import CategoryList from './CategoryList'; // Importe o componente CategoryList

const Home = ({ categories, setCategories }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Carregar produtos destacados na inicialização
    const loadProducts = async () => {
      const highlightedProducts = await fetchProducts({ destaque: true });
      setProducts(highlightedProducts);
    };

    loadProducts();
  }, []); // Executa apenas na montagem do componente

  return (
    <div>
      <CategoryList setCategories={setCategories} />
      <div className="search-bar-container">
        <input 
          type="text" 
          className="search-bar" 
          placeholder="O que você procura hoje?" 
        />
        <img 
          className="search-icon" 
          src="/search.svg" 
          alt="Buscar" 
        />
      </div>
      <Banner />
      <div className="highlights-section">
        <h2 className="highlights-tittle" id="tittle">Destaques</h2>
        <Swiper
          spaceBetween={0} // Espaço entre os slides
          slidesPerView={1} // Quantidade de slides visíveis ao mesmo tempo
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2 },
          }}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {products.map((product) => (
            <SwiperSlide key={product._id}>
              <div className="highlight-item"> 
                <img src={product.image} alt={product.name} />
                <p>{product.name}</p>
                <p>R$ {product.price.toFixed(2)}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Seções do tipo pagebuilder-column */}
        {/* Seções do tipo pagebuilder-column */}
        <div className="grid-container">
          {categories.length === 0 ? (
            <div>Carregando categorias...</div>
          ) : (
            categories.map((category, index) => (
                <div 
                  className={`cell${index}`} // Atribuindo a classe com o índice
                  style={{ backgroundImage: `url(${category.image})` }}
                >
                  <h3>{category.name}</h3>
                </div>
            ))
          )}
        </div>
    </div>
  );
};

export default Home;
