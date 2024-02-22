const bcrypt = require("bcrypt")
var roleServ = require("./../role/role.service");
var persServ = require("./../personne/personne.service")
const Utilisateur = require("./../../model/utilisateur");
var servEmail = require("./../../service/email.service")

async function verificationEmailEtMdp(email,mdp){
    try {
        await servEmail.estEmail(email);
        if(mdp === ''){
            let err = new Error("Le mot de passe est requise");
            err.name = "mdp";
            throw err;
        }
        let utilisateur = await findByEmail(email);
        if(utilisateur === null){
            let err = new Error("Email incorrecte");
            err.name = "email";
            throw err;
        }
        let hashMdp = "";
        if(utilisateur.mdp != null){
            hashMdp = utilisateur.mdp;
        }
        await comaparaisonMotdePasse(mdp,hashMdp);
        return utilisateur;
    } catch (error) {
        throw error;
    }
}
exports.verificationEmailEtMdp = verificationEmailEtMdp;

async function updateMotdePasse(utilisateur_id, mdp, mdpConf) {
    try {
        let utilisateur = await findById(utilisateur_id);
        await controlleMotdePasse(mdp);
        if (mdp != mdpConf) {
            let err = new Error("Les deux mot de passe ne sont pas identique");
            err.name = "mdpConf";
            throw err;
        }
        let utilisateurUp = await Utilisateur.findOne({ _id: utilisateur_id });
        utilisateurUp['mdp'] = await encodeMotDePasse(mdp);
        let data = await utilisateurUp.save();
        return await findById(utilisateur_id);
    } catch (error) {
        throw error;
    }
}
exports.updateMotdePasse = updateMotdePasse;

async function comaparaisonMotdePasse(mdp,mdpHash){
    try {
        let rep = await bcrypt.compare(mdp, mdpHash);
        if(rep === false){
            let err = new Error("mot de passe incorrecte");
            err.name = "mdp";
            throw err;
        }  
    } catch (error) {
        throw error;
    }
    
}
async function encodeMotDePasse(mdp) {
    try {
        let mdpCrypt = await bcrypt.hash(mdp,10);
        return mdpCrypt;
    } catch (error) {
        throw error;
    }
}
exports.encodeMotDePasse = encodeMotDePasse;

async function controlleMotdePasse(mdp) {
    try {
        if (mdp.length <= 3) {
            let err = new Error("le mot de passe doit etre au minimum 4 caractère");
            err.name = "mdp";
            throw err;
        }
    } catch (error) {
        throw error;
    }
}

async function nouveauUtilisateur(roles, personne, email,http) {
    let is = true;
    try {
        await servEmail.estEmail(email);
        let u = await findByEmail(email);
        if (u === null) {
            let rol = await roleServ.findByNom(roles);
            let pers = await persServ.insertion(personne);
            let utilisateur = await create(roles, pers, email);
            let data = await findById(utilisateur._id);
            await servEmail.sendEmail(email, 'MEAN Beauty', "<h1>Bienvenue</h1><h4>" + data.personne_id.nom + " " + data.personne_id.prenom + "</h4><p>"+
            "Pour terminer votre inscription veuillez"+"<a href='"
                + http + data._id + "'>cliquer ici</a> s'il vous plait</p>", (val) => {
                    is = val;
                });
            // if (is === false) {
            //     let er = new Error("votre email est invalide");
            //     er.name = "email";
            //     await utilisateur.delete();
            //     await pers.delete();
            //     throw er;
            // }
            return data;
        } else {
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

async function isUtilisateurValid(id) {
    try {
        let utilis = await findById(id);
        let utilisateur = await Utilisateur.findOne({ _id: id });
        if (utilisateur.mdp != null) {
            let err = new Error("Vous avez déjà été inscrit");
            err.name = "utilisateur";
            throw err;
        }
        delete utilis.role_id;
        return utilis;
    } catch (error) {
        throw error;
    }
}
exports.isUtilisateurValid = isUtilisateurValid;

async function findById(id) {
    try {
        let utilisateur = null;
        try {
            utilisateur = await Utilisateur.findOne({ _id: id })
                .populate("role_id");
        } catch (error) {
            let err = new Error("utilisateur n'existe pas");
            err.name = "utilisateur";
            throw err;
        }
        if (utilisateur == null) {
            let err = new Error("utilisateur n'existe pas");
            err.name = "utilisateur";
            throw err;
        }
        let pers = await persServ.findById(utilisateur.personne_id);
        utilisateur = utilisateur.toJSON();
        utilisateur.personne_id = pers;
        //delete utilisateur.role_id;
        delete utilisateur.mdp;
        delete utilisateur.delete;
        return utilisateur;
    } catch (error) {
        throw error;
    }
}
exports.findById = findById;