const { Schema, model } = require('mongoose');
const bcryptjs = require('bcryptjs');

const adminSchema = new Schema({
    email: {
        type: String,
        require: true
    }, 
    password: {
        type: String,
        require: true
    }
}, {
    versionKey: false
});

adminSchema.methods.encryptPassword = async password => {
    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(password, salt);
};

adminSchema.methods.matchPassword = async function(password) {
    return await bcryptjs.compare(password, this.password);
}

module.exports = model('Admin', adminSchema);