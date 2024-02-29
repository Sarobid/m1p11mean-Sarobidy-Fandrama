var rendServ = require("./rendez-vous.service");
var serv = require("./../../service/errorService");
var authServ = require("./../auth/auth.service");
var roleServ = require("./../role/role.service");

module.exports = function (app) {
    app.get("/rendez-vous/annuler/:rendez",(req,res)=>{
        authServ.chekAutorisation([roleServ.nameRoleClient,roleServ.nameRoleEmp,roleServ.nameRoleManager], req, res)
            .then(util => {
                rendServ.annulerRendezVous(req.params.rendez,util)
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
    })
    app.post("/rendez-vous/:date/:paye", (req, res) => {
        authServ.chekAutorisation([roleServ.nameRoleClient], req, res)
            .then(util => {
                rendServ.nouveauRendezVous(req.body,req.params.paye,req.params.date,util)
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
    })
    app.post("/rendez-vous/employe", (req, res) => {
        authServ.chekAutorisation([roleServ.nameRoleClient], req, res)
            .then(util => {
                rendServ.rendezVousEmploye(req.body.employe_id)
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
    })
    app.post("/rendez-vous/employeTache", (req, res) => {
        authServ.chekAutorisation([roleServ.nameRoleClient], req, res)
            .then(util => {
                rendServ.tacheEffectuerEmploye(req.body.employe_id)
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
    })
}