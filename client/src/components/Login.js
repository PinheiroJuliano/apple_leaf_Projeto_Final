import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../login.css'; // Importando o arquivo de estilo

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const loginData = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        'http://localhost:3001/login',
        loginData,
      );

      if (response.status === 200) {
        console.log('Login bem-sucedido:', response.data);
        onLogin(response.data); // Chamar a função onLogin para atualizar o estado no App
        navigate('/');
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error('Erro de conexão:', error);
      setErrorMessage('Erro de conexão');
    }
  };

  const handleClear = () => {
    setEmail('');
    setPassword('');
    setErrorMessage('');
  };

  return (
    <div className='login_container'>
      <img src='/logo.svg' alt='Logo' className='login__logo'></img>
      <h2 className='login__texto'>Apple Leaf</h2>
      <div className='login__form__container'>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>Email:</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              autoFocus
            />
          </div>
          <div className='form-group'>
            <label>Senha:</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Senha'
            />
          </div>
          <div className='botoes__container'>
            <button
              type='button'
              className='login__botao__clean'
              id='botao'
              onClick={handleClear}
            >
              Limpar
            </button>
            <button type='submit' className='login__botao__login' id='botao'>
              Entrar
            </button>
          </div>
        </form>
      </div>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default Login;
