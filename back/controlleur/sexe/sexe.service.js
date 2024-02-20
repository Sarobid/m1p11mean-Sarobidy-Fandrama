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