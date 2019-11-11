const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const medicosSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },

    sobrenome: {
        type: String,
        required: true
    },

    crm: {
        type: String,
        unique: true,
        required: true
    },

    ddd: {
        type: Number,
        required: true
    },

    telefone: {
        type: Number,
        required: true
    },

    estado: {
        type: String,
        required: true
    },

    cidade: {
        type: String,
        required: true
    },

    espec: [{
        type: String,
        require: true
    }],

    dateCreated: {
        type: Date,
        default: Date.now
    }
});

 //medicosSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Medicos', medicosSchema);