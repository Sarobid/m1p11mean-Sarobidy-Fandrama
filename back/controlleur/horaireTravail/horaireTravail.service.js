const HoraireTravail = require("./../../model/horaireTravail");
var serv = require("./../service/service.service");
var rendServ = require("./../rendez-vous/rendez-vous.service");
var servApp = require("./../../service/service");
async function getEmployeDisponible(date,service_id,utilisateur){
    
    try {
        if(date === null || date === '' || date.toString() === 'null'){
            console.log("date");
            throw {status:400,name:"date",message:"le date est requise"};
        }
        let d = new Date(date);
        let empDispDate = await getEmployeDisponibleDate(d);
        let service = await serv.findServiceById(service_id);
        let data = [];
        let i = 0;
        for(i = 0 ; i < empDispDate.length ; i++){
            let dern = await analyseDisponibilite(empDispDate[i].utilisateur._id,empDispDate[i].heure_debut,empDispDate[i].heure_fin,service,d,utilisateur._id);
            if(dern.length > 0){
                dern.forEach(row=>{
                    data.push({employe:empDispDate[i].utilisateur,heureDisp:row.heure});
                });
            }
        }
        if(data.length === 0){
            throw {status:400,name:"date",message:"aucun employe disponible"}
        }
        return data;
    } catch (error) {
        throw error;
    }
}
exports.getEmployeDisponible = getEmployeDisponible;

async function analyseDisponibilite(utilisateur_id,heureDebut,heureFin,service,date,client_id){
    try {
        let i = 0;
        let data = [];
        let listRend = await rendServ.getRendezVousBy(utilisateur_id,null,date,null,null);
        if(listRend.length > 0){
            
            for(i = 0 ; i < listRend.length ; i++){
                let diff = 0 ;
                if((i + 1) < listRend.length ){
                    diff = servApp.heureInMillisecconde(listRend[i+1].heure) - servApp.heureInMillisecconde(listRend[i].heureFin) ;
                    
                }else{
                     diff = servApp.heureInMillisecconde(heureFin) - servApp.heureInMillisecconde(listRend[i].heureFin) ;
                }
                if(diff >= service.duree){
                    data.push({heure:listRend[i].heureFin});
                }
            }
        }else{
            let diff = servApp.heureInMillisecconde(heureFin) - servApp.heureInMillisecconde(heureDebut) ;
            if(diff >= service.duree){
                data.push({heure:heureDebut});
            }
        }
        let repData = data;
        let listRendClient = await rendServ.getRendezVousBy(null,client_id,date,null,null);
        if(listRendClient.length > 0){
            repData = data.filter(row=>{
                let is = true;
                let heureMil = servApp.heureInMillisecconde(row.heure);
                for(i = 0 ; i < listRendClient.length ; i++){
                    console.log(heureMil +"  "+servApp.heureInMillisecconde(listRendClient[i].heure) +" "+servApp.heureInMillisecconde(listRendClient[i].heureFin))
                    if(servApp.heureInMillisecconde(listRendClient[i].heure) <= heureMil && servApp.heureInMillisecconde(listRendClient[i].heureFin) > heureMil){

                        is = false;
                        break;
                    }
                }
                return is;
            });
        }
        return repData;
    } catch (error) {
        throw error;
    }
}

async function getEmployeDisponibleDate(d) {
    try {
        let data = await HoraireTravail.aggregate([])
        .lookup({
            from: "utilisateurs",
            localField: "utilisateur_id",
            foreignField: "_id",
            as: "utilisateur"
        }).unwind("$utilisateur")
        .match({ "utilisateur.delete": false,"date":{$lte:d},"date_fin":{$gte:d} })
        .lookup({
            from: "personnes",
            localField: "utilisateur.personne_id",
            foreignField: "_id",
            as: "utilisateur.personne"
        }).unwind("$utilisateur.personne")
        .lookup({
            from: "sexes",
            localField: "utilisateur.personne.sexe_id",
            foreignField: "_id",
            as: "utilisateur.personne.sexe"
        }).unwind("$utilisateur.personne.sexe")
        .project({
            utilisateur_id : 0,
            utilisateur : {
                personne_id: 0,
                    mdp: 0,
                    personne:{
                        sexe_id:0
                    }
            }
        });
        return data;
    } catch (error) {
        throw error;
    }
}
exports.getEmployeDisponibleDate = getEmployeDisponibleDate;


async function getMoyenneDureeUtilisateur() {
    try {
        let data = await HoraireTravail.aggregate([
            {
                $group:
                {
                    _id: "$utilisateur_id",
                    moyenneDuree: { $avg: "$duree" }
                }
            }
        ]).lookup({
            from: "utilisateurs",
            localField: "_id",
            foreignField: "_id",
            as: "utilisateur"
        }).unwind("$utilisateur").match({ "utilisateur.delete": false })
            .lookup({
                from: "personnes",
                localField: "utilisateur.personne_id",
                foreignField: "_id",
                as: "utilisateur.personne"
            }).unwind("$utilisateur.personne")
            .lookup({
                from: "sexes",
                localField: "utilisateur.personne.sexe_id",
                foreignField: "_id",
                as: "utilisateur.personne.sexe"
            }).unwind("$utilisateur.personne.sexe")
            .project({
                utilisateur: {
                    delete: 0,
                    role_id: 0,
                    personne_id: 0,
                    mdp: 0,
                    personne:{
                        sexe_id:0
                    }
                    }
            })
        return data;
    } catch (error) {
        throw error;
    }
}
exports.getMoyenneDureeUtilisateur = getMoyenneDureeUtilisateur;

async function insertion(value, utilisateur) {
    try {
        let horaire = new HoraireTravail(value);
        horaire.utilisateur_id = utilisateur
        await controlleDate(horaire.date,"date", utilisateur._id);
        await controlleDate(horaire.date_fin,"date_fin", utilisateur._id);
        let data = await horaire.save();
        return { value: true };
    } catch (error) {
        throw error;
    }
}
exports.insertion = insertion;

async function getAllByUtilisateur(utilisateur) {
    try {
        let data = await HoraireTravail.find({ utilisateur_id: utilisateur._id }).sort({ date: -1 });
        return data;
    } catch (error) {
        throw error;
    }
}
exports.getAllByUtilisateur = getAllByUtilisateur;

async function update(debut, fin, date,date_fin, id) {
    try {
        let horaire = await findById(id);
        if (horaire === null) {
            throw { status: 400, name: "error", message: "horaire n'existe pas" };
        }
        horaire.heure_debut = debut;
        horaire.fin = fin;
        if (horaire.date.toDateString() !== new Date(date).toDateString()) {
            horaire.date = new Date(date);
            await controlleDate(date,"date", horaire.utilisateur_id);
        }
        if (horaire.date_fin.toDateString()!== new Date(date_fin).toDateString()) {
            horaire.date_fin = new Date(date_fin);
            await controlleDate(date_fin,"date_fin", horaire.utilisateur_id);
        }
        let h = await horaire.save();
        return { value: true };
    } catch (error) {
        throw error;
    }
}
exports.update = update;

async function findById(id) {
    try {
        let data = await HoraireTravail.findOne({ _id: id });
        return data;
    } catch (error) {
        throw { status: 400, name: "error", message: "horaire n'existe pas" };
    }
}
exports.findById = findById;

async function controlleDate(date,name, id) {
    try {
        let d = new Date(date);
        let horaire = await HoraireTravail.find({ utilisateur_id: id , date :{$lte: d }, date_fin:{$gte:d}});
        if (horaire.length > 0) {
            throw { status: 400, name: name, message: "Date déjà definie" }
        }       
        console.log("non controlleDate");
        return horaire;
    } catch (error) {
        console.log("controlleDate");
        throw error;
    }
}