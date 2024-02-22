const Serv = require('./../../model/service');

async function getAll(){
    try {
        var data = await Serv.find();
        return data;
    } catch (error) {
        throw error;
    }
}
exports.getAll = getAll;

async function insertion(nom,prix,duree,comission){
    var serv = new Serv({nom,prix,duree,comission});
    try {
        var data = await serv.save();
        return data;
    } catch (error) {
        throw error;
    }
}
exports.insertion = insertion;

async function updateDelete(id) {
    try {
        const updateService = await Serv.findByIdAndUpdate(
            id,
            { delete: true }, 
            { new: true } 
        );
        if (!updateService) {
            throw new Error('Service not found');
        }
        return updateService;
    } catch (error) {
        throw error;
    }
}
exports.updateDelete = updateDelete;