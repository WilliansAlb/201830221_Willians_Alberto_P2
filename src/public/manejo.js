const getButton = document.querySelector("#get");
const postButton = document.querySelector("#post");
var datos = document.getElementById("tabla0");
var datos2 = document.getElementById("contenido");
const url = "http://localhost:3000/users";
const urlp = "http://localhost:3000/pusers";
var result;
var lineas;
let w = 0;
var palabras1 = [];
var tipos = [];
var tipo = 1000;
var matriz = new Array(17);
var estado = 0;
var fila1 = [];


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


var input = document.getElementById('archivo');
var reader = new FileReader;

input.addEventListener('change', onChange);
function onChange(event) {
  var file = event.target.files[0];
  reader.readAsText(file);
  reader.onload = onLoad;
}
var array = [];
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
var count = 0;
var tmp;
var palabraTem = "";
function partir() {
  palabraTem = "";
  let nuevoE = 0;
  var corchete = 0;
  for (let p = 0; p < lineas.length; p++) {
    var lineaTemporal = lineas[p];
    palabraTem = "";
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
      } else if (char1 == '=' || char1 == '<' || char1 == '>') {
        if (estado = 0) {
          tipo = 0;
        } else {
          tipo = 1;
        }
      } else if (char1 == '}') {
        tipo = 3;
      } else if (char1 == '_') {
        if (palabraTem.length > 0 && estado < 10) {
          palabras1.push(palabraTem);
          console.log(palabraTem);
          fila1.push(p + 1);
          palabraTem = "";
          estado = 0;
          tipo = 111111;
        } else {
          tipo = 4;
        }
      }

      if (p == (lineas.length - 1) && q == (lineaTemporal.length - 1)) {
        if (palabraTem.length > 0){
          palabras1.push(palabraTem);
        }
        palabraTem = "";
        palabraTem += char1;
        palabras1.push(palabraTem);
        console.log(palabraTem);
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
            console.log(imp);
            fila1.push(p + 1);
            palabraTem = "";
            estado = 0;
          } else if (nuevoE > 0) {
            palabraTem += char1;
            estado = matriz[estado][tipo];
          } else {
            if (palabraTem.length > 0) {
              if (palabraTem != '_') {
                palabras1.push(palabraTem);
              }
              console.log(palabraTem);
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
    if (estado == 11 && estado == 12 && estado == 15) {
      console.log("continua el comentario");
    } else {
      palabraTem = "";
      estado = 0;
    }
  }
  definirTipo();
}

function definirTipo() {
  var temporalpal = "";
  for (var i = 0; i < palabras1.length; i++) {
    temporalpal = palabras1[i];
    if (temporalpal >= 0) {
      if (temporalpal - Math.floor(temporalpal) == 0) {
        tipos.push("ENTERO");
      } else {
        tipos.push("FLOTANTE");
      }
    } else if (temporalpal.length == 1 && !esLetra(temporalpal.charAt(0))) {
      if (esOpera(temporalpal) || temporalpal == "/" || temporalpal == "*") {
        tipos.push("OPERADOR");
      } else if (temporalpal == '"' || temporalpal == ':' || temporalpal == ';' || temporalpal == '“') {
        tipos.push("SIMBOLO");
      } else if (temporalpal == '.') {
        tipos.push("PUNTO-ERROR");
      } else if (temporalpal == '{' || temporalpal == '(' || temporalpal == ')') {
        tipos.push("AGRUPACION");
      } else if (temporalpal == '=' || temporalpal == '<' || temporalpal == '>') {
        tipos.push("OPERADOR");
      } else if (temporalpal == '}') {
        tipos.push("AGRUPACION");
      }
    } else if (temporalpal == '<=' || temporalpal == '>=' || temporalpal == '==') {
      tipos.push("COMPARADOR");
    } else {
      tipos.push("IDENTIFICADOR");
    }
  }
}

const sendData = () => {
  if (count < array.length) {
    tmp = array[count];
  }
  else {
    tmp = 'fin';
  }
  axios.post('http://localhost:3000/postusers',
    {
      arrayTipos: tipos,
      arrayLinea: fila1,
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


const getData = () => {
  axios.get(url).then(response => {
    if (tmp != 'fin') {
      //var htmlTexto = "<tr><td>" + response.data.tx3[w] + "</td><td>" + response.data.tx3.length+ "</td><td>" + tmp + "</td></tr>";
      //w++;
      //datos.innerHTML = datos.innerHTML + htmlTexto;
    }
    for (let y = 0; y < response.data.tx3.length; y++) {
      setTimeout(function () {
        var htmlTexto = "<tr><td>" + response.data.tx3[y] + "</td><td>" + response.data.tx4[y] + "</td><td>" + response.data.tx5[y] + "</td></tr>";
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