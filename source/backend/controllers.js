const createUserModel = require('./models/createUserModel')
const createContactModel = require('./models/createContactModel')

exports.index = (req, res)=>{
    res.render('index', {
        alertType: req.alertType,
        alertText: req.alertText
    })
}

exports.agenda = (req, res)=>{
    let agenda = ''
    createContactModel.find().then( response => {
        agenda = response
        console.log(agenda)
        res.render('agenda', {
            alertType: req.alertType,
            alertText: req.alertText,
            agenda: agenda
        })
    })
}

exports.login = (req, res, next)=>{
    createUserModel.find({ email: req.body['email-de-login'], senha: req.body['senha-de-login']}).then(response => { if (response.length <= 0){
        req.alertType = 'danger',
        req.alertText = 'Dados inválidos.'
        next()
    } else {
        console.log(response._id)
        res.redirect('/agenda/')
    } })
}

exports.cadastro = (req, res, next)=>{
    createUserModel.find({ email: req.body['email-de-cadastro'] }).then(response => { if (response.length <= 0){
        createUserModel.create({ email: req.body['email-de-cadastro'], senha: req.body['senha-de-cadastro'] }).then((response)=>{console.log(`Usuário cadastrado: ${response._id}`)})
        req.alertType = 'success',
        req.alertText = 'Usuário cadastrado com sucesso!'
        next()
    } else {
        req.alertType = 'danger',
        req.alertText = 'Este e-mail já está sendo utilizado por outro usuário.'
        next()
    } })
}

exports.cadastrarcontato_get = (req, res)=>{
    res.render('cadastrarcontato', {
        alertType: req.alertType,
        alertText: req.alertText,
        contato: req.contato
    })
}

exports.cadastrarcontato_post = (req, res, next)=>{
    createContactModel.find({ email: req.body['email-de-cadastro'], telefone: req.body['telefone-de-cadastro'] }).then( response => {
        if (response.length <= 0) {
            console.log('n ta cadastrado')
            createContactModel.create({
                nome: req.body['nome-de-cadastro'],
                sobrenome: req.body['sobrenome-de-cadastro'],
                email: req.body['email-de-cadastro'],
                telefone: req.body['telefone-de-cadastro']
            }).then(response => {
                console.log(response)
                req.contato = response
                req.alertType = 'success'
                req.alertText = 'Contato cadastrado com sucesso!'
                next()
            })
        } else {
            req.alertType = 'danger'
            req.alertText = 'Contato já existente!'
            next()
        }
    })
}

exports.editarcontato_get = (req, res)=>{
    const id = req.params.id
    createContactModel.findById(id).then(response => {
        res.render('editarcontato', {
            alertType: req.alertType,
            alertText: req.alertText,
            contato: response
        })
    })
}

exports.editarcontato_post = (req, res, next)=>{
    const id = req.params.id
    createContactModel.updateOne({ _id: id }, { $set: { 
        nome: req.body['nome-de-cadastro'],
        sobrenome: req.body['sobrenome-de-cadastro'],
        email: req.body['email-de-cadastro'],
        telefone: req.body['telefone-de-cadastro']
     }}).then(response=>{
        req.alertType = 'info',
        req.alertText = 'Usuário atualizado!'
        next()
    })}

exports.deletarcontato = (req, res)=>{
    const id = req.params.id
    createContactModel.deleteOne({_id: id}).then(response => {
        res.redirect('/agenda/')
    })
}
    
    
