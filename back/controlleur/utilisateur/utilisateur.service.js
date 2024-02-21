const bcrypt = require("bcrypt")
var roleServ = require("./../role/role.service");
var persServ = require("./../personne/personne.service")
const Utilisateur = require("./../../model/utilisateur");

async function updateMotdePasse(utilisateur_id,mdp,mdpConf) {
    try {
        let utilisateur = await findById(utilisateur_id);
        await controlleMotdePasse(mdp);
        if(mdp != mdpConf){
            throw new Error("Les deux mot de passe ne sont pas identique");   
        }
        let utilisateurUp = await Utilisateur.findOne({_id:utilisateur_id});
        utilisateurUp['mdp'] = await encodeMotDePasse(mdp);
        let data = await utilisateurUp.save();
        return await findById(utilisateur_id);
    } catch (error) {
        throw error;
    }
}
exports.updateMotdePasse = updateMotdePasse;

async function encodeMotDePasse(mdp){
    try {
        let mdpCrypt = await bcrypt.hash(mdp, 10);
        return mdpCrypt;
    } catch (error) {
        throw error;
    }
}
exports.encodeMotDePasse = encodeMotDePasse;

async function controlleMotdePasse(mdp){
    try {
        if(mdp.length <= 3){
            throw new Error("le mot de passe doit etre au minimum 4 caractère");
        }
    } catch (error) {
        throw error;
    }
}

async function nouveauUtilisateur(roles, personne, email) {
    try {
        let u = await findByEmail(email);
        if(u === null){
            let rol = await roleServ.findByNom(roles);
            let pers = await persServ.insertion(personne);
            let utilisateur = await create(roles, pers, email);
            let data = await findById(utilisateur._id);
            return data;
        }else{
            let er = new Error("email existe déjà");
            er.name = "email";
            throw er;
        }
        
    } catch (error) {
        throw error;
    }
}
exports.nouveauUtilisateur = nouveauUtilisateur;

async function create(roles, personne, email) {
    var utilisateur = new Utilisateur({ email: email });
    try {
        let role = await roleServ.findByNom(roles);
        utilisateur.role_id = role;
        let pers = await persServ.findById(personne._id);
        utilisateur.personne_id = pers;
        var data = await utilisateur.save();
        return data;
    } catch (error) {
        throw error;
    }
}
exports.create = create;

async function findByEmail(email) {
    try {
        let utilisateur = await Utilisateur.findOne({ email: email })
            .populate("role_id");   
        return utilisateur;
    } catch (error) {
        throw error;
    }
}
exports.findByEmail = findByEmail;

async function findById(id) {
    try {
        let utilisateur = await Utilisateur.findOne({ _id: id })
            .populate("role_id");
        if (utilisateur == null) {
            let err = new Error("utilisateur n'existe pas");
            err.name = "utilisateur";
            throw err;
        }
        let pers = await persServ.findById(utilisateur.personne_id);
        utilisateur = utilisateur.toJSON();
        utilisateur.personne_id = pers;
        delete utilisateur.role_id;
        delete utilisateur.mdp;
        delete utilisateur.delete;
        return utilisateur;
    } catch (error) {
        throw error;
    }
}
exports.findById = findById;