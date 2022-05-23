<div id="top"></div>
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/picinelli/projeto-batepapo-uol">
    <img src="https://github.com/picinelli/projeto-batepapo-uol/blob/main/conteudo/logo-uol.svg" alt="Logo" width="100">
  </a>

<h3 align="center">Projeto - Bate-Papo UOL</h3>
  <p align="center">
    Projeto de um bate-papo totalmente funcional com uso de API!
    <br />
    <a href="https://github.com/picinelli/projeto-cineflix/tree/main/src"><strong>Código JSX»</strong></a>
</div>

<!-- ABOUT THE PROJECT -->

![Banner](https://github.com/picinelli/projeto-batepapo-uol/blob/main/conteudo/banner.png)


# Requisitos

- Geral
    - [x]  Não utilize nenhuma biblioteca para implementar este projeto (jQuery, lodash, react, etc), nem outras linguagens que compilem para JS (TypeScript, ELM, etc), somente JavaScript puro.
    - [x]  Seu projeto deverá ser desenvolvido utilizando Git e GitHub, em um repositório público.
    - [x]  **A cada requisito implementado** faça um *commit* com uma mensagem descritiva do que você evoluiu.
- Layout
    - [x]  Aplicar layout para desktop e mobile, seguindo o figma oferecido.
- Distribuição de cartas
    - [x]  Ao entrar no jogo, o usuário deverá ser perguntado com quantas cartas quer jogar (utilize `prompt`)
    - [x]  O usuário só poderá inserir números pares no `prompt`, de 4 a 14. Qualquer número que fuja a essa regra não deve ser aceito. No caso de números inválidos, o `prompt` deverá ficar sendo repetido, até que o usuário coloque um número válido.
    - [x]  Após inserir um número de cartas válido, o jogo deverá inserir as cartas viradas pra baixo na página de forma que a distribuição seja aleatória
        
- Clique na carta
    - [x]  Ao clicar em uma carta, a mesma deve ser virada
    - [x]  Caso seja a primeira carta do par, ela deve permanecer virada até o usuário escolher a segunda carta
    - [x]  Caso seja a segunda carta virada, existem 2 situações:
        - [x]  Caso seja igual à primeira carta, o usuário acertou e ambas agora devem ficar viradas pra cima até o final do jogo
        - [x]  Caso seja uma carta diferente da primeira carta virada, o usuário errou. Nesse caso, o jogo deve **aguardar 1 segundo** e então virar as duas cartas para baixo novamente

- Fim do Jogo
    - [x]  Quando o usuário terminar de virar todas as cartas corretamente, deverá ser exibido um `alert` com a mensagem **"Você ganhou em X jogadas!"** sendo X a quantidade de vezes que o usuário virou uma carta no jogo.

# Bônus (opcional)

- [x]  Coloque um relógio no topo superior direito da tela, contando quantos segundos já passaram desde o início do jogo. Ao final, informe na mensagem de vitória a quantidade de segundos.
- [x]  Ao final do jogo, pergunte com um `prompt` se o usuário gostaria de reiniciar a partida. Se ele responder sim, comece novamente o jogo perguntando a quantidade de cartas.

### Tecnologias Utilizadas

![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![CSS](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white)
![HTML](https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

<!-- CONTACT -->

### Contato

[![LinkedIn][linkedin-shield]][linkedin-url]
[![Mail][mail-shield]][mail-url]

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=blue
[linkedin-url]: https://www.linkedin.com/in/pedro-ivo-brum-cinelli//
[mail-shield]: https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white
[mail-url]: mailto:cinelli.dev@gmail.com
