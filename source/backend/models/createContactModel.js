const mongoose = require('mongoose')

const createContactSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: true },
    email: { type: String, required: true },
    telefone: { type: String, required: true }
})

const createContactModel = mongoose.model('Contact', createContactSchema)

module.exports = createContactModel