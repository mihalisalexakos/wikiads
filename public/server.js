
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


let SERVERsessionId= '';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const session = require('express-session');
const app = express();
const port = 3000;

app.use(session({
	secret: 'secret_key',
	resave: true,
	saveUninitialized: true
 }));

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	}),
);
app.use(express.static('public'));

const users = [{ username: 'username', password: 'password' }, { username: 'user', password: 'pass' }, { username: 'test', password: 'test' }];

app.post('/login', (req, res) => {
	console.log('Received login request.');
	
	const { username, password } = req.body;
	console.log('Credentials received:', { username, password });
	
	// login check 
	const user = users.find(u => u.username === username && u.password === password);
	
	if (user) {
		// Generates a unique session ID
		SERVERsessionId = uuidv4();
		req.session.SERVERsessionId = SERVERsessionId;
		req.session.username = username;
		console.log('Login successful. Session ID:', SERVERsessionId);
		
		// Respond with the session ID in JSON format
		res.json({ success: true, SERVERsessionId });
	} else {
		console.log('Invalid credentials.');
		res.status(401).json({ success: false, message: 'Invalid credentials' });
	}
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});

app.get('/checkSignIn', (req, res) => {
	if (req.session.username) {
		// User is signed in
		res.json({ success: true, user: req.session.username });
	} else {
		// User is not signed in
		res.json({ success: false });
	}
});



// Code for adding favorite ad

// Sample in-memory data structure to store favorites
const favoritesData = [];

// AFS endpoint
app.post('/addToFavorites', (req, res) => {
	const {
		id,
		 title,
		 description,
		 cost,
		 imageUrl,
		 username,
		 sessionId,
	} = req.body;
	
	
	// Check authentication
	if (authenticateUser(req, username)) {
		// Check if the advertisement is already in favorites
		if (!isAdvertisementInFavorites(req.session.username, id)) {
			// Add the advertisement to favorites
			ServerAddToFavorites(req, id, title, description, cost, imageUrl);
			res.status(201).json({ message: 'Advertisement added to favorites.' });
		} else {
			res.status(409).json({ message: 'Advertisement already in favorites.' });
		}
	} else {
		res.status(401).json({ message: 'Unauthorized access.' });
	}
});


// Helper functions
// authenticates user by comparing the current sessionId issued by the server, with the sessionId the user has sent in
function authenticateUser(req, username) {
    if (req.session.SERVERsessionId === SERVERsessionId) {
        console.log("user has been authenticated");
        return true;
    } else {
        console.log("user authentication failed");
        return false;
    }
}



function findUser(username) {
	//looks for favoritesData entry with 
	if(favoritesData.length > 0){
		for (let i = 0; i < favoritesData.length; i++) {
			for (let j = 0; j < favoritesData[i].length; j++) {
				if (username === favoritesData[i][j].FunctionUsername) {
					return i;
				}
			}
		}
		// if no user is found with this username, -1 is returned
		return -1;
	}
	return -1;
}



// checks if ad already exists in list by comparing the ad id with existing ad's ids
function isAdvertisementInFavorites(username, id) {
	for (let i = 0; i < favoritesData.length; i++) {
		for (let j = 0; j < favoritesData[i].length; j++) {
			if (id === favoritesData[i][j].id && username === favoritesData[i][j].FunctionUsername) {
				return true;
			}
		}
	}
	return false;
}


// adds new ad in user's favorite list
function ServerAddToFavorites(req, id, title, description, cost, imageUrl) {

	if(req.session){

		let index = findUser(req.session.username);
		let FunctionUsername = req.session.username;
		// user already exists in database
		if (index > -1) {
			
			console.log("\nTrying to add a new favorite ad...user already exists in the database");
			console.log("\nChecking if ad is already in favorites...");
			
			if (isAdvertisementInFavorites(req.session.username, id)) {
				console.log("\nAd is already in favorites!");
				// checks if ad is already in favorites
			} else {
				// otherwise pushes the ad in the correct index so it gets added to the right user's list
				console.log("\nAd is not already in favorites!");
				favoritesData[index].push({
					FunctionUsername,
					id,
					title,
					description,
					cost,
					imageUrl,
				});
			}
			
		} else {
			// its new user, so data simply gets pushed
			console.log("\nTrying to add a new favorite ad...user does NOT exist already in the database");
			favoritesData.push([
			{
				FunctionUsername,
				id,
				title,
				description,
				cost,
				imageUrl,
			},
			]);
			
		}

	} else {
		console.log("--req.session is not defined");
	}

}

// returns array of all ads from favoritesData that share the same username
function getSessionFavAds(username) {
	const result = [];
	for (let i = 0; i < favoritesData.length; i++) {
	  for (let j = 0; j < favoritesData[i].length; j++) {
		if (username === favoritesData[i][j].FunctionUsername) {
		  	result.push(favoritesData[i][j]);
		}
	  }
	}
	return result;
  }
  
  // AFS endpoint
  app.post('/OpenFavorites', (req, res) => {
	const { username, sessionId } = req.body;
	console.log("we entered AFS endpoint, looking for username: ", req.session.username);
	res.status(201).json({ favorites: getSessionFavAds(req.session.username) });
  });
  