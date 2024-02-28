const mongoose = require('mongoose');
const { Schema } = mongoose;
const rendezVousSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId, 
        auto: true
    },
    employe_id: {
        type: Schema.Types.ObjectId,
        ref: 'utilisateur',
        required: true
    },
    client_id: {
        type: Schema.Types.ObjectId,
        ref: 'utilisateur',
        required: true
    },
    service_id: {
        type: Schema.Types.ObjectId,
        ref: 'service',
        required: true
    },
    date : {
        type : Date,
        required : true
    },
    prix : {
        type : Number,
        required : true
    },
    paye : {
        type : Number,
        default : 0
    },
    commission : {
        type : Number,
        required : true
    },
    heure : {
        type : String,
        required : true
    },
    duree : {
        type : Number,
        required : true
    },
    etat : {
        type : Number,
        default : 0
    }
}, { timestamps: true });
const RendezVous = mongoose.model('rendez_vou', rendezVousSchema);
module.exports = RendezVous;