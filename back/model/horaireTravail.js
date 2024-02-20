const mongoose = require('mongoose');
const { Schema } = mongoose;
const horaireSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId, 
        auto: true
    },
    utilisateur_id: {
        type: Schema.Types.ObjectId,
        ref: 'utilisateur',
        required: true
    },
    date : {
        type : Date,
        required : true
    },
    heure_debut: {
        type : String,
        required : true
    },
    heure_fin : {
        type : String
    }
}, { timestamps: false });
const HoraireTravail = mongoose.model('horaire_travail', horaireSchema);
module.exports = HoraireTravail;