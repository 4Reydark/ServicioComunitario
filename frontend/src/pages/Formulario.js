import React, { useEffect, useState } from 'react';
import '../design/Formulario.css';
import { deleteDataToLocalStorage, getAntiguedad, getDataToLocalStorage } from '../scripts/localstorage';
import { postFormulario } from '../scripts/consumo';
import Success from '../widgets/Notifications';
import { useNavigate } from 'react-router';
import { CSSTransition } from 'react-transition-group';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';


const Formulario = () => {
  // Navegacion 
  const navigate = useNavigate();
  const [valFormulario, setValFormulario] = useState(false);
  // Campos de BD
  const [empleado, setEmpleado] = useState(null);
  const [agarre, setAgarre] = useState({ TIP_AGARR: null });
  const [actividad, setActividad] = useState({ PAR_EST: null, DUR_PAR_EST: null, NUM_MOV_REP: null, TIP_POST: null, FUER_CAR: null, CARG_BRUS: null });
  const [manipulacion_carga, setmanipulacion_carga] = useState({
    Man_car_act: null, car_man: null, dur_lev: null, Tiem_recup: null, TIP_AGAR: null, NUM_LEV_MIN: null,
    ORI_LEV_V: null, ORI_LEV_H: null, ORI_LEV_A: null, DES_LEV_V: null, DES_LEV_H: null, DES_LEV_A: null, Est_trabajador: null, flex_espal: null, Tim_des_car: null, Sos_car_seg: null,
    Car_tiem_ac: null, ESP_DIS_LEV: null, herra_lev_ayu: null, Car_in: null, Lev_personas: null
  });
  // Contenidos para los combobox
  const actividad_TIP_POST = ['Seleccionar', 'Estable', 'Inestable'];
  const agarre_TIP_AGARR = ['Seleccionar', 'Bueno', 'Regular', 'Malo', 'Inaceptable'];
  const manipulacion_carga_TIP_AGAR = ['Seleccionar', 'Bueno', 'Regular', 'Malo', 'Inaceptable'];
  const manipulacion_carga_Est_trabajador = ['Seleccionar', 'Sentado', 'Arrodillado'];
  const manipulacion_carga_herra_lev_ayu = ['Seleccionar', 'Carretillas', 'Palas', 'Ninguna'];
  // Variables para validar entradas
  const [pregActivValida, setPregActivValida] = useState(false);
  const [pregActManipCargValida, setPregActManipCargValida] = useState(false);


  // Validar que haya ingresado la cedula
  useEffect(() => {
    const fetchData = () => {
      const empleadoData = getDataToLocalStorage();
      if (!empleadoData || !empleadoData.puesto) {
        navigate('/');
      } else {
        setEmpleado({ ...empleadoData });
      }
    };
    fetchData();
  }, []);

  // Informar error
  useEffect(() => {
    let timeoutId;

    if (valFormulario) {
      timeoutId = setTimeout(() => {
        setValFormulario(false);
      }, 2000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [valFormulario]);

  const ingresarFormulario = async () => {
    const data = await postFormulario(
      agarre.TIP_AGARR,
      manipulacion_carga.Man_car_act,
      manipulacion_carga.car_man ? manipulacion_carga.car_man : '0',
      manipulacion_carga.dur_lev ? manipulacion_carga.dur_lev : '0',
      manipulacion_carga.Tiem_recup ? manipulacion_carga.Tiem_recup : '0',
      manipulacion_carga.TIP_AGAR ? manipulacion_carga.TIP_AGAR : '0',
      manipulacion_carga.NUM_LEV_MIN ? manipulacion_carga.NUM_LEV_MIN : '0',
      manipulacion_carga.ORI_LEV_V ? manipulacion_carga.ORI_LEV_V : '0',
      manipulacion_carga.ORI_LEV_H ? manipulacion_carga.ORI_LEV_H : '0',
      manipulacion_carga.ORI_LEV_A ? manipulacion_carga.ORI_LEV_A : '0',
      manipulacion_carga.DES_LEV_V ? manipulacion_carga.DES_LEV_V : '0',
      manipulacion_carga.DES_LEV_H ? manipulacion_carga.DES_LEV_H : '0',
      manipulacion_carga.DES_LEV_A ? manipulacion_carga.DES_LEV_A : '0',
      manipulacion_carga.Est_trabajador ? manipulacion_carga.Est_trabajador : '0',
      manipulacion_carga.flex_espal ? manipulacion_carga.flex_espal : 0,
      manipulacion_carga.Tim_des_car ? manipulacion_carga.Tim_des_car : 0,
      manipulacion_carga.Sos_car_seg ? manipulacion_carga.Sos_car_seg : 0,
      manipulacion_carga.Car_tiem_ac ? manipulacion_carga.Car_tiem_ac : 0,
      manipulacion_carga.ESP_DIS_LEV ? manipulacion_carga.ESP_DIS_LEV : 0,
      manipulacion_carga.herra_lev_ayu ? manipulacion_carga.herra_lev_ayu : 0,
      manipulacion_carga.Car_in,
      manipulacion_carga.Lev_personas,
      actividad.PAR_EST,
      actividad.DUR_PAR_EST ? actividad.DUR_PAR_EST : '0',
      actividad.NUM_MOV_REP,
      actividad.TIP_POST,
      actividad.FUER_CAR,
      actividad.CARG_BRUS,
      empleado.trabajador.idTrabajadores
    );
    console.log(data);
  };
  //Funcion para validar envio de formulario
  const validarFormulario = () => {
    console.log(agarre.TIP_AGARR, actividad.PAR_EST, actividad.NUM_MOV_REP, actividad.TIP_POST, actividad.FUER_CAR,
      actividad.CARG_BRUS, manipulacion_carga.Man_car_act, manipulacion_carga.Car_in, manipulacion_carga.Lev_personas);
    if (
      agarre.TIP_AGARR === null ||
      actividad.PAR_EST === null ||
      actividad.NUM_MOV_REP === null ||
      actividad.TIP_POST === null ||
      actividad.FUER_CAR === null ||
      actividad.CARG_BRUS === null ||
      manipulacion_carga.Man_car_act === null ||
      manipulacion_carga.Car_in === null ||
      manipulacion_carga.Lev_personas === null
    ) {
      // alert('Por favor, completa todos los campos!');
      return false;
    } else {
      // alert('Datos ingresados!');
      return true;
    }
  }
  // Función para actualizar un campo específico del estado
  const actualizaragarre = (campo, valor) => {
    setAgarre(prevState => ({
      ...prevState,
      [campo]: valor === 'Seleccionar' ? null : valor
    }));
  };
  // Función para actualizar un campo específico del estado
  const actualizarActividad = (campo, valor) => {
    if (campo === 'TIP_POST' || campo === 'CARG_BRUS') {
      setActividad(prevState => ({
        ...prevState,
        [campo]: valor === 'Seleccionar' ? null : valor
      }));
    } else {
      const onlyDigits = valor.replace(/\D/g, '');
      const parsedValue = parseInt(onlyDigits);
      if (onlyDigits.length <= 3) {
        setActividad(prevState => ({
          ...prevState,
          [campo]: onlyDigits
        }));
        if (campo === 'PAR_EST') setPregActivValida(parsedValue >= 1);
      }
    }
  };
  // Función para actualizar un campo específico del estado
  const actualizarManipulacion_carga = (campo, valor) => {
    if (campo === 'TIP_AGAR' || campo === 'Est_trabajador' || campo === 'herra_lev_ayu' || campo === 'Sos_car_seg' || campo === 'Man_car_act' || campo === 'flex_espal' || campo === 'Tim_des_car' || campo === 'Car_tiem_ac' || campo === 'ESP_DIS_LEV' || campo === 'Car_in') {
      setmanipulacion_carga(prevState => ({
        ...prevState,
        [campo]: valor === 'Seleccionar' ? null : valor
      }));
      if (campo === 'Man_car_act') { setPregActManipCargValida(valor === 1) };
    } else {
      const onlyDigits = valor.replace(/\D/g, '');
      // const parsedValue = parseInt(onlyDigits);
      if (onlyDigits.length <= 3) {
        setmanipulacion_carga(prevState => ({
          ...prevState,
          [campo]: onlyDigits
        }));
      }

    }

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = !validarFormulario();
    if (!error) {
      ingresarFormulario();
      deleteDataToLocalStorage();
      navigate('/');
      generarPDF();
    } else {
      setValFormulario(error);
    }
  };

  // Metodo para PDF
  const generarPDF = () => {
    // Obtiene el formulario y el fondo del documento HTML
    const formulario = document.getElementById('formulario');
    const fondo = document.getElementById('fondo');
  
    // Captura el contenido HTML, incluido el fondo, utilizando html2canvas
    html2canvas(formulario, {
      backgroundColor: null, // Establece el fondo como transparente
    }).then((canvas) => {
      // Crea una instancia de jsPDF
      const doc = new jsPDF();
  
      // Obtiene el ancho y alto del contenido capturado
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
  
      // Calcula el factor de escala para ajustar el contenido al tamaño del documento PDF
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = doc.internal.pageSize.getHeight();
      const scale = Math.min(pdfWidth / canvasWidth, pdfHeight / canvasHeight);
  
      // Calcula las coordenadas para centrar el contenido en el PDF
      const offsetX = (pdfWidth - canvasWidth * scale) / 2;
      const offsetY = (pdfHeight - canvasHeight * scale) / 2;
  
      // Agrega el contenido capturado al documento PDF, centrado
      doc.addImage(canvas, 'PNG', offsetX, offsetY, canvasWidth * scale, canvasHeight * scale);
  
      // Guarda el archivo PDF
      doc.save('formulario.pdf');
    });
  };
  
  

  return (
    <>
      {/* {(empleado.puesto.Campus=undefined?navigate('/'):'')} */}
      <div>
        <CSSTransition in={true} timeout={300} classNames="formulario">
          <form className="formulario" id="formulario" onSubmit={handleSubmit}>
            <div className="campo">
              <div className="campo" style={{ textAlign: 'center' }}>
                <h1>PUESTO</h1>
              </div>
              <div>
                <span>Campus: </span>{empleado?.puesto?.Campus}
              </div>
              <div>
                <span>Descripción: </span>{empleado?.puesto?.Descrip}
              </div>
              <div>
                <span>Departamento / Área: </span>{empleado?.puesto?.Area_Dep}
              </div>
              <div className="campo" style={{ textAlign: 'center' }}>
                <h1>DATOS DEL TRABAJADOR</h1>
              </div>
              <div>
                <span>Cedula: </span>{empleado?.trabajador?.idTrabajadores}
              </div>
              <div>
                <span>Nombre y apellido: </span>{empleado?.trabajador?.Nom_Tra + ' ' + empleado?.trabajador?.Ape_Tra}
              </div>
              <div>
                <span>Género: </span>{empleado?.trabajador?.Género}
              </div>
              <div>
                <span>Jornada: </span>{empleado?.trabajador?.Jornada}
              </div>
              <div>
                <span>Edad: </span>{getAntiguedad(empleado?.trabajador?.Fech_Nac)}
              </div>
              <div>
                <span>Antiguedad: </span>{getAntiguedad(empleado?.trabajador?.Fech_Ini_Pue_act)}
              </div>
            </div>
            <div className="campo">
              <div className='campo'><h1>ACTIVIDAD</h1></div>
              <div className={actividad?.PAR_EST ? 'verde' : 'rojo'}>
                <label htmlFor="numero">{'1) ¿En su trabajo cuantas partes estáticas mantiene?'} </label>
                <input
                  type="text"
                  id="numero"
                  value={actividad?.PAR_EST}
                  onChange={(e) => actualizarActividad('PAR_EST', e.target.value)}
                />
              </div>
              <p />
              {pregActivValida && (
                <div className={actividad?.DUR_PAR_EST ? 'verde' : 'rojo'}>

                  <label>{'2) ¿Cuánto tiempo mantiene esa parte estática la respuesta es en minutos?'} </label>
                  <input
                    type="text"
                    id="nombre"
                    value={pregActivValida ? actividad?.DUR_PAR_EST : '0'}
                    onChange={(e) => actualizarActividad('DUR_PAR_EST', e.target.value)}
                  />
                </div>
              )}
              <p />
              <div className={actividad?.NUM_MOV_REP ? 'verde' : 'rojo'}>
                <label>{'3) ¿Cuántas veces produce movimientos repetitivos en el lapso de un minuto? '} </label>
                <input
                  type="text"
                  id="nombre"
                  value={actividad?.NUM_MOV_REP}
                  onChange={(e) => actualizarActividad('NUM_MOV_REP', e.target.value)}
                />
              </div>
              <p />
              <div className={actividad?.TIP_POST ? 'verde' : 'rojo'}>
                <label>{'4) ¿Qué tipo de postura mantiene posturas importantes o posturas inestables?'} </label>
                <select className="combobox"
                  id="nombre"
                  value={actividad?.TIP_POST}
                  onChange={(e) => actualizarActividad('TIP_POST', e.target.value)}
                >
                  {actividad_TIP_POST.map((opcion) => (
                    <option key={opcion} value={opcion}>{opcion} </option>
                  ))}
                </select>
              </div>
              <p />
              <div className={actividad?.FUER_CAR ? 'verde' : 'rojo'}>
                <label>{'5) ¿Que fuerza ejerce en el trabajador durante la actividad (kg)?'} </label>
                <input
                  type="text"
                  id="nombre"
                  value={actividad?.FUER_CAR}
                  onChange={(e) => actualizarActividad('FUER_CAR', e.target.value)}
                />
              </div>
              <p />
              <div className={actividad?.CARG_BRUS != null ? 'verde' : 'rojo'}>
                <label>{'6) ¿Existen fuerzas o cargas aplicadas bruscamente?'}</label>
                <div>
                  <label className="opcion">
                    <input
                      type="checkbox"
                      checked={actividad?.CARG_BRUS === 1}
                      onChange={() => actualizarActividad('CARG_BRUS', 1)}
                    />
                    <span>Si</span>
                  </label>
                  <label className="opcion">
                    <input
                      type="checkbox"
                      checked={actividad?.CARG_BRUS === 0}
                      onChange={() => actualizarActividad('CARG_BRUS', 0)}
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="campo" >
              <div className='campo'><h1>AGARRE</h1></div>
              <p />
              <div className={agarre?.TIP_AGARR != null ? 'verde' : 'rojo'}>
                <label>{'7) ¿Qué tipo de agarre tiene al momento de manipular la carga?'} </label>
                <select className="combobox"
                  id="nombre"
                  value={agarre?.TIP_AGARR}
                  onChange={(e) => actualizaragarre('TIP_AGARR', e.target.value)}
                >
                  {agarre_TIP_AGARR.map((opcion) => (
                    <option key={opcion} value={opcion}>{opcion}</option>
                  ))}
                </select>
              </div>
              <p />
            </div>
            <div className="campo">
              <div className='campo'><h1>MANIPULACION DE CARGA</h1></div>
              <div>
                <label>{'8) ¿Existe manipulación de cargas en la ejecución de la actividad?'}</label>
                <div className={manipulacion_carga?.Man_car_act != null ? 'verde' : 'rojo'}>
                  <label className="opcion">
                    <input
                      type="checkbox"
                      checked={manipulacion_carga?.Man_car_act === 1}
                      onChange={() => actualizarManipulacion_carga('Man_car_act', 1)}
                    />
                    <span>Si</span>
                  </label>
                  <label className="opcion">
                    <input
                      type="checkbox"
                      checked={manipulacion_carga?.Man_car_act === 0}
                      onChange={() => actualizarManipulacion_carga('Man_car_act', 0)}
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>
              <p />
              {pregActManipCargValida && (
                < div className={manipulacion_carga?.car_man ? 'verde' : 'rojo'}>
                  <label>{'9) ¿Qué carga manipula en kg?'} </label>
                  <input
                    type="text"
                    id="nombre"
                    value={pregActManipCargValida ? manipulacion_carga?.car_man : '0'}
                    onChange={(e) => actualizarManipulacion_carga('car_man', e.target.value)}
                  />
                </div>)}
              <p />
              {pregActManipCargValida && (
                <div className={manipulacion_carga?.Tiem_recup ? 'verde' : 'rojo'}>
                  <label>{'10) ¿Qué tiempo de recuperación presenta en horas? '} </label>
                  <input
                    type="text"
                    id="nombre"
                    value={pregActManipCargValida ? manipulacion_carga?.Tiem_recup : '0'}
                    onChange={(e) => actualizarManipulacion_carga('Tiem_recup', e.target.value)}
                  />
                </div>)}
              <p />
              {pregActManipCargValida && (
                <div className={manipulacion_carga?.dur_lev ? 'verde' : 'rojo'}>
                  <label>{'11) ¿Duracion global del levantamiento en horas? '} </label>
                  <input
                    type="text"
                    id="nombre"
                    value={pregActManipCargValida ? manipulacion_carga?.dur_lev : '0'}
                    onChange={(e) => actualizarManipulacion_carga('dur_lev', e.target.value)}
                  /></div>)}
              <p />
              {pregActManipCargValida && (
                <div className={manipulacion_carga?.TIP_AGAR ? 'verde' : 'rojo'}>
                  <label>{'12) ¿Tipo de agarre?'} </label>
                  <select className="combobox"
                    id="nombre"
                    value={pregActManipCargValida ? manipulacion_carga?.TIP_AGAR : '0'}
                    onChange={(e) => actualizarManipulacion_carga('TIP_AGAR', e.target.value)}
                  >
                    {manipulacion_carga_TIP_AGAR.map((opcion) => (
                      <option key={opcion} value={opcion}>{opcion}</option>
                    ))}
                  </select>
                </div >)}
              <p />
              {pregActManipCargValida && (
                <div className={manipulacion_carga?.NUM_LEV_MIN ? 'verde' : 'rojo'}>
                  <label>{'13) ¿Cuántos levantamientos realiza por minuto?'} </label>
                  <input
                    type="text"
                    id="nombre"
                    value={pregActManipCargValida ? manipulacion_carga?.NUM_LEV_MIN : '0'}
                    onChange={(e) => actualizarManipulacion_carga('NUM_LEV_MIN', e.target.value)}
                  />
                </div>)}
              <p />
              {pregActManipCargValida && (
                <div className={manipulacion_carga?.ORI_LEV_V ? 'verde' : 'rojo'}>
                  <label>{'14) ¿Origen del levantamiento Distancia Vertical?'} </label>
                  <input
                    type="text"
                    id="nombre"
                    value={pregActManipCargValida ? manipulacion_carga?.ORI_LEV_V : '0'}
                    onChange={(e) => actualizarManipulacion_carga('ORI_LEV_V', e.target.value)}
                  /></div>)}
              <p />
              {pregActManipCargValida && (<div className={manipulacion_carga?.ORI_LEV_H ? 'verde' : 'rojo'}>
                <label>{'15) ¿Origen del levantamiento Distancia Horizontal?'} </label>
                <input
                  type="text"
                  id="nombre"
                  value={pregActManipCargValida ? manipulacion_carga?.ORI_LEV_H : '0'}
                  onChange={(e) => actualizarManipulacion_carga('ORI_LEV_H', e.target.value)}
                />
              </div>)}
              <p />
              {pregActManipCargValida && (<div className={manipulacion_carga?.ORI_LEV_A ? 'verde' : 'rojo'}>
                <label>{'16) ¿Origen del levantamiento Angulo Asimetría? '} </label>
                <input
                  type="text"
                  id="nombre"
                  value={pregActManipCargValida ? manipulacion_carga?.ORI_LEV_A : '0'}
                  onChange={(e) => actualizarManipulacion_carga('ORI_LEV_A', e.target.value)}
                /></div>)}
              <p />
              {pregActManipCargValida && (<div className={manipulacion_carga?.DES_LEV_V ? 'verde' : 'rojo'}>
                <label>{'17) ¿Destino del levantamiento Distancia Vertical?'} </label>
                <input
                  type="text"
                  id="nombre"
                  value={pregActManipCargValida ? manipulacion_carga?.DES_LEV_V : '0'}
                  onChange={(e) => actualizarManipulacion_carga('DES_LEV_V', e.target.value)}
                />
              </div>)}
              <p />
              {pregActManipCargValida && (<div className={manipulacion_carga?.DES_LEV_H ? 'verde' : 'rojo'}>
                <label>{'18) ¿Destino del levantamiento Distancia Horizontal?'} </label>
                <input
                  type="text"
                  id="nombre"
                  value={pregActManipCargValida ? manipulacion_carga?.DES_LEV_H : '0'}
                  onChange={(e) => actualizarManipulacion_carga('DES_LEV_H', e.target.value)}
                />
              </div>)}
              <p />
              {pregActManipCargValida && (
                <div className={manipulacion_carga?.DES_LEV_A ? 'verde' : 'rojo'}>
                  <label>{'19) ¿Destino en del levantamiento Angulo Asimetría? '} </label>
                  <input
                    type="text"
                    id="nombre"
                    value={pregActManipCargValida ? manipulacion_carga?.DES_LEV_A : '0'}
                    onChange={(e) => actualizarManipulacion_carga('DES_LEV_A', e.target.value)}
                  />
                </div>)}
              <p />
              {pregActManipCargValida && (
                <div className={manipulacion_carga?.Est_trabajador ? 'verde' : 'rojo'}>
                  <label>{'20) ¿Cuál sería el estado del trabajador al momento de realizar el levantamiento? '} </label>
                  <select className="combobox"
                    id="nombre"
                    value={pregActManipCargValida ? manipulacion_carga?.Est_trabajador : '0'}
                    onChange={(e) => actualizarManipulacion_carga('Est_trabajador', e.target.value)}
                  >
                    {manipulacion_carga_Est_trabajador.map((opcion) => (
                      <option key={opcion} value={opcion}>{opcion}</option>
                    ))}
                  </select>
                </div>)}
              <p />
              {pregActManipCargValida && (
                <div className={manipulacion_carga?.flex_espal != null ? 'verde' : 'rojo'}>
                  <label>{'21) ¿Se flexiona la espalda en lugar de las rodillas?'}</label>
                  <div>
                    <label className="opcion">
                      <input
                        type="checkbox"
                        checked={pregActManipCargValida ? manipulacion_carga?.flex_espal === 1 : 0}
                        onChange={() => actualizarManipulacion_carga('flex_espal', 1)}
                      />
                      <span>Si</span>
                    </label>
                    <label className="opcion">
                      <input
                        type="checkbox"
                        checked={pregActManipCargValida ? manipulacion_carga?.flex_espal === 0 : 0}
                        onChange={() => actualizarManipulacion_carga('flex_espal', 0)}
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>)}
              <p />
              {pregActManipCargValida && (
                < div className={manipulacion_carga?.Tim_des_car != null ? 'verde' : 'rojo'}>
                  <label>{'22) ¿El trabajador desplaza la carga más de 3 pasos?'} </label>
                  <div>
                    <label className="opcion">
                      <input
                        type="checkbox"
                        checked={pregActManipCargValida ? manipulacion_carga?.Tim_des_car === 1 : 0}
                        onChange={() => actualizarManipulacion_carga('Tim_des_car', 1)}
                      />
                      <span>Si</span>
                    </label>
                    <label className="opcion">
                      <input
                        type="checkbox"
                        checked={pregActManipCargValida ? manipulacion_carga?.Tim_des_car === 0 : 0}
                        onChange={() => actualizarManipulacion_carga('Tim_des_car', 0)}
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>)}
              <p />
              {pregActManipCargValida && (
                <div className={manipulacion_carga?.Sos_car_seg != null ? 'verde' : 'rojo'}>
                  <label>{'23) ¿El trabajador sostiene la carga algunos segundos?'}</label>
                  <div>
                    <label className="opcion">
                      <input
                        type="checkbox"
                        checked={pregActManipCargValida ? manipulacion_carga?.Sos_car_seg === 1 : 0}
                        onChange={() => actualizarManipulacion_carga('Sos_car_seg', 1)}
                      />
                      <span>Si</span>
                    </label>
                    <label className="opcion">
                      <input
                        type="checkbox"
                        checked={pregActManipCargValida ? manipulacion_carga?.Sos_car_seg === 0 : 0}
                        onChange={() => actualizarManipulacion_carga('Sos_car_seg', 0)}
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>)}
              <p />
              {pregActManipCargValida && (
                <div className={manipulacion_carga?.Car_tiem_ac != null ? 'verde' : 'rojo'}>
                  <label>{'24) ¿Se manipulaba la carga mas del 10% del tiempo de activida?'}</label>
                  <div>
                    <label className="opcion">
                      <input
                        type="checkbox"
                        checked={pregActManipCargValida ? manipulacion_carga?.Car_tiem_ac === 1 : 0}
                        onChange={() => actualizarManipulacion_carga('Car_tiem_ac', 1)}
                      />
                      <span>Si</span>
                    </label>
                    <label className="opcion">
                      <input
                        type="checkbox"
                        checked={pregActManipCargValida ? manipulacion_carga?.Car_tiem_ac === 0 : 0}
                        onChange={() => actualizarManipulacion_carga('Car_tiem_ac', 0)}
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>)}
              <p />
              {pregActManipCargValida && (
                <div className={manipulacion_carga?.ESP_DIS_LEV != null ? 'verde' : 'rojo'}>
                  <label>{'25) ¿El espacio disponible para el levantamiento es reducido?'}</label>
                  <div>
                    <label className="opcion">
                      <input
                        type="checkbox"
                        checked={pregActManipCargValida ? manipulacion_carga?.ESP_DIS_LEV === 1 : 0}
                        onChange={() => actualizarManipulacion_carga('ESP_DIS_LEV', 1)}
                      />
                      <span>Si</span>
                    </label>
                    <label className="opcion">
                      <input
                        type="checkbox"
                        checked={pregActManipCargValida ? manipulacion_carga?.ESP_DIS_LEV === 0 : 0}
                        onChange={() => actualizarManipulacion_carga('ESP_DIS_LEV', 0)}
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>)}
              <p />
              {pregActManipCargValida && (
                <div className={manipulacion_carga?.herra_lev_ayu ? 'verde' : 'rojo'}>
                  <label>{'26) ¿Herramienta que usa como ayuda para levantar cargas?'} </label>
                  <select className="combobox"
                    id="nombre"
                    value={pregActManipCargValida ? manipulacion_carga?.herra_lev_ayu : '0'}
                    onChange={(e) => actualizarManipulacion_carga('herra_lev_ayu', e.target.value)}
                  >
                    {manipulacion_carga_herra_lev_ayu.map((opcion) => (
                      <option key={opcion} value={opcion}>{opcion}</option>
                    ))}
                  </select>
                </div>)}
              <p />
              <div className={manipulacion_carga?.Car_in != null ? 'verde' : 'rojo'}>
                <label>{'27) ¿La carga es inestable, o su centro de gravedad variable?'}</label>
                <div>
                  <label className="opcion">
                    <input
                      type="checkbox"
                      checked={manipulacion_carga?.Car_in === 1}
                      onChange={() => actualizarManipulacion_carga('Car_in', 1)}
                    />
                    <span>Si</span>
                  </label>
                  <label className="opcion">
                    <input
                      type="checkbox"
                      checked={manipulacion_carga?.Car_in === 0}
                      onChange={() => actualizarManipulacion_carga('Car_in', 0)}
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>
              <p />
              <div className={manipulacion_carga?.Lev_personas ? 'verde' : 'rojo'}>
                <label>{'28) ¿Cuál es el numero de personas que realizan el levantamiento de la carga?'} </label>
                <input
                  type="text"
                  id="nombre"
                  value={manipulacion_carga?.Lev_personas}
                  onChange={(e) => actualizarManipulacion_carga('Lev_personas', e.target.value)}
                />
              </div>
            </div>
            <button className='boton' type="submit">Enviar</button>
          </form>
        </CSSTransition>
      </div>
      {/* <button style={{ background: 'green' }} onClick={generarPDF}>Descargar PDF</button> */}
      {valFormulario ? (
        <div>
          <Success mensaje={{ valido: false, mensaje: 'No ha respondido todas las preguntas!' }} />
          {/* <button onClick={handleDismissError}>Cerrar</button> */}
        </div>
      ) : ''}
    </>
  );
};

export default Formulario;