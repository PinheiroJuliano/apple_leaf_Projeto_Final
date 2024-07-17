import React from 'react';
import CategoryList from './CategoryList';
import '../styles.css'; // Importando o arquivo de estilo

const Home = () => {
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
      <CategoryList />
    </div>
  );
};

export default Home;
