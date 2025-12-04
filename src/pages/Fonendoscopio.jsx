import React, { useRef, useState } from 'react';
import { exportElementToPdf } from '../utils/pdf';
import '../assets/css/Home.css';

function Fonendoscopio() {
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
      'Condiciones ambientales', 'Orden y Limpieza', 'Estado físico general', 'Inspección visual de componentes',
      'Equipo Cuenta con Etiquetas', 'Etiquetado legible', 'Identificación del modelo', 'Registro de uso',
      'Ausencia de daños físicos', 'Estado del estuche/funda'
    ],
    tubuladuras: [
      'Inspección del tubo de goma', 'Flexibilidad del tubo', 'Ausencia de grietas o roturas',
      'Ausencia de fugas de aire', 'Conexión tubo-campana hermética', 'Limpieza del tubo interno'
    ],
    campana: [
      'Integridad del diafragma', 'Sujeción del diafragma', 'Ausencia de grietas en la campana',
      'Aro sin deformaciones', 'Sellado hermético', 'Limpieza de superficies de contacto'
    ],
    olivas: [
      'Estado de las olivas auriculares', 'Ajuste de las olivas al oído', 'Ausencia de deformaciones', 'Limpieza de las olivas',
      'Condición del material (silicona/goma)', 'Cambio de olivas si es necesario', 'Ángulo de las olivas adecuado', 'Comodidad de uso'
    ],
    acustica: [
      'Prueba de transmisión de sonidos cardíacos', 'Prueba de transmisión de sonidos respiratorios', 'Calidad de sonido en campana',
      'Calidad de sonido en diafragma', 'Ausencia de ruidos externos', 'Sensibilidad acústica', 'Claridad de tonos graves y agudos',
      'Comparación con fonendoscopio de referencia', 'Detección de soplos cardíacos'
    ],
    higiene: [
      'Desinfección del diafragma y campana', 'Desinfección de olivas', 'Secado completo después de limpieza',
      'Ausencia de residuos químicos'
    ],
    accesorios: [
      'Estado del estuche de transporte', 'Disponibilidad de olivas de repuesto', 'Disponibilidad de diafragma de repuesto',
      'Etiquetas de identificación', 'Accesorios completos'
    ],
    adicionales: [
      'Limpieza externa del fonendoscopio', 'Inspección de signos de desgaste', 'Revisión de vida útil',
      'Reemplazo de piezas desgastadas', 'Almacenamiento adecuado'
    ],
    desempeno: [
      'Verificación de auscultación cardíaca', 'Verificación de auscultación pulmonar', 'Sensibilidad para sonidos graves',
      'Sensibilidad para sonidos agudos', 'Verificación de sellado acústico', 'Comparación con estándar de calidad'
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
    await exportElementToPdf(input, 'reporte-fonendoscopio.pdf');
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
            <h4 style={{ fontSize: 14, fontWeight: 600, marginTop: 0, marginBottom: 12, textAlign: 'center', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: 10, borderRadius: 6 }}>ACCESORIOS Y REPUESTOS</h4>
            <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }} border="1">
              <thead><tr><th>Resultado</th><th>AP</th><th>R</th><th>NA</th></tr></thead>
              <tbody>
                {tablas.accesorios.map((row, idx) => (
                  <tr key={row}>
                    <td>{row}</td>
                    <td><input type="checkbox" checked={form.actividades[`accesorios_${idx}`]?.ap || false} onChange={handleActividad('accesorios', idx, 'ap')} /></td>
                    <td><input type="checkbox" checked={form.actividades[`accesorios_${idx}`]?.r || false} onChange={handleActividad('accesorios', idx, 'r')} /></td>
                    <td><input type="checkbox" checked={form.actividades[`accesorios_${idx}`]?.na || false} onChange={handleActividad('accesorios', idx, 'na')} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ flex: 1, minWidth: 320, background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e0e6ed' }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, marginTop: 0, marginBottom: 12, textAlign: 'center', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: 10, borderRadius: 6 }}>VERIFICACIÓN DE TUBULADURAS</h4>
            <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }} border="1">
              <thead><tr><th>Resultado</th><th>AP</th><th>R</th><th>NA</th></tr></thead>
              <tbody>
                {tablas.tubuladuras.map((row, idx) => (
                  <tr key={row}>
                    <td>{row}</td>
                    <td><input type="checkbox" checked={form.actividades[`tubuladuras_${idx}`]?.ap || false} onChange={handleActividad('tubuladuras', idx, 'ap')} /></td>
                    <td><input type="checkbox" checked={form.actividades[`tubuladuras_${idx}`]?.r || false} onChange={handleActividad('tubuladuras', idx, 'r')} /></td>
                    <td><input type="checkbox" checked={form.actividades[`tubuladuras_${idx}`]?.na || false} onChange={handleActividad('tubuladuras', idx, 'na')} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginTop: 20 }}>
          <div style={{ flex: 1, minWidth: 320, background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e0e6ed' }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, marginTop: 0, marginBottom: 12, textAlign: 'center', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: 10, borderRadius: 6 }}>VERIFICACIÓN DE CAMPANA Y DIAFRAGMA</h4>
            <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }} border="1">
              <thead><tr><th>Resultado</th><th>AP</th><th>R</th><th>NA</th></tr></thead>
              <tbody>
                {tablas.campana.map((row, idx) => (
                  <tr key={row}>
                    <td>{row}</td>
                    <td><input type="checkbox" checked={form.actividades[`campana_${idx}`]?.ap || false} onChange={handleActividad('campana', idx, 'ap')} /></td>
                    <td><input type="checkbox" checked={form.actividades[`campana_${idx}`]?.r || false} onChange={handleActividad('campana', idx, 'r')} /></td>
                    <td><input type="checkbox" checked={form.actividades[`campana_${idx}`]?.na || false} onChange={handleActividad('campana', idx, 'na')} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ flex: 1, minWidth: 320, background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e0e6ed' }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, marginTop: 0, marginBottom: 12, textAlign: 'center', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: 10, borderRadius: 6 }}>VERIFICACIÓN DE OLIVAS AURICULARES</h4>
            <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }} border="1">
              <thead><tr><th>Resultado</th><th>AP</th><th>R</th><th>NA</th></tr></thead>
              <tbody>
                {tablas.olivas.map((row, idx) => (
                  <tr key={row}>
                    <td>{row}</td>
                    <td><input type="checkbox" checked={form.actividades[`olivas_${idx}`]?.ap || false} onChange={handleActividad('olivas', idx, 'ap')} /></td>
                    <td><input type="checkbox" checked={form.actividades[`olivas_${idx}`]?.r || false} onChange={handleActividad('olivas', idx, 'r')} /></td>
                    <td><input type="checkbox" checked={form.actividades[`olivas_${idx}`]?.na || false} onChange={handleActividad('olivas', idx, 'na')} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginTop: 20 }}>
          <div style={{ flex: 1, minWidth: 320, background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e0e6ed' }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, marginTop: 0, marginBottom: 12, textAlign: 'center', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: 10, borderRadius: 6 }}>PRUEBAS ACÚSTICAS</h4>
            <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }} border="1">
              <thead><tr><th>RESULTADO</th><th>AP</th><th>R</th><th>NA</th></tr></thead>
              <tbody>
                {tablas.acustica.map((row, idx) => (
                  <tr key={row}>
                    <td>{row}</td>
                    <td><input type="checkbox" checked={form.actividades[`acustica_${idx}`]?.ap || false} onChange={handleActividad('acustica', idx, 'ap')} /></td>
                    <td><input type="checkbox" checked={form.actividades[`acustica_${idx}`]?.r || false} onChange={handleActividad('acustica', idx, 'r')} /></td>
                    <td><input type="checkbox" checked={form.actividades[`acustica_${idx}`]?.na || false} onChange={handleActividad('acustica', idx, 'na')} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ flex: 1, minWidth: 320, background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e0e6ed' }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, marginTop: 0, marginBottom: 12, textAlign: 'center', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: 10, borderRadius: 6 }}>HIGIENE Y DESINFECCIÓN</h4>
            <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }} border="1">
              <thead><tr><th>RESULTADO</th><th>AP</th><th>R</th><th>NA</th></tr></thead>
              <tbody>
                {tablas.higiene.map((row, idx) => (
                  <tr key={row}>
                    <td>{row}</td>
                    <td><input type="checkbox" checked={form.actividades[`higiene_${idx}`]?.ap || false} onChange={handleActividad('higiene', idx, 'ap')} /></td>
                    <td><input type="checkbox" checked={form.actividades[`higiene_${idx}`]?.r || false} onChange={handleActividad('higiene', idx, 'r')} /></td>
                    <td><input type="checkbox" checked={form.actividades[`higiene_${idx}`]?.na || false} onChange={handleActividad('higiene', idx, 'na')} /></td>
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
      <div style={{ textAlign: 'center', marginTop: 30, marginBottom: 10 }}>
        <button className="submit-btn" onClick={handleExportPDF} style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: '14px 40px', border: 'none', borderRadius: 8, fontSize: 16, fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)', transition: 'all 0.3s ease' }}>Generar PDF del Reporte</button>
      </div>
    </div>
  );
}

export default Fonendoscopio;
