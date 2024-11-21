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
function ConsultaCard({ consulta }) {
  const diasData = new Date(consulta.dias_consulta);
  const dia =
    !isNaN(diasData) ? diasData.toLocaleDateString() : consulta.dias_consulta;

  return (
    <div
      className="bg-zinc-200 rounded-lg w-[300px] h-[330px] p-4"
      onClick={() => (window.location.href = `/infoConsulta?id=${consulta.id_consulta}`)}
    >
      <img
       src={consulta.imagem_url} 
      />
      <p className="text-blue-950 text-xl font-bold font-sans ml-[20px]">
        {consulta.nome_especialidade}
      </p>
      <h2 className="text-blue-950 text-lg font-bold ml-[20px]">
        {consulta.nome_medico}
      </h2>
      <p className="text-blue-950 ml-[20px]">
        Descrição: {consulta.detalhes_consulta}
      </p>
      <p className="text-blue-950 ml-[20px]">Dia: {dia}</p>
      <p className="text-blue-950 ml-[20px]">
        Horário: {consulta.horas_consulta.slice(11, 19)}
      </p>
    </div>
  );
}

function Consultas() {
  const [openModal, setOpenModal] = useState(false);
  const [consultas, setConsultas] = useState([]);

  // Carrega as consultas ao montar o componente
  useEffect(() => {
    async function carregarConsultas() {
      const dados = await getConsultas();
      setConsultas(dados);
    }
    carregarConsultas();
  }, []);

  return (
    <div className="flex flex-col">
      <NavBarLayout>
        <div className="flex-1 p-4">
          <div className="flex">
            <h1 className="text-4xl font-bold text-[--font] p-10">CONSULTAS</h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Pesquisar..."
                className="bg-[--navempresa] ml-[500px] pl-3 pr-10 py-2 mt-[50px] rounded-full w-96 h-14 border focus:border-blue-900 focus:bg-blue-5 transition-all"
              />
              <button>
                <img
                  src="./img/lupa.png"
                  alt=""
                  className="absolute ml-[-50px] mt-[-19px] w-7"
                />
              </button>
            </div>
          </div>

          <Modal
            isOpen={openModal}
            setModalOpen={() => setOpenModal(!openModal)}
          />

          <div className="flex mt-20 ml-[300px] grid">
            <div
              id="contanierConsulta"
              className="flex flex-wrap gap-4 w-[1100px] h-[100px]"
            >
              {consultas.map((consulta, index) => (
                <ConsultaCard key={index} consulta={consulta} />
              ))}
            </div>
          </div>
        </div>
      </NavBarLayout>
    </div>
  );
}

export default Consultas;

