var serv = require("./../../../service/errorService");
var authServ = require("./../../auth/auth.service");
var roleServ = require("./../../role/role.service");
var affServ = require("./affaire.service")
module.exports = function (app) {
    app.post("/chiffre-affaire/jour",(req,res)=>{
        authServ.chekAutorisation([roleServ.nameRoleManager], req, res)
            .then(util => {
                console.log(req.body)
                affServ.getChiffreDaffaire(req.body.dateDebut,req.body.dateFin)
                    .then(data => {
                        res.json(data);
                    }).catch(err => {
                        res.status(err.status || 400);
                        serv.analyseError(err).then(error => { res.send(error) })
                    });
            }).catch(err => {
                res.status(err.status || 400);
                serv.analyseError(err).then(error => { res.send(error) })
            });
    });
    app.post("/chiffre-affaire/mois",(req,res)=>{
        authServ.chekAutorisation([roleServ.nameRoleManager], req, res)
            .then(util => {
                console.log(req.body)
                affServ.getChiffreDaffaireMois(req.body.annee)
                    .then(data => {
                        res.json(data);
                    }).catch(err => {
                        res.status(err.status || 400);
                        serv.analyseError(err).then(error => { res.send(error) })
                    });
            }).catch(err => {
                res.status(err.status || 400);
                serv.analyseError(err).then(error => { res.send(error) })
            });
    });
}