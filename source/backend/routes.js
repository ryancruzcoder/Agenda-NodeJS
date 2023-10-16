const express = require('express')
const router = express.Router()
const controllers = require('./controllers')

router.get('/', controllers.index)

router.get('/agenda/', controllers.agenda)

router.post('/login/', controllers.login, controllers.index)

router.post('/cadastro/', controllers.cadastro, controllers.index)

router.get('/agenda/cadastrar-contato/:id?', controllers.cadastrarcontato_get)

router.post('/agenda/cadastrar-contato/:id?', controllers.cadastrarcontato_post, controllers.cadastrarcontato_get)

router.get('/agenda/editar/:id', controllers.editarcontato_get)

router.post('/agenda/editar/:id', controllers.editarcontato_post, controllers.editarcontato_get)

router.get('/agenda/excluir/:id', controllers.deletarcontato)





module.exports = router