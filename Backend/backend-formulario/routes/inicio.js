const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.json('Bienvenido api formulario');
});

module.exports = router;
