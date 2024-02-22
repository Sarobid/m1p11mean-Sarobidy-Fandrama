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
}