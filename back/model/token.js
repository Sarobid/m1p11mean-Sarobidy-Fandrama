const mongoose = require('mongoose');
const { Schema } = mongoose;
const tokenSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId, 
        auto: true
    },
    token_value: {
        type: String,
        required: true
    },
    utilisateur_id: {
        type: Schema.Types.ObjectId,
        ref: 'utilisateur',
        required: true
    },
    date_expiration:{
        type: Date,
        required:true
    }
}, { timestamps: false });
const Token = mongoose.model('token', tokenSchema);
module.exports = Token;