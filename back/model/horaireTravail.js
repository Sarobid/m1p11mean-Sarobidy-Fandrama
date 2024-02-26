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
                return isValidTimeFormat(value);
            }
        },
        message:"Heure invalide"
    },
    heure_fin : {
        type : String,
        required:[true,"le heure fin est requise"],
        validate:{
            validator:function(value){
                let is =  isValidTimeFormat(value);
                if(is == true){
                    is = isTimeBefore(this.heure_debut,value);
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
    this.duree = calculateDuration(heureDebut, heureFin);
    next();
});
const HoraireTravail = mongoose.model('horaire_travail', horaireSchema);
module.exports = HoraireTravail;


function isValidTimeFormat(input) {
    let timeRegex = /^(?:[01]\d|2[0-3]):(?:[0-5]\d)$/;

    if (!timeRegex.test(input)) {
        return false; 
    }

    let [hours, minutes] = input.split(':').map(Number);
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        return false; 
    }
    return true;
}

function isTimeBefore(time1, time2) {
    let date1 = new Date('2024-01-01T' + time1 + ':00');
    let date2 = new Date('2024-01-01T' + time2 + ':00');
    return date1 < date2;
}
function calculateDuration(heureDebut, heureFin){
    let debutEnMs = heureInMillisecconde(heureDebut);
    let finEnMs = heureInMillisecconde(heureFin);
    let dureeEnMs =0;
    if (finEnMs >= debutEnMs) {
        dureeEnMs = finEnMs - debutEnMs;
    } else {
        dureeEnMs = (24 * 60 * 60 * 1000) - debutEnMs + finEnMs;
    }
    return dureeEnMs;
}
function heureInMillisecconde(heure){
    let h = heure.split(":");
    return (+h[0]) * 60 * 60 * 1000 + (+h[1]) * 60 * 1000;
}