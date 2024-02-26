
var route = require("./routes.service.ws");
var emp = require("./handle/employe.handle");
var horaire = require("./handle/horaire.handle")
var handle = {};
handle['/liste-employe'] = emp.listeEmploye;
handle['/horaire'] = horaire.horaire;
function start(wss) {
    wss.on('connection', (ws, req) => {
        route.route(req.url,handle,ws);
    });
}
exports.start = start;