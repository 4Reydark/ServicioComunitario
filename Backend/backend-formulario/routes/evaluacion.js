const express = require('express');
const router = express.Router();

const mysqlConnection = require('../connection/connection');
const { trabajadoresGetPorCedula, puesto_trabajoPorId, insertActividad, insertFormulario, usuarioEnFormulario } = require('../queries/queries');

router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * from evaluacion;',
        (error, rows, fields) => {
            if (!error) {
                res.json(rows);
            } else {
                console.log('Error de peticion: ', error);
            }
        });
});

router.post('/trabajador', (req, res) => {
    const { idTrabajadores } = req.body;
    var rowTrabajador = {};
    // console.log('Cedula: '+idTrabajadores);
    // Condicion para validar que el usuario solo pueda implementar el formulario una sola vez
    mysqlConnection.query(usuarioEnFormulario,
        [idTrabajadores],
        (error, rows, fields) => {
            if (!error && rows.length > 0) { // Existe en el formulario?
                // Si
                res.json({ data: false, trabajador: null, puesto: null, msg: 'Ya ingresó su formulario!' });
            } else {
                // No
                mysqlConnection.query(
                    trabajadoresGetPorCedula,
                    [idTrabajadores],
                    (error, rows, fields) => {
                        // console.log('Verificar si existe: ', rows);
                        if (!error && rows.length > 0) {
                            rowTrabajador = { ...rows };
                            //   console.log(rowTrabajador[0].ID_PUE_REF);
                            mysqlConnection.query(
                                puesto_trabajoPorId,
                                [rowTrabajador[0].ID_PUE_REF],
                                (error, rows, fields) => {
                                    if (!error && rows.length > 0) {
                                        res.json({ data: true, trabajador: { ...rowTrabajador[0] }, puesto: { ...rows[0] } });
                                    } else {
                                        console.log('Error de peticion: ', error);
                                        res.json({ data: false, trabajador: null, puesto: null });
                                    }
                                }
                            );
                        } else {
                            //   console.log('Error de peticion: ', error);
                            res.json({ data: false, trabajador: null, puesto: null,msg: 'No se encuentra registrado!' });
                        }
                    }
                );
            }
        });
    // // Cerrar la conexión después de finalizar las consultas
    // mysqlConnection.end();
});

//Ingresar formulario
router.post('/formulario', (req, res) => {
    const { ID_AGA, TIP_AGARR, Man_car_act, car_man, dur_lev, Tiem_recup, TIP_AGAR, NUM_LEV_MIN, ORI_LEV_V, ORI_LEV_H, ORI_LEV_A, DES_LEV_V, DES_LEV_H, DES_LEV_A, Est_trabajador, flex_espal, Tim_des_car, Sos_car_seg, Car_tiem_ac, ESP_DIS_LEV, herra_lev_ayu, Car_in, Lev_personas } = req.body;
    console.log(req.body);
    connection.query(query, [ID_AGA, TIP_AGARR, Man_car_act, car_man, dur_lev, Tiem_recup, TIP_AGAR, NUM_LEV_MIN, ORI_LEV_V, ORI_LEV_H, ORI_LEV_A, DES_LEV_V, DES_LEV_H, DES_LEV_A, Est_trabajador, flex_espal, Tim_des_car, Sos_car_seg, Car_tiem_ac, ESP_DIS_LEV, herra_lev_ayu, Car_in, Lev_personas], (error, results) => {
        if (error) {
            console.error('Error al ejecutar el procedimiento almacenado: ', error);
            res.status(500).send('Error al ejecutar el procedimiento almacenado');
            res.json(({ data: false }));
        } else {
            res.status(200).send('Procedimiento almacenado ejecutado correctamente');
            res.json(({ data: false }));
        }
    });
});

// router.post('/insertForm', (req, res) => {
//     const { PAR_EST, DUR_PAR_EST, NUM_MOV_REP, TIP_POST, FUER_CAR, CARG_BRUS } = req.body;
//     // const queryActividad = "INSERT INTO tu_tabla (par_est, dur_par_est, num_mov_rep, tip_post, fuer_car, carg_brus) VALUES (?, ?, ?, ?, ?, ?)";
//     const values = [PAR_EST, DUR_PAR_EST, NUM_MOV_REP, TIP_POST, FUER_CAR, CARG_BRUS];

//     mysqlConnection.query(insertActividad, values, (error, result) => {
//         if (error) {
//             console.log(error);
//             res.status(500).json({ message: "Error al insertar los datos" });
//         } else {
//             const idActividad = result.insertId;
//             console.log("ID de la actividad insertada:", idActividad);
//             res.status(200).json({ message: "Datos insertados correctamente", idActividad });
//         }
//     });
// });

//Ingreso evaluacion
router.post('/insertForm', (req, res) => {
    const dataEntrante = req.body;
    const {
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
        p_ID_TRA_EVA } = dataEntrante; // Mapear la data del body solicitado desde frontend
    // console.log(p_TIP_AGARR,p_Man_car_act,p_car_man,p_dur_lev,p_Tiem_recup,p_TIP_AGAR,p_NUM_LEV_MIN,p_ORI_LEV_V,p_ORI_LEV_H,p_ORI_LEV_A,p_DES_LEV_V,p_DES_LEV_H,p_DES_LEV_A,p_Est_trabajador,p_flex_espal,p_Tim_des_car,p_Sos_car_seg,p_Car_tiem_ac,p_ESP_DIS_LEV,p_herra_lev_ayu,p_Car_in,p_Lev_personas,p_PAR_EST,p_DUR_PAR_EST,p_NUM_MOV_REP,p_TIP_POST,p_FUER_CAR,p_CARG_BRUS,p_ID_TRA_EVA);
    mysqlConnection.query(insertFormulario,
        [p_TIP_AGARR,
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
            p_ID_TRA_EVA],// se mapea la data
        (err, rows, fields) => {
            if (!err) {
                res.json({ data: [true, ''] });
            } else {
                res.json({ data: [false, err] });
                // console.log(err);
            }
        });
});

module.exports = router;
