var server = require("./server");
const db = require("./db");
var express = require("express");
const cors = require("cors");
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var corsOptions = {
    origin: ["http://localhost:4200"]
};
app.use(cors(corsOptions));

require("./controlleur/sexe/sexe.controlleur")(app);
require("./controlleur/personne/personne.controlleur")(app);
require("./controlleur/utilisateur/utilisateur.controlleur")(app);
require("./controlleur/auth/auth.controlleur")(app);

server.start(app);