import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import '../styles.css'; // Importando o arquivo de estilo
import Banner from './Banner'; // Importe o componente Banner
import fetchProducts from './fetchProducts'; // Importe a função fetchProducts

const Home = () => {
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
      <div className="search-bar-container">
        <input 
          type="text" 
          className="search-bar" 
          placeholder="Encontre sua próxima fragrância" 
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
    </div>
  );
};

export default Home;
