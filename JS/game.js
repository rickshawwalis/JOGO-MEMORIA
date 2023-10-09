const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const reiniciar = document.querySelector('.reiniciar') // Recarrega a página
reiniciar.addEventListener("click", () => {
    location.reload();
});


const characters = [
    'birdperson',
    'devil',
    'jerry',
    'morty',
    'princenebulon',
    'rick',
    'squanchy',
    'summer',
    'tammy',
    'golden'
];

const CreateElement = (tag, className) => { //simplifica a criação do createElement e ClassName, tornando dois em um
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = ''; //recebe
let secondCard = ''; //recebe

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');
    if (disabledCards.length === 20) {
        clearInterval(this.loop); /*Zera o time*/
        alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML}`);
    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const seconCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter === seconCharacter) {
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card')

        firstCard = ''; //apaga o que recebeu
        secondCard = ''; //apaga o que recebeu

        checkEndGame()

    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = ''; //apaga o que recebeu
            secondCard = ''; //apaga o que recebeu

        }, 500);
    }
}

const revealCard = ({ target }) => { //faz a carta virar

    if (target.parentNode.className.includes('reveal-card')) { //Verifica se a carta já foi virada
        return
    }

    if (firstCard === '') {
        target.parentNode.classList.add('reveal-card');     //ativa o css que vira a carta
        firstCard = target.parentNode;

    } else if (secondCard === '') {
        target.parentNode.classList.add('reveal-card');     //ativa o css que vira a carta
        secondCard = target.parentNode;
        checkCards();
    }


}

const createCard = (character) => { //cria a carta
    const card = CreateElement('div', 'card');
    const front = CreateElement('div', 'face front');
    const back = CreateElement('div', 'face back');

    front.style.backgroundImage = `url('../IMAGENS/${character}.jpg')`

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard); //Ao clicar na carta faz ela virar
    card.setAttribute('data-character', character)
    return card;
}

const loadGame = () => { //faz as cartas surgirem e tbm coloca em modo random
    const duplicateCharacters = [...characters, ...characters];
    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);
    shuffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
}

const startTimer = () => {
    this.loop = setInterval(() => {
        const currentTime = Number(timer.innerHTML);
        timer.innerHTML = currentTime + 1;
    }, 1000);
}

window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');
    startTimer();
    loadGame();
}
//,L,

