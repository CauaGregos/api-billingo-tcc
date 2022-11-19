const bd = require('./config/bd');
const bdConfig = require('./config/bdConfig');
const AlunoDAO = require('./daos/alunoDAO');
const AlunoDBO = require('./dbos/alunoDBO');
const PerfilDBO = require('./dbos/perfilDBO');
const comunicado=require('./config/erros');
const { sendMail } = require('./sendEmail');
const { html } = require('./res/resForgotAcsses');
const { resUpdatePass } = require('./res/sussessoUpdatePass')
const { EmailConfirmado } = require('./res/resConfirmEmail');
const e = require('express');

async function registerStudent(req, res) {
    if (Object.values(req.body).length != 3 || !req.body.nome || !req.body.idade || !req.body.email) {
        const erro=comunicado.newFunctionForComunicate('Ddi','Dados inesperados','Não foram fornecidos exatamente as 5 informações esperadas de um Aluno').object;
        return res.status(422).json(erro)
    }

    
    let aluno;
    try {
        aluno = AlunoDBO.newFunctionStudent(req.body.nome, req.body.email,req.body.idade)
    } catch (error) {
        const erro=comunicado.newFunctionForComunicate('Ddi','Dados inesperados','Não foram fornecidos exatamente as 3 informações esperadas de um aluno(nome, idade e cep)').object;
        return res.status(422).json(erro);
    }
    const ret = await AlunoDAO.signStudent(aluno)

    if (ret === undefined) {
        const erro=comunicado.newFunctionForComunicate('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object; 
        return res.status(500).json(erro)
    }

    const sucesso=comunicado.newFunctionForComunicate('RBS','Inclusão bem sucedida','sucess').object; 
    return res.status(201).json(sucesso);

}

async function registerPerfil(req, res) {
    if (Object.values(req.body).length != 4 || !req.body.nickName || !req.body.nome || !req.body.email || !req.body.senha ) {
        const erro=comunicado.newFunctionForComunicate('Ddi','Dados inesperados','Não foram fornecidos exatamente as 5 informações esperadas de um Aluno').object;
        return res.status(422).json(erro)
    }
    
    let perfil;
    try {
        perfil = PerfilDBO.newFunctionProfile(req.body.nickName,req.body.nome, req.body.email ,req.body.senha)
    } catch (error) {
        const erro=comunicado.newFunctionForComunicate('Ddi','Dados inesperados','Não foram fornecidos exatamente as 3 informações esperadas de um aluno(nome, idade e cep)').object;
        return res.status(422).json(erro);
    }
    const ret = await AlunoDAO.createProfile(perfil)

    if (ret === undefined) {
        const erro=comunicado.newFunctionForComunicate('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object; 
        return res.status(500).json(erro)
    }
    await AlunoDAO.setProgress(req.body.email,"earth")

    AlunoDAO.setProgress(req.body.email,"mars")

    const sucesso=comunicado.newFunctionForComunicate('RBS','Inclusão bem sucedida','sucess').object; 
    return res.status(201).json(sucesso);

}
 
async function sendEmailConfirm (req, res){
    if (sendMail(req.body.email,"Confirmar email",'<img src="https://cdn.discordapp.com/attachments/837218390623780865/1027957166944039004/Group_6.png" class="icon"><h2 class="title">Confirme seu email!</h2> <a class="botao" href = "https://app-tc.herokuapp.com/confirmEmail/'+req.body.email+'">Confirmar email</a><style>body{    font-family: Arial, Helvetica, sans-serif;    background-color: black;}.title{    color: aliceblue;}.botao{color: rgb(255, 255, 255);font-size: 15px;margin: 0 auto;width: 19%;border-radius: 5px;background-color: #3841F2;}.icon{width: 30%;}</style>')) {
        const sucesso=comunicado.newFunctionForComunicate('RBS','Inclusão bem sucedida','sucess').object; 
        return res.status(201).json(sucesso);
    }
    else {
        return res.status(404);
    }
}

async function confirmEmail(req, res) {
    
    if(AlunoDAO.confirmEmail(req.params.email)) {
    const sucesso=comunicado.newFunctionForComunicate('RBS','Email '+req.params.email+' confirmado com sucesso','sucess').object; 
    return res.send(EmailConfirmado(req.params.email));
    }
    else {return res.status(404)}
    
}

async function forwardForgotPass (req, res){
    const email = req.params.email
    let ret = await AlunoDAO.getExistStudent(email)
   
    if (ret === null) {
        const erro=comunicado.newFunctionForComunicate('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object; 
        return res.status(500).json(erro)
    }
    if (ret === false) {
        const erro=comunicado.newFunctionForComunicate('LJE','Email nao existe','nao existe aluno cadastrado com esse email').object; 
        return res.status(409).json(erro)
    }
    if (ret.length == 0) {
        const erro=comunicado.newFunctionForComunicate('LJE','Houve um problema','Não foi possivel concluir está acão').object; 
        return res.status(404).json(erro);
    }

    sendMail(req.params.email,"Confirmar email",'<img src="https://cdn.discordapp.com/attachments/837218390623780865/1027957166944039004/Group_6.png" class="icon"><h2 class="title">Esqueci minha senha!</h2> <a class="botao" href = "https://app-tc.herokuapp.com/forgotPass/'+email+'">Alterar senha</a><style>body{    font-family: Arial, Helvetica, sans-serif;    background-color: black;}.title{    color: aliceblue;}.botao{color: rgb(255, 255, 255);font-size: 15px;margin: 0 auto;width: 19%;border-radius: 5px;background-color: #3841F2;}.icon{width: 30%;}</style>')
    const sucesso=comunicado.newFunctionForComunicate('RBS','Inclusão bem sucedida','sucess').object; 
    return res.status(201).json(sucesso)
}

async function forgotPass (req,res){
    const email = req.params.email

    let ret = await AlunoDAO.getExistStudent(email)
   
    if (ret === null) {
        const erro=comunicado.newFunctionForComunicate('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object; 
        return res.status(500).json(erro)
    }
    if (ret === false) {
        const erro=comunicado.newFunctionForComunicate('LJE','Aluno nao existe','nao existe aluno cadastrado com esse id').object; 
        return res.status(409).json(erro)
    }
    if (ret.length == 0) {
        const erro=comunicado.newFunctionForComunicate('LJE','Houve um problema','Não foi possivel atualizar o dados do Aluno').object; 
        return res.status(404).json(erro);
    }

    return res.send(html(email));
}

async function updatePass (req, res){
    const email = req.params.email
    const senha = req.params.senha
    
    if (Object.values(req.params).length != 2|| !req.params.email  || !req.params.senha) {
        const erro=comunicado.newFunctionForComunicate('Ddi','Dados inesperados','Não foram fornecidos exatamente as 2 informações esperadas para a mudança de senha').object;
        return res.status(422).json(erro)
    }

    let ret = await AlunoDAO.getExistStudent(email)
   
    if (ret === null) {
        const erro=comunicado.newFunctionForComunicate('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object; 
        return res.status(500).json(erro)
    }
    if (ret === false) {
        const erro=comunicado.newFunctionForComunicate('LJE','Aluno nao existe','nao existe aluno cadastrado com esse id').object; 
        return res.status(409).json(erro)
    }
    if (ret.length == 0) {
        const erro=comunicado.newFunctionForComunicate('LJE','Houve um problema','Não foi possivel atualizar o dados do Aluno').object; 
        return res.status(404).json(erro);
    }
    
    try {
        AlunoDAO.updatePassword(email,senha)
    } catch (error) {
        const erro=comunicado.newFunctionForComunicate('Ddi','Dados inesperados','Falha ao gerar DBO do Aluno.').object;
        return res.status(422).json(erro);
    }

    const sucesso=comunicado.newFunctionForComunicate('RBS','Atualizacao bem sucedida','O aluno foi atualizado com sucesso').object; 
  
    return res.send(resUpdatePass());

    
}


async function uploadFile(req, res) {
    
    if (req.file==undefined) {
        const erro=comunicado.newFunctionForComunicate('Ddi','Dados inesperados','Não foram fornecidos exatamente a informação esperadas de um file').object;
        return res.status(422).json(erro)
    }
    // console.log('uploadFile: ', req.file);
    const sucesso = comunicado.newFunctionForComunicate('RBS', 'Imagem iserida com sucesso', 'Sucesso').object;
    return res.status(201).json(sucesso);
}


async function updateProgress(req, res) {
    if (Object.values(req.body).length != 3|| !req.body.email  || !req.body.planet || !req.body.progress) {
        const erro=comunicado.newFunctionForComunicate('Ddi','Dados inesperados','Não foram fornecidos exatamente as 3 informações esperadas').object;
        return res.status(422).json(erro)
    }
    
    let ret = await AlunoDAO.upadateProgress(req.body.progress,req.body.email,req.body.planet);
    if (ret === null) {
        const erro=comunicado.newFunctionForComunicate('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object; 
        return res.status(500).json(erro)
    }
    if (ret === false) {
        const erro=comunicado.newFunctionForComunicate('LJE','Aluno nao existe','nao existe aluno cadastrado com esse email').object; 
        return res.status(409).json(erro)
    }
    if (ret.length == 0) {
        const erro=comunicado.newFunctionForComunicate('LJE','Houve um problema','Não foi possivel atualizar o dados do Aluno').object; 
        return res.status(404).json(erro);
    }
    
    const sucesso=comunicado.newFunctionForComunicate('RBS','Atualizacao bem sucedida','O aluno foi atualizado com sucesso').object; 
    return res.status(201).json(sucesso); 
   
}

async function getProgress(req, res) {
    if (Object.values(req.body).length!=0) {

        const erro=comunicado.newFunctionForComunicate('DSP','Fornecimento de dados sem proposito','Foram fornecidos dados desnecessarios').object; 
        return res.status(422).json(erro); 
        
    }

    const email=req.params.email; // pego o codigo
    const planet = req.params.planet;
    const ret = await AlunoDAO.getProgress(email,planet); // utilizo o recupera um

    //Trato os erros do recupera um
    if (ret===null) {

        const erro=comunicado.newFunctionForComunicate('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object; 
        return res.status(500).json(erro); 
        
    }

    if (ret===false) {

        const erro=comunicado.newFunctionForComunicate('FNC','Falha no comando de SQL','O comando de SQL apresenta algum erro').object; 
        return res.status(409).json(erro); 
        
    }

    if (ret.length==0) {

        const erro=comunicado.newFunctionForComunicate('LNE','Aluno inexistente','Não há um aluno cadastrado com esse id').object; 
        return res.status(404).json(erro); 
        
    }

    
    return res.status(200).json(ret);


}


async function atualizarAluno(req, res) {
    
    if (Object.values(req.body).length != 4|| !req.body.id  || !req.body.Nome || !req.body.Idade || !req.body.CEP) {
        const erro=comunicado.newFunctionForComunicate('Ddi','Dados inesperados','Não foram fornecidos exatamente as 4 informações esperadas de um aluno(nome, idade e cep)').object;
        return res.status(422).json(erro)
    }
    
    let aluno;
    try {
        aluno = AlunoDBO.newFunctionStudent(req.body.id,req.body.Nome, req.body.Idade, req.body.CEP)
    } catch (error) {
        const erro=comunicado.newFunctionForComunicate('Ddi','Dados inesperados','Falha ao gerar DBO do Aluno.').object;
        return res.status(422).json(erro);
    }


    const id=req.params.id; // pegando o codigo

    // testanto se foi tentado alterar o codigo do aluno
    if (id!=aluno.id) {
        const erro=comunicado.newFunctionForComunicate('TMC','Mudança de id','Tentativa de mudar RA do Aluno').object; 
        return res.status(400).json(erro); 

    }
    let ret = await AlunoDAO.getStudent(id)
    if (ret === null) {
        const erro=comunicado.newFunctionForComunicate('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object; 
        return res.status(500).json(erro)
    }
    if (ret === false) {
        const erro=comunicado.newFunctionForComunicate('LJE','Aluno nao existe','nao existe aluno cadastrado com esse id').object; 
        return res.status(409).json(erro)
    }
    if (ret.length == 0) {
        const erro=comunicado.newFunctionForComunicate('LJE','Houve um problema','Não foi possivel atualizar o dados do Aluno').object; 
        return res.status(404).json(erro);
    }
    ret = await AlunoDAO.atualizarAluno(aluno)

    if (ret === null) {
        const erro=comunicado.newFunctionForComunicate('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object; 
        return res.status(500).json(erro)
    }
    if (ret === false) {
        const erro=comunicado.newFunctionForComunicate('LJE','Aluno nao existe','nao existe aluno cadastrado com esse id').object; 
        return res.status(409).json(erro)
    }
    const sucesso=comunicado.newFunctionForComunicate('RBS','Atualizacao bem sucedida','O aluno foi atualizado com sucesso').object; 
    return res.status(201).json(sucesso);
}

async function excluirAluno(req, res) {
    
    if (Object.values(req.body).length != 0) {

        const erro=comunicado.newFunctionForComunicate('Ddi','Fornecimento de dados sem proposito','Foram fornecidos dados desnecessarios').object;
        return res.status(422).json(erro);

    }

    const id = req.params.id; 
    let ret = await AlunoDAO.getStudent(id); 
    //Tratando erros do recupereUm

    if (ret === null) {
        const erro=comunicado.newFunctionForComunicate('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object; 
        return res.status(500).json(erro);
    }

    if (ret === false) { 
        const erro=comunicado.newFunctionForComunicate('FNC','Falha no comando de SQL','O comando de SQL apresenta algum erro').object; 
        return res.status(409).json(erro);
    }

    if (ret.length == 0) {
        const erro=comunicado.newFunctionForComunicate('LNE','inexistente','Não há aluno cadastrado com esse id').object; 
        return res.status(404).json(erro);
    }

    // removendo o aluno
    ret = await AlunoDAO.excluirAluno(id);

    //Tratando erros do remova
    if (ret === null) {
        const erro=comunicado.newFunctionForComunicate('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object; 
        return res.status(500).json(erro);
    }

    if (ret === false) {

        const erro = comunicado.newFunctionForComunicate('FNC', 'Falha no comando de SQL', 'O comando de SQL apresenta algum erro').object;
        return res.status(409).json(erro);

    }

    // se chegou aqui é porque deu certo
    const sucesso = comunicado.newFunctionForComunicate('RBS', 'Remoçao bem sucedida', 'O Aluno foi removido com sucesso').object;
    return res.status(201).json(sucesso);

}

async function getAluno(req, res) {
    if (Object.values(req.body).length!=0) {

        const erro=comunicado.newFunctionForComunicate('DSP','Fornecimento de dados sem proposito','Foram fornecidos dados desnecessarios').object; 
        return res.status(422).json(erro); 
        
    }

    const email=req.params.email; // pego o codigo
    const senha=req.params.senha;
    
    const ret = await AlunoDAO.getStudent(email,senha); // utilizo o recupera um

    //Trato os erros do recupera um
    if (ret===null) {

        const erro=comunicado.newFunctionForComunicate('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object; 
        return res.status(500).json(erro); 
        
    }

    if (ret===false) {

        const erro=comunicado.newFunctionForComunicate('FNC','Falha no comando de SQL','O comando de SQL apresenta algum erro').object; 
        return res.status(409).json(erro); 
        
    }

    if (ret.length==0) {

        const erro=comunicado.newFunctionForComunicate('LNE','Aluno inexistente','Não há um aluno cadastrado com esse id').object; 
        return res.status(404).json(erro); 
        
    }

    //Se chegou ate aqui deu tudo certo, entao retorno o meu aluno
    return res.status(200).json(ret);


}

async function getAlunoExistente(req, res) {
    if (Object.values(req.body).length!=0) {

        const erro=comunicado.newFunctionForComunicate('DSP','Fornecimento de dados sem proposito','Foram fornecidos dados desnecessarios').object; 
        return res.status(422).json(erro); 
        
    }

    const email=req.params.email; // pego o codigo
    
    const ret = await AlunoDAO.getExistStudent(email); // utilizo o recupera um

    //Trato os erros do recupera um
    if (ret===null) {

        const erro=comunicado.newFunctionForComunicate('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object; 
        return res.status(500).json(erro); 
        
    }

    if (ret===false) {

        const erro=comunicado.newFunctionForComunicate('FNC','Falha no comando de SQL','O comando de SQL apresenta algum erro').object; 
        return res.status(409).json(erro); 
        
    }

    if (ret.length==0) {

        const erro=comunicado.newFunctionForComunicate('LNE','Aluno inexistente','Não há um aluno cadastrado com esse id').object; 
        return res.status(404).json(erro); 
        
    }

    //Se chegou ate aqui deu tudo certo, entao retorno minhas linhas
    return res.status(200).json(ret);


}

async function recupereTodos(req, res) {
    if (Object.values(req.body).length!=0) {

        const erro=comunicado.newFunctionForComunicate('DSP','Fornecimento de dados sem proposito','Foram fornecidos dados desnecessarios').object; 
        return res.status(422).json(erro); 
        
    }

    const ret= await AlunoDAO.recupereTodos(); // recuperando 

    //Tratando erros
    if (ret===null) {

        const erro=comunicado.newFunctionForComunicate('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object; 
        return res.status(500).json(erro); 
        
    }

    if (ret===false) {

        const erro=comunicado.newFunctionForComunicate('FNC','Falha no comando de SQL','O comando de SQL apresenta algum erro').object; 
        return res.status(409).json(erro); 
        
    }

    // se chegou até aqui ocorreu tudo certo
    return res.status(200).json(ret); // retorno ret
}

module.exports={registerStudent,getAlunoExistente,uploadFile,forwardForgotPass,getProgress,updatePass,updateProgress,atualizarAluno,excluirAluno,getAluno,recupereTodos,registerPerfil,confirmEmail,sendEmailConfirm,forgotPass};

