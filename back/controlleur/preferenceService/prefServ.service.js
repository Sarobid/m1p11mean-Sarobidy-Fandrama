const { get } = require('mongoose');
const prefServ = require('./../../model/preferenceService');
const serv = require('./../../model/service');
var Contr = require('./../../service/service')

async function getAllService(id){
    try {
        var allServices = await serv.find({ delete: false });
        var preference = await prefServ.find({ client_id: id });
        
        const preferenceIds = preference.map(service => service.service_id.toString());
        console.log(preferenceIds);
        
        // Filter out services that are not in the preference
        const nonPreferenceServices = allServices.filter(service => !preferenceIds.includes(service._id.toString()));
        console.log(nonPreferenceServices);      
        
        return nonPreferenceServices;  
        // .then({
            
        // });
    } catch (error) {
        throw error;
    }
}
exports.getAllService = getAllService;

async function getAll(id){
    try {
        var datas = await prefServ.find({client_id:id})
        .populate({
            path: 'service_id'
        });
        return datas;
    } catch (error) {
        throw error;
    }
}
exports.getAll = getAll;

async function insertion(service_id,client_id){
    try {
        var serv = new prefServ({service_id,client_id});
        var data = await serv.save();
        return data;
    } catch (error) {
        throw error;
    }
}
exports.insertion = insertion;

async function deletes(service_id,client_id){
    try {
        // Assuming you have some criteria to find the document you want to delete
        const result = await prefServ.findOneAndDelete({ service_id, client_id });
        if (!result) {
            throw new Error('Service non trouvé');
        }
        return result;
    } catch (error) {
        throw error;
    }
}
exports.deletes = deletes;