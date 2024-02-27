var serviceServ = require("./service.service");
var serv = require("./../../service/errorService");
var service = require("./../../service/service")
var roleServ = require("./../role/role.service");
var authServ = require("./../auth/auth.service");


module.exports = function (app) {
    app.post("/service/insert",(req,res)=>{
            serviceServ.insertion(req.body.nom,req.body.prix,req.body.duree,req.body.commission)
            .then(data => {
                res.json(data);
            }).catch(err => {
                res.status(err.status || 400);
                serv.analyseError(err).then(error=>{res.send(error)})
            });
    });
    app.get("/service/getAll",(req,res)=>{
            serviceServ.getAll()
            .then(data => {
                res.json(data);
            }).catch(err => {
                res.status(err.status || 400);
                serv.analyseError(err).then(error=>{res.send(error)})
            });
    });
    app.get("/service/getAllActive",(req,res)=>{
        // authServ.chekAutorisation([roleServ.nameRoleManager,roleServ.nameRoleClient,roleServ.nameRoleEmp],req,res)
        // .then(util=>{
            serviceServ.getAllActivate()
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
    });
    app.post("/service/delete",(req,res)=>{
        // authServ.chekAutorisation([roleServ.nameRoleManager],req,res)
        // .then(util=>{
            serviceServ.updateDelete(req.body.id)
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
    });
    app.post("/service/active",(req,res)=>{
        // authServ.chekAutorisation([roleServ.nameRoleManager],req,res)
        // .then(util=>{
            serviceServ.activeService(req.body.id)
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
    });
    app.post("/service/update",(req,res)=>{
        // authServ.chekAutorisation([roleServ.nameRoleManager],req,res)
        // .then(util=>{
            data={
                nom : req.body.nom,
                prix : req.body.prix,
                duree : service.heureInMillisecconde(req.body.duree),
                commission : req.body.commission,
                delete : req.body.delete
            }
            serviceServ.updateService(req.body.id,data)
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
    });
    app.post("/service/findOne",(req,res)=>{
        serviceServ.findServiceById(req.body.id)
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(err.status || 400);
            serv.analyseError(err).then(error=>{res.send(error)})
        });
    });
}