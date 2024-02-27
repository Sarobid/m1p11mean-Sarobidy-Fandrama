var prefServService = require('./prefServ.service');
var serv = require("./../../service/errorService");
var service = require("./../../service/service")

module.exports = function (app) {
    app.post("/prefServ/getById",(req,res) => {
        prefServService.getAll(req.body.id)
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(err.status || 400);
            serv.analyseError(err).then(error=>{res.send(error)})
        });
    })
}