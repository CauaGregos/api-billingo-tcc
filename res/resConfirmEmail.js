//Resposta em uma pagina html
const EmailConfirmado = (props) => {
   
    return (`
    <html>

    <head>
        <title>Email Confirmado</title>
    </head>
    
    <body>
        <div class="box">
            <img src="https://cdn.discordapp.com/attachments/837218390623780865/1027957166944039004/Group_6.png" class="icon">
        </div>
        <h1>Confirmado!</h1>
        
    </body>
    
    
    
    <style>
        body {
            font-family: Arial, Helvetica, sans-serif;
            background-color: black;
        }

        body img{
            left: 100px;
        }
    
        h1{
            color: white;
            position: absolute;
            left: 57%;
            padding: 10px;
            border-radius: 15px;
            width: 25%;
            top: 70%;
            transform: translate(-50%, -50%);
        }
    
        .box {
            color: white;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: rgba(0, 0, 0, 0.6);
            padding: 15px;
            border-radius: 15px;
            width: 25%;
            top: 45%;
        }
    
    
        .icon {
            width: 100%;
        }
    </style>
    
    </html>`)
}

module.exports = {EmailConfirmado}