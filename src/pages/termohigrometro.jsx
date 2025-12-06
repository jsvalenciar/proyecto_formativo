import React, { useRef, useState } from 'react';
import { exportElementToPdf } from '../utils/pdf';
import '../assets/css/Home.css';

function Termohigrometro() {
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
      'Condiciones ambientales', 'Orden y Limpieza', 'Estado físico de la carcasa', 'Cubiertas accesibles',
      'Etiquetas de calibración vigentes', 'Estabilidad del equipo', 'Soportes o montajes seguros'
    ],
    fuente: [
      'Verificación de cable de poder', 'Verificación del receptáculo', 'Verificación de fusibles', 'Verificación de conectores',
      'Verificación carga de baterías', 'Autonomía de la batería', 'Voltajes de entrada', 'Indicador de batería baja',
      'Conexión a sistema de puesta a tierra'
    ],
    sensor_temperatura: [
      'Inspección del sensor de temperatura', 'Limpieza del sensor', 'Ausencia de daños físicos en el sensor',
      'Calibración del sensor de temperatura', 'Tiempo de respuesta del sensor', 'Estabilidad de lectura (deriva)',
      'Verificación con termómetro patrón', 'Exactitud ±0.5°C o según especificaciones', 'Rango de medición adecuado'
    ],
    sensor_humedad: [
      'Inspección del sensor de humedad', 'Ausencia de contaminación', 'Calibración del sensor de humedad',
      'Tiempo de respuesta del sensor', 'Estabilidad de lectura', 'Exactitud ±3% HR', 'Rango de medición 0-100% HR'
    ],
    interfaz: [
      'Revisión de display (legibilidad)', 'Revisión de retroiluminación', 'Revisión de botones de control',
      'Revisión de alarmas audibles y visuales', 'Revisión de menú de configuración', 'Unidades de medición correctas (°C, % HR)',
      'Función de registro de datos', 'Interfaz de comunicación (USB, Bluetooth, etc.)', 'Exportación de datos'
    ],
    software: [
      'Verificación de firmware actualizado', 'Configuración de límites de alarma', 'Función de registro continuo (datalogger)',
      'Configuración de intervalos de muestreo', 'Sincronización de fecha y hora', 'Memoria de almacenamiento disponible',
      'Descarga de datos históricos', 'Software de análisis compatible', 'Reportes automáticos'
    ],
    calibracion: [
      'Calibración con patrones certificados', 'Verificación de temperatura y humedad', 'Certificado de calibración vigente',
      'Trazabilidad metrológica', 'Etiqueta de próxima calibración'
    ],
    adicionales: [
      'Limpieza externa del equipo', 'Limpieza de sensores con método apropiado', 'Inspección de signos de corrosión',
      'Verificación de montaje o ubicación adecuada', 'Revisión de ciclo de vida de sensores', 'Reemplazo de sensores si aplica',
      'Verificación de condiciones de almacenamiento', 'Inspección de componentes con sobrecalentamiento'
    ],
    desempeno: [
      'Verificación de exactitud de temperatura', 'Verificación de exactitud de humedad', 'Tiempo de estabilización',
      'Repetibilidad de mediciones', 'Reproducibilidad entre mediciones', 'Verificación de histéresis',
      'Prueba de funcionamiento en condiciones extremas', 'Verificación de alarmas', 'Registro de resultados de pruebas'
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
    const input = formRef.current;
    if (!input) return;
    await exportElementToPdf(input, 'reporte-termohigrometro.pdf');
  };

  const handleSaveForm = () => {
    localStorage.setItem('termohigrometro_form', JSON.stringify(form));
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
            <h4 style={{ fontSize: 14, fontWeight: 600, marginTop: 0, marginBottom: 12, textAlign: 'center', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: 10, borderRadius: 6 }}>VERIFICACIÓN DEL SENSOR DE TEMPERATURA</h4>
            <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }} border="1">
              <thead><tr><th>Resultado</th><th>AP</th><th>R</th><th>NA</th></tr></thead>
              <tbody>
                {tablas.sensor_temperatura.map((row, idx) => (
                  <tr key={row}>
                    <td>{row}</td>
                    <td><input type="checkbox" checked={form.actividades[`sensor_temperatura_${idx}`]?.ap || false} onChange={handleActividad('sensor_temperatura', idx, 'ap')} /></td>
                    <td><input type="checkbox" checked={form.actividades[`sensor_temperatura_${idx}`]?.r || false} onChange={handleActividad('sensor_temperatura', idx, 'r')} /></td>
                    <td><input type="checkbox" checked={form.actividades[`sensor_temperatura_${idx}`]?.na || false} onChange={handleActividad('sensor_temperatura', idx, 'na')} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ flex: 1, minWidth: 320, background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e0e6ed' }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, marginTop: 0, marginBottom: 12, textAlign: 'center', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: 10, borderRadius: 6 }}>VERIFICACIÓN DEL SENSOR DE HUMEDAD</h4>
            <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }} border="1">
              <thead><tr><th>Resultado</th><th>AP</th><th>R</th><th>NA</th></tr></thead>
              <tbody>
                {tablas.sensor_humedad.map((row, idx) => (
                  <tr key={row}>
                    <td>{row}</td>
                    <td><input type="checkbox" checked={form.actividades[`sensor_humedad_${idx}`]?.ap || false} onChange={handleActividad('sensor_humedad', idx, 'ap')} /></td>
                    <td><input type="checkbox" checked={form.actividades[`sensor_humedad_${idx}`]?.r || false} onChange={handleActividad('sensor_humedad', idx, 'r')} /></td>
                    <td><input type="checkbox" checked={form.actividades[`sensor_humedad_${idx}`]?.na || false} onChange={handleActividad('sensor_humedad', idx, 'na')} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginTop: 20 }}>
          <div style={{ flex: 1, minWidth: 320, background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e0e6ed' }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, marginTop: 0, marginBottom: 12, textAlign: 'center', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: 10, borderRadius: 6 }}>VERIFICACIÓN DE SOFTWARE</h4>
            <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }} border="1">
              <thead><tr><th>RESULTADO</th><th>AP</th><th>R</th><th>NA</th></tr></thead>
              <tbody>
                {tablas.software.map((row, idx) => (
                  <tr key={row}>
                    <td>{row}</td>
                    <td><input type="checkbox" checked={form.actividades[`software_${idx}`]?.ap || false} onChange={handleActividad('software', idx, 'ap')} /></td>
                    <td><input type="checkbox" checked={form.actividades[`software_${idx}`]?.r || false} onChange={handleActividad('software', idx, 'r')} /></td>
                    <td><input type="checkbox" checked={form.actividades[`software_${idx}`]?.na || false} onChange={handleActividad('software', idx, 'na')} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ flex: 1, minWidth: 320, background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e0e6ed' }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, marginTop: 0, marginBottom: 12, textAlign: 'center', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: 10, borderRadius: 6 }}>CALIBRACIÓN Y AJUSTES</h4>
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
        <button className="submit-btn" onClick={handleSaveForm} style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: '14px 40px', border: 'none', borderRadius: 8, fontSize: 16, fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)', transition: 'all 0.3s ease' }}>guardar formulario</button>
      </div>
    </div>
  );
}

export default Termohigrometro;
