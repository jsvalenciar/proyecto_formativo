
import React, { useState } from 'react';
import '../assets/css/monitor.css';

function Monitor() {
  const [datosGenerales, setDatosGenerales] = useState({
    servicio: 'TRASLADO ASISTENCIAL',
    ubicacion: 'MOVIL 34',
    nombreEquipo: 'MONITOR DE SIGNOS VITALES',
    marca: 'MINDRAY',
    modelo: 'IMEC8',
    serie: 'N/R',
    activo: 'MT034',
    fechaMantenimiento: '21/06/2018',
    lugarMantenimiento: 'TALLER DE BIOMÉDICA',
    tipoMantenimiento: { preventivo: false, correctivo: false, predictivo: false }
  });

  const [observaciones, setObservaciones] = useState('');

  const [tablas, setTablas] = useState({
    fisicaInstalacion: [
      { item: 'Condiciones ambientales', resultado: '' },
      { item: 'Orden y Limpieza', resultado: '' },
      { item: 'Estado físico de la carcasa', resultado: '' },
      { item: 'Cubiertas accesibles al usuario', resultado: '' },
      { item: 'Estado físico de los accesorios', resultado: '' },
      { item: 'Equipo Cotejado con Etiquetas', resultado: '' },
      { item: 'Guía de manejo', resultado: '' },
      { item: 'Estado nivel de agua', resultado: '' },
      { item: 'Frenos - bloqueo de ruedas', resultado: '' },
      { item: 'Conexiones de cables', resultado: '' },
      { item: 'Fuentes de entrada (Voltaje, Gases, etc.)', resultado: '' }
    ],
    fuentePoder: [
      { item: 'Verificación de cable de poder', resultado: '' },
      { item: 'Verificación del receptáculo', resultado: '' },
      { item: 'Verificación de fusibles', resultado: '' },
      { item: 'Verificación de baterías', resultado: '' },
      { item: 'Verificación de conectores', resultado: '' },
      { item: 'Verificación de cargador', resultado: '' },
      { item: 'Estado físico del interior', resultado: '' },
      { item: 'Sistema de puesta a tierra', resultado: '' }
    ],
    interfazUsuario: [
      { item: 'Revisión de display (brillo y índice)', resultado: '' },
      { item: 'Revisión pantalla táctil', resultado: '' },
      { item: 'Revisión de perillas y pulsadores', resultado: '' },
      { item: 'Revisión del teclado', resultado: '' },
      { item: 'Revisión sistema de impresión', resultado: '' },
      { item: 'Revisión franja deslizable/desbloqueo', resultado: '' },
      { item: 'Estado de piezas', resultado: '' },
      { item: 'Revisión indicadores luminosos', resultado: '' }
    ],
    sistemaControl: [
      { item: 'Revisión de tarjetas de control', resultado: '' },
      { item: 'Revisión de tarjetas de control', resultado: '' },
      { item: 'Revisión de tarjetas de control', resultado: '' },
      { item: 'Revisión de tarjetas de control', resultado: '' },
      { item: 'Revisión de tarjetas de control', resultado: '' },
      { item: 'Revisión de tarjetas de control', resultado: '' },
      { item: 'Revisión de tarjetas de control', resultado: '' },
      { item: 'Revisión de tarjetas de control', resultado: '' }
    ],
    pruebasDesempeno: [
      { item: 'Verificación de alarmas', resultado: '' },
      { item: 'Verificación de parámetros', resultado: '' },
      { item: 'Verificación de calibración', resultado: '' },
      { item: 'Verificación de sensores', resultado: '' },
      { item: 'Verificación de conectividad', resultado: '' },
      { item: 'Verificación de software', resultado: '' },
      { item: 'Verificación de hardware', resultado: '' },
      { item: 'Verificación de batería', resultado: '' }
    ]
  });

  const [firmas, setFirmas] = useState({
    equipo1: { nombre: '', serial: '', certificado: '' },
    equipo2: { nombre: '', serial: '', certificado: '' }
  });

  const [informeActividades, setInformeActividades] = useState('');

  const handleInputChange = (section, field, value) => {
    if (section === 'firmas') {
      setFirmas(prev => ({ ...prev, [field]: value }));
    } else {
      setDatosGenerales(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleRadioChange = (table, index, value) => {
    setTablas(prev => ({
      ...prev,
      [table]: prev[table].map((row, i) => i === index ? { ...row, resultado: value } : row)
    }));
  };

  const handleSubmit = () => {
    console.log('Datos enviados:', { datosGenerales, observaciones, tablas, firmas, informeActividades });
  };

  return (
    <div className="formato">
      <header>
        <div className="titulo">
          <h1>FORMATO DE MANTENIMIENTO</h1>
        </div>
        <div className="info-cabecera">
          <p>Versión: 1.0</p>
          <p>Fecha: {new Date().toLocaleDateString()}</p>
        </div>
      </header>

      <section className="datos-generales">
        <h3>DATOS GENERALES</h3>
        <div className="fila">
          <p><strong>Servicio:</strong> <input type="text" value={datosGenerales.servicio} onChange={(e) => handleInputChange('datosGenerales', 'servicio', e.target.value)} /></p>
          <p><strong>Ubicación:</strong> <input type="text" value={datosGenerales.ubicacion} onChange={(e) => handleInputChange('datosGenerales', 'ubicacion', e.target.value)} /></p>
        </div>
        <div className="fila">
          <p><strong>Nombre del Equipo:</strong> <input type="text" value={datosGenerales.nombreEquipo} onChange={(e) => handleInputChange('datosGenerales', 'nombreEquipo', e.target.value)} /></p>
          <p><strong>Marca:</strong> <input type="text" value={datosGenerales.marca} onChange={(e) => handleInputChange('datosGenerales', 'marca', e.target.value)} /></p>
        </div>
        <div className="fila">
          <p><strong>Modelo:</strong> <input type="text" value={datosGenerales.modelo} onChange={(e) => handleInputChange('datosGenerales', 'modelo', e.target.value)} /></p>
          <p><strong>Serie:</strong> <input type="text" value={datosGenerales.serie} onChange={(e) => handleInputChange('datosGenerales', 'serie', e.target.value)} /></p>
        </div>
        <div className="fila">
          <p><strong>Activo:</strong> <input type="text" value={datosGenerales.activo} onChange={(e) => handleInputChange('datosGenerales', 'activo', e.target.value)} /></p>
          <p><strong>Fecha de Mantenimiento:</strong> <input type="text" value={datosGenerales.fechaMantenimiento} onChange={(e) => handleInputChange('datosGenerales', 'fechaMantenimiento', e.target.value)} /></p>
        </div>
        <div className="fila">
          <p><strong>Lugar de Mantenimiento:</strong> <input type="text" value={datosGenerales.lugarMantenimiento} onChange={(e) => handleInputChange('datosGenerales', 'lugarMantenimiento', e.target.value)} /></p>
        </div>
        <div className="tipo-mantenimiento">
          <label><input type="checkbox" checked={datosGenerales.tipoMantenimiento.preventivo} onChange={(e) => setDatosGenerales(prev => ({ ...prev, tipoMantenimiento: { ...prev.tipoMantenimiento, preventivo: e.target.checked } }))} /> Preventivo</label>
          <label><input type="checkbox" checked={datosGenerales.tipoMantenimiento.correctivo} onChange={(e) => setDatosGenerales(prev => ({ ...prev, tipoMantenimiento: { ...prev.tipoMantenimiento, correctivo: e.target.checked } }))} /> Correctivo</label>
          <label><input type="checkbox" checked={datosGenerales.tipoMantenimiento.predictivo} onChange={(e) => setDatosGenerales(prev => ({ ...prev, tipoMantenimiento: { ...prev.tipoMantenimiento, predictivo: e.target.checked } }))} /> Predictivo</label>
        </div>
      </section>

      <section className="observaciones">
        <h3>OBSERVACIONES</h3>
        <textarea value={observaciones} onChange={(e) => setObservaciones(e.target.value)}></textarea>
      </section>

      <section className="tablas">
        <h3>INSPECCIÓN FÍSICA E INSTALACIÓN</h3>
        <table>
          <thead>
            <tr><th>Item</th><th>AP</th><th>R</th><th>NA</th></tr>
          </thead>
          <tbody>
            {tablas.fisicaInstalacion.map((row, index) => (
              <tr key={index}>
                <td>{row.item}</td>
                <td><input type="radio" name={`fisica-${index}`} value="AP" checked={row.resultado === 'AP'} onChange={() => handleRadioChange('fisicaInstalacion', index, 'AP')} /></td>
                <td><input type="radio" name={`fisica-${index}`} value="R" checked={row.resultado === 'R'} onChange={() => handleRadioChange('fisicaInstalacion', index, 'R')} /></td>
                <td><input type="radio" name={`fisica-${index}`} value="NA" checked={row.resultado === 'NA'} onChange={() => handleRadioChange('fisicaInstalacion', index, 'NA')} /></td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>FUENTE DE PODER</h3>
        <table>
          <thead>
            <tr><th>Item</th><th>AP</th><th>R</th><th>NA</th></tr>
          </thead>
          <tbody>
            {tablas.fuentePoder.map((row, index) => (
              <tr key={index}>
                <td>{row.item}</td>
                <td><input type="radio" name={`poder-${index}`} value="AP" checked={row.resultado === 'AP'} onChange={() => handleRadioChange('fuentePoder', index, 'AP')} /></td>
                <td><input type="radio" name={`poder-${index}`} value="R" checked={row.resultado === 'R'} onChange={() => handleRadioChange('fuentePoder', index, 'R')} /></td>
                <td><input type="radio" name={`poder-${index}`} value="NA" checked={row.resultado === 'NA'} onChange={() => handleRadioChange('fuentePoder', index, 'NA')} /></td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>INTERFAZ DE USUARIO</h3>
        <table>
          <thead>
            <tr><th>Item</th><th>AP</th><th>R</th><th>NA</th></tr>
          </thead>
          <tbody>
            {tablas.interfazUsuario.map((row, index) => (
              <tr key={index}>
                <td>{row.item}</td>
                <td><input type="radio" name={`usuario-${index}`} value="AP" checked={row.resultado === 'AP'} onChange={() => handleRadioChange('interfazUsuario', index, 'AP')} /></td>
                <td><input type="radio" name={`usuario-${index}`} value="R" checked={row.resultado === 'R'} onChange={() => handleRadioChange('interfazUsuario', index, 'R')} /></td>
                <td><input type="radio" name={`usuario-${index}`} value="NA" checked={row.resultado === 'NA'} onChange={() => handleRadioChange('interfazUsuario', index, 'NA')} /></td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>SISTEMA DE CONTROL</h3>
        <table>
          <thead>
            <tr><th>Item</th><th>AP</th><th>R</th><th>NA</th></tr>
          </thead>
          <tbody>
            {tablas.sistemaControl.map((row, index) => (
              <tr key={index}>
                <td>{row.item}</td>
                <td><input type="radio" name={`control-${index}`} value="AP" checked={row.resultado === 'AP'} onChange={() => handleRadioChange('sistemaControl', index, 'AP')} /></td>
                <td><input type="radio" name={`control-${index}`} value="R" checked={row.resultado === 'R'} onChange={() => handleRadioChange('sistemaControl', index, 'R')} /></td>
                <td><input type="radio" name={`control-${index}`} value="NA" checked={row.resultado === 'NA'} onChange={() => handleRadioChange('sistemaControl', index, 'NA')} /></td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>PRUEBAS DE DESEMPEÑO</h3>
        <table>
          <thead>
            <tr><th>Resultado</th><th>AP</th><th>R</th><th>NA</th></tr>
          </thead>
          <tbody>
            {tablas.pruebasDesempeno.map((row, index) => (
              <tr key={index}>
                <td>{row.item}</td>
                <td><input type="radio" name={`desempeno-${index}`} value="AP" checked={row.resultado === 'AP'} onChange={() => handleRadioChange('pruebasDesempeno', index, 'AP')} /></td>
                <td><input type="radio" name={`desempeno-${index}`} value="R" checked={row.resultado === 'R'} onChange={() => handleRadioChange('pruebasDesempeno', index, 'R')} /></td>
                <td><input type="radio" name={`desempeno-${index}`} value="NA" checked={row.resultado === 'NA'} onChange={() => handleRadioChange('pruebasDesempeno', index, 'NA')} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="firmas">
        <h3>FIRMAS</h3>
        <p>Equipo patrón utilizado 1: <input type="text" value={firmas.equipo1.nombre} onChange={(e) => handleInputChange('firmas', 'equipo1', { ...firmas.equipo1, nombre: e.target.value })} /> &nbsp; Serial: <input type="text" value={firmas.equipo1.serial} onChange={(e) => handleInputChange('firmas', 'equipo1', { ...firmas.equipo1, serial: e.target.value })} /> &nbsp; Certificado: <input type="text" value={firmas.equipo1.certificado} onChange={(e) => handleInputChange('firmas', 'equipo1', { ...firmas.equipo1, certificado: e.target.value })} /></p>
        <p>Equipo patrón utilizado 2: <input type="text" value={firmas.equipo2.nombre} onChange={(e) => handleInputChange('firmas', 'equipo2', { ...firmas.equipo2, nombre: e.target.value })} /> &nbsp; Serial: <input type="text" value={firmas.equipo2.serial} onChange={(e) => handleInputChange('firmas', 'equipo2', { ...firmas.equipo2, serial: e.target.value })} /> &nbsp; Certificado: <input type="text" value={firmas.equipo2.certificado} onChange={(e) => handleInputChange('firmas', 'equipo2', { ...firmas.equipo2, certificado: e.target.value })} /></p>
      </section>

      <footer>
        <h3>INFORME DE ACTIVIDADES EFECTUADAS</h3>
        <textarea value={informeActividades} onChange={(e) => setInformeActividades(e.target.value)}></textarea>
      </footer>

      <button className="submit-btn" onClick={handleSubmit}>Enviar Formulario</button>
    </div>
  );
}

export default Monitor;
