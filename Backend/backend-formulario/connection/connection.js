const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'12345',
    database:'formularios',
    port:'3306',
    insecureAuth : true,
    ssl:{
        rejectUnauthorized:false
    }
});

mysqlConnection.connect(error =>{
    if(error){
        console.log('Error en db: ',error);
        return;
    }else{
        console.log('Conectado a la BD!');
    }
});
module.exports = mysqlConnection;
 