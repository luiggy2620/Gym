const { Schema, model } = require('mongoose');

const placeSchema = new Schema({

    name: {
        type: String,
        require: true
    },
    ubication: {
        type: String,
        require: true
    },
    ubicationURL: {
        type: String,
        require: true
    },
    phone: {
        type: Number
    }
}, {
    versionKey: false
});

module.exports = model('Place', placeSchema);