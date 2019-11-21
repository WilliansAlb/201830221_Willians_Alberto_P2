const express = require('express');
const router = express.Router();
router.use(express.json());
const path = require('path');
let palabra;
var texto1;
var texto2;
var prueba12 = [];
var arrayt = [];
var arrayl = [];
var arrayc = [];

var arraya = [];

//utilizaremos router para las rutas ya no app
router.get('/estudiantes', (req, res) => {
    res.render('index', { max: 15 });
});
router.get('/', (req, res) => {
    res.render('index', { max: 15 });
});
router.get('/manejo', (req, res) => {
    res.render('manejo', { max: 15 });
});
router.get('/diagrama', (req, res) => {
    res.render('diagrama', { max: 15 });
});
router.post('/analizar', (request, response) => {
    console.log(request.body.palabras.value);
    var texto = request.body.palabras.value;
    console.log(texto);
    response.status(200).send('correcto');
});
router.get('/postdata', (req, res) => {
    console.log("recibio");
    let data = req.query.format;
    console.log(data);
});

router.post('/postusers', (req, res) => {
    arrayl = req.body.arrayLinea;
    prueba12 = req.body.prue;
    arrayt = req.body.arrayTipos;
    arrayc = req.body.arrayColumnas;
    arraya = req.body.arrayAnalisis;
    //automatizar(0);
});
router.get('/users', (req, res) => {
    res.status(200).json({
        tx3: prueba12,
        tx4: arrayt,
        tx5: arrayl,
        tx6: arrayc,
        tx7: arraya
    });
});
module.exports = router;