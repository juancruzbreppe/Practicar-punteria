function sortJSON(data, key, orden) {
    return data.sort(function (a, b) {
        var x = a[key],
        y = b[key];

        if (orden === 'asc') {
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        }

        if (orden === 'desc') {
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        }
    });
}

function sortJSONnumbers(data, key, orden) {
  return data.sort(function (a, b) {
      var x = parseFloat(a[key]),
      y = parseFloat(b[key]);

      if (orden === 'asc') {
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      }

      if (orden === 'desc') {
          return ((x > y) ? -1 : ((x < y) ? 1 : 0));
      }
  });
}


function toDate(dStr) {
    var partes = dStr.split(':');
	var now = new Date(1970,1,1,0,partes[0],partes[1],partes[2]);
 	return now;
}

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyCyzSKZJjTXILgTptrcjSogm8lPZfRrJtI",
    authDomain: "practicar-punteria.firebaseapp.com",
    projectId: "practicar-punteria"
  });
  
  var db = firebase.firestore();

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
    document.getElementById('tipoMedio').getElementsByTagName('option')[1].selected = 'selected';
   }else{
    tipoUsuario= 'Computadora';
    document.getElementById('tipoMedio').getElementsByTagName('option')[0].selected = 'selected';
   }

//Leer datos
function selecPais(){
    var cont30seg = 0;
    var cont60seg = 0;
    var cont20clicks = 0;
    var cont50clicks = 0;
    var cont100clicks = 0;
    var seg30 = document.getElementById('30seg');
    var seg60 = document.getElementById('60seg');
    var clicks20 = document.getElementById('20clicks');
    var clicks50 = document.getElementById('50clicks');
    var clicks100 = document.getElementById('100clicks');
    var json30seg = [];
    var json60seg = [];
    var json20clicks = [];
    var json50clicks = [];
    var json100clicks = [];


    /* 30 SEGUNDOS */
    db.collection("users").where("tipoJuego", "==", "30seg").where("navegador", "==", document.getElementById('tipoMedio').value).get().then((querySnapshot) => {
      seg30.innerHTML= '';
        
        querySnapshot.forEach((doc) => {
          cont30seg++;
          json30seg.push({jugador: `${doc.data().nombre}`,pais: `${doc.data().pais}`,puntos:`${doc.data().puntuacionTotal}` });
      });
      var json30segO = sortJSONnumbers(json30seg,'puntos','desc');
      if(json30segO.length == 0 || json30segO.length == null){
        seg30.innerHTML += `
                <tr>
                  <th scope="row">-</th>
                  <td>AÚN NO HAY DATOS AQUÍ!</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
          `
      }
      for(let i =0; i< 50; i++){
        seg30.innerHTML += `
                <tr>
                  <th scope="row">${i+1}</th>
                  <td>${json30segO[i].pais}</td>
                  <td>${json30segO[i].jugador}</td>
                  <td>${json30segO[i].puntos}</td>
                </tr>
          `
      }
    });


    /* 60 SEGUNDOS */
    db.collection("users").where("tipoJuego", "==", "60seg").where("navegador", "==", document.getElementById('tipoMedio').value).get().then((querySnapshot) => {
        
      seg60.innerHTML= '';
      querySnapshot.forEach((doc) => {
        cont60seg++;
        json60seg.push({jugador: `${doc.data().nombre}`,pais: `${doc.data().pais}`,puntos:`${doc.data().puntuacionTotal}` });
      });
      var json60segO = sortJSONnumbers(json60seg,'puntos','desc');
      if(json60segO.length == 0 || json60segO.length == null){
        seg60.innerHTML += `
                <tr>
                  <th scope="row">-</th>
                  <td>AÚN NO HAY DATOS AQUÍ!</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
          `
      }
      for(let i =0; i< 50; i++){
        seg60.innerHTML += `
                <tr>
                  <th scope="row">${i+1}</th>
                  <td>${json60segO[i].pais}</td>
                  <td>${json60segO[i].jugador}</td>
                  <td>${json60segO[i].puntos}</td>
                </tr>
          `
      }
    });


    /* 20 CLICKS */
    db.collection("users").where("tipoJuego", "==", "20clicks").where("navegador", "==", document.getElementById('tipoMedio').value).get().then((querySnapshot) => {
        clicks20.innerHTML= '';
      querySnapshot.forEach((doc) => {
        cont20clicks++;
        json20clicks.push({jugador: `${doc.data().nombre}`,pais: `${doc.data().pais}`,time:`${doc.data().tiempo}` });
      });
      var tiempoArreglado;
      for(let i =0; i<json20clicks.length;i++){
          tiempoArreglado = toDate(json20clicks[i].time);
          json20clicks[i].time = tiempoArreglado;
      }
      var json20clicksO = sortJSON(json20clicks,'time','asc');
      if(json20clicksO.length == 0 || json20clicksO.length == null){
        clicks20.innerHTML += `
                <tr>
                  <th scope="row">-</th>
                  <td>AÚN NO HAY DATOS AQUÍ!</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
          `
      }
      for(let i =0; i< 50; i++){
        var min =json20clicksO[i].time.getMinutes();
        var sec =json20clicksO[i].time.getSeconds();
        var ms =json20clicksO[i].time.getMilliseconds();
        
          if(ms<10){
            ms= '0'+ms;
          }
          if(sec<10){
            sec= '0'+sec;
          }
          if(min<10){
            min= '0'+min;
          }

            clicks20.innerHTML += `
                <tr>
                  <th scope="row">${i+1}</th>
                  <td>${json20clicksO[i].pais}</td>
                  <td>${json20clicksO[i].jugador}</td>
                  <td>${min}:${sec}:${ms}</td>
                </tr>
          `
      }

    });


    /* 50 CLICKS */
    db.collection("users").where("tipoJuego", "==", "50clicks").where("navegador", "==", document.getElementById('tipoMedio').value).get().then((querySnapshot) => {
        clicks50.innerHTML= '';
      querySnapshot.forEach((doc) => {
          cont50clicks++;
          json50clicks.push({jugador:`${doc.data().nombre}`,pais: `${doc.data().pais}`,time:`${doc.data().tiempo}` });
      });
      var tiempoArreglado;
      for(let i =0; i<json50clicks.length;i++){
          tiempoArreglado = toDate(json50clicks[i].time);
          json50clicks[i].time = tiempoArreglado;
      }
      var json50clicksO = sortJSON(json50clicks,'time','asc');
      if(json50clicksO.length == 0 || json50clicksO.length == null){
        clicks50.innerHTML += `
                <tr>
                  <th scope="row">-</th>
                  <td>AÚN NO HAY DATOS AQUÍ!</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
          `
      }
      for(let i =0; i< 50; i++){
        var min =json50clicksO[i].time.getMinutes();
        var sec =json50clicksO[i].time.getSeconds();
        var ms =json50clicksO[i].time.getMilliseconds();
        
          if(ms<10){
            ms= '0'+ms;
          }
          if(sec<10){
            sec= '0'+sec;
          }
          if(min<10){
            min= '0'+min;
          }

            clicks50.innerHTML += `
                <tr>
                  <th scope="row">${i+1}</th>
                  <td>${json50clicksO[i].pais}</td>
                  <td>${json50clicksO[i].jugador}</td>
                  <td>${min}:${sec}:${ms}</td>
                </tr>
          `
      }
    });


    /* 100 CLICKS */
    db.collection("users").where("tipoJuego", "==", "100clicks").where("navegador", "==", document.getElementById('tipoMedio').value).get().then((querySnapshot) => {
        clicks100.innerHTML= '';
      querySnapshot.forEach((doc) => {
        cont100clicks++;
        json100clicks.push({jugador: `${doc.data().nombre}`,pais: `${doc.data().pais}`,time:`${doc.data().tiempo}` });
      });
      var tiempoArreglado;
      for(let i =0; i<json100clicks.length;i++){
          tiempoArreglado = toDate(json100clicks[i].time);
          json100clicks[i].time = tiempoArreglado;
      }
      var json100clicksO = sortJSON(json100clicks,'time','asc');
      if(json100clicksO.length == 0 || json100clicksO.length == null){
        clicks100.innerHTML += `
                <tr>
                  <th scope="row">-</th>
                  <td>AÚN NO HAY DATOS AQUÍ!</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
          `
      }
      for(let i =0; i< 50; i++){
        var min =json100clicksO[i].time.getMinutes();
        var sec =json100clicksO[i].time.getSeconds();
        var ms =json100clicksO[i].time.getMilliseconds();
        
          if(ms<10){
            ms= '0'+ms;
          }
          if(sec<10){
            sec= '0'+sec;
          }
          if(min<10){
            min= '0'+min;
          }

            clicks100.innerHTML += `
                <tr>
                  <th scope="row">${i+1}</th>
                  <td>${json100clicksO[i].pais}</td>
                  <td>${json100clicksO[i].jugador}</td>
                  <td>${min}:${sec}:${ms}</td>
                </tr>
          `
      }
    });
}


