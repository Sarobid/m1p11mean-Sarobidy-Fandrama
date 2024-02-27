const { get } = require('mongoose');
const prefServ = require('./../../model/preferenceService');
var Contr = require('./../../service/service')

async function getAll(id){
    try {
        var datas = await prefServ.find({_id:id});
        return datas;
    } catch (error) {
        throw error;
    }
}
exports.getAll = getAll;