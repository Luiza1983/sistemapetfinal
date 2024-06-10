

document.addEventListener('DOMContentLoaded', function() {
    console.log("Página carregada");

    const userLogado = JSON.parse(localStorage.getItem("userLogado"));
    if (userLogado) {
        const welcomeMessage = document.getElementById("nomeUsuario");
        if (welcomeMessage) {
            welcomeMessage.innerText = ` ${userLogado.nome}!`;
        } else {
            console.error("Elemento com o ID 'nomeUsuario' não encontrado.");
        }
    } else {
        alert("Você precisa estar logado para acessar essa página");
        window.location.href = "./signin.html"; 
    }

    const cadastrarPetBtn = document.getElementById('cadastrarPetBtn');
    if (cadastrarPetBtn) {
        cadastrarPetBtn.addEventListener('click', function() {
            window.location.href = 'telapet.html';
        });
    } else {
        console.error("Botão 'Cadastrar Pet' não encontrado. Certifique-se de que o ID 'cadastrarPetBtn' está correto.");
    }

    const agendarServicoBtn = document.getElementById('agendarServicoBtn');
    if (agendarServicoBtn) {
        agendarServicoBtn.addEventListener('click', function() {
            window.location.href = 'agendamento.html';
        });
    } else {
        console.error("Botão 'Agendar Serviço' não encontrado. Certifique-se de que o ID 'agendarServicoBtn' está correto.");
    }

    const mostrarPetsBtn = document.getElementById('mostrarPetsBtn');
    if (mostrarPetsBtn) {
        mostrarPetsBtn.addEventListener('click', function() {
            mostrarPetsUsuario();
        });
    } else {
        console.error("Botão 'Mostrar Meus Pets' não encontrado. Certifique-se de que o ID 'mostrarPetsBtn' está correto.");
    }

    const mostrarCadastroBtn = document.getElementById('mostrarCadastroBtn');
    if (mostrarCadastroBtn) {
        mostrarCadastroBtn.addEventListener('click', function() {
            mostrarCadastroUsuario();
        });
    } else {
        console.error("Botão 'Mostrar Meu Cadastro' não encontrado. Certifique-se de que o ID 'mostrarCadastroBtn' está correto.");
    }

    const mostraragendamentosBtn = document.getElementById('mostraragendamentosBtn');
    if (mostraragendamentosBtn) {
        mostraragendamentosBtn.addEventListener('click', function() {
            console.log("Botão 'Mostrar Serviços Agendados' clicado");
            mostraragendamentosUsuario();
        });
    } else {
        console.error("Botão 'Mostrar Serviços Agendados' não encontrado. Certifique-se de que o ID 'mostraragendamentosBtn' está correto.");
    }
});


function mostrarPetsUsuario() {
    const userLogado = JSON.parse(localStorage.getItem("userLogado"));
    if (userLogado) {
        const petsUsuario = JSON.parse(localStorage.getItem(`pets_${userLogado.email}`));

        if (petsUsuario && petsUsuario.length > 0) {
            const dadosUsuarioDiv = document.getElementById('dadosUsuario');
            if (dadosUsuarioDiv) {
                dadosUsuarioDiv.innerHTML = '<h2>Meus Pets</h2>';
                dadosUsuarioDiv.style.display = 'block'; 

                petsUsuario.forEach((pet, index) => {
                    const petDiv = document.createElement('div');
                    petDiv.classList.add('pet');
                    petDiv.innerHTML = `
                        <h3>Pet ${index + 1}</h3>
                        <p><strong>Nome:</strong> ${pet.nome}</p>
                        <p><strong>Raça:</strong> ${pet.raca}</p>
                        <p><strong>Espécie:</strong> ${pet.especie}</p>
                        <p><strong>Idade:</strong> ${pet.idade}</p>
                        <p><strong>Porte:</strong> ${pet.porte}</p>
                    `;
                    dadosUsuarioDiv.appendChild(petDiv);
                });
            } else {
                console.error("Elemento com o ID 'dadosUsuario' não encontrado.");
            }
        } else {
            alert("Você ainda não cadastrou nenhum pet.");
        }
    } else {
        alert("Você precisa estar logado para acessar seus pets.");
    }
}

function mostrarCadastroUsuario() {
    const userLogado = JSON.parse(localStorage.getItem("userLogado"));
    if (userLogado) {
        const listaUser = JSON.parse(localStorage.getItem('listaUser'));
        const usuarioLogado = listaUser.find(user => user.emailCad === userLogado.email);

        if (usuarioLogado) {
            const dadosUsuarioDiv = document.getElementById('dadosUsuario');
            if (dadosUsuarioDiv) {
                dadosUsuarioDiv.innerHTML = `
                    <h2>Dados do Usuário</h2>
                    <p><strong>Nome:</strong> <span id="nome">${usuarioLogado.nomeCad}</span></p>
                    <p><strong>Email:</strong> <span id="email">${usuarioLogado.emailCad}</span></p>
                    <p><strong>Endereço:</strong> <span id="endereco">${usuarioLogado.enderecoCad}</span></p>
                    <p><strong>Telefone:</strong> <span id="telefone">${usuarioLogado.telefoneCad}</span></p>
                `;
                dadosUsuarioDiv.style.display = 'block';
            } else {
                console.error("Elemento com o ID 'dadosUsuario' não encontrado.");
            }
        } else {
            alert("Ocorreu um erro ao recuperar os dados do usuário.");
        }
    } else {
        alert("Você precisa estar logado para acessar seus dados de cadastro.");
    }
}

function mostraragendamentosUsuario() {
    const userLogado = JSON.parse(localStorage.getItem("userLogado"));
    if (userLogado) {
        const agendamentosUsuario = 
JSON.parse(localStorage.getItem(`agendamentos_${userLogado.email}`));
    
    if (agendamentosUsuario && agendamentosUsuario.length > 0) {
        const dadosUsuarioDiv = 
document.getElementById('dadosUsuario');
        if (dadosUsuarioDiv) {
            dadosUsuarioDiv.innerHTML = '<h2>Meus agendamentos</h2>';
            dadosUsuarioDiv.style.display = 'block'; 

        agendamentosUsuario.forEach((agendamentos, index) => {
            const agendamentosDiv = document.createElement('div');
            agendamentosDiv.classList.add('agendamento');
            agendamentosDiv.innerHTML = `
                <h3>Agendamento ${index + 1}</h3>
                <p><strong>Data:</strong> ${agendamentos.data}</p>
                <p><strong>Horário:</strong> ${agendamentos.horario}</p>
                <p><strong>Pet:</strong> ${agendamentos.pet}</p>
                <p><strong>Profissional:</strong> ${agendamentos.profissional}</p>
                <p><strong>Tipo de Serviço:</strong> ${agendamentos.tipoServico}</p>
                <p><strong>Valor do Serviço:</strong> ${agendamentos.valorServico}</p>
        `;
        dadosUsuarioDiv.appendChild(agendamentosDiv);
    }); 

    console.error("Elemento com o ID 'dadosUsuario' não encontrado.");
}
} else {
alert("Você ainda não tem agendamento.");
}
} else {
alert("Você precisa estar logado para acessar seus agendamentos.");
}
}

