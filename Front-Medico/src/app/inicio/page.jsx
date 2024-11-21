"use client";

import React, { useEffect, useState } from "react";
import NavBarLayout from "@/components/layout/NavBarLayout";
import Header from "@/components/Header";
import Image from "next/image";
import { getConsultasMedico } from "@/js/consultasServices.js";

export default function Inicio() {
    const [consultas, setConsultas] = useState(null);
    const medicoId = "123"; // Substitua pelo ID do médico que deseja buscar

    useEffect(() => {
        async function fetchData() {
            const data = await getConsultasMedico(medicoId);
            setConsultas(data ? data.quantidade : 0);
        }
        fetchData();
    }, [medicoId]);

    // Dados do médico
    const nomeMedico = "Dr. João Silva";
    const imagemMedico = "/img/medico.png"; // Substitua pela URL da imagem

    return (
        <div className="flex">
            <NavBarLayout />
            
            {/* Componente Header com margem alinhada ao NavBar */}
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
                            <p className="text-[--texto] text-2xl font-bold">{consultas}</p>
                        </div>
                    </div>

                    {/* Outros componentes e cards */}
                </div>
            </div>
        </div>
    );
}
