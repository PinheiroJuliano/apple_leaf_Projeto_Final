import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import axios from 'axios'; // Importe axios para fazer requisições HTTP
import '../styles.css'; // Importando o arquivo de estilo

const Home = () => {
  const [products, setProducts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('Hidratação'); // Categoria inicial

  useEffect(() => {
    // Função para carregar os produtos da API com base na categoria
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/produtos.json`);
        setProducts(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProducts();
  }, [currentCategory]); // Executa sempre que a categoria atual mudar

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
      
      <div className="highlights-section">
        <h2>Destaques</h2>
        <Swiper
            spaceBetween={1} // Espaço entre os slides
            slidesPerView={3} // Quantidade de slides visíveis ao mesmo tempo
            navigation
            pagination={{ clickable: true }}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {products.map((product) => (
              <SwiperSlide key={product._id}>
                <div className="highlight-item">
                  <img src={product.image} alt={product.name} />
                  <p>{product.name}</p>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Home;
