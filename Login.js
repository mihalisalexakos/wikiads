
// mihalis alexakos 3200003
// stefanos dimitrakopoulos 3130054

// !--THERE ARE 3 USERS--!
// 1)
// username: username
// password: password
// 2)
// username: user
// password: pass
// 3)
// username: test
// password: test

// Global variable to track login status
let isLoggedIn = false;
// Global variable to store sessionId
let sessionId = '';

let favData = [];

// Function that is called when log in button is pressed on category.html, logs user in
// if statement makes sure eventlistener works only in category.html, and not favorite-ads.html
if (window.location.pathname.includes('category.html')) {
  document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();  // Prevent the default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log('Sending login request...');

    const serverUrl = 'http://localhost:3000/login';

    fetch(serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    .then(response => {
      console.log('Response status: ', response.status)
      if (response.ok) {
        console.log('Response was deemed ok')
        return response.json();
      } else {
        console.log('entered else statement, network response was not ok')
        const errorMessage = data.message || 'login was successful';
        document.getElementById('login-error').innerText = errorMessage;
      }
    })
    .then(data => {
      console.log('Server response:', data);
      console.log(data.success)
      if (data.success) {
        document.getElementById('login-form-container').innerHTML = '<p>Login successful!</p>';
        //sets isLoggedIn variable to true, therefore know we know user is logged in
        isLoggedIn = true;
        sessionId = data.SERVERsessionId;
      } else {
        const errorMessage = data.message || 'login was successful';
        document.getElementById('login-error').innerText = errorMessage;
      }
    })
    .catch(error => console.error('Error:', error));
  });
}



// connects to server and sends data of an ad, response indicates whether or not ad was added in favorites list
function addToFavorites(id, cost, title, description, photo) {

  if (isLoggedIn) {
    const FAVid = id;
    const FAVtitle = title;
    const FAVdescription = description;
    const FAVcost = cost;
    const FAVimageUrl = photo;
    const FAVusername = "username";
    const FAVsessionId = sessionId;

    fetch('http://localhost:3000/addToFavorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: FAVid,
        title: FAVtitle,
        description: FAVdescription,
        cost: FAVcost,
        imageUrl: FAVimageUrl,
        username: FAVusername,
        sessionId: FAVsessionId,
      }),
    })
      .then(response => {
        if (response.ok) {
          console.log('Ad added to favorites successfully');
          alert("Η αγγελία προστέθηκε στα αγαπημένα!");
        } else {
          alert("Η αγγελία υπάρχει ήδη στα αγαπημένα")
          console.error('ad was not added');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  } else {
    alert("Πρέπει να συνδεθείτε για να προσθέσετε αγγελίες στα αγαπημένα");
    console.log("User is NOT logged in, according to addToFavorites");
  }
}


  // connects to server, sends user data and receives user's favorite ads in the form of a json file
  function OpenFavorites() {
    // Send an HTTP request to your server
    fetch('http://localhost:3000/OpenFavorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: "username",
        sessionId: sessionId,
      }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then(data => {
        // Stores the received data in a global variable
        window.favoritesData = data.favorites;
        // Triggers Handlebars template
        renderFavoritesTemplate();

      })
      .catch(error => {
        console.error('Error:', error);
      });

  }
// is triggered by heart button in category page
  function openFavoritesPage() {
    // checks if user is logged in
    if (isLoggedIn) {
      window.open('favorite-ads.html', '_blank'); // _blank opens page in a new tab
    } else {
      alert("Συνδεθείτε στο λογαριασμό σας για να δείτε τις αγαπημένες αγγελίες σας!");
      console.log("User is NOT logged in, according to OpenFavoritePage");
    }
  }
