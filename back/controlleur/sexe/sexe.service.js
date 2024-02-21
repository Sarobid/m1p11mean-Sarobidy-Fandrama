const Sexe = require('./../../model/sexe');
async function getAll(){
    try {
        var data = await Sexe.find();
        return data;
    } catch (error) {
        throw error;
    }
}
exports.getAll = getAll;

async function findById(id){
    try {
        var sexe = null;
        try {
            sexe = await Sexe.findOne({_id:id});     
        } catch (error) {
            let er = new Error("Veuillez choisir votre sexe");
            er.name = "sexe_id";
            throw er;
        }
        if(sexe == null){
            let er = new Error("Veuillez choisir votre sexe");
            er.name = "sexe_id";
            throw er;
        }
        return sexe;       
    } catch (error) {
        throw error;
    }
}
exports.findById = findById;
async function insertion(nom){
    var sexe = new Sexe({nom});
    try {
        var data = await sexe.save();
        return data;
    } catch (error) {
        throw error;
    }
}
exports.insertion = insertion;