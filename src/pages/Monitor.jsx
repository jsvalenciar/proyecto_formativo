


import React, { useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
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
      'Revisión de engranajes', 'Ajuste de tuercas y tornillos', 'Inspecciones de Piñones', 'Movilidad de ruedas', 'Revisión de frenos', 'Otro'
    ],
    hidraulico: [''],
    control: [
      'Revisión de tarjeta de control', 'Revisión de sensores', 'Sistema de seguridad', 'Verificación de actuadores', 'Otro'
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
    // Forzar fondo blanco y texto oscuro antes de capturar
    const prevBg = input.style.background;
    const prevColor = input.style.color;
    input.style.background = '#fff';
    input.style.color = '#222';
    // Aumentar la escala para mejor calidad
    const canvas = await html2canvas(input, {
      scale: 3,
      backgroundColor: '#fff',
      useCORS: true
    });
    input.style.background = prevBg;
    input.style.color = prevColor;
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pageWidth;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('reporte-monitor-signos-vitales.pdf');
  };

  return (
    <div className="formato" ref={formRef} style={{ background: '#fff', color: '#222', padding: 24, borderRadius: 16, maxWidth: 1200, margin: '30px auto', boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #e0e6ed', paddingBottom: 10, marginBottom: 15 }}>
        <div className="titulo">
          <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>REPORTE TÉCNICO DE MANTENIMIENTO EQUIPOS BIOMÉDICOS</h1>
        </div>
        <div className="info-cabecera" style={{ textAlign: 'right', fontSize: 13, color: '#7f8c8d' }}>
          <div>CÓDIGO: <input name="codigo" value={form.codigo} onChange={handleInput} style={{ width: 90 }} /></div>
          <div>VERSIÓN: <input name="version" value={form.version} onChange={handleInput} style={{ width: 40 }} /></div>
          <div>FECHA: <input name="fecha" value={form.fecha} onChange={handleInput} style={{ width: 90 }} type="date" /></div>
        </div>
      </header>
      <section style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 8 }}>
        <div style={{ flex: 1, minWidth: 220 }}>
          <div><b>SERVICIO:</b> <input name="servicio" value={form.servicio} onChange={handleInput} style={{ width: 150 }} /></div>
          <div><b>NOMBRE DEL EQUIPO:</b> <input name="nombreEquipo" value={form.nombreEquipo} onChange={handleInput} style={{ width: 180 }} /></div>
          <div><b>MARCA:</b> <input name="marca" value={form.marca} onChange={handleInput} style={{ width: 100 }} /></div>
          <div><b>SERIE:</b> <input name="serie" value={form.serie} onChange={handleInput} style={{ width: 100 }} /></div>
        </div>
        <div style={{ flex: 1, minWidth: 220 }}>
          <div><b>UBICACIÓN:</b> <input name="ubicacion" value={form.ubicacion} onChange={handleInput} style={{ width: 100 }} /></div>
          <div><b>MODELO:</b> <input name="modelo" value={form.modelo} onChange={handleInput} style={{ width: 100 }} /></div>
          <div><b>ACTIVO:</b> <input name="activo" value={form.activo} onChange={handleInput} style={{ width: 100 }} /></div>
        </div>
        <div style={{ flex: 1, minWidth: 220 }}>
          <div><b>Fecha del mantenimiento:</b> <input name="fechaMantenimiento" value={form.fechaMantenimiento} onChange={handleInput} style={{ width: 120 }} type="date" /></div>
          <div><b>Lugar del Mantenimiento:</b> <input name="lugarMantenimiento" value={form.lugarMantenimiento} onChange={handleInput} style={{ width: 150 }} /></div>
        </div>
      </section>
      <section style={{ marginBottom: 8 }}>
        <b>TIPO DE MANTENIMIENTO</b>
        <div style={{ display: 'flex', gap: 16, marginTop: 4 }}>
          <label><input type="checkbox" name="preventivo" checked={form.tipo.preventivo} onChange={handleTipo} /> MTTO PREVENTIVO</label>
          <label><input type="checkbox" name="correctivo" checked={form.tipo.correctivo} onChange={handleTipo} /> MTTO CORRECTIVO</label>
          <label><input type="checkbox" name="predictivo" checked={form.tipo.predictivo} onChange={handleTipo} /> MTTO PREDICTIVO</label>
        </div>
      </section>
      <section style={{ marginBottom: 8 }}>
        <b>INFORME DEL USUARIO, OBSERVACIONES DEL EQUIPO Y ERRORES PERSISTENTE</b>
        <div style={{ border: '1px solid #ccc', borderRadius: 8, minHeight: 32, marginTop: 4, padding: 6 }}>
          <textarea name="informeUsuario" value={form.informeUsuario} onChange={handleInput} style={{ width: '100%', minHeight: 32, border: 'none', resize: 'vertical' }} placeholder="Observaciones..." />
        </div>
      </section>
      {/* ACTIVIDADES DE MANTENIMIENTO */}
      <section style={{ marginBottom: 8 }}>
        <b>ACTIVIDADES DE MANTENIMIENTO</b>
        {/* Renderizar cada tabla de actividades como inputs y checkboxes */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {/* VERIFICACIÓN FÍSICA - INSTALACIÓN */}
          <div style={{ flex: 1, minWidth: 320 }}>
            <b>VERIFICACIÓN FÍSICA - INSTALACIÓN</b>
            <table style={{ width: '100%', fontSize: 12, marginTop: 4 }} border="1">
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
          <div style={{ flex: 1, minWidth: 320 }}>
            <b>VERIFICACIÓN DE FUENTE DE PODER</b>
            <table style={{ width: '100%', fontSize: 12, marginTop: 4 }} border="1">
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
          <div style={{ flex: 1, minWidth: 320 }}>
            <b>VERIFICACIÓN DE INTERFAZ DE USUARIO</b>
            <table style={{ width: '100%', fontSize: 12, marginTop: 4 }} border="1">
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
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 12 }}>
          <div style={{ flex: 1, minWidth: 320 }}>
            <b>VERIFICACIÓN DE SISTEMA MECÁNICO</b>
            <table style={{ width: '100%', fontSize: 12, marginTop: 4 }} border="1">
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
          <div style={{ flex: 1, minWidth: 320 }}>
            <b>VERIFICACIÓN DE SISTEMA HIDRÁULICO</b>
            <table style={{ width: '100%', fontSize: 12, marginTop: 4 }} border="1">
              <thead><tr><th>Resultado</th><th>AP</th><th>R</th><th>NA</th></tr></thead>
              <tbody>
                {tablas.hidraulico.map((row, idx) => (
                  <tr key={row}>
                    <td><input value={row} onChange={() => {}} style={{ width: '100%' }} disabled /></td>
                    <td><input type="checkbox" checked={form.actividades[`hidraulico_${idx}`]?.ap || false} onChange={handleActividad('hidraulico', idx, 'ap')} /></td>
                    <td><input type="checkbox" checked={form.actividades[`hidraulico_${idx}`]?.r || false} onChange={handleActividad('hidraulico', idx, 'r')} /></td>
                    <td><input type="checkbox" checked={form.actividades[`hidraulico_${idx}`]?.na || false} onChange={handleActividad('hidraulico', idx, 'na')} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 12 }}>
          <div style={{ flex: 1, minWidth: 320 }}>
            <b>VERIFICACIÓN SISTEMA DE CONTROL</b>
            <table style={{ width: '100%', fontSize: 12, marginTop: 4 }} border="1">
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
          <div style={{ flex: 1, minWidth: 320 }}>
            <b>VERIFICACIÓN NEUMÁTICO</b>
            <table style={{ width: '100%', fontSize: 12, marginTop: 4 }} border="1">
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
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 12 }}>
          <div style={{ flex: 1, minWidth: 320 }}>
            <b>TAREAS ADICIONALES</b>
            <table style={{ width: '100%', fontSize: 12, marginTop: 4 }} border="1">
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
          <div style={{ flex: 1, minWidth: 320 }}>
            <b>PRUEBAS DE DESEMPEÑO</b>
            <table style={{ width: '100%', fontSize: 12, marginTop: 4 }} border="1">
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
      <section style={{ marginTop: 16 }}>
        <b>INFORME DE ACTIVIDADES EFECTUADAS</b>
        <div style={{ border: '1px solid #ccc', borderRadius: 8, minHeight: 32, marginTop: 4, padding: 6 }}>
          <textarea name="informeActividades" value={form.informeActividades} onChange={handleInput} style={{ width: '100%', minHeight: 32, border: 'none', resize: 'vertical' }} placeholder="Describa las actividades efectuadas..." />
        </div>
      </section>
      <section style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ flex: 1, minWidth: 320 }}>
          <b>Equipo patrón utilizado 1</b>: <input name="patron1" value={form.patron1} onChange={handleInput} style={{ width: 100 }} /> &nbsp; <b>Certificado</b>: <input name="certificado1" value={form.certificado1} onChange={handleInput} style={{ width: 100 }} />
        </div>
        <div style={{ flex: 1, minWidth: 320 }}>
          <b>Equipo patrón utilizado 2</b>: <input name="patron2" value={form.patron2} onChange={handleInput} style={{ width: 100 }} /> &nbsp; <b>Certificado</b>: <input name="certificado2" value={form.certificado2} onChange={handleInput} style={{ width: 100 }} />
        </div>
      </section>
      <section style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ flex: 1, minWidth: 320 }}>
          <b>Mantenimiento realizado por:</b><br />
          Nombre: <input name="realizadoPor" value={form.realizadoPor} onChange={handleInput} style={{ width: 180 }} /><br />
          Cargo: <input name="cargoRealizado" value={form.cargoRealizado} onChange={handleInput} style={{ width: 180 }} />
        </div>
        <div style={{ flex: 1, minWidth: 320 }}>
          <b>Recibido a satisfacción por:</b><br />
          Nombre: <input name="recibidoPor" value={form.recibidoPor} onChange={handleInput} style={{ width: 180 }} /><br />
          Cargo: <input name="cargoRecibido" value={form.cargoRecibido} onChange={handleInput} style={{ width: 180 }} /><br />
          Firma: <input name="firmaRecibido" value={form.firmaRecibido} onChange={handleInput} style={{ width: 180 }} />
        </div>
      </section>
      <div style={{ textAlign: 'right', margin: '20px 0' }}>
        <button className="submit-btn" onClick={handleExportPDF}>Generar PDF</button>
      </div>
    </div>
  );
}

export default Monitor;
