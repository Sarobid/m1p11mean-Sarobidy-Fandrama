const mongoose = require('mongoose');
const { Schema } = mongoose;
const rolesSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId, 
        auto: true
    },
    role: {
        type: String,
        required: true,
        unique: true
    },
}, { timestamps: false });
const Role = mongoose.model('role', rolesSchema);
module.exports = Role;