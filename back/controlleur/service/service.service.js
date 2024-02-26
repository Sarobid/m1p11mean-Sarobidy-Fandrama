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

async function insertion(nom,prix,duree,commission){
    var serv = new Serv({nom,prix,duree,commission});
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
        // Now that we have found the service, we can update it
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

// async function multiCriteriaSearch(criteria) {
//     try {
//         const datas = {};
//         if (criteria.nom && (criteria.nom != '' || criteria.nom != null)) {
//             datas.nom = criteria.nom;
//         }
//         // if (criteria.prix && (criteria.prix != '' || criteria.prix != null)) {
//         //     datas.prix = criteria.prix;
//         // }

//         if ((criteria.minPrix !== undefined || criteria.minPrix !== null) && (criteria.maxPrix !== undefined || criteria.maxPrix !== null)) {
//             datas.prix = { $gte: criteria.minPrix, $lte: criteria.maxPrix };
//         } else if (criteria.minPrix !== undefined || criteria.minPrix !== null) {
//             datas.prix = { $gte: criteria.minPrix };
//         } else if (criteria.maxPrix !== undefined || criteria.maxPrix !== null) {
//             datas.prix = { $lte: criteria.maxPrix };
//         }

//         // if (criteria.duree && (criteria.duree != '' || criteria.duree != null)) {
//         //     datas.duree = criteria.duree;
//         // }
//         if ((criteria.minDuree !== undefined || criteria.minDuree !== null) && (criteria.maxDuree !== undefined || criteria.maxDuree !== null)) {
//             datas.duree = { $gte: criteria.minDuree, $lte: criteria.maxDuree };
//         } else if (criteria.minDuree !== undefined || criteria.minDuree !== null) {
//             datas.duree = { $gte: criteria.minDuree };
//         } else if (criteria.maxDuree !== undefined || criteria.maxDuree !== null) {
//             datas.duree = { $lte: criteria.maxDuree };
//         }
//         if (criteria.commission && (criteria.commission != '' || criteria.commission != null)) {
//             datas.commission = criteria.commission;
//         }

//         if ((criteria.minCommission !== undefined || criteria.minCommission !== null) && (criteria.maxCommission !== undefined || criteria.maxCommission !== null)) {
//             datas.Commission = { $gte: criteria.minCommission, $lte: criteria.maxCommission };
//         } else if (criteria.minCommission !== undefined || criteria.minCommission !== null) {
//             datas.Commission = { $gte: criteria.minCommission };
//         } else if (criteria.maxCommission !== undefined || criteria.maxCommission !== null) {
//             datas.Commission = { $lte: criteria.maxCommission };
//         }

//         if (criteria.delete && (criteria.delete != '' || criteria.delete != null) ) {
//             datas.delete = criteria.delete;
//         }

//         const services = await Serv.find(datas);
//         if (!services) {
//             let er = new Error('Aucun service ne correspond à votre recherche');
//             er.name = "service";
//             throw er;
//         }
//         return services;
//     } catch (error) {
//         throw error;
//     }
// }
// exports.multiCriteriaSearch = multiCriteriaSearch;
