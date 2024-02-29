var rendServ = require("./rendez-vous.service");
var serv = require("./../../service/errorService");
var authServ = require("./../auth/auth.service");
var roleServ = require("./../role/role.service");

module.exports = function (app) {
    app.post("/reservation/mois",(req,res)=>{
        authServ.chekAutorisation([roleServ.nameRoleManager], req, res)
            .then(util => {
                console.log(req.body)
                rendServ.nombreReservationParMois(req.body.annee)
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
    app.post("/reservation/jour",(req,res)=>{
        authServ.chekAutorisation([roleServ.nameRoleManager], req, res)
            .then(util => {
                console.log(req.body)
                rendServ.nombreReservationParJour(req.body.dateDebut,req.body.dateFin)
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

    app.post("/rendez-vous/historique",(req,res)=>{
        authServ.chekAutorisation([roleServ.nameRoleClient], req, res)
            .then(util => {
                console.log(req.body)
                rendServ.getListRendezVous(req.body.employe_id,util._id,req.body.service_id, req.body.dateDebut,req.body.dateFin,req.body.heureMin,req.body.heureMax,req.body.etat)
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