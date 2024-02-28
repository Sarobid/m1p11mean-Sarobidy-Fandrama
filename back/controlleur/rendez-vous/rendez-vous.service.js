const RendezVous = require("./../../model/rendezVous");
var serv = require("./../service/service.service");
var fonctServ = require("./../../service/service");
const { getListeEmploye } = require("../utilisateur/employe/employe.service");

async function deleteRendezVous(idRendezVous){
    try {
        let data = await RendezVous.findOne({_id : idRendezVous});
        await data.deleteOne();
        return true;
    } catch (error) {
        throw error;
    }
}
async function annulerRendezVous(idRendezVous,client){
    try {
        let data = await RendezVous.findOne({_id:idRendezVous});
        await deleteRendezVous(data._id);
        let valueList = await getRendezVousBy(data.employe_id,client._id, data.date,fonctServ.heureInMillisecconde(data.heure));
        let heure = data.heure;
        let heureChange = null;
        for(let i = 0 ; i < valueList.length ; i++){
            heureChange = valueList[i].heure;
            await updateHeure(heure,valueList[i]._id);
            heure = heureChange;
        }
        return await getRendezVousBy(null,client._id, data.date,null,0);
    } catch (error) {
        throw error;
    }
}
exports.annulerRendezVous = annulerRendezVous;
async function updateHeure(heure,idRendezVous){
    try {
        let data = await RendezVous.findOne({_id : idRendezVous});
        data.heure = heure;
        await data.save();
    } catch (error) {
        throw error;
    }
}
async function nouveauRendezVous(value,paye,date,client) {
    try {
        let service = await serv.findServiceById(value.service._id);
        let rendezVous = new RendezVous({service_id:service});
        rendezVous.client_id = client._id;
        rendezVous.employe_id = value.employe.employe._id;
        rendezVous.date = new Date(date);
        rendezVous.duree = service.duree;
        rendezVous.heure = value.employe.heureDisp;
        rendezVous.commission = service.commission;
        rendezVous.prix = service.prix;
        if(paye < service.prix){
            throw {status:402,name:"paye",message:"Montant insuffisant"};
        }else if(paye > service.prix){
            throw {status:402,name:"paye",message:"Montant trop élevé"};
        }
        await rendezVous.save();
        return await getRendezVousBy(null,client._id, rendezVous.date,null,0);
    } catch (error) {
        throw error;
    }
}
exports.nouveauRendezVous = nouveauRendezVous;

async function getListRendezVous(employe_id,client_id,service_id, dateDebut,dateFin,heureMin,heureMax,etat){
    try {
        let match = {};
        if(employe_id !== null && employe_id !==''){
            match["employe_id"] = employe_id;
        }
        if(client_id !== null && client_id !==''){
            match["client_id"] = client_id;
        }
        if(service_id !== null && service_id !==''){
            let s = await serv.findServiceById(service_id);
            match["service_id"] = s._id;
        }   
        if(dateDebut !== null && dateDebut !==''){
            match["date"] = {$gte : new Date(dateDebut)};
        }
        if(dateFin !== null && dateFin !==''){
            match["date"] = {$lte : new Date(dateFin)};
        }
        if(heureMin !== null && heureMin !== ''){
            //onsole.log("heureMin = "+heureMin)
            let h = fonctServ.heureInMillisecconde(heureMin);
            if(h > 0){
                match["heureDebutEnMill"] = { $gte : h}
            }
        }
        if(heureMax !== null && heureMax !== ''){
            //console.log("heureMax = "+heureMax)
            let hm = fonctServ.heureInMillisecconde(heureMax);
            if(hm > 0){
                match["heureDebutEnMill"] = { $lte : hm}
            }
        }
        if(etat !== null){
            match['etat'] = etat;
        }
        console.log(match)
        let data = await RendezVous.aggregate([{
            $addFields: {
                heureAsDate: {
                    $toDate: {
                        $concat: ["1970-01-01T", "$heure", ":00Z"]
                    }
                }
            }
        },
        {
            $addFields: {
                heureDuree: { $add: ["$heureAsDate", "$duree"] }
            }
        },
        ]).lookup({
            from: "utilisateurs",
            localField: "employe_id",
            foreignField: "_id",
            as: "employe"
        }).unwind("$employe")
        .lookup({
            from: "services",
            localField: "service_id",
            foreignField: "_id",
            as: "service"
        }).unwind("$service")
        .lookup({
            from: "personnes",
            localField: "employe.personne_id",
            foreignField: "_id",
            as: "employe.personne"
        }).unwind("$employe.personne")
        .addFields({
            heureFin: {
                $dateToString: {
                    format: "%H:%M",
                    date: "$heureDuree"
                }
            }
        }).addFields({
            heureDebutEnMill :  {
                $function: {
                  body: fonctServ.heureInMillisecconde.toString(),
                  args: ["$heure"],
                  lang: "js"
                }
            }
        }).addFields({
            dureeFormat :{
                $function: {
                    body: fonctServ.afficheDureMilliseconde.toString(),
                    args: ["$duree"],
                    lang: "js"
                  }
            }
        }).addFields({
            dateFormat :{
                $function: {
                    body: fonctServ.afficheDate.toString(),
                    args: ["$date"],
                    lang: "js"
                  }
            }
        }).addFields({
            prixFormat :{
                $function: {
                    body: fonctServ.formatPrice.toString(),
                    args: ["$prix"],
                    lang: "js"
                  }
            }
        }).addFields({
            payeFormat :{
                $function: {
                    body: fonctServ.formatPrice.toString(),
                    args: ["$paye"],
                    lang: "js"
                  }
            }
        }).match(match).project({
            employe:{
                mdp:0
            }
        }).sort({date:-1,heureDebutEnMill:1})
        //console.log(data);
        return data;
    } catch (error) {
        throw error;
    }
}
exports.getListRendezVous = getListRendezVous;
async function getRendezVousBy(employe_id,client_id, date,heureMinMill,etat){
    try {
        let match = {};
        if(employe_id !== null && employe_id !== ''){
            match["employe_id"] = employe_id;
        }
        if(client_id !== null && client_id !== ''){
            match["client_id"] = client_id;
        }
        
        if(date !== null && date !== ''){
            match["date"] = date;
        }
        if(heureMinMill !== null && heureMinMill > 0){
            match["heureDebutEnMill"] = { $gte : heureMinMill}
        }
        if(etat !== null){
            match['etat'] = etat;
        }
        let data = await RendezVous.aggregate([{
            $addFields: {
                heureAsDate: {
                    $toDate: {
                        $concat: ["1970-01-01T", "$heure", ":00Z"]
                    }
                }
            }
        },
        {
            $addFields: {
                heureDuree: { $add: ["$heureAsDate", "$duree"] }
            }
        },
        ]).lookup({
            from: "utilisateurs",
            localField: "employe_id",
            foreignField: "_id",
            as: "employe"
        }).unwind("$employe")
        .lookup({
            from: "services",
            localField: "service_id",
            foreignField: "_id",
            as: "service"
        }).unwind("$service")
        .addFields({
            heureFin: {
                $dateToString: {
                    format: "%H:%M",
                    date: "$heureDuree"
                }
            }
        }).addFields({
            heureDebutEnMill :  {
                $function: {
                  body: fonctServ.heureInMillisecconde.toString(),
                  args: ["$heure"],
                  lang: "js"
                }
            }
        }).match(match).project({
            employe:{
                mdp:0
            }
        }).sort({heureDebutEnMill:1})
        return data;
    } catch (error) {
        throw error;
    }
}
exports.getRendezVousBy = getRendezVousBy;
async function getDernierRendezVous(utilisateur_id, date,type) {
    try {
        let data = await RendezVous.aggregate([{
            $addFields: {
                heureAsDate: {
                    $toDate: {
                        $concat: ["1970-01-01T", "$heure", ":00Z"]
                    }
                }
            }
        },
        {
            $addFields: {
                heureDuree: { $add: ["$heureAsDate", "$duree"] }
            }
        },
        ]).group({
            _id: { utilisateur_id: "$"+type, date: "$date" },
            maxHeure: { $max: "$heureDuree" }
        }).addFields({
            heureFin: {
                $dateToString: {
                    format: "%H:%M",
                    date: "$maxHeure"
                }
            }
        }).match({
            "_id.utilisateur_id":utilisateur_id,
            "_id.date":date
        })
        return data;
    } catch (error) {
        throw error;
    }
}
exports.getDernierRendezVous = getDernierRendezVous;