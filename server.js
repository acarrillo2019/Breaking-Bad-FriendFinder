// Dependencies

var express = require("express");
var bodyParser = require("body-parser");

// Express 
var app = express();
var PORT = process.env.PORT || 8080;


// Data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setup access to app.js
app.use(express.static('app/public'))

// Router

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);


// Start server to listen to client requests.

app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
