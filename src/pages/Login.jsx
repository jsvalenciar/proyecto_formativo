import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Login.css';

const Login = () => {
  return (
    <div className="login-wrapper">
      <div className="login-container">
        {/* Panel izquierdo */}
        <div className="left-panel">
          <h1>¡Hola, Bienvenido!</h1>
          <p>¿No tienes una cuenta?</p>
          <Link to="/register">
            <button className="register-btn">Registrarse</button>
          </Link>
        </div>

        {/* Panel derecho */}
        <div className="right-panel">
          <form className="login-form">
            <h2>Iniciar Sesión</h2>

            <div className="input-group">
              <input
                type="text"
                id="username"
                placeholder="Usuario"
              />
              <span className="icon">👤</span>
            </div>

            <div className="input-group">
              <input
                type="password"
                id="password"
                placeholder="Contraseña"
              />
              <span className="icon">🔒</span>
            </div>

            <Link to="/Home">
              <button type="button" className="login-btn">Entrar</button>
            </Link>

            <div className="social-login">
              <p>o iniciar sesión con plataformas sociales</p>
              <div className="social-icons">
                <div className="icon-box">G</div>
                <div className="icon-box">f</div>
                <div className="icon-box">🐙</div>
                <div className="icon-box">in</div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
