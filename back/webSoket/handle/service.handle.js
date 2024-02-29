const clientServ = new Set();
function listeService(ws){
    clientServ.add(ws);
    //console.log(`new connection liste employe`);
    ws.on('message', function (message) {
        for (let client of clientServ) {
            client.send(message);
        }
    });
    ws.on('close', function () {
        console.log("close connexion");
        clientServ.delete(ws);
    });
}
exports.listeService = listeService;