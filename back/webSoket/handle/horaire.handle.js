const clientHoraire = new Set();
function horaire(ws){
    clientHoraire.add(ws);
    //console.log(`new connection liste employe`);
    ws.on('message', function (message) {
        for (let client of clientHoraire) {
            client.send(message);
        }
    });
    ws.on('close', function () {
        console.log("close connexion");
        clientHoraire.delete(ws);
    });
}
exports.horaire = horaire;