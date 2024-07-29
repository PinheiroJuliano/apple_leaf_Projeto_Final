import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles.css'; // Importando o arquivo de estilo

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

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default Register;
