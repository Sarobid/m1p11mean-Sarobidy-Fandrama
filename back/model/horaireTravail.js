var serv = require("./../service/service")
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
        required : [true,"Le date est requise"],
    },
    heure_debut: {
        type : String,
        required : [true,"le heure de debut est requise"],
        validate:{
            validator:function(value){
                return serv.isValidTimeFormat(value);
            }
        },
        message:"Heure invalide"
    },
    heure_fin : {
        type : String,
        required:[true,"le heure fin est requise"],
        validate:{
            validator:function(value){
                let is =  serv.isValidTimeFormat(value);
                if(is == true){
                    is = serv.isTimeBefore(this.heure_debut,value);
                }
                return is;
            },
            message:"Heure invalide"
        }
    },
     duree : {
         type:Number,
         required:false,
     }
}, { timestamps: true });
horaireSchema.pre('save', function (next) {
    let heureDebut = this.heure_debut;
    let heureFin = this.heure_fin;
    this.duree = serv.calculateDuration(heureDebut, heureFin);
    next();
});
const HoraireTravail = mongoose.model('horaire_travail', horaireSchema);
module.exports = HoraireTravail;