import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/css/Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    contacto: '',
    ciudad: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.email || !formData.contacto || !formData.ciudad) {
      alert('Por favor completa todos los campos');
      return;
    }
    if (formData.nombre && formData.email && formData.contacto && formData.ciudad) {
      navigate('/');
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <div className="left-panel">
          <h1>¡INGRESA TUS DATOS PERSONALES!</h1>
          <p>Nos contactaremos prontamente contigo ...</p>
          <Link to="/" className="login-btn">Inicio de sesión ⬅️</Link>
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
                type="tel"
                name="contacto"
                placeholder="Número de Contacto"
                value={formData.contacto}
                onChange={handleChange}
                required
              />
              <span className="icon">📞</span>
            </div>

            <div className="input-group">
              <input
                type="text"
                name="ciudad"
                placeholder="Ciudad"
                value={formData.ciudad}
                onChange={handleChange}
                required
              />
              <span className="icon">🏙️</span>
            </div>

            <button type="submit" className="register-btn">Registrarse</button>

            
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
