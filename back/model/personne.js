const mongoose = require('mongoose');
const { Schema } = mongoose;
const personnesSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId, 
        auto: true
    },
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String
        , required: false
    },
    dateNaissance :{
        type: Date,
        required: true
    },
    cin:{
        type: String,
        required: false
    },
    photo:{
        type : String,
        required : false
    },
    tel:{
        type : String,
        required:true
    },
    sexe_id: {
        type: Schema.Types.ObjectId,
        ref: 'sexe',
        required: true
    },
    photo:{
        type : String,
        required:false
    }
}, { timestamps: false });
const Personne = mongoose.model('Personne', personnesSchema);
module.exports = Personne;