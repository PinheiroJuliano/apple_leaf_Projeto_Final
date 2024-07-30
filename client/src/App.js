import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import './styles.css'; // Importando o arquivo CSS

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null); // Estado para armazenar o usuário logado
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    // Verificar se há um usuário logado armazenado no localStorage ou sessão
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogin = async (user) => {
    try {
      // Salvar informações do usuário na sessão
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/'); // Redirecionar para a página inicial após o login
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3001/logout');
      setUser(null);
      localStorage.removeItem('user');
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="nav-left">
          <div className="menu-hamburger" onClick={toggleMenu}>
            <img 
              src={menuOpen ? "/close.svg" : "/menu.svg"} 
              alt="Menu" 
              className={`hamburger-icon ${menuOpen ? 'open' : ''}`} 
            />
          </div>
        </div>
        <div className="nav-right">
          {user ? (
            <>
              <img 
                src={user.photo || '/profilelogged.svg'} 
                alt="Profile" 
                className="profile-icon" 
              />
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <img src="/profile.svg" alt="Profile" className="profile-icon" />
          )}
        </div>
      </nav>
      <div className={`menu-expandable ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/" onClick={toggleMenu}>Início</Link></li>
          <li><Link to="/login" onClick={toggleMenu}>Login</Link></li>
          <li><Link to="/register" onClick={toggleMenu}>Registrar</Link></li>
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
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
