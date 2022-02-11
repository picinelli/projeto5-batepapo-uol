let nomeUsuario = ''
let objeto = {
    name: nomeUsuario,
}

// Funcao que fara um request tipo get para pegar as mensagens do chat.
function buscarMensagens() {
    const promessa = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages')
    promessa.then(carregarMensagens)
}

// Executar a funcao acima a cada 3s para atualizar o chat.
setInterval(buscarMensagens, 3000)

// Funcao que ira iterar por cada objeto e verificar de qual tipo é (status, normal ou reservada).
function carregarMensagens(resposta) {
    let chat = document.querySelector('.janela-chat')
    chat.innerHTML = ''
    for(let i = 0; i < resposta.data.length; i++) {
        if(resposta.data[i].type === 'status') {
            carregarMensagensStatus(resposta, chat, i)
        } else if(resposta.data[i].type === 'message') {
            carregarMensagensNormais(resposta, chat, i)
        } else if(resposta.data[i].type === 'private_message') {
            carregarMensagensReservadas(resposta, chat, i)
        }
    }
}

// Funcao que irá criar uma div com as características de status.
function carregarMensagensStatus(resposta, chat, i) {
    chat.innerHTML += `
    <div class="chat mensagem__chat-entrousaiu" data-identifier="message">
        <p><span>${resposta.data[i].time}</span> <strong>${resposta.data[i].from}</strong> ${resposta.data[i].text}</p>
    </div>
    `
    chat.scrollTop = chat.scrollHeight;
    //chat.scrollIntoView()
}

// Funcao que irá criar uma div com as características de mensagens normais.
function carregarMensagensNormais(resposta, chat, i) {
    chat.innerHTML += `
    <div class="chat mensagem__chat" data-identifier="message">
        <p><span>${resposta.data[i].time}</span> <strong>${resposta.data[i].from}</strong> para <strong>${resposta.data[i].to}</strong> ${resposta.data[i].text}</p>
    </div>
    `
    chat.scrollTop = chat.scrollHeight;
    //chat.scrollIntoView()
}

// Funcao que irá criar uma div com as características de mensagens reservadas.
function carregarMensagensReservadas(resposta, chat, i) {
    // if para verificar se o Usuario é remetente ou destinatário
    // ATENCAO, ESSE IF NAO FOI TESTADO AINDA!
    if (resposta.data[i].from === nomeUsuario || resposta.data[i].to === nomeUsuario) {
        chat.innerHTML += `
        <div class="chat mensagem__chat-reservada" data-identifier="message">
            <p><span>${resposta.data[i].time}</span> <strong>${resposta.data[i].from}</strong> reservadamente para <strong>${resposta.data[i].to}</strong> ${resposta.data[i].text}</p>
        </div>
        `
        chat.scrollTop = chat.scrollHeight;
        //chat.scrollIntoView()
    }
}

// Funcao que fara um request tipo post para verificar se já existe o nome escolhido.
function liberarSite() {
    nomeUsuario = document.querySelector('.caixa-login').value
    objeto.name = nomeUsuario;
    const promessaNomes = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', objeto);
    promessaNomes.then(verificarNomesCorreto)
    promessaNomes.catch(verificarNomesErro)
}

// Funcao para liberar o acesso ao site, caso o nome escolhido seja válido.
function verificarNomesCorreto(resposta, nomeUsuario) {
    if (nomeUsuario !== '') {
        let telaLogin = document.querySelector('.tela-login');
        telaLogin.classList.add('escondido');
        setInterval(manterConexaoUsuario, 5000);
    }
}

// Funcao para enviar ao servidor informação(objeto - nomeUsuario) para manter conexão.
function manterConexaoUsuario() {
    const promessaStatus = axios.post('https://mock-api.driven.com.br/api/v4/uol/status', objeto);
}

// Funcao para não liberar o acesso ao site, caso o nome escolhido seja inválido.
function verificarNomesErro(resposta) {
    console.log(resposta);
    alert(`Erro! Usuário  já existe. Por favor, escolha outro nome!`);
}

// Função para enviar a mensagem ao chat.
function enviarMensagem() {
    let mensagem = document.querySelector('.caixa-mensagem').value;
    let objetoMensagem = {
        from: nomeUsuario,
        to: "Todos", // ou outro para bonus
        text: mensagem,
        type: "message" // ou "private_message" para o bônus
    }
    const enviarMensagemServidor = axios.post('https://mock-api.driven.com.br/api/v4/uol/messages', objetoMensagem);
    enviarMensagemServidor.catch(window.location.reload);
    mensagem = '';
}

