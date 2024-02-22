var utilServ = require("./../utilisateur/utilisateur.service")
async function authentification(email,mdp){
    try {
        let utilisateur = await utilServ.verificationEmailEtMdp(email,mdp);
        return await utilServ.findById(utilisateur._id);
    } catch (error) {
        throw error;
    }
}
exports.authentification = authentification;