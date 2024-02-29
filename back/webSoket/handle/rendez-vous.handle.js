const clientRendez = new Set();
function rendez(ws){
    clientRendez.add(ws);
    //console.log(`new connection liste employe`);
    ws.on('message', function (message) {
        for (let client of clientRendez) {
            client.send(message);
        }
    });
    ws.on('close', function () {
        console.log("close connexion");
        clientRendez.delete(ws);
    });
}
exports.rendez = rendez;