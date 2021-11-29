var recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');

function auth() {

  var number = '+91' + document.getElementById('mobileNo').value;

  firebase.auth().signInWithPhoneNumber(number, recaptcha).then(function(e) {

      console.log('OTP sent Sucessfully!');

      var

        code = prompt('Enter OTP', '');

      if (code === null) return;

      e.confirm(code).then(function(result) {

        console.log('Sucessfully Regestered', result.user);

        

        createNewAccount();

      }).catch(function(error) {

        console.error('Registration Failed', error);

      });

    })

    .catch(function(error) {

      console.error('Failed to send OTP', error);

    });

}

var user = firebase.auth().currentUser;

if (user) {

  alert("Loged in")

} else {

  alert('logged off')

}

firebase.auth().onAuthStateChanged(user => {

           if(user) {

    console.log(user.uid);

    console.log(user.number);

      window.location.replace("stores.html"); }

}

);

function createNewAccount() {

    try {

        const userAuth = firebase.auth().signInWithPhoneNumber(phoneNumber);

        var user = {

            name: "Raja",

            phone: number,

            address: "474 Mercer Drive",

            uid: userAuth.uid,

        }

        writeUserData(user)

    } catch (error) {

        console.log(error.message)

    } }

    

 

