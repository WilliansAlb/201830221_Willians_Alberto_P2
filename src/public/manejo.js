const getButton = document.querySelector("#get");
const postButton = document.querySelector("#post");
var datos = document.getElementById("tabla0");
var datos2 = document.getElementById("contenido");
const url = "http://localhost:3000/users";
const urlp = "http://localhost:3000/pusers";
var result;
var lineas;
var input = document.getElementById('archivo');
var reader = new FileReader;
let w = 0;
var palabras1 = [];
var tipos = [];
var buscando = [];
var columnas = [];
var tipo = 1000;
var matriz = new Array(17);

var matriz2 = new Array(13);
var estado = 0;
var fila1 = [];
var comillas = 0;
var corchetesab = 0;
var corchetesce = 0;
var count = 0;
var tmp;
var palabraTem = "";
var mensaje = "";
var errores = 0;

matriz[0] = new Array(12);
matriz[1] = new Array(12);
matriz[2] = new Array(12);
matriz[3] = new Array(12);
matriz[4] = new Array(12);
matriz[5] = new Array(12);
matriz[6] = new Array(12);
matriz[7] = new Array(12);
matriz[8] = new Array(12);
matriz[9] = new Array(12);
matriz[10] = new Array(12);
matriz[11] = new Array(12);
matriz[12] = new Array(12);
matriz[13] = new Array(12);
matriz[14] = new Array(12);
matriz[15] = new Array(12);
matriz[16] = new Array(12);

for (var i = 0; i < 17; i++) {
  for (var u = 0; u < 12; u++) {
    matriz[i][u] = 0;
  }
}

matriz[0][0] = 1;
matriz[0][1] = 2;
matriz[0][2] = 3;
matriz[0][3] = 4;
matriz[0][4] = 5;
matriz[0][5] = 6;
matriz[0][7] = 9;
matriz[0][8] = 10;
matriz[0][9] = 12;
matriz[0][10] = 14;
matriz[0][11] = 3;


matriz[1][1] = 2;
matriz[6][5] = 6;
matriz[7][5] = 8;
matriz[8][5] = 8;
matriz[9][5] = 9;
matriz[6][6] = 7;
matriz[9][7] = 9;

matriz[10][0] = 11;
matriz[10][1] = 11;
matriz[10][2] = 11;
matriz[10][3] = 11;
matriz[10][4] = 11;
matriz[10][5] = 11;
matriz[10][6] = 11;
matriz[10][7] = 11;
matriz[10][9] = 11;
matriz[10][10] = 11;
matriz[10][11] = 11;

matriz[11][0] = 11;
matriz[11][1] = 11;
matriz[11][2] = 11;
matriz[11][3] = 11;
matriz[11][4] = 11;
matriz[11][5] = 11;
matriz[11][6] = 11;
matriz[11][7] = 11;
matriz[11][8] = 55;
matriz[11][9] = 11;
matriz[11][10] = 11;
matriz[11][11] = 11;

matriz[12][0] = 13;
matriz[12][1] = 13;
matriz[12][2] = 13;
matriz[12][3] = 13;
matriz[12][4] = 13;
matriz[12][5] = 13;
matriz[12][6] = 13;
matriz[12][7] = 13;
matriz[12][10] = 13;
matriz[12][11] = 13;

matriz[13][9] = 55;
matriz[14][11] = 15;

matriz[15][0] = 15;
matriz[15][1] = 15;
matriz[15][2] = 15;
matriz[15][3] = 15;
matriz[15][4] = 15;
matriz[15][5] = 15;
matriz[15][6] = 15;
matriz[15][7] = 15;
matriz[15][8] = 15;
matriz[15][9] = 15;
matriz[15][10] = 15;
matriz[15][11] = 16;
matriz[16][10] = 55;

var array = [];

input.addEventListener('change', onChange);
function onChange(event) {
  var file = event.target.files[0];
  reader.readAsText(file);
  reader.onload = onLoad;
}
function onLoad() {
  var tmpo = [];
  result = reader.result;
  lineas = result.split('\n');
  var conteo = 1;
  for (var linea of lineas) {
    if (linea != '') {
      tmpo.push(linea);
      datos2.innerHTML = datos2.innerHTML + "<h4 style='display:inline-block; margin: 2px 8px 2px;color:yellow;'>" + conteo + "</h4><h4 style='display:inline-block; margin: 2px 8px 2px;'>" + linea + "</h4><br>"
    }
    conteo++;
  }
  for (let index = 0; index < tmpo.length; index++) {
    var temporal = tmpo[index].split(' ');
    for (let i = 0; i < temporal.length; i++) {
      try {
        var numero = temporal[i].length;
        if (numero == 0) {
        } else {
          array.push(temporal[i]);
        }
      } catch (error) {
      }
    }
  }
  partir();
}

function partir() {
  palabraTem = "";
  let nuevoE = 0;
  let columna = 0;
  for (let p = 0; p < lineas.length; p++) {
    var lineaTemporal = lineas[p];
    if (estado == 11 || estado == 12 || estado == 15) {

      palabraTem = "";
    }
    for (let q = 0; q < lineaTemporal.length; q++) {
      var char = lineaTemporal.charAt(q);
      char1 = char.replace(' ', '_');
      if (char1 >= 0) {
        tipo = 5;
      } else if (esLetra(char1)) {
        tipo = 7;
      } else if (esOpera(char1)) {
        tipo = 2;
      } else if (char1 == ':' || char1 == ';') {
        tipo = 4;
      } else if (char1 == '"') {
        comillas++;
        tipo = 8;
      } else if (char1 == "'") {
        tipo = 9;
      } else if (char1 == '/') {
        tipo = 10;
      } else if (char1 == '*') {
        tipo = 11;
      } else if (char1 == '.') {
        tipo = 6;
      } else if (char1 == '{' || char1 == '(' || char1 == ')') {
        tipo = 3;
        if (char1 == '{') {
          corchetesab++;
        }
      } else if (char1 == '=' || char1 == '<' || char1 == '>') {
        if (estado = 0) {
          tipo = 0;
        } else {
          tipo = 1;
        }
      } else if (char1 == '}') {
        tipo = 3;
        corchetesce++;
      } else if (char1 == '_') {
        if (palabraTem.length > 0 && estado < 10) {
          palabras1.push(palabraTem);
          columna++;
          columnas.push(columna);
          fila1.push(p + 1);
          palabraTem = "";
          estado = 0;
          tipo = 111111;
        } else {
          tipo = 4;
        }
      }

      if (p == (lineas.length - 1) && q == (lineaTemporal.length - 1)) {
        if (palabraTem.length > 0 && estado < 10) {
          palabras1.push(palabraTem);
          fila1.push(p + 1);
          columna++;
          columnas.push(columna);
          palabraTem = "";
        }

        palabraTem += char1;
        if (estado < 10) {
          palabras1.push(palabraTem);
        } else {
          var imp1 = "";
          for (var i = 0; i < palabraTem.length; i++) {
            imp1 += palabraTem.charAt(i).replace('_', ' ');
          }
          palabras1.push(imp1);
        }

        columna++;
        columnas.push(columna);
        fila1.push(p + 1);
      } else {
        if (tipo < 56) {
          nuevoE = matriz[estado][tipo];
          if (nuevoE == 55) {
            palabraTem += char1;
            var imp = "";
            for (var i = 0; i < palabraTem.length; i++) {
              imp += palabraTem.charAt(i).replace('_', ' ');
            }
            palabras1.push(imp);

            columna++;
            columnas.push(columna);
            fila1.push(p + 1);
            palabraTem = "";
            estado = 0;
          } else if (nuevoE > 0) {
            palabraTem += char1;
            estado = matriz[estado][tipo];
          } else {
            if (palabraTem.length > 0) {

              if (estado != 11 && estado != 12 && estado != 15) {
                var patem = palabraTem.trim();
                if (patem.length == 0 || patem == "_") {

                } else {
                  palabras1.push(palabraTem);
                  columna++;
                  columnas.push(columna);
                }
              }
              fila1.push(p + 1);
              palabraTem = "";
              palabraTem += char1;
              estado = matriz[0][tipo];
            } else {
              palabraTem = "";
            }
          }
        } else {

        }
      }
    }
    if (estado == 11 || estado == 12 || estado == 15) {

    } else {
      palabraTem = "";
      estado = 0;
    }
    columna = 0;
  }
  definirTipo();
  escribiendoMensaje();
  hacerMatriz();
}
function hacerMatriz() {
  for (var h = 0; h < 13; h++) {
    matriz2[p] = new Array(31);
  }
  for (var i = 0; i < 13; i++) {
    for (var u = 0; u < 31; u++) {
      matriz2[i][u] = 0;
    }
  }
  estadosMatriz();
}
function estadosMatriz() {
  matriz2[0][0] = ['FUNCION','PRINCIPAL','{','operaciones','}','codigo'];
  matriz2[1][0] = ['FUNCION','ID','(','parametros',')','{','operaciones','}','codigo'];
  matriz2[1][2] = ['operaciones'];
  matriz2[1][3] = ['operaciones'];
  matriz2[1][4] = ['operaciones'];
  matriz2[1][23] = ['EPSILON'];
  matriz2[1][5] = ['operaciones'];
  matriz2[2][2] = ['VARIABLE','tipo','ID','f'];
  matriz2[1][6] = ['operaciones'];
  matriz2[2][3] = ['SI','(','CONDICION',')','{','operaciones','}','p','operaciones'];
  matriz2[2][4] = ['MIENTRAS','(','CONDICION',')','{','operaciones','}','operaciones'];
  matriz2[2][5] = ['HACER','{','operaciones','}','MIENTRAS','(','CONDICION',')','operaciones'];
  matriz2[2][6] = ['ID','f'];
  matriz2[3][2] = ['EPSILON'];
  matriz2[3][3] = ['EPSILON'];
  matriz2[3][4] = ['EPSILON'];
  matriz2[3][5] = ['EPSILON'];
  matriz2[3][6] = ['EPSILON'];
  matriz2[3][7] = ['SINO','{','codigo','}'];
  
  matriz2[4][22] = ['(','parametros',')'];
  matriz2[4][29] = ['=','valor',';'];
  matriz2[4][30] = [';'];

  matriz2[5][8] = ['ENTERO'];
  matriz2[5][9] = ['FLOTANTE'];
  matriz2[5][10] = ['BOOLEANO'];
  matriz2[5][11] = ['FLOTANTE'];
  
  matriz2[6][2] = ['VARIABLE','ID','=','valor'];
  matriz2[6][6] = ['ID'];

  matriz2[7][17] = ['CADENAV'];
  matriz2[7][18] = ['ENTEROV'];
  matriz2[7][19] = ['FLOTANTEV'];
  matriz2[7][20] = ['FLOTANTEV'];
  matriz2[7][21] = ['BOOLEANOV'];
  matriz2[7][27] = ['EPSILON'];

  matriz2[8][6] = ['ID','operador','ID','q','math'];
  matriz2[8][22] = ['(','math',')','q'];
  matriz2[8][27] = ['EPSILON'];

  matriz2[9][6] = ['EPSILON'];
  matriz2[9][12] = ['operador'];
  matriz2[9][13] = ['operador'];
  matriz2[9][14] = ['operador'];
  matriz2[9][15] = ['operador'];
  matriz2[9][16] = ['operador'];
  matriz2[9][22] = ['EPSILON'];
  matriz2[9][28] = ['EPSILON'];

  matriz2[10][12] = ['+'];
  matriz2[10][13] = ['-'];
  matriz2[10][14] = ['*'];
  matriz2[10][15] = ['/'];
  matriz2[10][16] = ['%'];
  matriz2[10][24] = ['=='];
  matriz2[10][25] = ['<='];
  matriz2[10][26] = ['>='];
  matriz2[11][6] = ['ID','comparador','valor'];
  matriz2[12][24] = ['=='];
  matriz2[12][25] = ['<='];
  matriz2[12][26] = ['>='];
}
function definirTipo() {
  var temporalpal = "";
  for (var i = 0; i < palabras1.length; i++) {
    temporalpal = palabras1[i];
    if (temporalpal >= 0 || temporalpal.charAt(0) >= 0) {
      console.log(temporalpal);
      if (temporalpal - Math.floor(temporalpal) == 0) {
        tipos.push("ENTERO");
        buscando.push("ENTEROV");
      } else {
        tipos.push("FLOTANTE");
        buscando.push("FLOTANTEV");
      }
    } else if (temporalpal.length == 1 && !esLetra(temporalpal.charAt(0))) {
      if (esOpera(temporalpal) || temporalpal == "/" || temporalpal == "*") {
        tipos.push("OPERADOR");
        buscando.push(temporalpal);
      } else if (temporalpal == '"' || temporalpal == ':' || temporalpal == ';' || temporalpal == '“') {
        tipos.push("SIMBOLO");
        if (temporalpal==';'){
          buscando.push(';');
        } else {
          buscando.push('SIMBOLO DESCONOCIDO');
        }
      } else if (temporalpal == '.') {
        tipos.push("PUNTO-ERROR");
      } else if (temporalpal == '{' || temporalpal == '(' || temporalpal == ')') {
        tipos.push("AGRUPACION");
        buscando.push(temporalpal);
      } else if (temporalpal == '=' || temporalpal == '<' || temporalpal == '>') {
        tipos.push("OPERADOR");
        buscando.push(temporalpal);
      } else if (temporalpal == '}') {
        tipos.push("AGRUPACION");
        buscando.push(temporalpal);
      }
    } else if (temporalpal == '<=' || temporalpal == '>=' || temporalpal == '==') {
      tipos.push("COMPARADOR");
      buscando.push(temporalpal);
    } else {
      if (temporalpal.length > 1 && temporalpal.indexOf('"') != -1 && temporalpal.charAt(0) == '"') {
        tipos.push("CADENA");
        buscando.push('CADENA');
      } else if (temporalpal.length > 3 && temporalpal.indexOf('*') != -1 && temporalpal.charAt(0) == '/') {
        tipos.push("COMENTARIO");
        buscando.push("COMENTARIO");
      } else if (temporalpal.length == 3 && temporalpal.indexOf("'") != -1 && temporalpal.charAt(2) == "'") {
        tipos.push("CARACTER");
        buscando.push("CADENAV");
      } else {
        if (esPalabraReservada(temporalpal)) {
          tipos.push(temporalpal.toUpperCase());
          buscando.push(temporalpal.toUpperCase());
        } else {
          tipos.push("IDENTIFICADOR");
          buscando.push("ID");
        }
      }
    }
  }
}
function escribiendoMensaje() {
  if (corchetesce != corchetesab) {
    errores++;
    mensaje += "<h5>" + errores + " ERROR - Falta que se cierre un corchete</h5>";
  }
  if (comillas % 2 != 0) {
    errores++;
    mensaje += "<h5>" + errores + " ERROR - Falta que se cierre un corchete</h5>";
  }
  if (errores == 1) {
    var txttemp = "<h4>" + errores + " ERROR</h4>" + mensaje;
  } else {
    var txttemp = "<h4>" + errores + " ERRORES</h4>" + mensaje;
  }
  mensaje = txttemp;
  corchetesab = 0;
  corchetesce = 0;
  comillas = 0;
}

const sendData = () => {
  axios.post('http://localhost:3000/postusers',
    {
      arrayTipos: tipos,
      arrayColumnas: columnas,
      arrayLinea: fila1,
      arrayAnalisis: buscando,
      prue: palabras1
    },
    {
      'Content-Type': 'application/json'
    })
    .then(response => {
    })
    .catch(error => {
      console.log(error);
    });
  count++;
};

function mostrar() {
  var errores1 = document.getElementById("errores1");
  errores1.innerHTML = errores1.innerHTML + mensaje;
  var x = document.getElementById('contenido');
  var y = document.getElementById('central');
  var z = document.getElementById('get');
  var a = document.getElementById('post');
  if (x.style.display = 'none') {
    x.style.display = 'block';
    z.style.display = 'inline-block';
    a.style.display = 'inline-block';
    y.style.margin = '2% 30% 5% 30%';
  } else {
    x.style.display = 'none';
  }
}
const getData = () => {
  axios.get(url).then(response => {
    for (let y = 0; y < response.data.tx3.length; y++) {
      setTimeout(function () {
        var htmlTexto = "<tr><td>" + response.data.tx3[y] + "</td><td>" + response.data.tx4[y] + "</td><td>" + response.data.tx5[y] + "</td><td>" + response.data.tx6[y] + "</td></tr>";
        datos.innerHTML = datos.innerHTML + htmlTexto;
      }, (500));
    }
  })
    .catch(error => {
      console.log(error);
    });
};

postButton.addEventListener('click', sendData);
getButton.addEventListener('click', getData);

const esLetra = (caracter) => {
  let ascii = caracter.toUpperCase().charCodeAt(0);
  return ascii > 64 && ascii < 91;
};
const esOpera = (caracter) => {
  var array1 = ['-', '+', '%'];
  let paso = false;
  for (var i = 0; i < array1.length; i++) {
    if (caracter.charAt(0) == array1[i]) {
      paso = true;
      break;
    }
  }
  return paso;
};
const esPalabraReservada = (caracter) => {
  var array1 = ['FUNCION', 'FUNCTION', 'PRINCIPAL', 'RETORNAR', 'VACIO', 'VARIABLE', 'ENTERO', 'DECIMAL', 'BOOLEANO', 'CADENA', 'CARACTER', 'SI', 'SINO', 'MIENTRAS', 'PARA', 'HACER', 'IMPRIMIR', 'VERDADERO', 'FALSO', 'IF', 'ELSE', 'INT'];
  let paso = false;
  for (var i = 0; i < array1.length; i++) {
    if (caracter.toUpperCase() == array1[i]) {
      paso = true;
      break;
    }
  }
  return paso;
};