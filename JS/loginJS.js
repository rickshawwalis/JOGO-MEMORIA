const input = document.querySelector('.login_input');
const button = document.querySelector('.login_button');
const form = document.querySelector(".login-form");

//comando para habilitar o botão ENTRAR
const validateInput = ({ target }) => {
    if (target.value.length > 2) { //Especifica dois caracteres para liberar o botão INICIAR
        button.removeAttribute('disabled');
        return;
    }
    button.setAttribute('disabled', ''); //Caso não seja colocado dois caracteres o botão INICIAR é bloqueado
}

input.addEventListener('input', validateInput);

//comando para ir a Próxima Página e salvar o nome do Jogador
const handleSubmit = (event) => {
    event.preventDefault(); //IMPEDE O ENVIO DO FORMULARIO
    localStorage.setItem('player', input.value); //ARMAZENA O NOME DO JOGADOR
    window.location = 'pages/game.html'; //VAI PARA A PAGINA DESTINADA
}
form.addEventListener('submit', handleSubmit);



















// const button = document.querySelector('.login_button');
// const input = document.querySelector('.login_input');

// input.addEventListener('input', () => {
//     if (input.value.length > 2) {
//         button.removeAttribute('disabled');
//         return;
//     }
//         button.setAttribute('disabled', 'true');
// });

