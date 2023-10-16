const mongoose = require('mongoose')

const createUserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    senha: { type: String, required: true }
})

const createUserModel = mongoose.model('User', createUserSchema)

module.exports = createUserModel