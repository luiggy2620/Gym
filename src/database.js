const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

module.exports = () => {
    
    mongoose.connect(
        process.env.MONGO_URI, {
        useNewUrlParser: true, useUnifiedTopology: true
    })
    
        .then(db => {
            console.log('Database is connected');
        })
        .catch(err => {
            console.log(err);
        })
        
}