import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import './styles.css'; // Importando o arquivo CSS

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <nav>
      <div className="nav-left">
          <div className="menu-hamburger" onClick={toggleMenu}>
            <img 
              src={menuOpen ? "/close.svg" : "/menu.svg"} 
              alt="Menu" 
              className={`hamburger-icon ${menuOpen ? 'open' : ''}`} 
            />
          </div>
          <div className={`menu-expandable ${menuOpen ? 'open' : ''}`}>
            <ul>
              <li><Link to="/" onClick={toggleMenu}>Início</Link></li>
                <ul>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/register">Registar</Link></li>
                </ul>
              <li className="menu-categories">
                <span onClick={toggleMenu}>Categorias</span>
                <ul className={`dropdown-content ${menuOpen ? 'show' : ''}`}>
                  <li><Link to="/categoria1" onClick={toggleMenu}>Categoria 1</Link></li>
                  <li><Link to="/categoria2" onClick={toggleMenu}>Categoria 2</Link></li>
                  <li><Link to="/categoria3" onClick={toggleMenu}>Categoria 3</Link></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div className="nav-right">
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Adicione rotas para as categorias se necessário */}
        <Route path="/categoria1" element={<div>Categoria 1</div>} />
        <Route path="/categoria2" element={<div>Categoria 2</div>} />
        <Route path="/categoria3" element={<div>Categoria 3</div>} />
      </Routes>
    </div>
  );
};

export default App;
