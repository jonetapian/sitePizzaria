class Login{
    
    constructor(){
        
    }
    
    logar(emailLogin, senhaLogin){
        const auth = firebase.auth();
        var teste;
        
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(function(){
            
            return auth.signInWithEmailAndPassword(emailLogin,senhaLogin).then(function(result){
                localStorage.setItem("email", emailLogin);
                console.log("certo");
                window.location.reload(true);
            });
            
        }).catch(function(error){
           var errorCode = error.code;

            if(errorCode == 'auth/invalid-email'){
                console.log('email invalido');
            }else if(errorCode == 'auth/wrong-password'){
                console.log('senha errada');
            }else{
                console.log('Error: ' + errorCode);
            }
        });
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            
          } else {
            
          }
        });
        console.log(localStorage.getItem("email"));
        
    }
    
    verificarPersistencia(){
        
        var usuario = [];
        var user;
        
        user = firebase.auth().currentUser;
        
        console.log(user);
        
        localStorage.setItem("usuario", JSON.stringify(user));
        usuario = JSON.parse(localStorage.getItem("usuario"));
        
        if(usuario){
            console.log(usuario.email);
        }else{
            
            console.log("usuario deslogado");
        }
        
        
        function passarValor(valor){
            valor = (typeof valor !== "object") ? {} : valor;
            //window.location = "pizzas.html?minhaVariavel=" + Object.values(valor);
            
        }
        
        
        
    }
    
    recuperarEmail(){
        var email;
        email = JSON.parse(localStorage.getItem("usuario"));
        if(email){
           document.getElementById('labelLogado').innerHTML = ['<div><h5 class="mr-4 text-white">Olá, ' + email.email.split("@", 1) + '!</h5></div>'];
        }
    }
    
    cadastrar(emailCadastrar, senhaCadastrar, nomeCadastrar){
        firebase.auth().createUserWithEmailAndPassword(emailCadastrar, senhaCadastrar).then(function(result){
            localStorage.setItem("email", emailCadastrar);
                    firebase.database().ref('usuarios/' + emailCadastrar.split("@", 1) + '/dados').set({
                        email: emailCadastrar,
                        nome: nomeCadastrar
                    }).then(function(docRef){
                        console.log("criou no banco");
                        
                    }).catch(function(error){
                        console.error(error);
                    });
                }).catch(function(error) {
                    
                    var errorCode = error.code;
                    var errorMessage = error.message;

                });
    }
    
}