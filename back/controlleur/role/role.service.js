const Role  = require("./../../model/role");

const nameRoleEmp = "EMPLOYE";
const nameRoleManager = "MANAGER";
const nameRoleClient = "CLIENT";
exports.nameRoleEmp = nameRoleEmp;
exports.nameRoleManager = nameRoleManager;
exports.nameRoleClient = nameRoleClient;

async function findByNom(nom){
    try {
        var role = await Role.findOne({role:nom});   
        if(role == null){
            let er = new Error("role n'existe pas");
            er.name = "role";
            throw er;
        }else{
            return role;
        }
    } catch (error) {
        throw error;
    }
}
exports.findByNom=findByNom;