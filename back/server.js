function start(app){
    app.listen(8082, function () {
        console.log("serveur demarrer");
     });
}
exports.start = start;

