import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../assets/css/Home.css';
import imagen1 from '../assets/img/imagen1.jpg';
import imagen2 from '../assets/img/imagen2.jpg';
import imagen3 from '../assets/img/imagen3.jpg';
import imagen4 from '../assets/img/imagen4.jpg';
import imagen5 from '../assets/img/imagen5.jpg';
import imagen6 from '../assets/img/imagen6.jpg';
import imagen7 from '../assets/img/imagen7.jpg';
import imagen8 from '../assets/img/imagen8.jpg';

function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const cards = [
    { title: 'Monitor de signos', image: imagen1, icon: '📊', description: 'Monitoreo vital' },
    { title: 'Tensiometro', image: imagen2, icon: '🩺', description: 'Presión arterial' },
    { title: 'Pulsoximetro', image: imagen3, icon: '💓', description: 'Saturación de oxígeno' },
    { title: 'Fonendoscopio', image: imagen4, icon: '🔊', description: 'Auscultación' },
    { title: 'Electrocardiografo', image: imagen5, icon: '⚡', description: 'Ritmo cardíaco' },
    { title: 'Aspirador', image: imagen6, icon: '💨', description: 'Aspiración médica' },
    { title: 'Termometro', image: imagen7, icon: '🌡️', description: 'Temperatura corporal' },
    { title: 'Termohigrometro', image: imagen8, icon: '💧', description: 'Ambiente controlado' },
  ];

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <h2>SISTEMA DE MANTENIMIENTO BIOMÉDICO</h2>
          </div>
          <div className="nav-links">
            <Link to="/home" className="nav-link home">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21V15C9 14.4477 9.44772 14 10 14H14C14.5523 14 15 14.4477 15 15V21M9 21H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Inicio
            </Link>
            <Link to="/clientes" className="nav-link clientes">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Crear Clientes
            </Link>
            <Link to="/" className="nav-link logout">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Cerrar Sesión
            </Link>
          </div>
        </div>
      </nav>

      <div className="hero-section">
        <h1 className="hero-title">SISTEMA DE MANTENIMIENTO BIOMÉDICO</h1>
        <p className="hero-subtitle">Gestión integral de equipos médicos y mantenimiento preventivo</p>
      </div>

      <div className={`container ${isLoaded ? 'loaded' : ''}`}>
        {cards.map((card, index) => (
          <div className="card" key={index}>
            <div className="card-icon">{card.icon}</div>
            <img src={card.image} alt={card.title} />
            <h3>{card.title.toUpperCase()}</h3>
            <p className="card-description">{card.description}</p>
            <Link to={`/${card.title.toLowerCase().replace(/\s+/g, '')}`} className="button">
              <span>ACCEDER AL FORMULARIO</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
export default Home;
