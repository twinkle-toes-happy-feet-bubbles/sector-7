let person = prompt("Please enter your name", "Harry Potter");
let text;
if (person == null || person == "") {
  text = "User cancelled the prompt.";
} else {
  text = "Hello " + person + "! How are you today?";
}

var username = person;


(function() {
  // Initialize the Firebase SDK
  firebase.initializeApp({
    apiKey: "AIzaSyDPbCB9o3c44_KqEcTL8PrPXvOioNI9Skw",
    authDomain: "netizen-70f7b.firebaseapp.com",
    databaseURL: "https://netizen-70f7b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "netizen-70f7b",
    storageBucket: "netizen-70f7b.appspot.com",
    messagingSenderId: "900442479711",
    appId: "1:900442479711:web:8fe818cd16e8feeaff8fea",
    measurementId: "G-G8XQQBBY8F"
  });

  // Generate a random Firebase location
  var firebaseRef = firebase.database().ref().push();

  // Create a new GeoFire instance at the random Firebase location
  var geoFireInstance = new geofire.GeoFire(firebaseRef);

  /* Uses the HTML5 geolocation API to get the current user's location */
  var getLocation = function() {
    if (typeof navigator !== "undefined" && typeof navigator.geolocation !== "undefined") {
      log("Asking user to get their location");
      navigator.geolocation.getCurrentPosition(geolocationCallback, errorHandler);
    } else {
      log("Your browser does not support the HTML5 Geolocation API, so this will not work.")
    }
  };

  /* Callback method from the geolocation API which receives the current user's location */
  var geolocationCallback = function(location) {
    var latitude = location.coords.latitude;
    var longitude = location.coords.longitude;
    log("Retrieved user's location: [" + latitude + ", " + longitude + "]");


    geoFireInstance.set(username, [latitude, longitude]).then(function() {
      log("Current user " + username + "'s location has been added to Database");

      // When the user disconnects from Firebase (e.g. closes the app, exits the browser),
      // remove their GeoFire entry
      //firebaseRef.child(username).onDisconnect().remove();


      //log("Added handler to remove user " + username + " from GeoFire when you leave this page.");
    });

  }

  /* Handles any errors from trying to get the user's current location */
  var errorHandler = function(error) {
    if (error.code == 1) {
      log("Error: PERMISSION_DENIED: User denied access to their location");
    } else if (error.code === 2) {
      log("Error: POSITION_UNAVAILABLE: Network is down or positioning satellites cannot be reached");
    } else if (error.code === 3) {
      log("Error: TIMEOUT: Calculating the user's location too took long");
    } else {
      log("Unexpected error code")
    }
  };

  // Get the current user's location
  getLocation();

  /*************/
  /*  HELPERS  */
  /*************/
  /* Logs to the page instead of the console */
  function log(message) {
    var childDiv = document.createElement("div");
    var textNode = document.createTextNode(message);
    childDiv.appendChild(textNode);
    document.getElementById("log").appendChild(childDiv);
  }
})();
