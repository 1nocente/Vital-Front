"use client";

import { useEffect, useState } from "react";
import NavBarLayout from "@/components/layout/NavBarLayout";
import Modal from "@/components/MedicoModal";

export async function getMedico(){
    const url = `https://vital-back-geh2haera4f5hzfb.brazilsouth-01.azurewebsites.net/v1/vital/medico`
    const response = await fetch(url)
    const data = await response.json()
    return data.medicos
}

function MedicoCard({ medico }) {
   
    const medicoImg = medico.foto_medico|| "Sem imagem";
    const medicoNome = medico.nome_medico|| "Médico não definido";
    const especialidade = medico.especialidade || "Especialidade não definida";
    
    return (
      <div
      className="bg-zinc-200 rounded-lg w-[1600px] h-[70px] p-4 " 
      onClick={() => (window.location.href = "/consultas")}
    >
        
     <img src={medicoImg} className="rounded-full w-[50px] h-[50px] ml-[20px] mt-[-5px] " />

      <div className="flex justify-center items-center mt-[-40px] ">
      <h2 className="text-blue-950 text-2xl font-bold  fonts-sans ml-[10px] ">{medicoNome}</h2>

      <div className="flex justify-center items-center ">
      <p className="flex justify-center items-center text-blue-950 text-lg font-sans ml-[400px] ">{especialidade}</p>
      </div>

      <button className="text-blue-950 text-2xl ml-[400px]" onClick={() => (window.location.href = "/infoMedico")}>+</button>
      </div>
  
  
    </div>
     
    );
  }
  

  export default function Medicos() {
    const [openModal, setOpenModal] = useState(false);
    const [medicos, setMedicos] = useState([]);

    useEffect(() => {
        async function carregarMedicos() {
            try {
                const dados = await getMedico();
                if (Array.isArray(dados)) {
                    setMedicos(dados);
                } else {
                    console.error('getMedico não retornou um array:', dados);
                }
            } catch (error) {
                console.error('Erro ao carregar médicos:', error);
            }
        }

        carregarMedicos();
    }, []);

    return (
        <div className="flex flex-col">
            <NavBarLayout>
                <div className="flex-1 p-4">
                    <div className="flex">
                    <h1 className="text-4xl font-bold text-[--font] p-10 mt-[100px] ml-[100px]">DOUTORES CADASTRADOS</h1>
                    

                <div className="relative ml-[-250px]">
                <input
                    type="text"
                    placeholder="Pesquisar..."
                    className="bg-[--navempresa] ml-[500px] pl-3 pr-10 py-2 mt-[40px] rounded-full w-96 h-14 border focus:border-blue-900 focus:bg-blue-5 transition-all"
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

                    <button
                        onClick={() => setOpenModal(true)}
                        className="bg-[--font] w-[25vh] h-[5vh] rounded-full ml-[130vh] mt-[10px]"
                    >
                        <h1 className="text-white font-bold">CADASTRAR DOUTORES +</h1>
                    </button>

                    <Modal isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)} />

                    <div className="mt-20 grid">
                    <div
                        id="contanierMedico"
                        className="flex flex-wrap gap-x-12 gap-y-5 justify-center"
                    >
                        {medicos.map((medico, index) => (
                        <MedicoCard key={index} medico={medico} />
                        ))}
                    </div>
                    </div>
                </div>
            </NavBarLayout>
        </div>
    );
}