let nomeUsuario = ''
let destinatário = 'Todos'
let tipoMensagem = 'message'
let objeto = {
    name: nomeUsuario,
}
let mensagem = document.querySelector('.caixa-mensagem');
let areaOpaca = document.querySelector('.area-opaca');
let listaParticipantes = document.querySelector('.lista-participantes');

// Funcao que fara um request tipo get para pegar as mensagens do chat.
function buscarMensagens() {
    const promessa = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages')
    promessa.then(carregarMensagens)
}

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
    buscarParticipantes()
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
    let mensagemValor = document.querySelector('.caixa-mensagem').value;
    let objetoMensagem = {
        from: nomeUsuario,
        to: destinatário,
        text: mensagemValor,
        type: tipoMensagem // ou "private_message" para o bônus
    }
    const enviarMensagemServidor = axios.post('https://mock-api.driven.com.br/api/v4/uol/messages', objetoMensagem);
    enviarMensagemServidor.then(buscarMensagens);
    enviarMensagemServidor.catch(window.location.reload);
    if (mensagemValor !== '') {
        mensagemValor = '';
    }
}

// Enviar mensagem com enter.
mensagem.addEventListener("keyup", enviarComEnter)
function enviarComEnter(evento) {
    if (evento.keyCode === 13) {
        document.querySelector(".icone__enviar-footer").click();
    }
};

// Funcao para fazer uma requisicao tipo GET, solicitando os participantes.
function buscarParticipantes() {
    const promessaParticipantes = axios.get('https://mock-api.driven.com.br/api/v4/uol/participants')
    promessaParticipantes.then(criarParticipantes)
}

// Funcao que cria as divs com os participantes, com as informacoes da funcao acima
function criarParticipantes(promessa) {
    let participante = document.querySelector('.participantes')
    participante.innerHTML = `
    <div class="caixa-opcoes" onclick="selecionarDestinatario(this)">
        <div class="opcoes-selecionar">
            <img src="conteudo/icone-pessoas.svg" alt="icone-pessoas">
            <p class="nome">Todos</p>
        </div>
        <img src="conteudo/icone-marcado.svg" class="escondido" alt="icone-marcado">
    </div>
    `
    for(let i = 0; i < promessa.data.length; i++) {
        if (promessa.data[i].name !== nomeUsuario) {
            participante.innerHTML += `
            <div class="caixa-opcoes" onclick="selecionarDestinatario(this)" data-identifier="participant">
                <div class="opcoes-selecionar">
                    <img src="conteudo/icone-pessoa.svg" alt="icone-pessoa">
                    <p class="nome">${promessa.data[i].name}</p>
                </div>
                <img src="conteudo/icone-marcado.svg" class="escondido" alt="icone-marcado">
            </div>
            `
        }
    }
}

// Funcao para mostrar a div com os participantes.
function mostrarParticipantes() {
    listaParticipantes.classList.remove('escondido')
    areaOpaca.classList.add('opacidade')
}

// Funcao para esconder a div com os participantes.
function esconderParticipantes() {
    listaParticipantes.classList.add('escondido')
    areaOpaca.classList.remove('opacidade')
}

// Funcao para escolher o destinatario
function selecionarDestinatario(elemento) {
    destinatário = elemento.querySelector('.nome').innerHTML;
    let participantes = document.querySelector('.participantes')
    let pessoaSelecionada = document.querySelector('.pessoa-selecionada');
    if (pessoaSelecionada === null) {
        elemento.querySelector('img:nth-child(2)').classList.remove('escondido')
        elemento.querySelector('img:nth-child(2)').classList.add('pessoa-selecionada')
    } else {
        let pessoaSelecionada = document.querySelector('.pessoa-selecionada');
        pessoaSelecionada.classList.add('escondido')
        pessoaSelecionada.classList.remove('pessoa-selecionada')
        elemento.querySelector('img:nth-child(2)').classList.remove('escondido')
        elemento.querySelector('img:nth-child(2)').classList.add('pessoa-selecionada')
    }
}

// Funcao para escolher a visibilidade
function selecionarVisibilidade(elemento) {
    let visibilidade = document.querySelector('.visibilidade')
    let visibilidadeSelecionada = document.querySelector('.visibilidade-selecionada');
    if (visibilidadeSelecionada === null) {
        elemento.querySelector('img:nth-child(2)').classList.remove('escondido')
        elemento.querySelector('img:nth-child(2)').classList.add('visibilidade-selecionada')
    } else {
        let visibilidadeSelecionada = document.querySelector('.visibilidade-selecionada');
        visibilidadeSelecionada.classList.add('escondido')
        visibilidadeSelecionada.classList.remove('visibilidade-selecionada')
        elemento.querySelector('img:nth-child(2)').classList.remove('escondido')
        elemento.querySelector('img:nth-child(2)').classList.add('visibilidade-selecionada')
    }

    if (elemento.querySelector('p').innerHTML === 'Público') {
        tipoMensagem = "message";
    } else {
        tipoMensagem = "private_message"
    }
}



// Executar a funcao abaixo a cada 3s para atualizar o chat.
setInterval(buscarMensagens, 3000)

// Executar a funcao abaixo a cada 10s para atualizar os participantes.
setInterval(buscarParticipantes, 10000)