'use strict';

const sons = {
    'A': 'boom.wav',
    'S': 'clap.wav',
    'D': 'hihat.wav',
    'F': 'kick.wav',
    'G': 'openhat.wav',
    'H': 'ride.wav',
    'J': 'snare.wav',
    'K': 'tink.wav',
    'L': 'tom.wav'
}

const criarDiv = (texto) => {                   // 01
    const div = document.createElement('div')   // <div> </div>
    div.classList.add('key');                   // <div class ="key"></div>
    div.textContent = texto;                    // <div class ="key"></div>
    div.id = texto;                             // <div class = key id="A"></div>
    document.getElementById('container').appendChild(div); // coloca a div criada dentro da div container 
}
const exibir = (sons) => Object.keys(sons).forEach(criarDiv); // 02
                                                              //Object.keys(sons) vai pegas todas as keys 
                                                              // que são as letras antes do 2 pontos
                                                              //.forEach vai passar por cada uma chamando
                                                              // a função criarDiv, criando todas letras
 
const tocarSom = (letra) => {                               // 04
    const audio = new Audio(`./sounds/${sons[letra]}`);     // 
    audio.play();
    
}

const adicionarEfeito = (letra) => document.getElementById(letra)
                                           .classList.add('active');

const removeEfeito = (letra) => {
    const div = document.getElementById(letra);
    const removeActive = () => div.classList.remove('active');
    div.addEventListener('transitionend', removeActive);
}

const ativarDiv = (evento) => {                 //03
    let letra = '';                             //
        if(evento.type == 'click'){
            letra = evento.target.id;           //armazena na variável a letra clicada target.id pelo id
        }else{
            letra = evento.key.toUpperCase();
        }

    const letraPermitida = sons.hasOwnProperty(letra);
    if(letraPermitida){
        adicionarEfeito(letra);
        tocarSom(letra);
        removeEfeito(letra);
    }
}

exibir(sons);

document.getElementById('container')
        .addEventListener('click', ativarDiv);

window.addEventListener('keydown', ativarDiv);