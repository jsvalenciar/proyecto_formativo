import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/css/Auth.css';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials({
      ...credentials,
      [id]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!credentials.username || !credentials.password) {
      setErrorMessage('Por favor completa todos los campos');
      return;
    }

    if (credentials.username !== 'ADMIN01') {
      setErrorMessage('Usuario incorrecto');
      setCredentials({ username: '', password: '' });
      return;
    }

    if (credentials.password !== '2868022') {
      setErrorMessage('Contraseña incorrecta');
      setCredentials({ username: '', password: '' });
      return;
    }

    navigate('/Home');
  };
  return (
    <div className="login-wrapper">
      <div className="login-container">
        {/* Panel izquierdo */}
        <div className="left-panel">
          <h1>¡Hola, Bienvenido!</h1>
          <p>¿Interesado en nuestro servicio? </p>
            <p>¡ registrate ahora para mayor informacion ! </p>
          <Link to="/register">
            <button className="register-btn">Registrar</button>
          </Link>
        </div>

        {/* Panel derecho */}
        <div className="right-panel">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>Iniciar Sesión</h2>

            <div className="input-group">
              <input
                type="text"
                id="username"
                placeholder="Usuario"
                value={credentials.username}
                onChange={handleChange}
              />
              <span className="icon">👤</span>
            </div>

            <div className="input-group">
              <input
                type="password"
                id="password"
                placeholder="Contraseña"
                value={credentials.password}
                onChange={handleChange}
              />
              <span className="icon">🔒</span>
            </div>

            {errorMessage && (
              <div className="error-message">
                {errorMessage}
              </div>
            )}

            <button type="submit" className="login-btn">Entrar</button>

            <div className="social-login">
              <p>o contactanos directamente</p>
              <div className="social-icons">
                <div className="icon-box">G</div>
                <div className="icon-box">f</div>

              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
