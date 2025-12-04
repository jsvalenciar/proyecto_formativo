


import React, { useRef, useState } from 'react';
import { exportElementToPdf } from '../utils/pdf';
import '../assets/css/Home.css';

function Monitor() {
  const formRef = useRef();
  // Estado para todos los campos editables
  const [form, setForm] = useState({
    codigo: '',
    version: '',
    fecha: '',
    servicio: '',
    nombreEquipo: '',
    marca: '',
    serie: '',
    ubicacion: '',
    modelo: '',
    activo: '',
    fechaMantenimiento: '',
    lugarMantenimiento: '',
    tipo: { preventivo: false, correctivo: false, predictivo: false },
    informeUsuario: '',
    actividades: {},
    informeActividades: '',
    patron1: '',
    certificado1: '',
    patron2: '',
    certificado2: '',
    realizadoPor: '',
    cargoRealizado: '',
    recibidoPor: '',
    cargoRecibido: '',
    firmaRecibido: ''
  });

  // Estado para tablas de actividades (AP, R, NA)
  const tablas = {
    fisica: [
      'Condiciones ambientales', 'Orden y Limpieza', 'Estado físico de la carcasa', 'Cubiertas accesibles al usuario',
      'Estado físico de los accesorios', 'Equipo Cuenta con Etiquetas', 'Guía de manejo rápido', 'Estabilidad del equipo',
      'Frenos - bloqueo de ruedas', 'Partes móviles', 'Conectores de la carcasa', 'Fuentes de entrada (Voltaje, Gases medicinales, Agua)'
    ],
    fuente: [
      'Verificación de cable de poder', 'Verificación del receptáculo', 'Verificación reguladores', 'Verificación de fusibles',
      'Verificación de cables', 'Verificación de conectores', 'Verificación carga de baterías', 'Voltajes de entrada y salida',
      'El chasis se encuentra aterrizado', 'Conexión a sistema de puesta a tierra'
    ],
    interfaz: [
      'Revisión de display (brillo y nitidez)', 'Revisión pantalla táctil', 'Revisión de perillas de ajuste y control',
      'Revisión de alarmas audibles y visuales', 'Revisión del teclado', 'Revisión sistema de impresión',
      'Revisión funcionalidad del software', 'Revisión de pedales', 'Revisión de piezas a paciente', 'Revisión de luces indicadoras'
    ],
    mecanico: [
      'Revisión de engranajes', 'Ajuste de tuercas y tornillos', 'Movilidad de ruedas', 'Revisión de frenos'
    ],
    hidraulico: [
      'Revisión de mangueras y acoples',
      'Revisión de empaques y fugas',
      'Inspecciones de pistones',
      'Revisión de bombas',
      'Revisión de electroválvulas',
      'Revisión de manómetros',
      'Revisión de filtros'
    ],
    control: [
      'Revisión de tarjeta de control', 'Revisión de sensores', 'Sistema de seguridad', 'Verificación de actuadores'
    ],
    neumatico: [
      'Inspección de manómetro', 'Revisión de mangueras/tubos', 'Revisión compresor', 'Revisión de fugas', 'Revisión de control de flujo',
      'Revisión de electroválvulas', 'Revisión de filtros', 'Revisión empaques'
    ],
    adicionales: [
      'Limpieza interna del equipo', 'Limpieza externa del equipo', 'Lubricación de partes si aplica', 'Inspecciones signos de corrosión',
      'Inspección de piezas faltantes', 'Revisión dispositivos/operadores', 'Inspección de componentes con sobrecalentamiento'
    ],
    desempeno: [
      'Revisión de los modos de operación', 'Simulación de parámetros de entrada', 'Análisis de parámetros de salida',
      'Verificando rango de exactitud', 'Corriente de fuga', 'Chasis (puesta a tierra) ≤ 10 μA',
      'Chasis (sin toma a tierra) ≤ 10 μA', 'Sonda del cable ≤ 10 μA'
    ]
  };

  // Inicializar actividades si no existen
  React.useEffect(() => {
    if (Object.keys(form.actividades).length === 0) {
      const actividades = {};
      Object.keys(tablas).forEach(tabla => {
        tablas[tabla].forEach((row, idx) => {
          actividades[`${tabla}_${idx}`] = { ap: false, r: false, na: false };
        });
      });
      setForm(f => ({ ...f, actividades }));
    }
    // eslint-disable-next-line
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };
  const handleTipo = (e) => {
    const { name, checked } = e.target;
    setForm(f => ({ ...f, tipo: { ...f.tipo, [name]: checked } }));
  };
  const handleActividad = (tabla, idx, col) => (e) => {
    setForm(f => ({
      ...f,
      actividades: {
        ...f.actividades,
        [`${tabla}_${idx}`]: {
          ...f.actividades[`${tabla}_${idx}`],
          [col]: e.target.checked
        }
      }
    }));
  };

  const handleExportPDF = async () => {
    const input = formRef.current;
    if (!input) return;
    await exportElementToPdf(input, 'reporte-monitor.pdf');
  };

  const handleSaveForm = () => {
    // Guardar formulario en localStorage
    localStorage.setItem('monitor_form', JSON.stringify(form));
    alert('Formulario guardado exitosamente');
  };

  return (
    <div className="formato" ref={formRef} style={{ background: '#fff', color: '#222', padding: 0, borderRadius: 0, maxWidth: '100%', margin: 0, boxShadow: 'none' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '3px solid #667eea', paddingBottom: 16, marginBottom: 24, marginTop: 20 }}>
        <div className="titulo" style={{ flex: 1 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, color: '#2c3e50', letterSpacing: '-0.5px' }}>REPORTE TÉCNICO DE MANTENIMIENTO EQUIPOS BIOMÉDICOS</h1>
        </div>
        <div className="info-cabecera" style={{ textAlign: 'right', fontSize: 13, color: '#7f8c8d', minWidth: 200, marginRight: 20, paddingTop: 10 }}>
          <div style={{ marginBottom: 6 }}><strong>CÓDIGO:</strong> <input name="codigo" value={form.codigo} onChange={handleInput} style={{ width: 90, padding: '4px 8px', border: '1px solid #ddd', borderRadius: 4 }} /></div>
          <div style={{ marginBottom: 6 }}><strong>VERSIÓN:</strong> <input name="version" value={form.version} onChange={handleInput} style={{ width: 60, padding: '4px 8px', border: '1px solid #ddd', borderRadius: 4 }} /></div>
          <div><strong>FECHA:</strong> <input name="fecha" value={form.fecha} onChange={handleInput} style={{ width: 120, padding: '4px 8px', border: '1px solid #ddd', borderRadius: 4 }} type="date" /></div>
        </div>
      </header>
      <section style={{ background: '#f8f9fa', padding: 20, borderRadius: 12, marginBottom: 20, border: '1px solid #e0e6ed' }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: '#2c3e50', marginTop: 0, marginBottom: 16, borderBottom: '2px solid #667eea', paddingBottom: 8 }}>DATOS GENERALES DEL EQUIPO</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          <div style={{ background: 'white', padding: 12, borderRadius: 8, border: '1px solid #e0e6ed' }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#34495e', marginBottom: 6 }}>SERVICIO:</label>
            <input name="servicio" value={form.servicio} onChange={handleInput} style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }} />
          </div>
          <div style={{ background: 'white', padding: 12, borderRadius: 8, border: '1px solid #e0e6ed' }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#34495e', marginBottom: 6 }}>NOMBRE DEL EQUIPO:</label>
            <input name="nombreEquipo" value={form.nombreEquipo} onChange={handleInput} style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }} />
          </div>
          <div style={{ background: 'white', padding: 12, borderRadius: 8, border: '1px solid #e0e6ed' }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#34495e', marginBottom: 6 }}>MARCA:</label>
            <input name="marca" value={form.marca} onChange={handleInput} style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }} />
          </div>
          <div style={{ background: 'white', padding: 12, borderRadius: 8, border: '1px solid #e0e6ed' }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#34495e', marginBottom: 6 }}>SERIE:</label>
            <input name="serie" value={form.serie} onChange={handleInput} style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }} />
          </div>
          <div style={{ background: 'white', padding: 12, borderRadius: 8, border: '1px solid #e0e6ed' }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#34495e', marginBottom: 6 }}>UBICACIÓN:</label>
            <input name="ubicacion" value={form.ubicacion} onChange={handleInput} style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }} />
          </div>
          <div style={{ background: 'white', padding: 12, borderRadius: 8, border: '1px solid #e0e6ed' }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#34495e', marginBottom: 6 }}>MODELO:</label>
            <input name="modelo" value={form.modelo} onChange={handleInput} style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }} />
          </div>
          <div style={{ background: 'white', padding: 12, borderRadius: 8, border: '1px solid #e0e6ed' }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#34495e', marginBottom: 6 }}>ACTIVO:</label>
            <input name="activo" value={form.activo} onChange={handleInput} style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }} />
          </div>
          <div style={{ background: 'white', padding: 12, borderRadius: 8, border: '1px solid #e0e6ed' }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#34495e', marginBottom: 6 }}>FECHA DEL MANTENIMIENTO:</label>
            <input name="fechaMantenimiento" value={form.fechaMantenimiento} onChange={handleInput} style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }} type="date" />
          </div>
          <div style={{ background: 'white', padding: 12, borderRadius: 8, border: '1px solid #e0e6ed' }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#34495e', marginBottom: 6 }}>LUGAR DEL MANTENIMIENTO:</label>
            <input name="lugarMantenimiento" value={form.lugarMantenimiento} onChange={handleInput} style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }} />
          </div>
        </div>
      </section>
      <section style={{ background: '#f8f9fa', padding: 20, borderRadius: 12, marginBottom: 20, border: '1px solid #e0e6ed' }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: '#2c3e50', marginTop: 0, marginBottom: 16, borderBottom: '2px solid #667eea', paddingBottom: 8 }}>TIPO DE MANTENIMIENTO</h3>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', background: 'white', padding: '10px 16px', borderRadius: 8, border: '1px solid #e0e6ed', transition: 'all 0.3s' }}>
            <input type="checkbox" name="preventivo" checked={form.tipo.preventivo} onChange={handleTipo} style={{ transform: 'scale(1.2)', accentColor: '#667eea', cursor: 'pointer' }} />
            <span style={{ fontWeight: 500, fontSize: 14, color: '#2c3e50' }}>MTTO PREVENTIVO</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', background: 'white', padding: '10px 16px', borderRadius: 8, border: '1px solid #e0e6ed', transition: 'all 0.3s' }}>
            <input type="checkbox" name="correctivo" checked={form.tipo.correctivo} onChange={handleTipo} style={{ transform: 'scale(1.2)', accentColor: '#667eea', cursor: 'pointer' }} />
            <span style={{ fontWeight: 500, fontSize: 14, color: '#2c3e50' }}>MTTO CORRECTIVO</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', background: 'white', padding: '10px 16px', borderRadius: 8, border: '1px solid #e0e6ed', transition: 'all 0.3s' }}>
            <input type="checkbox" name="predictivo" checked={form.tipo.predictivo} onChange={handleTipo} style={{ transform: 'scale(1.2)', accentColor: '#667eea', cursor: 'pointer' }} />
            <span style={{ fontWeight: 500, fontSize: 14, color: '#2c3e50' }}>MTTO PREDICTIVO</span>
          </label>
        </div>
      </section>
      <section style={{ background: '#f8f9fa', padding: 20, borderRadius: 12, marginBottom: 20, border: '1px solid #e0e6ed' }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: '#2c3e50', marginTop: 0, marginBottom: 16, borderBottom: '2px solid #667eea', paddingBottom: 8 }}>INFORME DEL USUARIO, OBSERVACIONES DEL EQUIPO Y ERRORES PERSISTENTES</h3>
        <div style={{ background: 'white', border: '1px solid #ddd', borderRadius: 8, padding: 12 }}>
          <textarea name="informeUsuario" value={form.informeUsuario} onChange={handleInput} style={{ width: '100%', minHeight: 60, border: 'none', resize: 'vertical', fontSize: 14, fontFamily: 'inherit', lineHeight: 1.6, boxSizing: 'border-box' }} placeholder="Describa las observaciones del usuario, estado del equipo y errores persistentes..." />
        </div>
      </section>
      {/* ACTIVIDADES DE MANTENIMIENTO */}
      <section style={{ background: '#f8f9fa', padding: 20, borderRadius: 12, marginBottom: 20, border: '1px solid #e0e6ed' }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: '#2c3e50', marginTop: 0, marginBottom: 20, borderBottom: '2px solid #667eea', paddingBottom: 8 }}>ACTIVIDADES DE MANTENIMIENTO</h3>
        {/* Renderizar cada tabla de actividades como inputs y checkboxes */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
          {/* VERIFICACIÓN FÍSICA - INSTALACIÓN */}
          <div style={{ flex: 1, minWidth: 320, background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e0e6ed' }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, marginTop: 0, marginBottom: 12, textAlign: 'center', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: 10, borderRadius: 6 }}>VERIFICACIÓN FÍSICA - INSTALACIÓN</h4>
            <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }} border="1">
              <thead><tr><th>Resultado</th><th>AP</th><th>R</th><th>NA</th></tr></thead>
              <tbody>
                {tablas.fisica.map((row, idx) => (
                  <tr key={row}>
                    <td>{row}</td>
                    <td><input type="checkbox" checked={form.actividades[`fisica_${idx}`]?.ap || false} onChange={handleActividad('fisica', idx, 'ap')} /></td>
                    <td><input type="checkbox" checked={form.actividades[`fisica_${idx}`]?.r || false} onChange={handleActividad('fisica', idx, 'r')} /></td>
                    <td><input type="checkbox" checked={form.actividades[`fisica_${idx}`]?.na || false} onChange={handleActividad('fisica', idx, 'na')} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* VERIFICACIÓN DE FUENTE DE PODER */}
          <div style={{ flex: 1, minWidth: 320, background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e0e6ed' }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, marginTop: 0, marginBottom: 12, textAlign: 'center', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: 10, borderRadius: 6 }}>VERIFICACIÓN DE FUENTE DE PODER</h4>
            <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }} border="1">
              <thead><tr><th>Resultado</th><th>AP</th><th>R</th><th>NA</th></tr></thead>
              <tbody>
                {tablas.fuente.map((row, idx) => (
                  <tr key={row}>
                    <td>{row}</td>
                    <td><input type="checkbox" checked={form.actividades[`fuente_${idx}`]?.ap || false} onChange={handleActividad('fuente', idx, 'ap')} /></td>
                    <td><input type="checkbox" checked={form.actividades[`fuente_${idx}`]?.r || false} onChange={handleActividad('fuente', idx, 'r')} /></td>
                    <td><input type="checkbox" checked={form.actividades[`fuente_${idx}`]?.na || false} onChange={handleActividad('fuente', idx, 'na')} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* VERIFICACIÓN DE INTERFAZ DE USUARIO */}
          <div style={{ flex: 1, minWidth: 320, background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e0e6ed' }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, marginTop: 0, marginBottom: 12, textAlign: 'center', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: 10, borderRadius: 6 }}>VERIFICACIÓN DE INTERFAZ DE USUARIO</h4>
            <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }} border="1">
              <thead><tr><th>Resultado</th><th>AP</th><th>R</th><th>NA</th></tr></thead>
              <tbody>
                {tablas.interfaz.map((row, idx) => (
                  <tr key={row}>
                    <td>{row}</td>
                    <td><input type="checkbox" checked={form.actividades[`interfaz_${idx}`]?.ap || false} onChange={handleActividad('interfaz', idx, 'ap')} /></td>
                    <td><input type="checkbox" checked={form.actividades[`interfaz_${idx}`]?.r || false} onChange={handleActividad('interfaz', idx, 'r')} /></td>
                    <td><input type="checkbox" checked={form.actividades[`interfaz_${idx}`]?.na || false} onChange={handleActividad('interfaz', idx, 'na')} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* OTRAS SECCIONES DE ACTIVIDADES */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginTop: 20 }}>
          <div style={{ flex: 1, minWidth: 320, background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e0e6ed' }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, marginTop: 0, marginBottom: 12, textAlign: 'center', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: 10, borderRadius: 6 }}>VERIFICACIÓN DE SISTEMA MECÁNICO</h4>
            <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }} border="1">
              <thead><tr><th>Resultado</th><th>AP</th><th>R</th><th>NA</th></tr></thead>
              <tbody>
                {tablas.mecanico.map((row, idx) => (
                  <tr key={row}>
                    <td>{row}</td>
                    <td><input type="checkbox" checked={form.actividades[`mecanico_${idx}`]?.ap || false} onChange={handleActividad('mecanico', idx, 'ap')} /></td>
                    <td><input type="checkbox" checked={form.actividades[`mecanico_${idx}`]?.r || false} onChange={handleActividad('mecanico', idx, 'r')} /></td>
                    <td><input type="checkbox" checked={form.actividades[`mecanico_${idx}`]?.na || false} onChange={handleActividad('mecanico', idx, 'na')} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ flex: 1, minWidth: 320, background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e0e6ed' }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, marginTop: 0, marginBottom: 12, textAlign: 'center', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: 10, borderRadius: 6 }}>VERIFICACIÓN DE SISTEMA HIDRÁULICO</h4>
            <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }} border="1">
              <thead><tr><th>Resultado</th><th>AP</th><th>R</th><th>NA</th></tr></thead>
              <tbody>
                {tablas.hidraulico.map((row, idx) => (
                  <tr key={row}>
                    <td>{row}</td>
                    <td><input type="checkbox" checked={form.actividades[`hidraulico_${idx}`]?.ap || false} onChange={handleActividad('hidraulico', idx, 'ap')} /></td>
                    <td><input type="checkbox" checked={form.actividades[`hidraulico_${idx}`]?.r || false} onChange={handleActividad('hidraulico', idx, 'r')} /></td>
                    <td><input type="checkbox" checked={form.actividades[`hidraulico_${idx}`]?.na || false} onChange={handleActividad('hidraulico', idx, 'na')} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginTop: 20 }}>
          <div style={{ flex: 1, minWidth: 320, background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e0e6ed' }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, marginTop: 0, marginBottom: 12, textAlign: 'center', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: 10, borderRadius: 6 }}>VERIFICACIÓN SISTEMA DE CONTROL</h4>
            <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }} border="1">
              <thead><tr><th>RESULTADO</th><th>AP</th><th>R</th><th>NA</th></tr></thead>
              <tbody>
                {tablas.control.map((row, idx) => (
                  <tr key={row}>
                    <td>{row}</td>
                    <td><input type="checkbox" checked={form.actividades[`control_${idx}`]?.ap || false} onChange={handleActividad('control', idx, 'ap')} /></td>
                    <td><input type="checkbox" checked={form.actividades[`control_${idx}`]?.r || false} onChange={handleActividad('control', idx, 'r')} /></td>
                    <td><input type="checkbox" checked={form.actividades[`control_${idx}`]?.na || false} onChange={handleActividad('control', idx, 'na')} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ flex: 1, minWidth: 320, background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e0e6ed' }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, marginTop: 0, marginBottom: 12, textAlign: 'center', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: 10, borderRadius: 6 }}>VERIFICACIÓN NEUMÁTICO</h4>
            <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }} border="1">
              <thead><tr><th>RESULTADO</th><th>AP</th><th>R</th><th>NA</th></tr></thead>
              <tbody>
                {tablas.neumatico.map((row, idx) => (
                  <tr key={row}>
                    <td>{row}</td>
                    <td><input type="checkbox" checked={form.actividades[`neumatico_${idx}`]?.ap || false} onChange={handleActividad('neumatico', idx, 'ap')} /></td>
                    <td><input type="checkbox" checked={form.actividades[`neumatico_${idx}`]?.r || false} onChange={handleActividad('neumatico', idx, 'r')} /></td>
                    <td><input type="checkbox" checked={form.actividades[`neumatico_${idx}`]?.na || false} onChange={handleActividad('neumatico', idx, 'na')} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginTop: 20 }}>
          <div style={{ flex: 1, minWidth: 320, background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e0e6ed' }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, marginTop: 0, marginBottom: 12, textAlign: 'center', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: 10, borderRadius: 6 }}>TAREAS ADICIONALES</h4>
            <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }} border="1">
              <thead><tr><th>RESULTADO</th><th>AP</th><th>R</th><th>NA</th></tr></thead>
              <tbody>
                {tablas.adicionales.map((row, idx) => (
                  <tr key={row}>
                    <td>{row}</td>
                    <td><input type="checkbox" checked={form.actividades[`adicionales_${idx}`]?.ap || false} onChange={handleActividad('adicionales', idx, 'ap')} /></td>
                    <td><input type="checkbox" checked={form.actividades[`adicionales_${idx}`]?.r || false} onChange={handleActividad('adicionales', idx, 'r')} /></td>
                    <td><input type="checkbox" checked={form.actividades[`adicionales_${idx}`]?.na || false} onChange={handleActividad('adicionales', idx, 'na')} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ flex: 1, minWidth: 320, background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e0e6ed' }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, marginTop: 0, marginBottom: 12, textAlign: 'center', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: 10, borderRadius: 6 }}>PRUEBAS DE DESEMPEÑO</h4>
            <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }} border="1">
              <thead><tr><th>RESULTADO</th><th>AP</th><th>R</th><th>NA</th></tr></thead>
              <tbody>
                {tablas.desempeno.map((row, idx) => (
                  <tr key={row}>
                    <td>{row}</td>
                    <td><input type="checkbox" checked={form.actividades[`desempeno_${idx}`]?.ap || false} onChange={handleActividad('desempeno', idx, 'ap')} /></td>
                    <td><input type="checkbox" checked={form.actividades[`desempeno_${idx}`]?.r || false} onChange={handleActividad('desempeno', idx, 'r')} /></td>
                    <td><input type="checkbox" checked={form.actividades[`desempeno_${idx}`]?.na || false} onChange={handleActividad('desempeno', idx, 'na')} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section style={{ background: '#f8f9fa', padding: 20, borderRadius: 12, marginTop: 20, border: '1px solid #e0e6ed' }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: '#2c3e50', marginTop: 0, marginBottom: 16, borderBottom: '2px solid #667eea', paddingBottom: 8 }}>INFORME DE ACTIVIDADES EFECTUADAS</h3>
        <div style={{ background: 'white', border: '1px solid #ddd', borderRadius: 8, padding: 12 }}>
          <textarea name="informeActividades" value={form.informeActividades} onChange={handleInput} style={{ width: '100%', minHeight: 60, border: 'none', resize: 'vertical', fontSize: 14, fontFamily: 'inherit', lineHeight: 1.6, boxSizing: 'border-box' }} placeholder="Describa detalladamente las actividades efectuadas durante el mantenimiento..." />
        </div>
      </section>
      <section style={{ background: '#f8f9fa', padding: 20, borderRadius: 12, marginTop: 20, border: '1px solid #e0e6ed' }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: '#2c3e50', marginTop: 0, marginBottom: 16, borderBottom: '2px solid #667eea', paddingBottom: 8 }}>EQUIPOS PATRÓN UTILIZADOS</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
          <div style={{ background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e0e6ed' }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#34495e', marginBottom: 8 }}>Equipo patrón utilizado 1:</label>
            <input name="patron1" value={form.patron1} onChange={handleInput} style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: 14, marginBottom: 12, boxSizing: 'border-box' }} placeholder="Nombre del equipo" />
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#34495e', marginBottom: 8 }}>Certificado:</label>
            <input name="certificado1" value={form.certificado1} onChange={handleInput} style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }} placeholder="Número de certificado" />
          </div>
          <div style={{ background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e0e6ed' }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#34495e', marginBottom: 8 }}>Equipo patrón utilizado 2:</label>
            <input name="patron2" value={form.patron2} onChange={handleInput} style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: 14, marginBottom: 12, boxSizing: 'border-box' }} placeholder="Nombre del equipo" />
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#34495e', marginBottom: 8 }}>Certificado:</label>
            <input name="certificado2" value={form.certificado2} onChange={handleInput} style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }} placeholder="Número de certificado" />
          </div>
        </div>
      </section>
      <section style={{ background: '#f8f9fa', padding: 20, borderRadius: 12, marginTop: 20, border: '1px solid #e0e6ed' }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: '#2c3e50', marginTop: 0, marginBottom: 16, borderBottom: '2px solid #667eea', paddingBottom: 8 }}>FIRMAS Y RESPONSABLES</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          <div style={{ background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e0e6ed' }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: '#34495e', marginTop: 0, marginBottom: 12 }}>Mantenimiento realizado por:</h4>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#34495e', marginBottom: 6 }}>Nombre:</label>
            <input name="realizadoPor" value={form.realizadoPor} onChange={handleInput} style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: 14, marginBottom: 12, boxSizing: 'border-box' }} placeholder="Nombre completo" />
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#34495e', marginBottom: 6 }}>Cargo:</label>
            <input name="cargoRealizado" value={form.cargoRealizado} onChange={handleInput} style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }} placeholder="Cargo del técnico" />
          </div>
          <div style={{ background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e0e6ed' }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: '#34495e', marginTop: 0, marginBottom: 12 }}>Recibido a satisfacción por:</h4>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#34495e', marginBottom: 6 }}>Nombre:</label>
            <input name="recibidoPor" value={form.recibidoPor} onChange={handleInput} style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: 14, marginBottom: 12, boxSizing: 'border-box' }} placeholder="Nombre completo" />
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#34495e', marginBottom: 6 }}>Cargo:</label>
            <input name="cargoRecibido" value={form.cargoRecibido} onChange={handleInput} style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: 14, marginBottom: 12, boxSizing: 'border-box' }} placeholder="Cargo del responsable" />
            <div style={{ marginTop: 20, textAlign: 'center' }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#34495e', marginBottom: 6 }}>Firma:</label>
              <div style={{ borderBottom: '2px solid #333', width: '60%', paddingTop: 40, marginTop: 15, marginLeft: 'auto', marginRight: 'auto' }}></div>
            </div>
          </div>
        </div>
      </section>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 30, marginBottom: 10, flexWrap: 'wrap' }}>
        <button className="submit-btn" onClick={handleExportPDF} style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: '14px 40px', border: 'none', borderRadius: 8, fontSize: 16, fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)', transition: 'all 0.3s ease' }}>Generar PDF del Reporte</button>
        <button className="submit-btn" onClick={handleSaveForm} style={{ background: 'white', color: '#dc3545', padding: '14px 40px', border: '2px solid #dc3545', borderRadius: 8, fontSize: 16, fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 15px rgba(220, 53, 69, 0.2)', transition: 'all 0.3s ease' }}>guardar formulario</button>
      </div>
    </div>
  );
}

export default Monitor;
