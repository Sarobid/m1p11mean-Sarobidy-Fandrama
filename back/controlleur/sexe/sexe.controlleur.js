var sexeServ = require("./sexe.service");
module.exports = function (app) {
    app.post("/sexe",(req,res)=>{
        sexeServ.insertion(req.body.nom)
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(err.status || 400);
            res.send({error: {message: err.message},});
        });
    });
    app.get("/sexes",(req,res)=>{
        sexeServ.getAll()
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(err.status || 400);
            res.send({error: {message: err.message},});
        });
    });
}