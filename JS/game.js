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
        clearInterval(this.loop);
        const playerName = spanPlayer.innerHTML;
        const score = parseInt(timer.innerHTML);
        alert(`Parabéns, ${playerName}! Seu tempo foi: ${score}`);
        saveScore(playerName, score);
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

const saveScore = (playerName, score) => {
    const scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.push({ playerName, score });
    localStorage.setItem('scores', JSON.stringify(scores));
}

const displayScoreHistory = (playerName) => {
    const scores = JSON.parse(localStorage.getItem('scores')) || [];
    const playerScores = scores.filter((score) => score.playerName === playerName);
    
    const scoreHistoryElement = document.querySelector('.score-history');
    
    if (scoreHistoryElement.style.display === 'none' || !playerScores.length) {
        let historyHTML = '';
        if (playerScores.length === 0) {
            historyHTML = 'Nenhuma pontuação encontrada para este jogador.';
        } else {
            historyHTML = `Histórico de pontuações para ${playerName}:<br>`;
            playerScores.forEach((score, index) => {
                historyHTML += `${index + 1}. Tempo: ${score.score}<br>`;
            });
        }
        scoreHistoryElement.innerHTML = historyHTML;
        scoreHistoryElement.style.display = 'block'; // Mostra o histórico
    } else {
        scoreHistoryElement.innerHTML = ''; // Oculta o histórico
        scoreHistoryElement.style.display = 'none';
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

const showHideScoreHistoryButton = document.querySelector('.show-hide-score-history');
showHideScoreHistoryButton.addEventListener("click", () => {
    const playerName = spanPlayer.innerHTML;
    displayScoreHistory(playerName);
});





