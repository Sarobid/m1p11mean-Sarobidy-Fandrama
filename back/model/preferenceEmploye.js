const mongoose = require('mongoose');
const { Schema } = mongoose;
const preferenceEmployeSchema = new Schema({
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
}, { timestamps: false });
const PreferenceEmploye = mongoose.model('preference_employe', preferenceEmployeSchema);
module.exports = PreferenceEmploye;