// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyCyzSKZJjTXILgTptrcjSogm8lPZfRrJtI",
    authDomain: "practicar-punteria.firebaseapp.com",
    projectId: "practicar-punteria"
  });
  
  var db = firebase.firestore();


  /* CRONOMETRO */

  var z;
var startstop = 0;

function startStop() { /* Toggle StartStop */

  startstop = startstop + 1;

  if (startstop === 1) {
    start();
    document.getElementById("start").innerHTML = "Stop";
  } else if (startstop === 2) {
    document.getElementById("start").innerHTML = "Start";
    startstop = 0;
    stop();
  }

}


function start() {
  z = setInterval(timer, 10);
} /* Start */

function stop() {
  clearInterval(z);
} /* Stop */

var milisec = 0;
var sec = 0; /* holds incrementing value */
var min = 0;
var hour = 0;

/* Contains and outputs returned value of  function checkTime */

var miliSecOut = 0;
var secOut = 0;
var minOut = 0;
var hourOut = 0;

/* Output variable End */


function timer() {
  /* Main Timer */


  miliSecOut = checkTime(milisec);
  secOut = checkTime(sec);
  minOut = checkTime(min);
  hourOut = checkTime(hour);

  milisec = ++milisec;

  if (milisec === 100) {
    milisec = 0;
    sec = ++sec;
  }

  if (sec == 60) {
    min = ++min;
    sec = 0;
  }

  if (min == 60) {
    min = 0;
    hour = ++hour;

  }

  


  document.getElementById("milisec").innerHTML = miliSecOut;
  document.getElementById("sec").innerHTML = secOut;
  document.getElementById("min").innerHTML = minOut;
  document.getElementById("hour").innerHTML = hourOut;

}


/* Adds 0 when value is <10 */


function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function reset() {


  /*Reset*/

  milisec = 0;
  sec = 0;
  min = 0
  hour = 0;

  document.getElementById("milisec").innerHTML = "00";
  document.getElementById("sec").innerHTML = "00";
  document.getElementById("min").innerHTML = "00";
  document.getElementById("hour").innerHTML = "00";

}


let x = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
let y = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
document.getElementById('divContenido').style.height = (y - document.getElementById('divPuntos').offsetHeight) + 'px';

var altura = document.getElementById('divContenido').style.height;
altura = altura.replace('px', '');
var c = 0;
var a = 0;
var botonEmpezar = document.getElementById('btnEmpezar');
var tipoUsuario = '';
var navegador=navigator.userAgent; //busco el "userAgent" del usuario.
//lista de palabras del "userAgent" en los móviles
moviles=["Mobile","iPhone","iPod","BlackBerry","Opera Mini","Sony","MOT","Nokia","samsung"];
detector=0; //Variable que detectará si se usa un móvil
for (i in moviles) { //comprobar en la lista ...
   //si el método "indexOf" no devuelve -1, indica que la palabra está en el "userAgent"
   compruebo=navegador.indexOf(moviles[i]); 
   if (compruebo>-1) { 
      detector=1; //Si es un móvil, cambio el valor del detector
      }
   }
if (detector==1) { //si es un móvil redirecciono la página.
    tipoUsuario= 'Movil'; 
   }else{
    tipoUsuario= 'Computadora';
   }
   document.getElementById('tipoUsuario').innerHTML = tipoUsuario;
   

function sumar(){
    document.getElementById('btnEmpezar').removeAttribute('onclick');
    
    a++;
    c=0;
    if(a==0){

    }
    else if(a>0){

        var count2=3;
        var counter2 = setInterval(cont3seg, 1000); //1000 will  run it every 1 second
        
        function cont3seg() {
            
            count2 = count2 - 1;
            if (count2 == -1) {
                clearInterval(counter2);
                return;
            }
        
            var seconds = count2 % 60;
            var minutes = Math.floor(count2 / 60);
            var hours = Math.floor(minutes / 60);
            minutes %= 60;
            hours %= 60;
            if(seconds<10){
                seconds = seconds;
            }
            
            
            document.getElementById("sec").innerHTML = "0" + seconds;
            if(minutes == 0 && seconds == 0){
                
                document.getElementById("btnEmpezar").setAttribute('onclick','location.reload()');
                start();
                primerTiro();
                document.getElementById("btnEmpezar").innerHTML = "REINTENTAR";
                
            }
        }
    }
}

function cambio() {
    /*  x = ancho
        altura = alto
    */
        if(x>1100){
          do{
              var randomY = (Math.random() * altura).toFixed();
              var randomX = (Math.random() * x).toFixed();
          }while(randomX>(x-200) || randomY>(y-200))

          c++;
          if(c==20){
            stop();
            var tiempoFinal = minOut + ":" + secOut + ":" + miliSecOut;
            document.getElementById("btnEmpezar").setAttribute('onclick','location.reload()');
            document.getElementById('punto').style.visibility= 'hidden';
            location.href= '#openModal';
            document.getElementById("puntuacion").innerHTML = "CLICKS: 0";
          }
          console.log('El punto aparece en: (' + randomX + ',' + randomY + ')');
          document.getElementById("punto").style.left = randomX+"px";
          document.getElementById("punto").style.top = randomY+"px";
          document.getElementById("puntuacion").innerHTML = "CLICKS: "+ c;
          document.getElementById('pntsFinales').innerHTML = tiempoFinal;
      }
      if(x<1101){
           do{
               var randomY = (Math.random() * altura).toFixed();
               var randomX = (Math.random() * x).toFixed();
           }while(randomX>(x-100) || randomY>(y-100))
           c++;
          if(c==20){
            stop();
            var tiempoFinal = minOut + ":" + secOut + ":" + miliSecOut;
            document.getElementById("btnEmpezar").setAttribute('onclick','location.reload()');
            document.getElementById('punto').style.visibility= 'hidden';
            location.href= '#openModal';
            document.getElementById("puntuacion").innerHTML = "CLICKS: 0";
          }
          console.log('El punto aparece en: (' + randomX + ',' + randomY + ')');
          document.getElementById("punto").style.left = randomX+"px";
          document.getElementById("punto").style.top = randomY+"px";
          document.getElementById("puntuacion").innerHTML = "CLICKS: "+ c;
          document.getElementById('pntsFinales').innerHTML = tiempoFinal;
   
       }
       

    
}

function primerTiro() {
    do{
        var randomY = (Math.random() * altura).toFixed();
        var randomX = (Math.random() * x).toFixed();
    }while(randomX>(x-200) || randomY>(y-200))
    document.getElementById('punto').style.visibility= 'visible';
    console.log('El punto aparece en: (' + randomX + ',' + randomY + ')');
    document.getElementById("punto").style.left = randomX+"px";
    document.getElementById("punto").style.top = randomY+"px";
    document.getElementById("puntuacion").innerHTML = "CLICKS: "+ c;
    document.getElementById('pntsFinales').innerHTML = c;
    
}

  function guardar(){
    if(validar()){
      var nombre=document.getElementById('nombre').value;
      var tipoJuego='20clicks';
      var navegador = tipoUsuario;
      var puntuacionTotal = minOut + ":" + secOut + ":" + miliSecOut;
      db.collection("users").add({
          nombre: nombre,
          pais: document.getElementById('country').value,
          tiempo: puntuacionTotal,
          tipoJuego: tipoJuego,
          navegador: navegador
      })
      .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          location.href = '20clicks.html?#close';
      })
      .catch((error) => {
          console.error("Error adding document: ", error);
      });
    }else{
      alert('Falta llenar tu nombre');
    }

  }

  function validar(){
    if(document.getElementById('nombre').value == null || document.getElementById('nombre').value == ""){
        return false;
    }else{
        return true;
    }
}

  