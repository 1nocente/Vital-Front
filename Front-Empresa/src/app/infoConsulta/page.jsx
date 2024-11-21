"use client";
import NavBarLayout from "@/components/layout/NavBarLayout";
import { getConsultas } from "@/js/info";
import { useState } from "react";


function infoConsulta (consulta) {

    const nomeConsulta = document.getElementById('nomeConsulta');
    nomeConsulta.textContent = consulta.nome_especialidade;
    nomeConsulta.classList.add(
        'font-bold', 
        'text-3xl', 
        'text-blue-950', 
        'font-sans', 
        'mb-4', 
        'flex', 
        'items-center', 
        'justify-center'
    );

    
    const detalhes = document.getElementById('detalhesConsulta');
    detalhes.textContent = consulta.detalhes_consulta;
    detalhes.classList.add(
        'text-blue-950',
        'ml-[20px]');

    const nomeMedico = document.getElementById('medicosConsulta');
    nomeMedico.textContent = consulta.nome_medico;
    nomeMedico.classList.add(
        'text-blue-950',
        'text-lg', 
        'font-bold', 
        'ml-[20px]');
    
    const dias = document.getElementById('diasConsulta');
    const diasData = new Date(consulta.dias_consulta);
    dias.textContent = !isNaN(diasData) ? "Dia: " + diasData.toLocaleDateString() : "Dia: " + consulta.dias_consulta;
    dias.classList.add(
        'text-blue-950',
         'ml-[20px]');

    const horario = document.createElement('horarioConsulta');
    horario.textContent = "Horário: " + consulta.horas_consulta.slice(11, 19);
    horario.classList.add(
        'text-blue-950',
        'ml-[20px]');

    infoConsulta.append(nomeConsulta, nomeMedico, detalhes, dias, horario);
    return infoConsulta;
}
function Consultas() {
    const [openModal, setOpenModal] = useState(false);
    const contanierConsultaRef = useRef(null);

    useEffect(() => {
        async function infoConsulta() {
            const contanierConsulta = contanierConsultaRef.current;

            if (!contanierConsulta) return;

            const consultas = await getConsultas();

            // Verifique se `consultas` é definido e se é um array antes de usar `.forEach`
            if (Array.isArray(consultas)) {
                consultas.forEach(consulta => {
                    const card = criarCard(consulta);
                    contanierConsulta.appendChild(card);
                });
            } else if (consultas === undefined) {
                console.error("Erro: `consultas` é `undefined`.");
            } else {
                console.error("Erro: `consultas` não é um array.", consultas);
            }
            
        }

        preencherContainer();
    }, []);


}
export default function Consultas() {
    const [openModal, setOpenModal] = useState(false);
    
            return (
                <div className="flex flex-col">
                    <NavBarLayout>
                <div className="flex-1 p-4">
                <div className="flex">
                <h1 className="text-4xl font-bold text-[--font] p-10">CONSULTA</h1>
                <div className="relative">
                        <input type="text" placeholder="Pesquisar..." className="bg-[--navempresa] ml-[500px] pl-3 pr-10 py-2 mt-[50px] rounded-full w-96 h-14 border focus:border-blue-900 focus:bg-blue-5 transition-all" />
                        <button>
                            <img src="./img/lupa.png" alt="" className="absolute ml-[-50px] mt-[-19px] w-7" />
                        </button>
                </div>
                </div>

            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-2/5 h-2/4">

                <h2 id="nomeConsulta"></h2>
                <h2 id="detalhesConsulta"></h2>
                <h2 id="medicosConsulta"></h2>
                <h2 id="diasConsulta"></h2>
                <h2 id="horarioConsulta"></h2>
                
                </div>

            </div>
        

                            <div className="flex mt-20 ml-[300px] grid">
                                <div
                                id="contanierConsulta"
                                className="flex flex-wrap gap-4 w-[1100px] h-[100px]">

                                </div>
                                
                            </div>
                        </div>
                    </NavBarLayout>
                </div>
            );
        }
        