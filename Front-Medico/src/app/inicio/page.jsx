"use client";

import React, { useEffect, useState } from "react";
import NavBarLayout from "@/components/layout/NavBarLayout";
import Header from "@/components/Header";
import Image from "next/image";
import { getConsultasMedico } from "@/js/consultasServices.js";

export default function Inicio() {
    const [consultas, setConsultas] = useState(null);
    const [nomeMedico, setNomeMedico] = useState("Carregando...");
    const [imagemMedico, setImagemMedico] = useState("/img/medico.png");

    useEffect(() => {
        async function fetchData() {
            const medicoId = localStorage.getItem("idC");

            if (!medicoId || isNaN(medicoId)) {
                console.error("ID do médico inválido ou não encontrado.");
                setConsultas(0); // Define consultas como 0 em caso de erro
                return;
            }

            try {
                // Busca o número de consultas
                console.log("Buscando consultas para o médico ID:", medicoId);
                const consultasData = await getConsultasMedico(medicoId);

                if (consultasData && consultasData.medico) {
                    console.log("Dados de consultas recebidos:", consultasData);
                    setConsultas(consultasData.medico.length); // Define o número de consultas
                } else {
                    console.warn("Formato inesperado de dados de consultas:", consultasData);
                    setConsultas(0);
                }

                // Busca os dados do médico
                console.log("Buscando dados do médico ID:", medicoId);
                const response = await fetch(`https://vital-umqy.onrender.com/v1/vital/Medico/${medicoId}`);
                const medicoData = await response.json();

                if (medicoData && medicoData.medico && medicoData.medico[0]) {
                    const medico = medicoData.medico[0];
                    console.log("Dados do médico recebidos:", medico);
                    setNomeMedico(medico.nome_medico);
                    setImagemMedico(medico.foto_medico || "/img/medico.png"); // Usa uma imagem padrão se a foto não estiver disponível
                } else {
                    console.warn("Formato inesperado de dados do médico:", medicoData);
                    setNomeMedico("Médico não encontrado");
                }
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
                setConsultas(0);
                setNomeMedico("Erro ao carregar");
            }
        }

        fetchData();
    }, []);

    return (
        <div className="flex">
            <NavBarLayout />

            <div className="flex-grow">
                <Header nome={nomeMedico} imagem={imagemMedico} />

                <div className="p-20 flex flex-col items-center justify-center">
                    {/* Card Principal */}
                    <div className="bg-gradient-custom shadow-lg rounded-lg mb-10 relative w-[35vw] h-[30vh] flex flex-col justify-center text-center">
                        <div className="flex flex-col items-center justify-center gap-10 h-full w-2/3 p-10">
                            <h1 className="text-xl text-white font-outfit text-left font-medium">
                                Como você pode garantir que cada paciente receba a atenção e o cuidado que merece hoje?
                            </h1>
                            <button className="bg-white text-[--azulclaro] px-6 py-3 rounded w-[150px]">
                                Começar
                            </button>
                        </div>
                        <Image
                            src="/img/medica.png"
                            alt="Imagem Principal"
                            width={1000}
                            height={1000}
                            className="h-[130%] w-auto absolute bottom-0 right-0"
                        />
                    </div>

                    {/* Card de Consultas do Médico */}
                    <div className="bg-white shadow-md rounded-lg flex p-4 w-[35vw] mb-10">
                        <Image
                            src="/img/coracao.png"
                            alt="Imagem de Consultas"
                            width={50}
                            height={50}
                            className="mr-4 my-auto"
                        />
                        <div className="flex flex-col">
                            <h1 className="font-semibold">Consultas</h1>
                            <p className="text-[--texto] text-2xl font-bold">
                                {consultas !== null ? consultas : "Carregando..."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
