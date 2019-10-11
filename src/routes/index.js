const express = require('express');
const router = express.Router();
router.use(express.json());
const path = require('path');

//utilizaremos router para las rutas ya no app
router.get('/estudiantes', (req, res) => {
    res.render('index', { max: 15 });
});
router.get('/', (req, res) => {
    res.render('index', { max: 15 });
});
router.get('/manejo',(req,res)=>{
    res.render('manejo', {max: 15});
});
router.post('/analizar', (request,response) => {
    console.log(request.body.textoDeIngreso.value);
    response.status(200).send('correcto');
});

module.exports = router;