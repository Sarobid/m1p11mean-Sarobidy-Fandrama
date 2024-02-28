const prefEmp = require('./../../model/preferenceEmploye');
const empServ = require('./../utilisateur/employe/employe.service')

async function getAllEmploye(id){
    try {
        var listEmp = [];
        var allEmployes = await empServ.getListeEmploye();
        var preference = await prefEmp.find({ client_id: id });

        const preferenceIds = preference.map(employe => employe.employe_id.toString());
        console.log(allEmployes);
        
        // Filter out services that are not in the preference
        const nonPreferenceEmploye = allEmployes.filter(employe => !preferenceIds.includes(employe._id.toString()));
        // console.log(nonPreferenceEmploye);     
        
        return nonPreferenceEmploye;  
        // .then({
            
        // });
    } catch (error) {
        throw error;
    }
}
exports.getAllEmploye = getAllEmploye;

async function insertion(employe_id,client_id){
    try {
        var serv = new prefEmp({employe_id,client_id});
        var data = await serv.save();
        return data;
    } catch (error) {
        throw error;
    }
}
exports.insertion = insertion;

async function getAllPref(id){
    try {
        var datas = await prefEmp.find({client_id:id})
        .populate({
            path: 'employe_id',
            populate: {
                path: 'personne_id',
                populate: {
                    path: 'sexe_id'
                }
            }
        });
        return datas;
    } catch (error) {
        throw error;
    }
}
exports.getAllPref = getAllPref;

async function deletes(employe_id,client_id){
    try {
        // Assuming you have some criteria to find the document you want to delete
        const result = await prefEmp.findOneAndDelete({ employe_id, client_id });
        if (!result) {
            throw new Error('Service non trouvé');
        }
        return result;
    } catch (error) {
        throw error;
    }
}
exports.deletes = deletes;