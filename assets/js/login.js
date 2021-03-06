 $(document).ready(function() 
{


 var count = 0;


// Initialize Firebase
  var config = 
  {
  	
    apiKey: "AIzaSyBB23QESbNrXQRw6FbimCzI6BfXAkPYVKo",
    authDomain: "gamesworld-d56f1.firebaseapp.com",
    databaseURL: "https://gamesworld-d56f1.firebaseio.com",
    projectId: "gamesworld-d56f1",
    storageBucket: "gamesworld-d56f1.appspot.com",
    messagingSenderId: "411556798841"
    

  };

  // INITIALIZE FIREBASE
  firebase.initializeApp(config);

  //have databse = point to location of our GamesWorld Firebase/database
  var database = firebase.database();

  //Create a Root in Firebase called ('users')
  var login = database.ref('login'); 			//Root[user]
  var user = login.child('user');  


 // CHECK CURRENT PATH
 var currentPath = $(location)[0].pathname;


  // CHECK IF USER IS SIGNED IN
  firebase.auth().onAuthStateChanged(function(user) 
  {
  	//if the user is in current Login Page and user name and password exist then go to MainPage(game planets page)
    if(user && (currentPath === '/landingpage.html' || currentPath === '/' )) 
    {
      // REDIRECT IF AUTHENTICATED
      $(location).attr('href', 'landingpage.html');						

    } 
    else if(!user && currentPath === '/landingpage.html') 	//Else user does not exist and stay at login page
    {
      // REDIRECT IF NOT AUTHENTICATED
      $(location).attr('href', 'index.html');

    }

  });

  // SIGN IN THE USER
  $('#loginButton').on('click', function(event) 
  {

  	//Don't refresh page and allows us to load the main(planets) page at login
     event.preventDefault();


    var email = $('#exampleInputEmail1').val().trim();
    var password = $('#exampleInputPassword1').val().trim();



    if(email && password) 
    {
    	 
      //Push: allows us to push multiple users that sign in at once
      
      
      
     

      //Remove user from the connection list when they disconnect.
      //automatically remove user when they click (x) on screen or sign out
      //con.onDisconnect().remove(); 
      


     //Remove user from the connection list when they disconnect.
     //automatically remove user when they click (x) on screen or sign out
     //con.onDisconnect().remove();  

      // ADD USER TO DATABASE
      firebase.auth().signInWithEmailAndPassword(email, password).then(function() 
      {
          user.push(                          //SAME AS: //var con = user.push(email);
          {
            userName: email
        
          });
      

          $(location).attr('href', 'landingpage.html');
      })
      .catch(function(error)
       {
       	  
          swal( "Error" ,  error.message,  "error" );//swal(error.message);//alert(error.message);
       });

      
    }
  
  });

  // SIGN UP THE USER
  $('#sign-btn').on('click', function(event) 
  {

  	//Don't refresh page and allows us to load the main(planets) page at login
      event.preventDefault();


    var email = $('#sign-email').val().trim();
    var username = $("#sign-user").val().trim();
    var password = $('#sign-password').val().trim();

    firebase.auth().createUserWithEmailAndPassword(email, password).then(function() 
    {
     
     
      user.push(													//SAME AS: //var con = user.push(email);
      {
        userName: email
        
      });

     	

        $(location).attr('href', 'landingpage.html');
      }).catch(function(error) 
      {
        swal( "Error" ,  error.message,  "error" );
      });

      
  });

  // SIGN OUT THE USER
  $('#sign-out').on('click', function(event) 
  {
      
  	 //Don't refresh page and allows us to load the main(planets) page at login
      event.preventDefault();


      firebase.auth().signOut().then(function() 
      {

        $(location).attr('href', 'index.html');

      })
      .catch(function(error) 
      {
         swal( "Error" ,  error.message,  "error" );
      });

      


  });



  /*****************
  JAVASCRIPT FOR CSS
  ******************/
  
  // open modals
  $('.modal').modal();
  // parallax
  $('.parallax').parallax();
  // change font size for icons
  $('#logo-icon').css('font-size', '40px');
  // get current year
  var currentYear = new Date().getFullYear();
  $('#current-year').html(currentYear);

});



























