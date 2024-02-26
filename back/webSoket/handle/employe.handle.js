const clientEmp = new Set();
function listeEmploye(ws){
    clientEmp.add(ws);
    //console.log(`new connection liste employe`);
    ws.on('message', function (message) {
        for (let client of clientEmp) {
            console.log(message);
            client.send(message);
        }
    });
    ws.on('close', function () {
        console.log("close connexion");
        clientEmp.delete(ws);
    });
}
exports.listeEmploye = listeEmploye;