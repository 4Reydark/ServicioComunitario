import React, { useEffect, useState } from 'react';
import '../design/Formulario.css';
import validar from '../scripts/validarCedula';
import {postEmpleadoData} from '../scripts/consumo';
import Success from '../widgets/Notifications';
import { useNavigate } from 'react-router-dom';
import { saveDataToLocalStorage } from '../scripts/localstorage';

const Inicio = () => {
  const [cedula, setCedula] = useState('');
  const [notifCed, setNotifCed] = useState('');
  const [empleadoData, setEmpleadoData] = useState(null);
  const navigate = useNavigate();

  const obtenerEmpleado = async () => {
    const data = await postEmpleadoData(cedula);
    setEmpleadoData(data);
  };

  const handleSubmit = (e) => {
    var validacion = validar(cedula);
    e.preventDefault();
    if (cedula.length === 10) {
      if (validacion.valido) {
        obtenerEmpleado();
      } else {
        setNotifCed(validacion);
      }
    }
  };

  useEffect(() => {
    // console.log(empleadoData);
    if (empleadoData !== null && empleadoData.data) {
      navigate('/Formulario');
      saveDataToLocalStorage(empleadoData);
      // localStorage.setItem('empleado',JSON.stringify(empleadoData));
    } else if (empleadoData !== null && !empleadoData.data) {
      setNotifCed({ mensaje: empleadoData.msg, valido: false });
    }
  }, [empleadoData, navigate]);

  const handleCedulaChange = (event) => {
    const value = event.target.value;
    const onlyDigits = value.replace(/\D/g, '');

    if (onlyDigits.length <= 10) {
      setCedula(onlyDigits);
    }
  };

  return (
    <>
      <h1 >Formulario Web</h1>
      <form className="formulario" onSubmit={handleSubmit}>
        <div className="campo">
          <label htmlFor="nombre">Cedula:</label>
          <input
            type="text"
            id="cedula"
            value={cedula}
            onChange={(e) => handleCedulaChange(e)}
            maxLength={10}
            pattern="[0-9]{10}"
            required
          />
        </div>
        <div style={{alignItems:'center'}}>
        <button className='boton' type="submit">Empezar</button>
        </div>
        {empleadoData && empleadoData.data ? (
          '.'
        ) : (
          <Success mensaje={notifCed} />
        )}
      </form>
    </>
  );
};

export default Inicio;