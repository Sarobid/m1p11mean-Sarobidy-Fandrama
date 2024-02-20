const mongoose = require('mongoose');
const { Schema } = mongoose;
const depenseSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId, 
        auto: true
    },
    libelle: {
        type: String,
        required: true,
    }
}, { timestamps: false });
const Depense = mongoose.model('depense', depenseSchema);
module.exports = Depense;