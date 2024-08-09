import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules'; // Importa o módulo de paginação
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import '../styles/home.css';
import Banner from './Banner';
import Banner2 from './Banner2';
import fetchProducts from './fetchProducts';
import CategoryList from './CategoryList';

const Home = ({ categories, setCategories }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const highlightedProducts = await fetchProducts({ destaque: true });
      setProducts(highlightedProducts);
    };

    loadProducts();
  }, []);

  const handleShowAll = () => {
    window.location.href = '/Todos';
  };

  return (
    <div className='home__container'>
      <CategoryList setCategories={setCategories} />
      <div className='search-bar-container'>
        <input
          type='text'
          className='search-bar'
          placeholder='O que você procura hoje?'
        />
        <img className='search-icon' src='/search.svg' alt='Buscar' />
      </div>
      <Banner />
      <div className='highlights-section'>
        <h2 className='highlights-tittle' id='tittle'>
          Destaques
        </h2>
        <Swiper
          modules={[Pagination]} // Certifique-se de que o módulo de paginação é carregado
          spaceBetween={0}
          slidesPerView={1}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2 },
          }}
          pagination={{
            clickable: true,
            type: 'bullets',
            dynamicBullets: true,
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product._id}>
              <div className='highlight-item'>
                <img src={product.image} alt={product.name} />
                <p>{product.name}</p>
                <button className='product-price'>R$ {product.price.toFixed(2)}</button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <h2 className='categories_banner_header' id='tittle'>
        Categorias
      </h2>
      <div className='grid-container'>
        {categories.length === 0 ? (
          <div>Carregando categorias...</div>
        ) : (
          categories
            .filter((category) => category.main)
            .map((category, index) => (
              <Link
                to={`/${category.name}`}
                key={index}
                className={`cell cell${index}`}
                id='cell'
              >
                <div
                  className={`cell cell${index}`}
                  style={{ backgroundImage: `url(${category.image})` }}
                >
                  <h3 className='categories_banner_tittle'>{category.name}</h3>
                </div>
              </Link>
            ))
        )}
      </div>
      <button onClick={handleShowAll} className='show-all-button'>
        <div className='show-all-container'>
          <img src='/eye.svg'></img>
          Ver todos os produtos
        </div>
      </button>
      <Banner2 />
    </div>
  );
};

export default Home;
