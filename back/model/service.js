const mongoose = require('mongoose');
var serv = require("./../service/service")

const { Schema } = mongoose;
const servicesSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId, 
        auto: true
    },
    nom:{
        type : String,
        required : [true,"Le nom est requis"],
        unique : true
    },
    prix:{
        type : Number,
        required : [true,"Le prix est requis"]
    },
    duree:{
        type : Number, /// Millisecondes
        required : [true,"La durée est requise"]
    },
    commission:{
        type : Number ,
        required : [true,"La commission est requis"]
    },
    delete:{
        type : Boolean,
        default : false
    }
}, { timestamps: false });
const Service = mongoose.model('service', servicesSchema);
module.exports = Service;