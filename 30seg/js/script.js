// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyCyzSKZJjTXILgTptrcjSogm8lPZfRrJtI",
    authDomain: "practicar-punteria.firebaseapp.com",
    projectId: "practicar-punteria"
  });
  
  var db = firebase.firestore();

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
            document.getElementById("timer").innerHTML = seconds;
            if(minutes == 0 && seconds == 0){
                document.getElementById("btnEmpezar").innerHTML = "REINTENTAR";
                document.getElementById("timer").innerHTML = "0:30";
                
                var count = 30;
                var counter = setInterval(timer, 1000); //1000 will  run it every 1 second
                
                function timer() {
                    count = count - 1;
                    if (count == -1) {
                        clearInterval(counter);
                        return;
                    }
                    
                    var seconds = count % 60;
                    var minutes = Math.floor(count / 60);
                    var hours = Math.floor(minutes / 60);
                    minutes %= 60;
                    hours %= 60;
                    if(seconds<10){
                        seconds = "0"+seconds;
                    }
                    document.getElementById("btnEmpezar").setAttribute('onclick','location.reload()');
                    document.getElementById("timer").innerHTML = minutes + ":" + seconds;
                    if(minutes == 0 && seconds == 0){
                        document.getElementById("btnEmpezar").setAttribute('onclick','sumar()');
                        document.getElementById('punto').style.visibility= 'hidden';
                        location.href= '#openModal';
                        document.getElementById("timer").innerHTML = "3";
                        document.getElementById("puntuacion").innerHTML = "PUNTUACIÓN: 0";
                    }
                }
                primerTiro();
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
       console.log('El punto aparece en: (' + randomX + ',' + randomY + ')');
       document.getElementById("punto").style.left = randomX+"px";
       document.getElementById("punto").style.top = randomY+"px";
       document.getElementById("puntuacion").innerHTML = "PUNTUACIÓN: "+ c;
       document.getElementById('pntsFinales').innerHTML = c;
   }
   if(x<1101){
        do{
            var randomY = (Math.random() * altura).toFixed();
            var randomX = (Math.random() * x).toFixed();
        }while(randomX>(x-100) || randomY>(y-100))

        c++;
        console.log('El punto aparece en: (' + randomX + ',' + randomY + ')');
        document.getElementById("punto").style.left = randomX+"px";
        document.getElementById("punto").style.top = randomY+"px";
        document.getElementById("puntuacion").innerHTML = "PUNTUACIÓN: "+ c;
        document.getElementById('pntsFinales').innerHTML = c;
    }
    
}

function primerTiro() {
    do{
        var randomY = (Math.random() * altura).toFixed();
        var randomX = (Math.random() * x).toFixed();
    }while(randomX>(x-200) || randomY>(y-200))
    document.getElementById('punto').style.visibility= 'visible';
    document.getElementById('btnEmpezar').removeAttribute('onclick');
    console.log('El punto aparece en: (' + randomX + ',' + randomY + ')');
    document.getElementById("punto").style.left = randomX+"px";
    document.getElementById("punto").style.top = randomY+"px";
    document.getElementById("puntuacion").innerHTML = "PUNTUACIÓN: "+ c;
    document.getElementById('pntsFinales').innerHTML = c;
    
}

  function guardar(){
      if(validar()){
        var nombre=document.getElementById('nombre').value;
        var pais=document.getElementById('country').value;
        var tipoJuego='30seg';
        var navegador = tipoUsuario;
        var puntuacionTotal = c;
        db.collection("users").add({
            nombre: nombre,
            pais: pais,
            puntuacionTotal: puntuacionTotal,
            tipoJuego: tipoJuego,
            navegador: navegador
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            location.href = '30seg.html?#close';
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