let btn = document.querySelector('#verSenha');
let btnConfirm = document.querySelector('#verConfirmSenha');

let nome = document.querySelector('#nome');
let labelNome = document.querySelector('#labelNome');
let validNome = false;

let email = document.querySelector('#email');
let labelEmail = document.querySelector('#labelEmail');
let validEmail = false;

let telefone = document.querySelector('#telefone');
let labelTelefone = document.querySelector('#labelTelefone');
let validTelefone = false;

let endereco = document.querySelector('#endereco');
let labelEndereco = document.querySelector('#labelEndereco');
let validEndereco = false;

let senha = document.querySelector('#senha');
let labelSenha = document.querySelector('#labelSenha');
let validSenha = false;

let confirmSenha = document.querySelector('#confirmSenha');
let labelConfirmSenha = document.querySelector('#labelConfirmSenha');
let validConfirmSenha = false;

let msgError = document.querySelector('#msgError');
let msgSuccess = document.querySelector('#msgSuccess');

// Validação do campo "Nome"
nome.addEventListener('keyup', () => {
  if (nome.value.length <= 2) {
    labelNome.setAttribute('style', 'color: red');
    labelNome.innerHTML = 'Nome *Insira no mínimo 3 caracteres';
    nome.setAttribute('style', 'border-color: red');
    validNome = false;
  } else {
    labelNome.setAttribute('style', 'color: green');
    labelNome.innerHTML = 'Nome';
    nome.setAttribute('style', 'border-color: green');
    validNome = true;
  }
});

// Validação do campo "Email"
email.addEventListener('keyup', () => {
  // Pode adicionar uma validação mais detalhada para o formato do email
  if (email.value.length === 0) {
    labelEmail.setAttribute('style', 'color: red');
    labelEmail.innerHTML = 'Email *Campo obrigatório';
    email.setAttribute('style', 'border-color: red');
    validEmail = false;
  } else {
    labelEmail.setAttribute('style', 'color: green');
    labelEmail.innerHTML = 'Email';
    email.setAttribute('style', 'border-color: green');
    validEmail = true;
  }
});

// Validação do campo "Telefone"
telefone.addEventListener('keyup', () => {
  // Pode adicionar uma validação mais detalhada para o formato do telefone
  if (telefone.value.length === 0) {
    labelTelefone.setAttribute('style', 'color: red');
    labelTelefone.innerHTML = 'Telefone *Campo obrigatório';
    telefone.setAttribute('style', 'border-color: red');
    validTelefone = false;
  } else {
    labelTelefone.setAttribute('style', 'color: green');
    labelTelefone.innerHTML = 'Telefone';
    telefone.setAttribute('style', 'border-color: green');
    validTelefone = true;
  }
});

// Validação do campo "Endereço"
endereco.addEventListener('keyup', () => {
  if (endereco.value.length === 0) {
    labelEndereco.setAttribute('style', 'color: red');
    labelEndereco.innerHTML = 'Endereço *Campo obrigatório';
    endereco.setAttribute('style', 'border-color: red');
    validEndereco = false;
  } else {
    labelEndereco.setAttribute('style', 'color: green');
    labelEndereco.innerHTML = 'Endereço';
    endereco.setAttribute('style', 'border-color: green');
    validEndereco = true;
  }
});

// Validação do campo "Senha"
senha.addEventListener('keyup', () => {
  if (senha.value.length <= 5) {
    labelSenha.setAttribute('style', 'color: red');
    labelSenha.innerHTML = 'Senha *Insira no mínimo 6 caracteres';
    senha.setAttribute('style', 'border-color: red');
    validSenha = false;
  } else {
    labelSenha.setAttribute('style', 'color: green');
    labelSenha.innerHTML = 'Senha';
    senha.setAttribute('style', 'border-color: green');
    validSenha = true;
  }
});

// Validação do campo "Confirmar Senha"
confirmSenha.addEventListener('keyup', () => {
  if (senha.value != confirmSenha.value) {
    labelConfirmSenha.setAttribute('style', 'color: red');
    labelConfirmSenha.innerHTML = 'Confirmar Senha *As senhas não conferem';
    confirmSenha.setAttribute('style', 'border-color: red');
    validConfirmSenha = false;
  } else {
    labelConfirmSenha.setAttribute('style', 'color: green');
    labelConfirmSenha.innerHTML = 'Confirmar Senha';
    confirmSenha.setAttribute('style', 'border-color: green');
    validConfirmSenha = true;
  }
});

// Função para cadastrar um novo usuário
function cadastrar() {
  if (validNome && validEmail && validTelefone && validEndereco && validSenha && validConfirmSenha) {
    let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');
    
    // Verifica se o email já está cadastrado
    if (listaUser.some(user => user.emailCad === email.value)) {
      msgError.setAttribute('style', 'display: block');
      msgError.innerHTML = '<strong>Este email já está cadastrado</strong>';
      msgSuccess.innerHTML = '';
      msgSuccess.setAttribute('style', 'display: none');
      return;
    }
    
    // Adiciona o novo usuário à lista
    listaUser.push({
      nomeCad: nome.value,
      emailCad: email.value,
      telefoneCad: telefone.value,
      enderecoCad: endereco.value,
      senhaCad: senha.value
    });
    
    // Salva a lista atualizada no localStorage
    localStorage.setItem('listaUser', JSON.stringify(listaUser));
    
    // Exibe mensagem de sucesso e redireciona para a tela de login
    msgSuccess.setAttribute('style', 'display: block');
    msgSuccess.innerHTML = '<strong>Usuário cadastrado com sucesso!</strong>';
    msgError.setAttribute('style', 'display: none');
    msgError.innerHTML = '';
    
    setTimeout(() => {
      window.location.href = '../html/signin.html';
    }, 2000);
  } else {
    // Exibe mensagem de erro se algum campo não estiver preenchido corretamente
    msgError.setAttribute('style', 'display: block');
    msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>';
    msgSuccess.innerHTML = '';
    msgSuccess.setAttribute('style', 'display: none');
  }
}
