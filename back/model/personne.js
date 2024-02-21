const mongoose = require('mongoose');
const { Schema } = mongoose;
const personnesSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId, 
        auto: true
    },
    nom: {
        type: String,
        required: [true,"Le nom est requise"]
    },
    prenom: {
        type: String
        , required: false
    },
    dateNaissance :{
        type: Date,
        required: [true, "La date de naissance est requise"],
        validate:{
            validator: function(value) {
                let age = new Date().getFullYear() - value.getFullYear();
                let is = true;
                if(age <=17){
                    is = false;
                }
                return is;
            },
            message: "Les personnes de moins de 18 ans ne sont pas autorisées"
        }
    },
    cin:{
        type: String,
        required: false
    },
    tel:{
        type : String,
        required:[true,"Le numero de telephone est requise"]
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