const { Schema, model } = require('mongoose');
const bcryptjs = require('bcryptjs');

const clientSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true,
        unique: true
    },
    gym: {
        type: String,
        require: true
    },
    initialDate: {
        type: Date,
        require: true
    },
    finalDate: {
        type: Date,
        require: true
    },
    times: {
        type: Number,
        default: 0
    }

}, {
    versionKey: false
});

clientSchema.methods.encryptPhone = async phone => {
    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(phone, salt);
};

clientSchema.methods.matchPhone = async function (phone) {
    return await bcryptjs.compare(phone, this.phone);
};

clientSchema.methods.formatDate = date => {
    const newDate = new Date(date.value);
    return newDate.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

module.exports = model('Client', clientSchema);