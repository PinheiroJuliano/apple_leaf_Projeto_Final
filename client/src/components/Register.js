import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../register.css'; // Importando o arquivo de estilo

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const customerData = {
      username,
      email,
      password,
    };

    try {
      const response = await axios.post('http://localhost:3001/register', customerData);

      if (response.status === 201) {
        setSuccessMessage('Registro bem-sucedido! Redirecionando para a página de login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000); // Redireciona após 2 segundos
      } else {
        console.error('Erro no registro:', response.statusText);
        // Adicione lógica de tratamento de erro aqui
      }
    } catch (error) {
      console.error('Erro de conexão:', error);
      // Adicione lógica de tratamento de erro aqui
    }
  };

  const handleClear = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setSuccessMessage('');
  };

  return (
    <div className='register__container'>
      <img src="/logo.svg" alt="Logo" className='login__logo'></img> 
      <h2 className='login__texto'>Apple Leaf</h2>
      <div className='register__form__container'>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Usuário:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Usuário'
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
          />
        </div>
        <div className="form-group">
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Senha'
          />
        </div>
        <div className='botoes__container'>
            <button type="button" className='botao__clean' id='botao' onClick={handleClear}>Limpar</button>
            <button type="submit" className='botao__register' id='botao'>Registrar</button>
        </div>
      </form>
      </div>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default Register;
