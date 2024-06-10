document.addEventListener('DOMContentLoaded', function() {
    const userLogado = JSON.parse(localStorage.getItem("userLogado"));
    const welcomeMessage = document.getElementById("welcomeMessage");

    if (userLogado) {
        if (welcomeMessage) {
            welcomeMessage.innerText = `Bem-vindo, ${userLogado.nome}!`;
        } else {
            console.error("Elemento com ID 'welcomeMessage' não encontrado.");
        }
    } else {
        alert("Você precisa estar logado para acessar essa página");
        window.location.href = "./signin.html"; 
    }

    const petsUsuario = JSON.parse(localStorage.getItem(`pets_${userLogado.email}`)) || [];
    const petSelect = document.getElementById('pet');
    const portePetInput = document.getElementById('porte');

    if (petSelect) {
        petsUsuario.forEach(pet => {
            const option = document.createElement('option');
            option.value = pet.nome;
            option.textContent = pet.nome;
            petSelect.appendChild(option);
        });
        
        petSelect.addEventListener('change', function() {
            const selectedPetName = petSelect.value;
            const selectedPet = petsUsuario.find(pet => pet.nome.toLowerCase() === selectedPetName.toLowerCase());
            if (selectedPet) {
                portePetInput.value = selectedPet.porte;
                atualizarValorServico();
            }
        });
    } else {
        console.error("Elemento com ID 'pet' não encontrado.");
    }

    document.getElementById('tipoServico').addEventListener('change', atualizarValorServico);

    const novoAgendamentoButton = document.getElementById('novoAgendamento');
    const finalizarAgendamentoButton = document.getElementById('finalizarAgendamento');

    novoAgendamentoButton.addEventListener('click', function(event) {
        event.preventDefault();
        salvarAgendamento(userLogado);
        window.location.href = "./agendamento.html"; // Redireciona para a tela de agendamento
    });

    finalizarAgendamentoButton.addEventListener('click', function(event) {
        event.preventDefault();
        salvarAgendamento(userLogado);
        window.location.href = "./resumo_agendamento.html"; // Redireciona para a tela de resumo do agendamento
    });

    const dataInput = document.getElementById('data');

    if (dataInput) {
        const picker = new Pikaday({
            field: dataInput,
            format: 'DD/MM/YYYY',
            minDate: new Date(), // Data mínima é hoje
            maxDate: new Date(new Date().getFullYear(), 11, 31), // Data máxima é o final do ano atual
            toString(date, format) {
                const day = date.getDate();
                const month = date.getMonth() + 1;
                const year = date.getFullYear();
                return `${day}/${month}/${year}`;
            },
            disableDayFn(date) {
                // Desabilitar domingo (0)
                return date.getDay() === 0;
            }
        });
    } else {
        console.error("Elemento com ID 'data' não encontrado.");
    }

    const horarioSelect = document.getElementById('horario');

    if (horarioSelect) {
        for (let hora = 8; hora <= 17; hora++) {
            const horario = `${hora}:00`;
            const option = document.createElement('option');
            option.text = horario;
            option.value = horario;
            horarioSelect.add(option);
        }
    } else {
        console.error("Elemento com ID 'horario' não encontrado.");
    }
});

function salvarAgendamento(userLogado) {
    const pet = document.getElementById('pet').value;
    const tipoServico = document.getElementById('tipoServico').value;
    const porte = document.getElementById('porte').value;
    const profissional = document.getElementById('profissional').value;
    const data = document.getElementById('data').value;
    const horario = document.getElementById('horario').value;
    const valorServico = document.getElementById('valorServico').value;

    const agendamento = {
        pet,
        tipoServico,
        porte,
        profissional,
        data,
        horario,
        valorServico
    };

    let agendamentos = JSON.parse(localStorage.getItem(`agendamentos_${userLogado.email}`)) || [];
    agendamentos.push(agendamento);
    localStorage.setItem(`agendamentos_${userLogado.email}`, JSON.stringify(agendamentos));
}

function atualizarValorServico() {
    const tipoServico = document.getElementById('tipoServico').value;
    const portePet = document.getElementById('porte').value;
    let valorServico = 0;

    switch (tipoServico) {
        case 'Banho':
            switch (portePet) {
                case 'Pequeno':
                    valorServico = 45;
                    break;
                case 'Médio':
                    valorServico = 55;
                    break;
                case 'Grande':
                    valorServico = 70;
                    break;
                case 'Gigante':
                    valorServico = 80;
                    break;
            }
            break;
        case 'Banho com Tosa da Raça':
            switch (portePet) {
                case 'Pequeno':
                    valorServico = 65;
                    break;
                case 'Médio':
                    valorServico = 75;
                    break;
                case 'Grande':
                    valorServico = 95;
                    break;
                case 'Gigante':
                    valorServico = 105;
                    break;
            }
            break;
        case 'Banho com Tosa Higiênica':
            switch (portePet) {
                case 'Pequeno':
                    valorServico = 55;
                    break;
                case 'Médio':
                    valorServico = 65;
                    break;
                case 'Grande':
                    valorServico = 80;
                    break;
                case 'Gigante':
                    valorServico = 90;
                    break;
            }
            break;
    }

    document.getElementById('valorServico').value = `R$ ${valorServico.toFixed(2)}`;
}
