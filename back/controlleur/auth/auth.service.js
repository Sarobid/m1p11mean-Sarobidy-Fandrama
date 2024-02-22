var utilServ = require("./../utilisateur/utilisateur.service");
var tokenServ = require("./../token/token.service");
var roleService = require("./../role/role.service");
const { utilisateurService } = require("../../../front/src/service/utilisateur.service");
var serv = require("./../../service/errorService");
async function authentification(email, mdp) {
    try {
        let utilisateur = await utilServ.verificationEmailEtMdp(email, mdp);
        let tok = await tokenServ.nouveauToken(utilisateur);
        let uti = await utilServ.findById(utilisateur._id);
        return { token: tok.token_value, utilisateur: uti };
    } catch (error) {
        throw error;
    }
}
exports.authentification = authentification;

async function chekAutorisation(roles, req, res) {
    try {
        let autAuth = req.headers.authorization;
        if (autAuth) {
            let tokenString = autAuth.split(' ')[1];
            console.log(tokenString);
            let tok = await tokenServ.analyseToken(tokenString);
            let utilisateur = await utilServ.findByIdSimpleRole(tok.utilisateur_id);
            let i = 0;
            let isAuth = false;
            for (i = 0; i < roles.length; i++) {
                if (utilisateur.role_id.role === roles[i]) {
                    isAuth = true;
                    break;
                }
            }
            if (isAuth === false) {
                throw { status: 403, name: "error", message: "FORBIDDEN" };
            }
            return utilisateur;
        }else{
            throw { status: 403, name: "error", message: "AUTH.ERROR.NOT_LOGGED_IN" };
        }

    } catch (err) {
        throw err;
    }
}
exports.chekAutorisation = chekAutorisation;




