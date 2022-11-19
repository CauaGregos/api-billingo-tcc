// // import {Alert} from 'react-native';

 const nodemailer = require("nodemailer");

const sendMail = (otherUser,subject,html) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user:"cauanunes013@gmail.com",
            pass:"cqmfvuzwkclvjunr"
        }
    })
    
    transporter.sendMail({
        from:"Billing.o <cauanunes013@gmail.com>",
        to:otherUser,
        subject:subject,
        text:'',
        html:html
    }).then(mensage =>{
        return true
        // tentar por aqui dentro a função do axios para setar na pessoa a informaçao que o email dele
        // ja pode ser validado
        // Alert.alert('Confirmação de email','Confirme seu email')
     
    }).catch(err => {return false})
}

module.exports = {sendMail}
