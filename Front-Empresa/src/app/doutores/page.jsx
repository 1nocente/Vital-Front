"use client";

import { useEffect, useState } from "react";
import NavBarLayout from "@/components/layout/NavBarLayout";
import Modal from "@/components/MedicoModal";
import { getMedico } from "@/js/info";

function criarCard(medico) {
    const card = document.createElement('div');

    card.classList.add(
        'bg-blue-950',
        'rounded-lg',
        'w-[1000px]',
        'h-[50px]',
        'flex'
    );

    const especialidade = document.createElement('p');
    especialidade.textContent = medico.nome;
    especialidade.classList.add(
        'text-white',
        'text-xl',
        'font-bold',
        'font-sans',
        'ml-[20px]',
        'mt-[10px]'
    );

    const nomeMedico = document.createElement('h2');
    nomeMedico.textContent = medico.nome_medico;
    nomeMedico.classList.add(
        'text-white', 
        'text-lg',
        'font-bold',
        'ml-[20px]'
    );

    card.append(especialidade, nomeMedico);
    card.addEventListener('click', () => {
        window.location.href = '/info?id=' + medico.id_medico;
    });

    return card;
}

export default function Medicos() {
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        async function preencherContainer() {
            const contanierMedico = document.getElementById('contanierMedico');
    
            if (!contanierMedico) {
                console.error('Elemento contanierMedico não encontrado.');
                return;
            }
    
            try {
                const medicos = await getMedico();
                console.log('Médicos recebidos:', medicos);
    
                if (Array.isArray(medicos)) {
                    medicos.forEach(medico => {
                        const card = criarCard(medico);
                        contanierMedico.appendChild(card);
                    });
                } else {
                    console.error('getMedico não retornou um array:', medicos);
                }
            } catch (error) {
                console.error('Erro ao preencher o container:', error);
            }
        }
    
        preencherContainer();
    }, []);
    

    return (
        <div className="flex flex-col">
            <NavBarLayout>
                <div className="flex-1 p-4">
                    <div className="flex">
                        <h1 className="text-4xl font-bold text-[--font] p-10">DOUTORES CADASTRADOS</h1>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Pesquisar..."
                                className="bg-[--navempresa] pl-3 pr-10 py-2 ml-[400px] mt-[50px] rounded-full w-96 h-14 border focus:border-blue-900 focus:bg-blue-5 transition-all"
                            />
                            <button>
                                <img src="./img/lupa.png" alt="" className="absolute ml-[-50px] mt-[-19px] w-7" />
                            </button>
                        </div>
                    </div>

                    <div>
                        <button
                            onClick={() => setOpenModal(true)}
                            className="bg-[--font] w-[25vh] h-[5vh] rounded-full ml-[130vh] mt-[10vh]"
                        >
                            <h1 className="text-white font-bold">CADASTRAR DOUTORES +</h1>
                        </button>
                    </div>

                    <Modal isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)} />

                    <div className="mt-20 ml-[300px] grid">
                        <div id="contanierMedico" className="gap-4 w-[1100px] h-[1700px]"></div>
                    </div>
                </div>
            </NavBarLayout>
        </div>
    );
}
