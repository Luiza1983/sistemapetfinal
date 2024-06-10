document.addEventListener('DOMContentLoaded', function() {
    // Verifica se há um usuário logado e exibe a mensagem de boas-vindas
    const userLogado = JSON.parse(localStorage.getItem("userLogado"));
    if (userLogado) {
        document.getElementById("welcomeMessage").innerText = `Bem-vindo, ${userLogado.nome}!`;
    } else {
        // Caso contrário, redireciona para a página de login
        alert("Você precisa estar logado para acessar essa página");
        window.location.href = "./signin.html"; 
    }

    // Adiciona event listeners para os botões
    const quantidadeInput = document.getElementById('quantidade');
    const saveButton = document.getElementById('saveButton');

    if (quantidadeInput && saveButton) {
        quantidadeInput.addEventListener('keypress', function(event) {
            // Verifica se a tecla pressionada foi "Enter"
            if (event.key === 'Enter') {
                event.preventDefault(); // Evita que o formulário seja enviado
                adicionarCamposDeCadastro(); // Chama a função para adicionar os campos de cadastro
            }
        });

        saveButton.addEventListener('click', salvarDadosLocalmente);
    } else {
        console.error("Elementos não encontrados. Certifique-se de que os IDs 'quantidade' e 'saveButton' estão corretos.");
    }
});

function adicionarCamposDeCadastro() {
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const petsDiv = document.getElementById('pets');
    petsDiv.innerHTML = ''; // Limpa a div antes de adicionar os pets

    for (let i = 1; i <= quantidade; i++) {
        const petDiv = document.createElement('div');
        petDiv.classList.add('pet');
        petDiv.innerHTML = `
            <h3>Pet ${i}</h3>
            <label for="nome${i}">Nome do Pet:</label>
            <input type="text" id="nome${i}" name="nome[]" required>
            <label for="raca${i}">Raça:</label>
            <input type="text" id="raca${i}" name="raca[]" required>
            <label for="especie${i}">Espécie:</label>
            <select id="especie${i}" name="especie[]">
                <option value="cachorro">Cachorro</option>
                <option value="gato">Gato</option>
            </select>
            <label for="idade${i}">Idade:</label>
            <input type="text" id="idade${i}" name="idade[]" required>
            <label for="porte${i}">Porte:</label>
            <select id="porte${i}" name="porte[]">
                <option value="pequeno">Pequeno</option>
                <option value="médio">Médio</option>
                <option value="grande">Grande</option>
                <option value="gigante">Gigante</option>
            </select>
        `;
        petsDiv.appendChild(petDiv);
    }
}

function salvarDadosLocalmente() {
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const dadosPets = [];
    const userLogado = JSON.parse(localStorage.getItem("userLogado"));

    for (let i = 1; i <= quantidade; i++) {
        const nome = document.getElementById(`nome${i}`).value;
        const nomeCapitalizado = nome.charAt(0).toUpperCase() + nome.slice(1); // Capitaliza a primeira letra do nome

        const raca = document.getElementById(`raca${i}`).value;
        const racaCapitalizada = raca.charAt(0).toUpperCase() + raca.slice(1); // Capitaliza a primeira letra da raça

        const especie = document.getElementById(`especie${i}`).value;
        const especieCapitalizada = especie.charAt(0).toUpperCase() + especie.slice(1); // Capitaliza a primeira letra da espécie

        const porte = document.getElementById(`porte${i}`).value;
        const porteCapitalizado = porte.charAt(0).toUpperCase() + porte.slice(1); // Capitaliza a primeira letra do porte

        const pet = {
            nome: nomeCapitalizado,
            raca: racaCapitalizada,
            especie: especieCapitalizada,
            idade: document.getElementById(`idade${i}`).value,
            porte: porteCapitalizado
        };

        dadosPets.push(pet);
    }

    // Verifica se já existem pets cadastrados para o usuário logado
    let petsUsuario = JSON.parse(localStorage.getItem(`pets_${userLogado.email}`)) || [];

    // Adiciona os novos pets ao array existente de pets do usuário
    petsUsuario = petsUsuario.concat(dadosPets);
    
    // Atualiza os pets do usuário no localStorage
    localStorage.setItem(`pets_${userLogado.email}`, JSON.stringify(petsUsuario));

    // Redireciona o usuário para a página pós-login
    window.location.href = "./pos_login.html";
}
