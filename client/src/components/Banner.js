// Banner.js
import React from 'react';
import '../styles.css'; // Importando o arquivo de estilo

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-content-titulo">
        <h2 className="banner__titulo">Lançamento</h2>
      </div>
      <div className="banner-content">
        <div className='banner-content-img-wrapper'>
          <img src="./produto.png" alt="Produto" className="banner-product-image" />
        </div>
        <div className="banner-product">
          <div class="banner-container__descricao">
          </div>
          <div className="banner-product-description">
            <h3>Arbo Desodorante Colônia 100ml</h3>
            <p>Arbo Desodorante Colônia está de cara nova! A fragrância masculina ganhou uma nova embalagem acompanhada de uma formulação repaginada, mas que mantém o mesmo olfativo fresco característico da fragrância.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
