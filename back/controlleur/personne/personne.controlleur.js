var persServ = require("./personne.service");
var serv = require("./../../service/errorService");

module.exports = function (app) {
    /*app.post("/personne",(req,res)=>{
        persServ.insertion(req.body)
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(err.status || 400);
            serv.analyseError(err).then(error=>{res.send(error)})
        });
    })
    app.get("/personne/:id",(req,res)=>{
        persServ.findById(req.params.id)
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(err.status || 400);
            serv.analyseError(err).then(error=>{res.send(error)})
        });
    })*/
}