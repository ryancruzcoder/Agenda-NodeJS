// Importações
const path = require('path')
const express = require('express')
const app = express()
const routes = require('./routes')
const mongoose = require('mongoose')
require('dotenv').config()

app.use(express.urlencoded({extended: true})) // Configurando para receber parâmetros enviados pelos formulários

app.use(routes) // Usando rotas definidas em './routes'

app.set('views', path.resolve(__dirname, '..', 'frontend', 'views')) // Definindo local da pasta views

app.set('view engine', 'ejs') // Definindo o tipo de dados encontrado em views/

app.use(express.static(path.resolve(__dirname, '..', 'frontend', 'public', 'assets'))) // Definindo a pasta 'static'

mongoose.connect(process.env.CONNECTIONSTRING, {
    useNewUrlParser: true, // UseNewUrlParser está habilitado por padrão, mas você pode especificá-lo se desejar
    useUnifiedTopology: true, // UseUnifiedTopology é recomendado para a nova API de driver do MongoDB
  }).then(()=>{console.log('Database Connected!')}) // Conectando com o banco de dados MongoDB

app.listen(8080, ()=>{console.log('http://localhost:8080')}) // Abrindo o localhost na porta 8080