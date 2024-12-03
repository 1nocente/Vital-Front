"use client";

import { useEffect, useState } from "react";
import NavBarLayout from "@/components/layout/NavBarLayout";
import Modal from "@/components/MedicoModal";

export async function getMedico() {
    const url = `https://vital-back-geh2haera4f5hzfb.brazilsouth-01.azurewebsites.net/v1/vital/medico`;
    const response = await fetch(url);
    const data = await response.json();
    return data.medicos;
}

function MedicoCard({ medico, onMedicoClick }) {
    const medicoImg = medico.foto_medico || "Sem imagem";
    const medicoNome = medico.nome_medico || "Médico não definido";
    const especialidade = medico.especialidade || "Especialidade não definida";

    return (
        <div
            className="bg-zinc-200 rounded-lg w-[1600px] h-[70px] p-4 cursor-pointer"
            onClick={() => onMedicoClick(medico)}
        >
            <img
                src={medicoImg}
                alt="Foto do Médico"
                className="rounded-full w-[50px] h-[50px] ml-[20px] mt-[-5px]"
            />

            <div className="flex justify-center items-center mt-[-40px]">
                <h2 className="text-blue-950 text-2xl font-bold fonts-sans ml-[10px]">
                    {medicoNome}
                </h2>

                <div className="flex justify-center items-center">
                    <p className="flex justify-center items-center text-blue-950 text-lg font-sans ml-[400px]">
                        {especialidade}
                    </p>
                </div>

                <button
                    className="text-blue-950 text-2xl ml-[400px]"
                    onClick={(e) => {
                        e.stopPropagation(); // Evita o clique no botão abrir o modal do card
                        window.location.href = "/infoMedico";
                    }}
                >
                    +
                </button>
            </div>
        </div>
    );
}

function DetalhesMedicoModal({ isOpen, medico, onClose }) {
    if (!isOpen || !medico) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-[500px] p-6 rounded-lg shadow-lg flex">
                <img
                    src={medico.foto_medico || "Sem imagem"}
                    alt="Foto do Médico"
                    className="w-48 h-48 rounded-full mb-4"
                />
                <div className="">
                <p className=" text-3xl text-blue-950 font-bold">{medico.nome_medico}</p>
                <p className="text-xl text-blue-950">{medico.especialidade || "Não definida"}</p>
                <p>{medico.email_medico || "Não disponível"}</p>
                <p><strong>CRM: </strong> {medico.crm || "Não disponível"}</p>
                <p>{medico.telefone_medico || "Não disponível"}</p>


                <button
                    onClick={onClose}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Fechar
                </button>
                
                </div>
                
                
            </div>
        </div>
    );
}

export default function Medicos() {
    const [openCadastroModal, setOpenCadastroModal] = useState(false);
    const [openDetalhesModal, setOpenDetalhesModal] = useState(false);
    const [medicos, setMedicos] = useState([]);
    const [medicoSelecionado, setMedicoSelecionado] = useState(null);

    useEffect(() => {
        async function carregarMedicos() {
            try {
                const dados = await getMedico();
                if (Array.isArray(dados)) {
                    setMedicos(dados);
                } else {
                    console.error("getMedico não retornou um array:", dados);
                }
            } catch (error) {
                console.error("Erro ao carregar médicos:", error);
            }
        }

        carregarMedicos();
    }, []);

    const abrirDetalhesModal = (medico) => {
        setMedicoSelecionado(medico);
        setOpenDetalhesModal(true);
    };

    return (
        <div className="flex flex-col">
            <NavBarLayout>
                <div className="flex-1 p-4">
                    <div className="flex">
                        <h1 className="text-4xl font-bold text-[--font] p-10 mt-[100px] ml-[100px]">
                            DOUTORES CADASTRADOS
                        </h1>

                        <div className="relative ml-[-250px]">
                            <input
                                type="text"
                                placeholder="Pesquisar..."
                                className="bg-[--navempresa] ml-[500px] pl-3 pr-10 py-2 mt-[40px] rounded-full w-96 h-14 border focus:border-blue-900 focus:bg-blue-5 transition-all"
                            />
                            <button>
                                <img
                                    src="./img/lupa.png"
                                    alt="Pesquisar"
                                    className="absolute ml-[-50px] mt-[-19px] w-7"
                                />
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={() => setOpenCadastroModal(true)}
                        className="bg-[--font] w-[25vh] h-[5vh] rounded-full ml-[130vh] mt-[10px]"
                    >
                        <h1 className="text-white font-bold">CADASTRAR DOUTORES +</h1>
                    </button>

                    {/* Modal de Cadastro */}
                    <Modal
                        isOpen={openCadastroModal}
                        setModalOpen={() => setOpenCadastroModal(!openCadastroModal)}
                    />

                    {/* Modal de Detalhes */}
                    <DetalhesMedicoModal
                        isOpen={openDetalhesModal}
                        medico={medicoSelecionado}
                        onClose={() => setOpenDetalhesModal(false)}
                    />

                    <div className="mt-20 grid">
                        <div
                            id="contanierMedico"
                            className="flex flex-wrap gap-x-12 gap-y-5 justify-center"
                        >
                            {medicos.map((medico, index) => (
                                <MedicoCard
                                    key={index}
                                    medico={medico}
                                    onMedicoClick={abrirDetalhesModal}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </NavBarLayout>
        </div>
    );
}
