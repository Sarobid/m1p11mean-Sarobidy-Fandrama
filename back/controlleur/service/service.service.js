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
            throw new Error('erreur du suppression');
        }
        return updateService;
    } catch (error) {
        throw error;
    }
}
exports.updateDelete = updateDelete;

async function updateService(id,update) {
    try {
        const updateService = await Serv.findByIdAndUpdate(
            id, 
            update,
            { new: true } 
        );
        if (!updateService) {
            throw new Error('Erreur du modification du service');
        }
        return updateService;
    } catch (error) {
        throw error;
    }
}
exports.updateService = updateService;

async function findServiceById(id) {
    try {
        const service = await Serv.findById(id);
        if (!service) {
            throw new Error('Service non trouvé');
        }
        return service;
    } catch (error) {
        throw error;
    }
}
exports.findServiceById = findServiceById;

async function multiCriteriaSearch(criteria) {
    try {
        const datas = {};
        if (criteria.nom && (criteria.nom != '' || criteria.nom != null)) {
            datas.nom = criteria.nom;
        }
        // if (criteria.prix && (criteria.prix != '' || criteria.prix != null)) {
        //     datas.prix = criteria.prix;
        // }

        if ((criteria.minPrix !== undefined || criteria.minPrix !== null) && (criteria.maxPrix !== undefined || criteria.maxPrix !== null)) {
            datas.prix = { $gte: criteria.minPrix, $lte: criteria.maxPrix };
        } else if (criteria.minPrix !== undefined || criteria.minPrix !== null) {
            datas.prix = { $gte: criteria.minPrix };
        } else if (criteria.maxPrix !== undefined || criteria.maxPrix !== null) {
            datas.prix = { $lte: criteria.maxPrix };
        }

        // if (criteria.duree && (criteria.duree != '' || criteria.duree != null)) {
        //     datas.duree = criteria.duree;
        // }
        if ((criteria.minDuree !== undefined || criteria.minDuree !== null) && (criteria.maxDuree !== undefined || criteria.maxDuree !== null)) {
            datas.duree = { $gte: criteria.minDuree, $lte: criteria.maxDuree };
        } else if (criteria.minDuree !== undefined || criteria.minDuree !== null) {
            datas.duree = { $gte: criteria.minDuree };
        } else if (criteria.maxDuree !== undefined || criteria.maxDuree !== null) {
            datas.duree = { $lte: criteria.maxDuree };
        }
        if (criteria.comission && (criteria.comission != '' || criteria.comission != null)) {
            datas.comission = criteria.comission;
        }

        if ((criteria.minComission !== undefined || criteria.minComission !== null) && (criteria.maxComission !== undefined || criteria.maxComission !== null)) {
            datas.comission = { $gte: criteria.minComission, $lte: criteria.maxComission };
        } else if (criteria.minComission !== undefined || criteria.minComission !== null) {
            datas.comission = { $gte: criteria.minComission };
        } else if (criteria.maxComission !== undefined || criteria.maxComission !== null) {
            datas.comission = { $lte: criteria.maxComission };
        }

        if (criteria.delete && (criteria.delete != '' || criteria.delete != null) ) {
            datas.delete = criteria.delete;
        }

        const services = await Serv.find(datas);
        return services;
    } catch (error) {
        throw error;
    }
}
exports.multiCriteriaSearch = multiCriteriaSearch;
