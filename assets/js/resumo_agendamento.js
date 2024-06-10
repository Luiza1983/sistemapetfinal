document.addEventListener('DOMContentLoaded', function() {
    const userLogado = JSON.parse(localStorage.getItem("userLogado"));
    if (!userLogado) {
        alert("Você precisa estar logado para acessar essa página");
        window.location.href = "./signin.html";
        return;
    }

    const agendamentos = JSON.parse(localStorage.getItem(`agendamentos_${userLogado.email}`)) || [];
    const pets = JSON.parse(localStorage.getItem(`pets_${userLogado.email}`)) || [];

    const welcomeMessage = document.getElementById('welcomeMessage');
    const agendamentoDetails = document.getElementById('agendamentoDetails');
    const totalValue = document.getElementById('totalValue');

    if (agendamentos.length > 0) {
        welcomeMessage.innerText = `Bem-vindo, ${userLogado.nome}`;

        // Inicializa o valor total como 0
        let total = 0;

        // Exibe os detalhes de cada agendamento
        agendamentos.forEach((agendamento, index) => {
            const pet = pets.find(pet => pet.nome === agendamento.pet);

            const petName = document.createElement('p');
            petName.textContent = `Nome do Pet: ${agendamento.pet}`;
            agendamentoDetails.appendChild(petName);

            const agendamentoTime = document.createElement('p');
            agendamentoTime.textContent = `Data e Hora do Agendamento: ${agendamento.data} ${agendamento.horario}`;
            agendamentoDetails.appendChild(agendamentoTime);

            const profissionalName = document.createElement('p');
            profissionalName.textContent = `Profissional: ${agendamento.profissional}`;
            agendamentoDetails.appendChild(profissionalName);

            const servicoTipo = document.createElement('p');
            servicoTipo.textContent = `Tipo de Serviço: ${agendamento.tipoServico}`;
            agendamentoDetails.appendChild(servicoTipo);

            // Adiciona o valor do agendamento atual ao total
            total += parseFloat(agendamento.valorServico.replace('R$ ', ''));

            // Adiciona uma linha separadora entre os agendamentos
            if (index < agendamentos.length - 1) {
                const separator = document.createElement('hr');
                agendamentoDetails.appendChild(separator);
            }
        });

        // Exibe o valor total
        totalValue.textContent = `Total dos próximos agendamentos: R$ ${total.toFixed(2)}`;
    } else {
        alert("Nenhum agendamento encontrado.");
        window.location.href = "./agendamento.html";
    }
});

function voltarParaInicio() {
    console.log("Finalizar Agendamento clicado!");
    window.location.href = "./pos_login.html";
}
