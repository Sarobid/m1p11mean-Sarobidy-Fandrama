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
        await controlleDate(horaire.date, utilisateur._id);
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

async function update(debut, fin, date, id) {
    try {
        let horaire = await findById(id);
        if (horaire === null) {
            throw { status: 400, name: "error", message: "horaire n'existe pas" };
        }
        horaire.heure_debut = debut;
        horaire.fin = fin;
        if (horaire.date > new Date(date) || horaire.date < new Date(date)) {
            horaire.date = date;
            await controlleDate(horaire.date, horaire.utilisateur_id);
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

async function controlleDate(date, id) {
    try {
        //console.log({date:new Date(date),utilisateur_id:id});
        let horaire = await HoraireTravail.findOne({ date: new Date(date), utilisateur_id: id });
        if (horaire !== null) {
            throw { status: 400, name: "date", message: "Date déjà definie" }
        }
        
        console.log("non controlleDate");
        return horaire;
    } catch (error) {
        console.log("controlleDate");
        throw error;
    }
}