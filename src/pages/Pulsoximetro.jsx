import React, { useState } from 'react';
import '../assets/css/monitor.css';

function Pulsoximetro() {
  const [datosGenerales, setDatosGenerales] = useState({ servicio: '', ubicacion: '', nombreEquipo: 'PULSOXIMETRO', marca: '', modelo: '', serie: '', activo: '', fechaMantenimiento: '', lugarMantenimiento: '', tipoMantenimiento: { preventivo: false, correctivo: false, predictivo: false } });
  const [observaciones, setObservaciones] = useState('');
  const [tablas, setTablas] = useState({
    fisicaInstalacion: [{ item: 'Condiciones', resultado: '' }, { item: 'Limpieza', resultado: '' }, { item: 'Estado carcasa', resultado: '' }, { item: 'Cubiertas', resultado: '' }, { item: 'Accesorios', resultado: '' }, { item: 'Etiquetas', resultado: '' }, { item: 'Sensores', resultado: '' }, { item: 'Cables', resultado: '' }, { item: 'Conexiones', resultado: '' }, { item: 'Pantalla', resultado: '' }, { item: 'Entrada', resultado: '' }],
    fuentePoder: [{ item: 'Cable poder', resultado: '' }, { item: 'Receptáculo', resultado: '' }, { item: 'Fusibles', resultado: '' }, { item: 'Baterías', resultado: '' }, { item: 'Conectores', resultado: '' }, { item: 'Cargador', resultado: '' }, { item: 'Interior', resultado: '' }, { item: 'Tierra', resultado: '' }],
    interfazUsuario: [{ item: 'Display', resultado: '' }, { item: 'Pantalla', resultado: '' }, { item: 'Botones', resultado: '' }, { item: 'Indicadores LED', resultado: '' }, { item: 'Indicadores alarma', resultado: '' }, { item: 'Botones', resultado: '' }, { item: 'Conectores', resultado: '' }, { item: 'General', resultado: '' }],
    sistemaControl: [{ item: 'Tarjetas', resultado: '' }, { item: 'Componentes', resultado: '' }, { item: 'Soldaduras', resultado: '' }, { item: 'Fusibles', resultado: '' }, { item: 'Capacitores', resultado: '' }, { item: 'Transistores', resultado: '' }, { item: 'Reguladores', resultado: '' }, { item: 'Circuitos', resultado: '' }],
    pruebasDesempeno: [{ item: 'Lectura saturación', resultado: '' }, { item: 'Lectura pulso', resultado: '' }, { item: 'Exactitud', resultado: '' }, { item: 'Respuesta rápida', resultado: '' }, { item: 'Alarmas', resultado: '' }, { item: 'Software', resultado: '' }, { item: 'Hardware', resultado: '' }, { item: 'General', resultado: '' }]
  });
  const [firmas, setFirmas] = useState({ equipo1: { nombre: '', serial: '', certificado: '' }, equipo2: { nombre: '', serial: '', certificado: '' } });
  const [informeActividades, setInformeActividades] = useState('');

  const handleInputChange = (section, field, value) => { if (section === 'firmas') setFirmas(prev => ({ ...prev, [field]: value })); else setDatosGenerales(prev => ({ ...prev, [field]: value })); };
  const handleRadioChange = (table, index, value) => { setTablas(prev => ({ ...prev, [table]: prev[table].map((row, i) => i === index ? { ...row, resultado: value } : row) })); };
  const handleSubmit = () => console.log('Datos:', { datosGenerales, observaciones, tablas, firmas, informeActividades });

  return (
    <div className="formato">
      <header><div className="titulo"><h1>PULSOXIMETRO - MANTENIMIENTO</h1></div><div className="info-cabecera"><p>Versión: 1.0</p><p>Fecha: {new Date().toLocaleDateString()}</p></div></header>
      <section className="datos-generales"><h3>DATOS GENERALES</h3><div className="fila"><p><strong>Servicio:</strong> <input type="text" value={datosGenerales.servicio} onChange={(e) => handleInputChange('datosGenerales', 'servicio', e.target.value)} /></p><p><strong>Ubicación:</strong> <input type="text" value={datosGenerales.ubicacion} onChange={(e) => handleInputChange('datosGenerales', 'ubicacion', e.target.value)} /></p></div><div className="tipo-mantenimiento"><label><input type="checkbox" checked={datosGenerales.tipoMantenimiento.preventivo} onChange={(e) => setDatosGenerales(prev => ({ ...prev, tipoMantenimiento: { ...prev.tipoMantenimiento, preventivo: e.target.checked } }))} /> Preventivo</label><label><input type="checkbox" checked={datosGenerales.tipoMantenimiento.correctivo} onChange={(e) => setDatosGenerales(prev => ({ ...prev, tipoMantenimiento: { ...prev.tipoMantenimiento, correctivo: e.target.checked } }))} /> Correctivo</label></div></section>
      <section className="observaciones"><h3>OBSERVACIONES</h3><textarea value={observaciones} onChange={(e) => setObservaciones(e.target.value)}></textarea></section>
      <section className="tablas"><h3>INSPECCIÓN FÍSICA</h3><table><thead><tr><th>Item</th><th>AP</th><th>R</th><th>NA</th></tr></thead><tbody>{tablas.fisicaInstalacion.map((row, index) => (<tr key={index}><td>{row.item}</td><td><input type="radio" checked={row.resultado === 'AP'} onChange={() => handleRadioChange('fisicaInstalacion', index, 'AP')} /></td><td><input type="radio" checked={row.resultado === 'R'} onChange={() => handleRadioChange('fisicaInstalacion', index, 'R')} /></td><td><input type="radio" checked={row.resultado === 'NA'} onChange={() => handleRadioChange('fisicaInstalacion', index, 'NA')} /></td></tr>))}</tbody></table><h3>FUENTE PODER</h3><table><thead><tr><th>Item</th><th>AP</th><th>R</th><th>NA</th></tr></thead><tbody>{tablas.fuentePoder.map((row, index) => (<tr key={index}><td>{row.item}</td><td><input type="radio" checked={row.resultado === 'AP'} onChange={() => handleRadioChange('fuentePoder', index, 'AP')} /></td><td><input type="radio" checked={row.resultado === 'R'} onChange={() => handleRadioChange('fuentePoder', index, 'R')} /></td><td><input type="radio" checked={row.resultado === 'NA'} onChange={() => handleRadioChange('fuentePoder', index, 'NA')} /></td></tr>))}</tbody></table><h3>PRUEBAS</h3><table><thead><tr><th>Item</th><th>AP</th><th>R</th><th>NA</th></tr></thead><tbody>{tablas.pruebasDesempeno.map((row, index) => (<tr key={index}><td>{row.item}</td><td><input type="radio" checked={row.resultado === 'AP'} onChange={() => handleRadioChange('pruebasDesempeno', index, 'AP')} /></td><td><input type="radio" checked={row.resultado === 'R'} onChange={() => handleRadioChange('pruebasDesempeno', index, 'R')} /></td><td><input type="radio" checked={row.resultado === 'NA'} onChange={() => handleRadioChange('pruebasDesempeno', index, 'NA')} /></td></tr>))}</tbody></table></section>
      <footer><h3>INFORME</h3><textarea value={informeActividades} onChange={(e) => setInformeActividades(e.target.value)}></textarea></footer>
      <button className="submit-btn" onClick={handleSubmit}>Enviar</button>
    </div>
  );
}

export default Pulsoximetro;
