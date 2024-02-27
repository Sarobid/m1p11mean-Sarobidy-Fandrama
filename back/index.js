var server = require("./server");
var websocket = require("./webSoket/webSocket")
var http = require("http");
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
require("./controlleur/horaireTravail/horaireTravail.controlleur")(app);
require("./controlleur/service/service.controller")(app);

const ws = require('ws');
const httpServ = http.createServer(app);
const wss = new ws.Server({ server:httpServ,handshakeTimeout: 20000 });
websocket.start(wss);
server.start(httpServ);