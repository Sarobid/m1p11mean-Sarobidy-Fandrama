var prefEmpServ = require('./prefEmp.service');
var serv = require("./../../service/errorService");
var roleServ = require("./../role/role.service");
var authServ = require("./../auth/auth.service");

module.exports =function(app){
    app.post("/prefEmp/getAllEmp",(req,res) => {
        // authServ.chekAutorisation([roleServ.nameRoleManager,roleServ.nameRoleClient,roleServ.nameRoleEmp],req,res)
        // .then(util=>{
            prefEmpServ.getAllEmploye(req.body.client_id)
            .then(data => {
                res.json(data);
            }).catch(err => {
                res.status(err.status || 400);
                serv.analyseError(err).then(error=>{res.send(error)})
            });
        // }).catch(err => {
        //     res.status(err.status || 400);
        //     serv.analyseError(err).then(error=>{res.send(error)})
        // });
    })
    app.post("/prefEmp/insertion",(req,res) => {
        // authServ.chekAutorisation([roleServ.nameRoleManager,roleServ.nameRoleClient,roleServ.nameRoleEmp],req,res)
        // .then(util=>{
            prefEmpServ.insertion(req.body.employe_id,req.body.client_id)
            .then(data => {
                res.json(data);
            }).catch(err => {
                res.status(err.status || 400);
                serv.analyseError(err).then(error=>{res.send(error)})
            });
        // }).catch(err => {
        //     res.status(err.status || 400);
        //     serv.analyseError(err).then(error=>{res.send(error)})
        // });
    })
    app.post("/prefEmp/getById",(req,res) => {
        // authServ.chekAutorisation([roleServ.nameRoleManager,roleServ.nameRoleClient,roleServ.nameRoleEmp],req,res)
        // .then(util=>{
            prefEmpServ.getAllPref(req.body.client_id)
            .then(data => {
                res.json(data);
            }).catch(err => {
                res.status(err.status || 400);
                serv.analyseError(err).then(error=>{res.send(error)})
            });
        // }).catch(err => {
        //     res.status(err.status || 400);
        //     serv.analyseError(err).then(error=>{res.send(error)})
        // });
    })
    app.post("/prefEmp/deletes",(req,res) => {
        // authServ.chekAutorisation([roleServ.nameRoleManager,roleServ.nameRoleClient,roleServ.nameRoleEmp],req,res)
        // .then(util=>{
            console.log(req.body.client_id);
            prefEmpServ.deletes(req.body.employe_id,req.body.client_id)
            .then(data => {
                res.json(data);
            }).catch(err => {
                res.status(err.status || 400);
                serv.analyseError(err).then(error=>{res.send(error)})
            });
        // }).catch(err => {
        //     res.status(err.status || 400);
        //     serv.analyseError(err).then(error=>{res.send(error)})
        // });
    })
}