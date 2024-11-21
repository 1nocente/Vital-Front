'use strict'

import { getMedico } from "./info.js";


function criarCard(medicos) {
const card = document.createElement('div');
const contanierMedico = document.getElementById('contanierMedico')



    contanierMedico.classList.add(
    'gap-4',
    'p-4'
    )

    card.classList.add(
        'bg-blue-950',
        'rounded-lg',
        'w-[1000px]',
        'h-[50px]',
        'flex'

    );



    

    const especialidade = document.createElement('p');
    especialidade.textContent = medicos.nome;
    especialidade.classList.add(
        'text-white',
        'text-xl',
        'font-bold',
        'font-sans',
        'ml-[20px]',
        'mt-[10px]'
    );

    const nomeMedico = document.createElement('h2');
    nomeMedico.textContent =  medicos.nome_medico;
    nomeMedico.classList.add(
        'text-white', 
        'text-lg',
        'font-bold',
        'ml-[20px]'
    );

    

    card.append(especialidade, nomeMedico);
    card.addEventListener('click', () => {
    window.location.href = '/info?id=' + medicos.id_medico;
    });

    return card; // Retorna apenas o card
}

async function preencherContainer() {

    const contanierMedico = document.getElementById('contanierMedico');

    // Cria o contêiner se não existir
    if (!contanierMedico) {
        const newContainer = document.createElement('div');
        newContainer.id = 'contanierMedico';
        // Add actual class names here if you want to style the container
        document.body.appendChild(newContainer);
    }

    const medicos = await getMedico();

    // Acesse o contêiner que agora existe
    const container = document.getElementById('contanierMedico');

        medicos.forEach(medico => {
        const card = criarCard(medico);
        container.appendChild(card);
        console.log(card);
    });
}

preencherContainer();


