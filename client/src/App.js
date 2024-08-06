import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import CategoryPage from './components/CategoryPage'; // Importa o novo componente
import './styles.css'; // Importando o arquivo CSS

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null); // Estado para armazenar o usuário logado
  const [categories, setCategories] = useState([]); // Estado para armazenar as categorias
  const [profileMenuOpen, setProfileMenuOpen] = useState(false); // Estado para o menu do profile
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  useEffect(() => {
    // Fechar o menu de perfil ao mudar de página
    setProfileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    // Verificar se há um usuário logado armazenado no localStorage ou sessão
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }

    // Buscar categorias do backend
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3001/categories');
        console.log('Categorias carregadas:', response.data); // Log para depuração
        setCategories(response.data);
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
      }
    };

    fetchCategories();
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
    <div className='base__container'>
      <nav className='navbar'>
        <div className='nav-left'>
          <div className='menu-hamburger' onClick={toggleMenu}>
            <img
              src={menuOpen ? '/close.svg' : '/menu.svg'}
              alt='Menu'
              className={`hamburger-icon ${menuOpen ? 'open' : ''}`}
            />
          </div>
        </div>
        <div className='nav-right'>
          {user ? (
            <>
              <img
                src={user.photo || '/profilelogged.svg'}
                alt='Profile'
                className='profile-icon'
                onClick={toggleProfileMenu}
              />
              {profileMenuOpen && (
                <div className='profile-menu'>
                  <ul>
                    <li>
                      <Link to='/' id='botao-sair'>
                        Meu Perfil
                      </Link>
                    </li>
                    <li>
                      <Link to='/' id='botao-sair'>
                        Pedidos
                      </Link>
                    </li>
                    <li>
                      <Link to='/' id='botao-sair'>
                        Configurações
                      </Link>
                    </li>
                    <li>
                      <button onClick={handleLogout} id='botao-sair'>
                        Sair
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <>
              <img
                src='/profile.svg'
                alt='Profile'
                className='profile-icon'
                onClick={toggleProfileMenu}
              />
              {profileMenuOpen && (
                <div className='profile-menu'>
                  <ul>
                    <li>
                      <Link to='/login' onClick={toggleProfileMenu}>
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link to='/register' onClick={toggleProfileMenu}>
                        Registrar
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </nav>
      <div className={`menu-expandable ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li>
            <Link to='/' onClick={toggleMenu}>
              Início
            </Link>
          </li>
          <li className='menu-categories'>
            <span>Categorias</span>
            <ul id='lista-categorias'>
              {categories.length === 0 ? (
                <li>Carregando...</li>
              ) : (
                categories.map((category) => (
                  <li key={category._id}>
                    <Link to={`/${category.name}`} onClick={toggleMenu}>
                      {category.name || 'Nome não disponível'}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </li>
        </ul>
      </div>
      <Routes>
        <Route
          path='/'
          element={
            <Home categories={categories} setCategories={setCategories} />
          }
        />
        <Route path='/login' element={<Login onLogin={handleLogin} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/:categoryName' element={<CategoryPage />} />
      </Routes>
    </div>
  );
};

export default App;
