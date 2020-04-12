const express = require("express");
const passport = require("passport");
var session = require("express-session");
const MongoStore = require('connect-mongo')(session);
const dbConnection = require("./dbConnection");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
// var passport = require("./config/passport");
// const mongoose = require("mongoose");
// const morgan = require('morgan');
// const dbConnection = require('./models'); 
// const user = require('./routes/api/user');

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: "piano-cat",
  store: new MongoStore({ url: process.env.MONGODB_URI || 'mongodb://localhost/surata', ttl: 24 * 3600 }),
  resave: true,
  saveUninitialized: true
}));
// Passport
app.use(passport.initialize());
app.use(passport.session()); // calls the deserializeUser

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/surata', {useNewUrlParser:true, useFindAndModify:false})
// app.use(routes);

// Add routes, both API and view
app.use(routes);

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
