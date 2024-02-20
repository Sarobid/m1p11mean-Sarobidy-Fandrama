const mongoose = require('mongoose');
const { Schema } = mongoose;
const preferenceServiceSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId, 
        auto: true
    },
    service_id: {
        type: Schema.Types.ObjectId,
        ref: 'service',
        required: true
    },
    client_id: {
        type: Schema.Types.ObjectId,
        ref: 'utilisateur',
        required: true
    },
}, { timestamps: false });
const PreferenceService = mongoose.model('preference_service', preferenceServiceSchema);
module.exports = PreferenceService;