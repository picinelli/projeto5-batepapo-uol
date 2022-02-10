let nomeUsuario = ''

function buscarMensagens() {
    const promessa = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages')
    promessa.then(carregarMensagens)
}
setInterval(buscarMensagens, 3000)
//buscarMensagens()

function carregarMensagens(resposta) {
    console.log(resposta.data)
    let chat = document.querySelector('.janela-chat')
    let mensagens = document.querySelector('.chat')
    chat.innerHTML = ''
    for(let i = 0; i < resposta.data.length; i++) {
        if(resposta.data[i].type === 'status') {
            chat.innerHTML += `
            <div class="chat mensagem__chat-entrousaiu">
                <p><span>${resposta.data[i].time}</span> <strong>${resposta.data[i].from}</strong> ${resposta.data[i].text}</p>
            </div>
            `
            chat.scrollTop = chat.scrollHeight;
            //chat.scrollIntoView()
        } else if(resposta.data[i].type === 'message') {
            chat.innerHTML += `
            <div class="chat mensagem__chat">
                <p><span>${resposta.data[i].time}</span> <strong>${resposta.data[i].from}</strong> para <strong>${resposta.data[i].to}</strong> ${resposta.data[i].text}</p>
            </div>
            `
            chat.scrollTop = chat.scrollHeight;
            //chat.scrollIntoView()
        } else if(resposta.data[i].type === 'private_message') {
            chat.innerHTML += `
            <div class="chat mensagem__chat-reservada">
            <p><span>${resposta.data[i].time}</span> <strong>${resposta.data[i].from}</strong> reservadamente para <strong>${resposta.data[i].to}</strong> ${resposta.data[i].text}</p>
        </div>
            `
            chat.scrollTop = chat.scrollHeight;
            //chat.scrollIntoView()
        }
    }
}

function liberarSite() {
    nomeUsuario = document.querySelector('.caixa-login').value
    let objeto = {
        name: nomeUsuario,
    }
    const promessaNomes = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', objeto);
    promessaNomes.then(verificarNomesCorreto)
    promessaNomes.catch(verificarNomesErro)
}

function verificarNomesCorreto(resposta, nomeUsuario) {
    console.log(resposta);
    let telaLogin = document.querySelector('.tela-login');
    telaLogin.classList.add('escondido');
}

function verificarNomesErro(resposta) {
    console.log(resposta);
    alert(`Erro!  Usuário  já existe. Por favor, escolha outro nome!`);
}

