const RendezVous = require("./../../../model/rendezVous");
var serv = require("./../../service/service.service");
var fonctServ = require("./../../../service/service");
async function getChiffreDaffaireMois(annee){
    try {
        let match = {};
        if(annee !== null && annee !==''){
            match["annee"] = ""+annee+"";
        }
        console.log(match)
        let data = await RendezVous.aggregate([])
        .addFields({
            annee: {
                $dateToString: {
                    format: "%Y",
                    date: "$date"
                }
            }
        }).match(match)
        .group({
            _id:{$month:"$date"}, 
            chiffreAvecCom: { $sum: "$prix" },
            totalCom :{
                $sum : {
                    $multiply: [
                        { $divide: ["$commission", 100] }, 
                        "$prix" 
                    ]
                }
            }
        })
        .addFields({
            chiffreSansCom :{
                $subtract: ["$chiffreAvecCom", "$totalCom"] 
            }
        }).addFields({
            totalComFormat :{
                $function: {
                    body: fonctServ.formatPrice.toString(),
                    args: ["$totalCom"],
                    lang: "js"
                  }
            }
        }).addFields({
            chiffreAvecFormat :{
                $function: {
                    body: fonctServ.formatPrice.toString(),
                    args: ["$chiffreAvecCom"],
                    lang: "js"
                  }
            }
        }).addFields({
            chiffreSansComFormat :{
                $function: {
                    body: fonctServ.formatPrice.toString(),
                    args: ["$chiffreSansCom"],
                    lang: "js"
                  }
            }
        }).sort({_id:1});
        console.log(data)
        return data;
    } catch (error) {
        throw error;
    }
}
exports.getChiffreDaffaireMois = getChiffreDaffaireMois;
async function getChiffreDaffaire(dateDebut,dateFin){
    try {
        let match = {};
        if(dateDebut !== null && dateDebut !==''){
            match["_id.date"] = {$gte : new Date(dateDebut)};
        }
        if(dateFin !== null && dateFin !==''){
            match["_id.date2"] = {$lte : new Date(dateFin)};
        }
        console.log(match)
        let data = await RendezVous.aggregate([{
            $group: {
                _id: {date : "$date",date2:"$date"}, 
                chiffreAvecCom: { $sum: "$prix" },
                totalCom :{
                    $sum : {
                        $multiply: [
                            { $divide: ["$commission", 100] }, 
                            "$prix" 
                        ]
                    }
                }
            }
        }]).addFields({
            chiffreSansCom :{
                $subtract: ["$chiffreAvecCom", "$totalCom"] 
            }
        }).addFields({
            dateFormat :{
                $function: {
                    body: fonctServ.afficheDate.toString(),
                    args: ["$_id.date"],
                    lang: "js"
                  }
            }
        }).addFields({
            totalComFormat :{
                $function: {
                    body: fonctServ.formatPrice.toString(),
                    args: ["$totalCom"],
                    lang: "js"
                  }
            }
        }).addFields({
            chiffreAvecFormat :{
                $function: {
                    body: fonctServ.formatPrice.toString(),
                    args: ["$chiffreAvecCom"],
                    lang: "js"
                  }
            }
        }).addFields({
            chiffreSansComFormat :{
                $function: {
                    body: fonctServ.formatPrice.toString(),
                    args: ["$chiffreSansCom"],
                    lang: "js"
                  }
            }
        }).match(match).sort({_id:{date:1}});
        console.log(data)
        return data;
    } catch (error) {
        throw error;
    }
}
exports.getChiffreDaffaire = getChiffreDaffaire;