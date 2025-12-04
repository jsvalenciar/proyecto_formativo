import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Home.css';

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [clienteActual, setClienteActual] = useState({
    id: null,
    nombreCompleto: '',
    tipoDocumento: 'CC',
    numeroDocumento: '',
    direccion: '',
    departamento: '',
    telefono: '',
    email: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClienteActual(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (clienteActual.id) {
      // Editar cliente existente
      setClientes(clientes.map(c => c.id === clienteActual.id ? clienteActual : c));
    } else {
      // Crear nuevo cliente
      setClientes([...clientes, { ...clienteActual, id: Date.now() }]);
    }
    resetFormulario();
  };

  const resetFormulario = () => {
    setClienteActual({
      id: null,
      nombreCompleto: '',
      tipoDocumento: 'CC',
      numeroDocumento: '',
      direccion: '',
      departamento: '',
      telefono: '',
      email: ''
    });
    setMostrarFormulario(false);
  };

  const editarCliente = (cliente) => {
    setClienteActual(cliente);
    setMostrarFormulario(true);
  };

  const eliminarCliente = (id) => {
    if (window.confirm('¿Está seguro de eliminar este cliente?')) {
      setClientes(clientes.filter(c => c.id !== id));
    }
  };

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
        <h1 className="hero-title">GESTIÓN DE CLIENTES</h1>
        <p className="hero-subtitle">Administración de clientes y empresas</p>
      </div>

      <div style={{ maxWidth: 1200, margin: '40px auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, color: '#2c3e50' }}>Lista de Clientes</h2>
          <button 
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
            style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              padding: '12px 24px',
              border: 'none',
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
              transition: 'all 0.3s ease'
            }}
          >
            {mostrarFormulario ? '❌ Cancelar' : '➕ Nuevo Cliente'}
          </button>
        </div>

        {mostrarFormulario && (
          <div style={{
            background: '#f8f9fa',
            padding: 30,
            borderRadius: 12,
            marginBottom: 30,
            border: '1px solid #e0e6ed',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <h3 style={{ fontSize: 20, fontWeight: 600, color: '#2c3e50', marginBottom: 20 }}>
              {clienteActual.id ? 'Editar Cliente' : 'Nuevo Cliente'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#34495e', marginBottom: 8 }}>
                    Nombre Completo / Razón Social *
                  </label>
                  <input
                    type="text"
                    name="nombreCompleto"
                    value={clienteActual.nombreCompleto}
                    onChange={handleInputChange}
                    required
                    placeholder="Ingrese el nombre completo o razón social"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      border: '1px solid #ddd',
                      borderRadius: 6,
                      fontSize: 14,
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#34495e', marginBottom: 8 }}>
                    Tipo de Documento *
                  </label>
                  <select
                    name="tipoDocumento"
                    value={clienteActual.tipoDocumento}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      border: '1px solid #ddd',
                      borderRadius: 6,
                      fontSize: 14,
                      boxSizing: 'border-box',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="CC">Cédula de Ciudadanía (CC)</option>
                    <option value="NIT">NIT</option>
                    <option value="CE">Cédula de Extranjería (CE)</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#34495e', marginBottom: 8 }}>
                    Número de Documento / NIT *
                  </label>
                  <input
                    type="text"
                    name="numeroDocumento"
                    value={clienteActual.numeroDocumento}
                    onChange={handleInputChange}
                    required
                    placeholder="Ej: 123456789"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      border: '1px solid #ddd',
                      borderRadius: 6,
                      fontSize: 14,
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#34495e', marginBottom: 8 }}>
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={clienteActual.telefono}
                    onChange={handleInputChange}
                    required
                    placeholder="Ej: 3001234567"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      border: '1px solid #ddd',
                      borderRadius: 6,
                      fontSize: 14,
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#34495e', marginBottom: 8 }}>
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={clienteActual.email}
                    onChange={handleInputChange}
                    required
                    placeholder="correo@ejemplo.com"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      border: '1px solid #ddd',
                      borderRadius: 6,
                      fontSize: 14,
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#34495e', marginBottom: 8 }}>
                    Dirección *
                  </label>
                  <input
                    type="text"
                    name="direccion"
                    value={clienteActual.direccion}
                    onChange={handleInputChange}
                    required
                    placeholder="Calle, carrera, número, etc."
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      border: '1px solid #ddd',
                      borderRadius: 6,
                      fontSize: 14,
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#34495e', marginBottom: 8 }}>
                    Departamento / Ciudad / Municipio *
                  </label>
                  <input
                    type="text"
                    name="departamento"
                    value={clienteActual.departamento}
                    onChange={handleInputChange}
                    required
                    placeholder="Ej: Bogotá D.C., Antioquia - Medellín"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      border: '1px solid #ddd',
                      borderRadius: 6,
                      fontSize: 14,
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>
              <div style={{ marginTop: 24, display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={resetFormulario}
                  style={{
                    background: '#95a5a6',
                    color: 'white',
                    padding: '10px 24px',
                    border: 'none',
                    borderRadius: 6,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: 'white',
                    padding: '10px 24px',
                    border: 'none',
                    borderRadius: 6,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {clienteActual.id ? 'Actualizar' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        )}

        {clientes.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: 60,
            background: '#f8f9fa',
            borderRadius: 12,
            border: '2px dashed #ddd'
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📋</div>
            <p style={{ fontSize: 18, color: '#7f8c8d', margin: 0 }}>
              No hay clientes registrados. Haz clic en "Nuevo Cliente" para agregar uno.
            </p>
          </div>
        ) : (
          <div style={{
            background: 'white',
            borderRadius: 12,
            overflow: 'hidden',
            boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white' }}>
                  <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: 600, fontSize: 14 }}>Nombre / Razón Social</th>
                  <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: 600, fontSize: 14 }}>Tipo Doc.</th>
                  <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: 600, fontSize: 14 }}>Documento</th>
                  <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: 600, fontSize: 14 }}>Teléfono</th>
                  <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: 600, fontSize: 14 }}>Email</th>
                  <th style={{ padding: '14px 16px', textAlign: 'center', fontWeight: 600, fontSize: 14 }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((cliente, index) => (
                  <tr key={cliente.id} style={{
                    borderBottom: '1px solid #f0f0f0',
                    background: index % 2 === 0 ? '#fff' : '#f8f9fa',
                    transition: 'background 0.2s'
                  }}>
                    <td style={{ padding: '14px 16px', fontSize: 14, color: '#2c3e50', fontWeight: 500 }}>{cliente.nombreCompleto}</td>
                    <td style={{ padding: '14px 16px', fontSize: 14, color: '#2c3e50' }}>
                      <span style={{ 
                        background: '#667eea', 
                        color: 'white', 
                        padding: '4px 8px', 
                        borderRadius: 4, 
                        fontSize: 12,
                        fontWeight: 600
                      }}>
                        {cliente.tipoDocumento}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 14, color: '#2c3e50' }}>{cliente.numeroDocumento}</td>
                    <td style={{ padding: '14px 16px', fontSize: 14, color: '#2c3e50' }}>{cliente.telefono}</td>
                    <td style={{ padding: '14px 16px', fontSize: 14, color: '#2c3e50' }}>{cliente.email}</td>
                    <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                      <button
                        onClick={() => editarCliente(cliente)}
                        style={{
                          background: '#3498db',
                          color: 'white',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: 4,
                          fontSize: 13,
                          cursor: 'pointer',
                          marginRight: 8
                        }}
                      >
                        ✏️ Editar
                      </button>
                      <button
                        onClick={() => eliminarCliente(cliente.id)}
                        style={{
                          background: '#e74c3c',
                          color: 'white',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: 4,
                          fontSize: 13,
                          cursor: 'pointer'
                        }}
                      >
                        🗑️ Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div style={{ marginTop: 30, textAlign: 'center' }}>
          <Link
            to="/home"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: '#95a5a6',
              color: 'white',
              padding: '12px 24px',
              borderRadius: 8,
              textDecoration: 'none',
              fontSize: 16,
              fontWeight: 600
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Volver al Inicio
          </Link>
        </div>
      </div>
    </>
  );
}

export default Clientes;
