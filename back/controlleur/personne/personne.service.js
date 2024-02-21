const Personne = require('./../../model/personne');
var sexeServ = require('./../sexe/sexe.service');

async function insertion(value){
    var pers = new Personne(value);
    try {
        if(value.sexe_id != null){
            let sexe = await sexeServ.findById(value.sexe_id._id)
            pers.sexe_id = sexe;
            var data = await pers.save();
            return data;
        }else{
            let er = new Error("Veuillez choisir votre sexe");
            er.name = "sexe_id";
            throw er;
        }
    } catch (error) {
        throw error;
    }
}
exports.insertion = insertion;

async function findById(id){
    try {
        var personne = await Personne.findOne({_id:id}).populate("sexe_id");  
        if(personne == null){
            let er = new Error("personne n'existe pas")
            er.name = "personne";
            throw er;
        } 
        return personne;
    } catch (error) {
        throw error;
    }
}
exports.findById = findById;