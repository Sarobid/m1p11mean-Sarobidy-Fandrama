const mongoose = require('mongoose');
const { Schema } = mongoose;
const utilisateursSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId, 
        auto: true
    },
    email:{
        type : String,
        required : true,
        unique : true
    },
    mdp:{
        type : String,
        required : false
    },
    role_id: {
        type: Schema.Types.ObjectId,
        ref: 'role',
        required: true
    },
    personne_id: {
        type: Schema.Types.ObjectId,
        ref: 'personne',
        required: true
    },
    delete : {
        type : Boolean,
        default : false
    }
}, { timestamps: false });
const Utilisateur = mongoose.model('utilisateur', utilisateursSchema);
module.exports = Utilisateur;