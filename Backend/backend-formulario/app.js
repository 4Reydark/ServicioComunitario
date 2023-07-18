const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors());

//ROUTERS
const evaluacionRoute = require('./routes/evaluacion');
const inicioRoute = require('./routes/inicio');

app.use('/',inicioRoute);
app.use('/evaluacion',evaluacionRoute);

//PUERTO
const port = 8090;
app.listen(port, () => {
  console.log(`La aplicación está funcionando en http://localhost:${port}`);
});

module.exports = app;