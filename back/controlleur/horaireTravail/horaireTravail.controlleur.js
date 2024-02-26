var horaireServ = require("./horaireTravail.service");
var serv = require("./../../service/errorService");
var authServ = require("./../auth/auth.service");
var roleServ = require("./../role/role.service");

var roles = [roleServ.nameRoleEmp];
module.exports = function (app) {
    app.get("/horaire/duree", (req, res) => {
        authServ.chekAutorisation([roleServ.nameRoleManager], req, res)
            .then(util => {
                horaireServ.getMoyenneDureeUtilisateur()
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

    app.post("/horaire", (req, res) => {
        authServ.chekAutorisation(roles, req, res)
            .then(util => {
                horaireServ.insertion(req.body, util)
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
    app.get("/horaires", (req, res) => {
        authServ.chekAutorisation(roles, req, res)
            .then(util => {
                horaireServ.getAllByUtilisateur(util)
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
    app.post("/horaire/update/:id", (req, res) => {
        authServ.chekAutorisation(roles, req, res)
            .then(util => {
                horaireServ.update(req.body.heure_debut, req.body.heure_fin, req.body.date, req.params.id)
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