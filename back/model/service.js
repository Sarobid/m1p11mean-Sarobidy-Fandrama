const mongoose = require('mongoose');
const { Schema } = mongoose;
const servicesSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId, 
        auto: true
    },
    nom:{
        type : String,
        required : true
    },
    prix:{
        type : Number,
        required : true
    },
    duree:{
        type : Number, /// Millisecondes
        required : true
    },
    commission:{
        type : Number ,
        required : true
    },
    delete:{
        type : Boolean,
        default : false
    }
}, { timestamps: false });
const Service = mongoose.model('service', servicesSchema);
module.exports = Service;