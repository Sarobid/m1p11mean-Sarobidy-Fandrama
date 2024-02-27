const Serv = require('./../../model/service');
var Contr = require('./../../service/service')

async function getAll(){
    try {
        var datas = await Serv.find();
        return datas;
    } catch (error) {
        throw error;
    }
}
exports.getAll = getAll;

async function getAllActivate(){
    try {
        var datas = await Serv.find({delete:false});
        return datas;
    } catch (error) {
        throw error;
    }
}
exports.getAllActivate = getAllActivate;

async function insertion(nom,prix,durees,commission){
    try {
        if(durees == null || durees == undefined){
            let er = new Error("Durée nécessaire");
            er.name = "duree";
            throw er;
        }
        if(prix <= 0){
            let er = new Error("Prix invalide");
            er.name = "prix";
            throw er;
        }
        let duree = Contr.heureInMillisecconde(durees);
        if(duree <= 0){
            let er = new Error("Durée invalide");
            er.name = "duree";
            throw er;
        }if(commission <= 0 || commission >=100){
            let er = new Error("Commission invalide");
            er.name = "commission";
            throw er;
        }
        var serv = new Serv({nom,prix,duree,commission});
        var data = await serv.save();
        return data;
    } catch (error) {
        throw error;
    }
}
exports.insertion = insertion;

async function updateDelete(id) {
    try {
        const service = await Serv.findOne({_id:id});
        if (!service) {
            throw new Error('Aucun service ne correspond');
        }
        const updateService = await service.updateOne(
            { delete: true }
        );
        if (!updateService) {
            let er = new Error('erreur du suppression');
            er.name = "service";
            throw er;
        }
        return updateService;
    } catch (error) {
        throw error;
    }
}
exports.updateDelete = updateDelete;

async function activeService(id) {
    try {
        const service = await Serv.findOne({_id:id});
        if (!service) {
            throw new Error('Aucun service ne correspond');
        }
        const updateService = await service.updateOne(
            { delete: false }
        );
        if (!updateService) {
            let er = new Error('erreur du suppression');
            er.name = "service";
            throw er;
        }
        return updateService;
    } catch (error) {
        throw error;
    }
}
exports.activeService = activeService;

async function updateService(id,update) {
    try {
        const service = await Serv.findOne({_id:id});
        if (!service) {
            throw new Error('Aucun service ne correspond');
        }
        const updateService = await service.updateOne(update);
        if (!updateService) {
            let er = new Error('Erreur du modification du service');
            er.name = "service";
            throw er;
        }
        return updateService;
    } catch (error) {
        throw error;
    }
}
exports.updateService = updateService;

async function findServiceById(id) {
    try {
        const service = await Serv.findOne({_id:id});
        if (!service) {
            let er = new Error('Service non trouvé');
            er.name = "service";
            throw er;
        }
        return service;
    } catch (error) {
        throw error;
    }
}
exports.findServiceById = findServiceById;
