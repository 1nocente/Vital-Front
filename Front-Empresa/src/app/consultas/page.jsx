"use client";

import NavBarLayout from "@/components/layout/NavBarLayout";
import Modal from "@/components/Modal";
import { useState, useEffect } from "react";

// Função para buscar consultas
async function getConsultas() {
  try {
    const response = await fetch(
      "https://vital-back-geh2haera4f5hzfb.brazilsouth-01.azurewebsites.net/v1/vital/consulta"
    );
    if (!response.ok) throw new Error("Erro ao buscar dados");
    const data = await response.json();
    return data.consultas || [];
  } catch (error) {
    console.error("Erro ao buscar consultas:", error);
    return [];
  }
}

// Componente para exibir o card de uma consulta
function ConsultaCard({ consulta, onCardClick }) {
  const especialidadeImg = consulta.especialidade?.[0]?.imagem_url || "Imagem não encontrada";
  const especialidade = consulta.especialidade?.[0]?.nome || "Especialidade não definida";
  const medicoImg = consulta.medico?.[0]?.foto_medico;
  const medicoNome = consulta.medico?.[0]?.nome_medico || "Médico não definido";
  const descricao = consulta.detalhes_consulta || "Descrição não disponível";
  const dia = new Date(consulta.dias_consulta).toLocaleDateString();
  const horario = new Date(consulta.horas_consulta).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const status = consulta.status?.[0]?.descricao || "Não agendado";

  return (
    <div
      className="bg-zinc-200 rounded-lg w-[300px] h-[430px] p-4"
      onClick={() => onCardClick(consulta)} // Passa a consulta para o handler de clique
    >
      <img src={especialidadeImg} className="w-full h-40 object-cover rounded-md" alt="Especialidade" />
      <h1 className="text-blue-950 text-xl font-bold font-sans justify-center items-center flex mt-2 text-3xl">{especialidade}</h1>
      <p className="text-blue-950 justify-center items-center flex">{descricao}</p>
      <div className="flex mt-[20px] items-center">
        <img src={medicoImg} className="rounded-full w-[50px] h-[50px] ml-[10px]" alt="Médico" />
        <h2 className="text-blue-950 text-lg font-bold ml-[10px] fonts-sans mt-[10px]">{medicoNome}</h2>
      </div>
      <div className="flex mt-[10px]">
        <p className="text-blue-950 ml-[20px] font-bold">Dia: {dia}</p>
        <p className="text-blue-950 ml-[20px] font-bold">Horário: {horario}</p>
      </div>
      <div className="w-24 h-7 bg-blue-950 rounded-full ml-24 mt-6">
        <p className="text-white font-bold ml-2">{status}</p>
      </div>
    </div>
  );
}

function Consultas() {
  const [openModal, setOpenModal] = useState(false);
  const [consultaSelecionada, setConsultaSelecionada] = useState(null); // Estado para consulta selecionada
  const [consultas, setConsultas] = useState([]);

  // Carrega as consultas ao montar o componente
  useEffect(() => {
    async function carregarConsultas() {
      const dados = await getConsultas();
      setConsultas(dados);
    }
    carregarConsultas();
  }, []);

  // Função para abrir o modal com detalhes
  const abrirDetalhesModal = (consulta) => {
    setConsultaSelecionada(consulta); // Define a consulta selecionada
    setOpenModal(true); // Abre o modal
  };

  return (
    <div className="flex flex-col">
      <NavBarLayout>
        <div className="flex-1 p-4">
          <div className="flex">
            <h1 className="text-5xl font-bold text-[--font] p-10 mt-[100px]">CONSULTAS</h1>
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

          <Modal
            isOpen={openModal}
            setModalOpen={() => setOpenModal(false)}
          >
            {/* Renderiza os detalhes da consulta no modal */}
            {consultaSelecionada && (
              <div className="p-4">
                <h2 className="text-2xl font-bold text-blue-950">
                  {consultaSelecionada.especialidade?.[0]?.nome || "Especialidade não definida"}
                </h2>
                <p className="text-sm text-zinc-600 mt-2">
                  {consultaSelecionada.detalhes_consulta || "Descrição não disponível"}
                </p>
                <div className="mt-4">
                  <p>
                    <strong>Médico:</strong> {consultaSelecionada.medico?.[0]?.nome_medico || "Não definido"}
                  </p>
                  <p>
                    <strong>Data:</strong> {new Date(consultaSelecionada.dias_consulta).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Horário:</strong>{" "}
                    {new Date(consultaSelecionada.horas_consulta).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    {consultaSelecionada.status?.[0]?.descricao || "Não agendado"}
                  </p>
                </div>
                <button
                  className="mt-4 w-full bg-blue-950 text-white py-2 px-4 rounded hover:bg-blue-900"
                  onClick={() => setOpenModal(false)}
                >
                  Fechar
                </button>
              </div>
            )}
          </Modal>

          <div className="flex mt-20 ml-[200px] grid">
            <div id="contanierConsulta" className="flex flex-wrap gap-5 w-[1300px] h-[100px]">
              {consultas.map((consulta, index) => (
                <ConsultaCard key={index} consulta={consulta} onCardClick={abrirDetalhesModal} />
              ))}
            </div>
          </div>
        </div>
      </NavBarLayout>
    </div>
  );
}

export default Consultas;
