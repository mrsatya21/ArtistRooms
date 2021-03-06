function initApp(){
    auth.onAuthStateChanged(user => {
        if(user){
            document.querySelector('#auth').style.display = "none";
            document.querySelector('#logout').style.display = "block";
            console.log('User Logged In : ', user.email)
        }else{
            console.log('User Logged Out!! ')
        }
    });
}
window.onload = function() {
    // initApp();
  };

const signupform = document.querySelector('#signup');
signupform.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = signupform['email'].value;
    const password = signupform['password'].value;

    // console.log(email, password)

    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return db.collection('user_details').doc(cred.user.uid).set({
            Initial_Name : signupform['name'].value
        })
        
    }).then(() => {
        // console.log(cred)
        const modal = document.querySelector('#id02');
        modal.style.display = 'none';
        signupform.querySelector('.error').innerHTML = '';
        signupform.reset();
        document.querySelector('#auth').style.display = "none";
        document.querySelector('#logout').style.display = "block";
        window.location.replace("homepage.html")
    }).catch(err => {
        signupform.querySelector('.error').innerHTML = err.message;
    })
})

const signinform = document.querySelector('#signin');
signinform.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = signinform['login-email'].value;
    const password = signinform['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        // console.log(cred.user)
        document.querySelector('#auth').style.display = "none";
        document.querySelector('#logout').style.display = "block";
        const modals = document.querySelector('#id01');
        modals.style.display = 'none';
        signinform.querySelector('.error').innerHTML = '';
        signinform.reset(); 
        window.location.replace("homepage.html") 
    }).catch(err => {
        signinform.querySelector('.error').innerHTML = err.message;
    })
})

const forgotform = document.querySelector('#forgot')
forgotform.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = forgotform['forgot-email'].value;
    if(email != null){
        auth.sendPasswordResetEmail(email).then(function() {
            // Email sent.
            forgotform.querySelector('.error').innerHTML = "Email sent successfully.";
          }).catch(err => {
            forgotform.querySelector('.error').innerHTML = err.message;
        })
    }
})

const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        document.querySelector('#auth').style.display = "block";
        document.querySelector('#logout').style.display = "none";
        // console.log("User Signed Out")
    })
})