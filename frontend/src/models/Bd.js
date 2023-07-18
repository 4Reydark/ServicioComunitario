// const evaluacion={idEvaluacion,ID_TRA_EVA,Fech_EVA,Act_ref,man_ref,aga_ref};
// const actividad={ID_Act,PAR_EST,DUR_PAR_EST,NUM_MOV_REP,TIP_POST,FUER_CAR,CARG_BRUS};
// const manipulacion_carga={ID_Man_car,Man_car_act,car_man,dur_lev,Tiem_recup,TIP_AGAR,NUM_LEV_M,
// ORI_LEV_V,ORI_LEV_H,ORI_LEV_A,DES_LEV_V,DES_LEV_H,DES_LEV_A,Est_trabajador,flex_espal,Tim_des_car,Sos_car_seg,
// Car_tiem_ac,ESP_DIS_LEV,herra_lev_ayu,Car_,Lev_personas};

  const [evaluacion,setEvaluacion]=useState({idEvaluacion:null,ID_TRA_EVA:null,Fech_EVA:null,Act_ref:null,man_ref:null,aga_ref:null});
  const [actividad,setActividad]=useState({ID_Act:null,PAR_EST:null,DUR_PAR_EST:null,NUM_MOV_REP:null,TIP_POST:null,FUER_CAR:null,CARG_BRUS:null});
  const [manipulacion_carga,setmanipulacion_carga]=useState({ID_Man_car:null,Man_car_act:null,car_man:null,dur_lev:null,Tiem_recup:null,TIP_AGAR:null,NUM_LEV_M:null,
  ORI_LEV_V:null,ORI_LEV_H:null,ORI_LEV_A:null,DES_LEV_V:null,DES_LEV_H:null,DES_LEV_A:null,Est_trabajador:null,flex_espal:null,Tim_des_car:null,Sos_car_seg:null,
  Car_tiem_ac:null,ESP_DIS_LEV:null,herra_lev_ayu:null,Car_:null,Lev_personas:null});

  p_TIP_AGARR,
  p_Man_car_act,
  p_car_man,
  p_dur_lev,
  p_Tiem_recup,
  p_TIP_AGAR,
  p_NUM_LEV_MIN,
  p_ORI_LEV_V,
  p_ORI_LEV_H,
  p_ORI_LEV_A,
  p_DES_LEV_V,
  p_DES_LEV_H,
  p_DES_LEV_A,
  p_Est_trabajador,
  p_flex_espal,
  p_Tim_des_car,
  p_Sos_car_seg,
  p_Car_tiem_ac,
  p_ESP_DIS_LEV,
  p_herra_lev_ayu,
  p_Car_in,
  p_Lev_personas,
  p_PAR_EST, 
  p_DUR_PAR_EST, 
  p_NUM_MOV_REP, 
  p_TIP_POST, 
  p_FUER_CAR, 
  p_CARG_BRUS,
  p_ID_TRA_EVA