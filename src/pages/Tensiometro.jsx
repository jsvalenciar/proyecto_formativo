import React, { useRef, useState } from 'react';
import { exportElementToPdf } from '../utils/pdf';
import '../assets/css/Home.css';

function Tensiometro() {
  const formRef = useRef();
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

  const tablas = {
    fisica: [
      'Condiciones ambientales',
      'Orden y limpieza general',
      'Estado físico de la carcasa',
      'Etiquetas de identificación',
      'Estabilidad del equipo',
      'Accesorios completos'
    ],
    fuente: [
      'Inspección del cable de alimentación',
      'Verificación del adaptador (si aplica)',
      'Estado de baterías',
      'Prueba de autonomía de batería',
      'Indicador de carga funcionando',
      'Medición de voltaje de entrada',
      'Verificación del switch de encendido',
      'Conexión a tierra (si aplica)'
    ],
    brazalete: [
      'Inspección del brazalete',
      'Estado de la cámara inflable',
      'Inspección de tubería conexión',
      'Prueba de hermeticidad',
      'Limpieza y desinfección del brazalete'
    ],
    neumatico: [
      'Inspección de mangueras',
      'Verificación de conexiones',
      'Revisión de válvulas',
      'Prueba de fugas de aire',
      'Verificación de bomba de inflado',
      'Funcionamiento de válvula de desinflado',
      'Revisión de conectores',
      'Inspección de fisuras en tubería',
      'Prueba de presión del sistema'
    ],
    interfaz: [
      'Funcionamiento del display',
      'Prueba de brillo y contraste',
      'Visualización de valores numéricos',
      'Verificación de botones de control',
      'Funcionamiento de menú',
      'Revisión de indicadores LED',
      'Prueba de selección de modo',
      'Visualización de presión en tiempo real'
    ],
    manometro: [
      'Inspección del manómetro (analógico)',
      'Verificación de aguja indicadora',
      'Revisión de carátula y escala',
      'Verificación de cristal protector',
      'Prueba de movimiento suave de aguja',
      'Verificación de retorno a cero',
      'Calibración del manómetro',
      'Inspección de mecanismo interno'
    ],
    alarmas: [
      'Prueba de alarma de error',
      'Verificación de alarma de batería baja',
      'Prueba de indicadores de fallo',
      'Ajuste de volumen de alarma',
      'Verificación de alarmas visuales',
      'Funcionalidad de silenciar alarma'
    ],
    calibracion: [
      'Calibración con patrón certificado',
      'Verificación de presión sistólica y diastólica',
      'Verificación de frecuencia cardíaca',
      'Comparación con tensiómetro patrón'
    ],
    adicionales: [
      'Limpieza externa del equipo',
      'Desinfección de superficies',
      'Limpieza de brazalete',
      'Inspección de signos de desgaste',
      'Verificación de todos los accesorios',
      'Revisión de estuche de transporte',
      'Documentación de hallazgos',
      'Etiquetado de mantenimiento'
    ],
    desempeno: [
      'Prueba con simulador de presión',
      'Exactitud ±3 mmHg (presión)',
      'Exactitud ±5% (frecuencia cardíaca)',
      'Verificación en rangos: 0-300 mmHg',
      'Tiempo de medición aceptable',
      'Repetibilidad de mediciones',
      'Corriente de fuga ≤ 100 μA (digital)',
      'Resistencia de puesta a tierra ≤ 0.2 Ω',
      'Funcionamiento en modo adulto/pediátrico/neonatal'
    ]
  };

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
    await exportElementToPdf(formRef.current, 'reporte-tensiometro.pdf');
  };

  const handleSaveForm = () => {
    localStorage.setItem('tensiometro_form', JSON.stringify(form));
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
      <section style={{ background: '#f8f9fa', padding: 20, borderRadius: 12, marginBottom: 20, border: '1px solid #e0e6ed' }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: '#2c3e50', marginTop: 0, marginBottom: 20, borderBottom: '2px solid #667eea', paddingBottom: 8 }}>ACTIVIDADES DE MANTENIMIENTO</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
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
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginTop: 20 }}>
          <div style={{ flex: 1, minWidth: 320, background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e0e6ed' }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, marginTop: 0, marginBottom: 12, textAlign: 'center', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: 10, borderRadius: 6 }}>VERIFICACIÓN DEL BRAZALETE</h4>
            <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }} border="1">
              <thead><tr><th>Resultado</th><th>AP</th><th>R</th><th>NA</th></tr></thead>
              <tbody>
                {tablas.brazalete.map((row, idx) => (
                  <tr key={row}>
                    <td>{row}</td>
                    <td><input type="checkbox" checked={form.actividades[`brazalete_${idx}`]?.ap || false} onChange={handleActividad('brazalete', idx, 'ap')} /></td>
                    <td><input type="checkbox" checked={form.actividades[`brazalete_${idx}`]?.r || false} onChange={handleActividad('brazalete', idx, 'r')} /></td>
                    <td><input type="checkbox" checked={form.actividades[`brazalete_${idx}`]?.na || false} onChange={handleActividad('brazalete', idx, 'na')} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ flex: 1, minWidth: 320, background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e0e6ed' }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, marginTop: 0, marginBottom: 12, textAlign: 'center', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: 10, borderRadius: 6 }}>VERIFICACIÓN DEL MANÓMETRO</h4>
            <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }} border="1">
              <thead><tr><th>Resultado</th><th>AP</th><th>R</th><th>NA</th></tr></thead>
              <tbody>
                {tablas.manometro.map((row, idx) => (
                  <tr key={row}>
                    <td>{row}</td>
                    <td><input type="checkbox" checked={form.actividades[`manometro_${idx}`]?.ap || false} onChange={handleActividad('manometro', idx, 'ap')} /></td>
                    <td><input type="checkbox" checked={form.actividades[`manometro_${idx}`]?.r || false} onChange={handleActividad('manometro', idx, 'r')} /></td>
                    <td><input type="checkbox" checked={form.actividades[`manometro_${idx}`]?.na || false} onChange={handleActividad('manometro', idx, 'na')} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginTop: 20 }}>
          <div style={{ flex: 1, minWidth: 320, background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e0e6ed' }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, marginTop: 0, marginBottom: 12, textAlign: 'center', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: 10, borderRadius: 6 }}>VERIFICACIÓN DE ALARMAS</h4>
            <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }} border="1">
              <thead><tr><th>RESULTADO</th><th>AP</th><th>R</th><th>NA</th></tr></thead>
              <tbody>
                {tablas.alarmas.map((row, idx) => (
                  <tr key={row}>
                    <td>{row}</td>
                    <td><input type="checkbox" checked={form.actividades[`alarmas_${idx}`]?.ap || false} onChange={handleActividad('alarmas', idx, 'ap')} /></td>
                    <td><input type="checkbox" checked={form.actividades[`alarmas_${idx}`]?.r || false} onChange={handleActividad('alarmas', idx, 'r')} /></td>
                    <td><input type="checkbox" checked={form.actividades[`alarmas_${idx}`]?.na || false} onChange={handleActividad('alarmas', idx, 'na')} /></td>
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
            <h4 style={{ fontSize: 14, fontWeight: 600, marginTop: 0, marginBottom: 12, textAlign: 'center', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: 10, borderRadius: 6 }}>CALIBRACIÓN</h4>
            <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }} border="1">
              <thead><tr><th>RESULTADO</th><th>AP</th><th>R</th><th>NA</th></tr></thead>
              <tbody>
                {tablas.calibracion.map((row, idx) => (
                  <tr key={row}>
                    <td>{row}</td>
                    <td><input type="checkbox" checked={form.actividades[`calibracion_${idx}`]?.ap || false} onChange={handleActividad('calibracion', idx, 'ap')} /></td>
                    <td><input type="checkbox" checked={form.actividades[`calibracion_${idx}`]?.r || false} onChange={handleActividad('calibracion', idx, 'r')} /></td>
                    <td><input type="checkbox" checked={form.actividades[`calibracion_${idx}`]?.na || false} onChange={handleActividad('calibracion', idx, 'na')} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
            <input name="patron2" value={form.patron2} onChange={handleInput} style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }} placeholder="Nombre del equipo" />
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
        <button className="submit-btn" onClick={handleSaveForm} style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: '14px 40px', border: 'none', borderRadius: 8, fontSize: 16, fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)', transition: 'all 0.3s ease' }}>guardar formulario</button>
      </div>
    </div>
  );
}

export default Tensiometro;
