var roleServ = require("./../../role/role.service");
var persServ = require("./../../personne/personne.service");
var utilServ = require("./../utilisateur.service");

async function getListeEmploye() {
    try {
        let roleEmp = await roleServ.findByNom(roleServ.nameRoleEmp);
        let data = await utilServ.getAll(roleEmp);    
        return data;
    } catch (error) {
        throw error;
    }
}
exports.getListeEmploye = getListeEmploye;

