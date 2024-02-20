var server = require("./server");
const db = require("./db");
var express = require("express");
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./controlleur/sexe/sexe.controlleur")(app);


server.start(app);