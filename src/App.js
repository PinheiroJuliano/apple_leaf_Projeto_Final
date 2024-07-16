import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import './styles.css'; // Importando o arquivo CSS

const App = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div>
      <nav>
        <ul>
          <div className="nav-left">
            <li><Link to="/">Home</Link></li>
            <li className="dropdown">
              <a href="#" className="dropbtn" onClick={toggleDropdown}>Categorias</a>
              <div className={`dropdown-content ${dropdownOpen ? 'show' : ''}`}>
                <Link to="/categoria1">Categoria 1</Link>
                <Link to="/categoria2">Categoria 2</Link>
                <Link to="/categoria3">Categoria 3</Link>
              </div>
            </li>
          </div>
          <div className="nav-right">
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </div>
        </ul>
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
