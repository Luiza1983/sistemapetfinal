// Função para mostrar/ocultar senha
let btn = document.querySelector('.fa-eye');

btn.addEventListener('click', () => {
    let inputSenha = document.querySelector('#senha');
  
    if (inputSenha.getAttribute('type') == 'password') {
        inputSenha.setAttribute('type', 'text');
    } else {
        inputSenha.setAttribute('type', 'password');
    }
});

// Função para processar o login do usuário
function entrar() {
    let email = document.querySelector('#email');
    let emailLabel = document.querySelector('#emailLabel');

    let senha = document.querySelector('#senha');
    let senhaLabel = document.querySelector('#senhaLabel');

    let msgError = document.querySelector('#msgError');
    let listaUser = JSON.parse(localStorage.getItem('listaUser')) || [];

    let userValid = {
        nome: null,
        email: null,
        senha: null
    };

    // Verifica se o email e senha são válidos
    const userIndex = listaUser.findIndex(item => item.emailCad === email.value && item.senhaCad === senha.value);

    // Se o email e a senha são encontrados na lista de usuários
    if (userIndex !== -1) {
        userValid = {
            nome: listaUser[userIndex].nomeCad,
            email: listaUser[userIndex].emailCad,
            senha: listaUser[userIndex].senhaCad
        };

        // Redireciona para a página de cadastro de pets
        window.location.href = './pos_login.html';

        // Gera um token aleatório
        let mathRandom = Math.random().toString(16).substr(2);
        let token = mathRandom + mathRandom;

        // Salva o token e o usuário logado no localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('userLogado', JSON.stringify(userValid));
    } else {
        // Exibe mensagem de erro e destaca os campos incorretos
        emailLabel.setAttribute('style', 'color: red');
        email.setAttribute('style', 'border-color: red');
        senhaLabel.setAttribute('style', 'color: red');
        senha.setAttribute('style', 'border-color: red');
        msgError.setAttribute('style', 'display: block');
        msgError.innerHTML = 'Email ou senha incorretos';
        email.focus();
    }
}
