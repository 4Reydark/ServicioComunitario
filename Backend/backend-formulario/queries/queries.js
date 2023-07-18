const trabajadoresGetPorCedula = ' SELECT `trabajadores`.`idTrabajadores`,`trabajadores`.`Nom_Tra`,`trabajadores`.`Ape_Tra`,`trabajadores`.`Género`,`trabajadores`.`Fech_Nac`,`trabajadores`.`Fech_Ini_Pue_act`,`trabajadores`.`Jornada`,`trabajadores`.`Foto1`,`trabajadores`.`Foto2`,`trabajadores`.`Foto3`, `trabajadores`.`ID_PUE_REF` FROM `formularios`.`trabajadores` WHERE idTrabajadores = ?;';
const puesto_trabajoPorId = `   SELECT puesto_trabajo.id_Puesto,
                                    puesto_trabajo.Campus,
                                    puesto_trabajo.Descrip,
                                    puesto_trabajo.Area_Dep,
                                    puesto_trabajo.Dur_Jornada
                                FROM formularios.puesto_trabajo
                                WHERE puesto_trabajo.id_Puesto=?;`;
// const insertActividad = `
// INSERT INTO formularios.actividad
// (PAR_EST,DUR_PAR_EST,NUM_MOV_REP,TIP_POST,FUER_CAR,CARG_BRUS)
// VALUES
// (?,?,?,?,?,?,?);`
// const insertFormulario = `CALL InsertarEvaluacion(?)`;
const insertFormulario = `CALL InsertarEvaluacion(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
const usuarioEnFormulario = `select * from evaluacion
                            where ID_TRA_EVA =?;`;
module.exports =  {trabajadoresGetPorCedula, puesto_trabajoPorId, insertFormulario,usuarioEnFormulario};