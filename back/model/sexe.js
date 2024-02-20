const mongoose = require('mongoose');
const { Schema } = mongoose;
const sexeSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId, 
        auto: true
    },
    nom: {
        type: String,
        required: true,
        unique: true
    },
}, { timestamps: false });
const Sexe = mongoose.model('sexe', sexeSchema);
module.exports = Sexe;