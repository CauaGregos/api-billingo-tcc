const html = (props) => {
   
    return (`
    <html>
    <head>
    <title>Esqueceu a senha?</title>
    </head>

    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>


<body>
    <div class="box">
        <form>
            <img src="https://cdn.discordapp.com/attachments/837218390623780865/1027957166944039004/Group_6.png" class="icon">
            <tr><legend class="legends">Registre sua nova senha!</legend></tr>
            <tr></tr>
            <td class="inputs"><input type="password" id="mudarSenha" placeholder="Digite sua senha" class="inputs" style="text-align: center;" ></td>
            <tr></tr>
        </form>
        <button type="submit" class="botao" onclick="mudarSenha('${props}')">Atualizar Senha</button>
    </div>
</body>



<style>
    body {
        font-family: Arial, Helvetica, sans-serif;
        background-image: linear-gradient(to left top,
         #000000,
         #030303,
         #060606,
         #090909,
         #0c0c0c,
         #0e0e0e,
         #0f0f0f,
         #111111,
         #121212,
         #141414,
         #151515,
         #161616);
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

    .legends {
        border: 1px solid rgb(0, 0, 0);
        padding: 10px;
        text-align: center;
        background-color: rgb(23, 23, 23);
        border-radius: 8px;
    }

    .botao{
        color: rgb(255, 255, 255);
        font-size: 15px;
        display: block;
        margin: 0 auto;
        width: 50%;
        border-radius: 15px;
       background-color: #3841F2;    
    }

    .inputs{
        font-size: 15px;
        width: 100%;
        border-radius: 15px;
        color: black;
    }

    .icon{
        width: 55%;
        margin-left: 26%;
    }
</style>

<script>
const mudarSenha = (email) => {
const senha = document.getElementById('mudarSenha').value
window.location.href = 'https://app-tc.herokuapp.com/updatePass/'+ email+'/'+senha
}
</script>

</html>
    `)
}

module.exports = {html}