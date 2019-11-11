const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const estadosSchema = new mongoose.Schema({
    state: {
        type: String,
        required: true,
        unique:true
    },

    stateName: {
        type: String,
        required: true,
        unique: true
    },

    cities: [{
        type: String,
        require: true
    }]
});


module.exports = mongoose.model('Estados', estadosSchema);