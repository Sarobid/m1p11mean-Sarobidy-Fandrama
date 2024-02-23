var authServ = require("./auth.service");
var serv = require("./../../service/errorService");
module.exports = function (app) {
    app.post("/auth",(req,res)=>{
        authServ.authentification(req.body.email,req.body.mdp)
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(err.status || 400);
            serv.analyseError(err).then(error=>{res.send(error)})
        });
    });
    app.post("/authorize",(req,res)=>{
        authServ.chekAutorisation(req.body.role,req,res)
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(err.status || 400);
            serv.analyseError(err).then(error=>{res.send(error)})
        });
    });
}