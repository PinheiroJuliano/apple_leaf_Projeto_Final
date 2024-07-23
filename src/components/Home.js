import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import axios from 'axios'; // Importe axios para fazer requisições HTTP
import '../styles.css'; // Importando o arquivo de estilo
import Banner from './Banner'; // Importe o componente Banner

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
        <h2 class='highlights-tittle' id='tittle'>Destaques</h2>
        <Swiper
          spaceBetween={0} // Espaço entre os slides
          slidesPerView={4} // Quantidade de slides visíveis ao mesmo tempo
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

      {/* Adicione o Banner aqui */}
      <Banner />
    </div>
  );
};

export default Home;
