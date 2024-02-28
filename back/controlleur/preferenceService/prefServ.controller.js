var prefServService = require('./prefServ.service');
var serv = require("./../../service/errorService");
var service = require("./../../service/service");
var roleServ = require("./../role/role.service");
var authServ = require("./../auth/auth.service");
const PreferenceService = require('../../model/preferenceService');

module.exports = function (app) {
    app.post("/prefServ/getById",(req,res) => {
        authServ.chekAutorisation([roleServ.nameRoleManager,roleServ.nameRoleClient,roleServ.nameRoleEmp],req,res)
        .then(util=>{
            prefServService.getAll(req.body.client_id)
            .then(data => {
                res.json(data);
            }).catch(err => {
                res.status(err.status || 400);
                serv.analyseError(err).then(error=>{res.send(error)})
            });
        }).catch(err => {
            res.status(err.status || 400);
            serv.analyseError(err).then(error=>{res.send(error)})
        });
    })
    app.post("/prefServ/insertion",(req,res) => {
        authServ.chekAutorisation([roleServ.nameRoleManager,roleServ.nameRoleClient,roleServ.nameRoleEmp],req,res)
        .then(util=>{
            prefServService.insertion(req.body.service_id,req.body.client_id)
            .then(data => {
                res.json(data);
            }).catch(err => {
                res.status(err.status || 400);
                serv.analyseError(err).then(error=>{res.send(error)})
            });
        }).catch(err => {
            res.status(err.status || 400);
            serv.analyseError(err).then(error=>{res.send(error)})
        });
    })
    app.post("/prefServ/allService",(req,res) => {
        authServ.chekAutorisation([roleServ.nameRoleManager,roleServ.nameRoleClient,roleServ.nameRoleEmp],req,res)
        .then(util=>{
            // console.log(req.body.client_id);
            prefServService.getAllService(req.body.client_id)
            .then(data => {
                res.json(data);
            }).catch(err => {
                res.status(err.status || 400);
                serv.analyseError(err).then(error=>{res.send(error)})
            });
        }).catch(err => {
            res.status(err.status || 400);
            serv.analyseError(err).then(error=>{res.send(error)})
        });
    })
    app.post("/prefServ/deletes",(req,res) => {
        authServ.chekAutorisation([roleServ.nameRoleManager,roleServ.nameRoleClient,roleServ.nameRoleEmp],req,res)
        .then(util=>{
            // console.log(req.body.client_id);
            prefServService.deletes(req.body.service_id,req.body.client_id)
            .then(data => {
                res.json(data);
            }).catch(err => {
                res.status(err.status || 400);
                serv.analyseError(err).then(error=>{res.send(error)})
            });
        }).catch(err => {
            res.status(err.status || 400);
            serv.analyseError(err).then(error=>{res.send(error)})
        });
    })
} 