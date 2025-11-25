import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/css/Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    if (formData.nombre && formData.email && formData.password) {
      navigate('/');
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <div className="left-panel">
          <h1>¡Crea tu cuenta!</h1>
          <p>¿Ya tienes una cuenta?</p>
          <Link to="/" className="login-btn">Inicia Sesión</Link>
        </div>

        <div className="right-panel">
          <form className="register-form" onSubmit={handleSubmit}>
            <h2>Registro</h2>

            <div className="input-group">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre Completo"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
              <span className="icon">👤</span>
            </div>

            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Correo Electrónico"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <span className="icon">📧</span>
            </div>

            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span className="icon">🔒</span>
            </div>

            <div className="input-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirmar Contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <span className="icon">🔒</span>
            </div>

            <button type="submit" className="register-btn">Registrarse</button>

            <div className="social-register">
              <p>o registrarse con redes sociales</p>
              <div className="social-icons">
                <div className="icon-box">G</div>
                <div className="icon-box">f</div>
                <div className="icon-box">🐙</div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
