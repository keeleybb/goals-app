const express = require("express");
const passport = require("passport");
var session = require("express-session");
const MongoStore = require('connect-mongo')(session);
const dbConnection = require("./dbConnection");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: "piano-cat",
  store: new MongoStore({ url: process.env.MONGODB_URI || 'mongodb+srv://keeley.blakley@gmail.com:kb1023024@cluster-gjs3lbzt.zeg7h.mongodb.net/heroku_gjs3lbzt?retryWrites=true&w=majority', ttl: 24 * 3600 }),
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

// Add routes, both API and view
app.use(routes);

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
