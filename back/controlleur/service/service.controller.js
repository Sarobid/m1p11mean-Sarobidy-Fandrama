var serviceServ = require("./service.service");
var serv = require("./../../service/errorService");


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
    app.post("/service/delete",(req,res)=>{
        serviceServ.updateDelete(req.body.id)
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(err.status || 400);
            serv.analyseError(err).then(error=>{res.send(error)})
        });
    });
    app.post("/service/active",(req,res)=>{
        serviceServ.activeService(req.body.id)
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(err.status || 400);
            serv.analyseError(err).then(error=>{res.send(error)})
        });
    });
    app.post("/service/update",(req,res)=>{
        data={
            nom : req.body.nom,
            prix : req.body.prix,
            duree : req.body.duree,
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
    // app.post("/service/searchMulti",(req,res)=>{
    //     data={
    //         nom : req.body.nom,
    //         minPrix : req.body.minPrix,
    //         maxPrix : req.body.maxPrix,
    //         minDuree : req.body.minDuree,
    //         maxDuree : req.body.maxDuree,
    //         minCommission : req.body.minCommission,
    //         maxCommission : req.body.maxCommission,
    //         delete : req.body.delete
    //     }
    //     serviceServ.multiCriteriaSearch(req.body.id,data)
    //     .then(data => {
    //         res.json(data);
    //     }).catch(err => {
    //         res.status(err.status || 400);
    //         serv.analyseError(err).then(error=>{res.send(error)})
    //     });
    // })
}