//
//
//
// 
var usuario;
var db = firebase.firestore();
var provider = new firebase.auth.GoogleAuthProvider();





observadorUsuarioConectado();

// +++++++++++++++++++ Registrar ++++++++++++++++++++
function registrarUsuario() {
    console.log('Registrar usuario');
    var emailRegistro = document.getElementById('emailRegistro').value;
    var passwordRegistro = document.getElementById('passwordRegistro').value;

    firebase.auth().createUserWithEmailAndPassword(emailRegistro, passwordRegistro)
        .then(function () {
            verificarEmail();
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log('¡¡¡¡¡¡¡¡¡ERROR AL REGISTRAR EL USUARIO!!!!!!!');
            console.log(errorCode);
            console.log(errorMessage);
            // ...
        });
}

function verificarEmail() {
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function () {
        // Email sent.
        console.log('Enviar conrreo verificacion mail');
    }).catch(function (error) {
        // An error happened.
        console.log(error);
    });
}


// ++++++++++++++++++++ LOGIN/LOGOUT ++++++++++++++++++++
function loginGoogle(){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
         // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
         // The signed-in user info.
         var user = result.user;
         // ...
         usuario = user;
   }).catch(function(error) {
       // Handle Errors here.
         var errorCode = error.code;
         var errorMessage = error.message;
         // The email of the user's account used.
         var email = error.email;
         // The firebase.auth.AuthCredential type that was used.
         var credential = error.credential;
      // ...    
   });
   this
}

function login() {
    console.log('Procediendo Login');
    var emailLogin = document.getElementById('emailLogin').value;
    var passwordLogin = document.getElementById('passwordLogin').value;

    firebase.auth().signInWithEmailAndPassword(emailLogin, passwordLogin).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('¡Error login!');
        console.log(errorCode);
        console.log(errorMessage);
        // ...
    });
}

function loginModalFuncion(){
    var loginModalContent = document.getElementById('modal-content');
    loginModalContent.innerHTML=`
         <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Acceder:</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <input id="emailLogin" type="email" placeholder="Email" class="form-control">
                    <div class="mt-2"></div>
                    <input id="passwordLogin" type="password" placeholder="Contraseña" class="form-control">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-success" onclick="registrarUsuario()">Registrarse</button>
                </div>
    `
}

function logout() {
    firebase.auth().signOut()
        .then(function () {
            console.log('Logout');
            contenido.innerHTML = ``;
        })
        .catch(function (error) {
            console.log(error);
        })
}


// ++++++++++++++++++++ ControlUsuario ++++++++++++++++++++

function observadorUsuarioConectado() {
    firebase.auth().onAuthStateChanged(function (user) {
        var loginLogout = document.getElementById('loginLogout');
        if (user) {
            console.log('Login Correcto');
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            usuario = user;
            mostrarLoginCorrecto();
            mostrarTablaEntrenamiento();
            //Mostrar en el NavBar el boton cerrar sesión
            loginLogout.innerHTML = `
                <div style="color:white">
                    
                    <button onclick="logout()" class="btn btn-danger">Cerrar sesión</button>
                </div>
            `;
        } else {
            // User is signed out.
            //Mostrar en el NavBar los campos para hacer login o registrarse
            mostrarBanner();
            loginLogout.innerHTML = `
                <!--<input id="emailLogin" type="email" placeholder="Email" class="form-control mr-sm-2">
                <input id="passwordLogin" type="password" placeholder="Contraseña" class="form-control mr-sm-2">-->
                <button class="btn btn-light my-2 my-sm-0 ml-2" data-toggle="modal" data-target="#ventanaModalLogin">Acceder</button>
                <button class="btn btn-success my-2 my-sm-0 ml-2" data-toggle="modal" data-target="#ventanaModalRegistro">Registrarse</button>
            `;
        }
    });
}

//++++++++++++++++++++++++++++ CAMBIOS WEB +++++++++++++++++++++++++++++++++++
function mostrarLoginCorrecto() {
    var bannerPagina = document.getElementById('bannerPagina');
    if (usuario.emailVerified) {
        bannerPagina.innerHTML = `
        <div class="container mt-1">
            <div class="alert alert-success" role="alert">
                ${usuario.email} bienvenido!
            </div>
        <div>
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
            <div class="carousel-item active">
                <img class="d-block w-100" src="../Imagenes/banner.png" alt="First slide">
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src="../Imagenes/banner.png" alt="Second slide">
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src="../Imagenes/banner.png" alt="Third slide">
            </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
            </a>
        </div>
    `  
    } else {
        bannerPagina.innerHTML = `
        <div class="container mt-1">
            <div class="alert alert-success" role="alert">
                ${usuario.email} bienvenido! Por favor valida tu dirección de correo.
            </div>
        <div>
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
            <div class="carousel-item active">
                <img class="d-block w-100" src="../Imagenes/banner.png" alt="First slide">
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src="../Imagenes/banner.png" alt="Second slide">
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src="../Imagenes/banner.png" alt="Third slide">
            </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
            </a>
        </div>
       `;
    }
}
function mostrarBanner() {
    var bannerPagina = document.getElementById('bannerPagina');
    bannerPagina.innerHTML = `
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
            <div class="carousel-item active">
                <img class="d-block w-100" src="../Imagenes/banner.png" alt="First slide">
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src="../Imagenes/banner.png" alt="Second slide">
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src="../Imagenes/banner.png" alt="Third slide">
            </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
            </a>
        </div>
    `  
}


function mostrarTablaEntrenamiento(){
    if(usuario != null){
        var contenidoPagina = document.getElementById('contenidoPagina');
        contenidoPagina.innerHTML = `
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Dia</th>
                        <th scope="col">Distancia</th>
                        <th scope="col">Vel. media (min/Km)</th>
                        <th scope="col">nombre</th>
                    </tr>
                </thead>
                <tbody id="tablaEntrenamientos">
                </tbody>
            </table>
        `
    }
}


//++++++++++++++++++++++++++++ FIREBASE TEST +++++++++++++++++++++++++++++++++

// Inicializar Firestore


// InsertarEntrenamiento (En principio desde web no se utiliza mas que para pruebas)
function insertarEntrenamiento(){
    db.collection("entrenamiento").add({
            idUsuario: usuario.uid,
            nombre: "GoogleUser",
            equipo: "Google Zaragoza",
            km: 13,
            minkm: 4.45,
            dia: new Date("December 10, 2019")
        })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
    });
}

//Leer datos
function listarEntrenamientos(){
    var tabla = document.getElementById('tablaEntrenamientos');
    db.collection("entrenamiento").where("idUsuario","==",usuario.uid).get().then((querySnapshot) => {
        tabla.innerHTML='';
        querySnapshot.forEach((doc) => {
            //console.log(`${doc.id} => ${doc.data()}`);
            tabla.innerHTML += `
                <tr>
                <th scope="row">${doc.data().dia}</th>
                <td>${doc.data().km}</td>
                <td>${doc.data().minkm}</td>
                <td>@${doc.data().nombre}</td>
                </tr>
            `
        });
    });
}









    