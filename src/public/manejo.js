const archivo = document.getElementById('archivo');
const texto1 = document.getElementById('texto');
const boton = document.querySelector('#verif');

boton.addEventListener('click', analizar);

archivo.addEventListener('change', function () {
    if (archivo.files.length > 0) {
      readFile(archivo.files[0]);
    }
  });
  
  function readFile(file) {
    const reader = new FileReader();
    reader.onload = function() {
      texto1.value= reader.result; 
    }
    reader.readAsText(file);
  }
  
  var URL = 'http://localhost:3000/analizar';
  
  function handleSuccess(data) { console.log(data); }
  function handleFailure(data) { console.log('error', data); }
  
  function analizar(){
    console.log('llegando');
    axios.post(URL, {
      textoDeIngreso: texto1.value
    })
    .then(handleSuccess)
    .catch(handleFailure);
  };
  
  // GET
  axios.get(URL, { params: BODY })
    .then(handleSuccess)
    .catch(handleFailure);