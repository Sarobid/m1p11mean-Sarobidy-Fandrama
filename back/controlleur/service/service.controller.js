var serviceServ = require("./sexe.service");
module.exports = function (app) {
    app.post("/service/insert",(req,res)=>{
        serviceServ.insertion(req.body.nom,req.body.prix,req.body.duree,req.body.comission)
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(err.status || 400);
            res.send({error: {message: err.message},});
        });
    });
    app.get("/service/getAll",(req,res)=>{
        serviceServ.getAll()
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(err.status || 400);
            res.send({error: {message: err.message},});
        });
    });
    app.post("/service/delete",(req,res)=>{
        serviceServ.updateDelete(req.body.id)
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(err.status || 400);
            res.send({error: {message: err.message},});
        });
    });
    app.post("/service/update",(req,res)=>{
        data={
            nom : req.body.nom,
            prix : req.body.prix,
            duree : req.body.duree,
            comission : req.body.comission,
            delete : req.body.delete
        }
        serviceServ.updateDelete(req.body.id,data)
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(err.status || 400);
            res.send({error: {message: err.message},});
        });
    });
    app.post("/service/searchMulti",(req,res)=>{
        data={
            nom : req.body.nom,
            minPrix : req.body.minPrix,
            maxPrix : req.body.maxPrix,
            minDuree : req.body.minDuree,
            maxDuree : req.body.maxDuree,
            minComission : req.body.minComission,
            maxComission : req.body.maxComission,
            delete : req.body.delete
        }
        serviceServ.multiCriteriaSearch(req.body.id,data)
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(err.status || 400);
            res.send({error: {message: err.message},});
        });
    })
}