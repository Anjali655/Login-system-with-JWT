const express = require('express');
let app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
let PORT = process.env.PORT || 5000;
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');



// Set up Global configuration access
dotenv.config();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// View engine
app.set('view engine', 'ejs');


// Database connection 
const dbUrl = "mongodb://localhost:27017/nodeauthjwt";
mongoose.connect( dbUrl , { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => {app.listen(5000)})
.catch((error) => {console.log(error)});

// routes

// app.post("/user/generateToken", (req, res) => {
//     // Validate User Here
//     // Then generate JWT Token
  
//     let jwtSecretKey = process.env.JWT_SECRET_KEY;
//     let data = {
//         time: Date(),
//         userId: 12,
//     }
  
//     const token = jwt.sign(data, jwtSecretKey);
  
//     res.send(token);
// });

// app.get("/user/validateToken", (req, res) => {
// 	// Tokens are generally passed in the header of the request
// 	// Due to security reasons.
//     console.log(req);
// 	// let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
//     let token = req.headers.authorization;
// 	let jwtSecretKey = process.env.JWT_SECRET_KEY;

// 	try {
// 		// const token = req.header(tokenHeaderKey);

// 		const verified = jwt.verify(token, jwtSecretKey);
// 		if(verified){
// 			return res.send("Successfully Verified");
// 		}else{
// 			// Access Denied
// 			return res.status(401).send(error);
// 		}
// 	} catch (error) {
// 		// Access Denied
// 		return res.status(401).send(error);
// 	}
// });


app.get('/', function(req, res){ 
	console.log('home');
	res.render('home');
	
});

app.use(authRoutes);



