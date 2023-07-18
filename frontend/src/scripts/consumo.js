import axios from 'axios';

var URL = 'http://localhost:8090/evaluacion';// URL de la API POST

export const postEmpleadoData = async (cedula) => {
  try {
    const data = { idTrabajadores: cedula}; // Datos a enviar en el cuerpo de la solicitud POST
    
    const response = await axios.post(URL+'/trabajador', data, {
      headers: {
        'Content-Type': 'application/json' // Especifica el tipo de contenido del cuerpo de la solicitud
      }
    });
    
    console.log(response.data); // Haz algo con los datos de respuesta
    return {...response.data};
  } catch (error) {
    console.log('Error en la solicitud:', error);
  }
};

export const postFormulario = async (
  TIP_AGARR,
  Man_car_act,
  car_man,
  dur_lev,
  Tiem_recup,
  TIP_AGAR,
  NUM_LEV_MIN,
  ORI_LEV_V,
  ORI_LEV_H,
  ORI_LEV_A,
  DES_LEV_V,
  DES_LEV_H,
  DES_LEV_A,
  Est_trabajador,
  flex_espal,
  Tim_des_car,
  Sos_car_seg,
  Car_tiem_ac,
  ESP_DIS_LEV,
  herra_lev_ayu,
  Car_in,
  Lev_personas,
  PAR_EST, 
  DUR_PAR_EST, 
  NUM_MOV_REP, 
  TIP_POST, 
  FUER_CAR, 
  CARG_BRUS,
  ID_TRA_EVA
) => {
  try {
    const data = { 
      p_TIP_AGARR: TIP_AGARR,
      p_Man_car_act: Man_car_act,
      p_car_man:car_man,
      p_dur_lev:dur_lev,
      p_Tiem_recup:Tiem_recup,
      p_TIP_AGAR:TIP_AGAR,
      p_NUM_LEV_MIN:NUM_LEV_MIN,
      p_ORI_LEV_V:ORI_LEV_V,
      p_ORI_LEV_H:ORI_LEV_H,
      p_ORI_LEV_A:ORI_LEV_A,
      p_DES_LEV_V:DES_LEV_V,
      p_DES_LEV_H:DES_LEV_H,
      p_DES_LEV_A:DES_LEV_A,
      p_Est_trabajador:Est_trabajador,
      p_flex_espal:flex_espal,
      p_Tim_des_car:Tim_des_car,
      p_Sos_car_seg:Sos_car_seg,
      p_Car_tiem_ac:Car_tiem_ac,
      p_ESP_DIS_LEV:ESP_DIS_LEV,
      p_herra_lev_ayu:herra_lev_ayu,
      p_Car_in:Car_in,
      p_Lev_personas:Lev_personas,
      p_PAR_EST:PAR_EST, 
      p_DUR_PAR_EST:DUR_PAR_EST, 
      p_NUM_MOV_REP:NUM_MOV_REP, 
      p_TIP_POST:TIP_POST, 
      p_FUER_CAR:FUER_CAR, 
      p_CARG_BRUS:CARG_BRUS,
      p_ID_TRA_EVA:ID_TRA_EVA
    }; // Datos a enviar en el cuerpo de la solicitud POST
    console.log(data);
    const response = await axios.post(URL+'/insertForm', data, {
      headers: {
        'Content-Type': 'application/json' // Especifica el tipo de contenido del cuerpo de la solicitud
      }
    });
    
    console.log(response.data); // Haz algo con los datos de respuesta
    return {...response.data};
  } catch (error) {
    console.log('Error en la solicitud:', error);
  }
};
// Llama a la función para enviar la solicitud POST
export default {postEmpleadoData,postFormulario};