
var route = require("./routes.service.ws");
var emp = require("./handle/employe.handle");
var handle = {};
handle['/liste-employe'] = emp.listeEmploye;

function start(wss) {
    wss.on('connection', (ws, req) => {
        route.route(req.url,handle,ws);
    });
}
exports.start = start;