const express = require('express')

const rotas = require('./rotas')

const port = process.env.PORT

// file manager
const multer = require('multer');

const storage = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            console.log(file)
            cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
            console.log(file)
            cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
        }
    });
const upload = multer({storage: storage});


console.log(port)
async function ativacaoDoServidor(){
    const app = express();
    app.use(express.json());

    // enviar imagens
    app.use('/uploads', express.static('uploads'))

    app.post ('/registerStudent',rotas.registerStudent)
    app.post ('/registerPerfil',rotas.registerPerfil)
    // envia email
    app.post ('/sendEmailConfirm',rotas.sendEmailConfirm)

    // confirma email no banco de dados
    app.get('/confirmEmail/:email',rotas.confirmEmail)
    //localiza o user atraves do email e senha 
    app.get('/getAluno/:email/:senha', rotas.getAluno)
    app.get('/getAlunoExistente/:email', rotas.getAlunoExistente)

    // vai mandar o cliente do email para esse site
    app.get('/forwardForgotPass/:email', rotas.forwardForgotPass)
    app.get('/forgotPass/:email', rotas.forgotPass)

    // vai mudar a senha 
    app.get('/updatePass/:email/:senha', rotas.updatePass)
    // upar um file
    app.post ('/uploadFile',upload.single('image'),rotas.uploadFile)
    app.get('/getProgress/:email/:planet', rotas.getProgress)
    app.put('/upgradeProgress',rotas.updateProgress)
    // app.put('/attAluno/:id',rotas.atualizarAluno)
    // app.delete('/alunoDel/:id',rotas.excluirAluno)
    // app.get('/alunos',rotas.recupereTodos)
    
    console.log('Servidor ativo')
    app.listen(port);
}
ativacaoDoServidor();