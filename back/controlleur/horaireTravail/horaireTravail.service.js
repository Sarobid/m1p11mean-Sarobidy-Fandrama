const HoraireTravail = require("./../../model/horaireTravail");

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
        console.log({ utilisateur_id: id , date :{$gte: d }, date_fin:{$lt:d}})
        let horaire = await HoraireTravail.find({ utilisateur_id: id , date :{$lt: d }, date_fin:{$gte:d}});
        console.log(horaire);
        console.log(horaire.length);
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