"use client"; 

import NavBarLayout from "@/components/layout/NavBarLayout";
import { useEffect, useState } from "react"; 
import { useRouter } from "next/navigation"; // Importa de 'next/navigation'

const ConsultaDiaria = () => {
    const [dataSelecionada, setDataSelecionada] = useState(new Date());
    const [consultasPorData, setConsultasPorData] = useState({});
    const [consultasPorMes, setConsultasPorMes] = useState({});
    const [mesAtual, setMesAtual] = useState(dataSelecionada.getMonth());
    const [anoAtual, setAnoAtual] = useState(dataSelecionada.getFullYear());
    const router = useRouter(); // Hook para redirecionamento

    useEffect(() => {
        const fetchConsultas = async () => {
            const medicoId = localStorage.getItem('idC'); // Obtém o ID do médico do localStorage
            if (!medicoId) {
                console.error('ID do médico não encontrado.');
                return;
            }
    
            try {
                const response = await fetch(`https://vital-umqy.onrender.com/v1/vital/consulta/${medicoId}`);
                const data = await response.json();
    
                // Verifica se 'data.medico' existe e é um array
                if (!data.medico || !Array.isArray(data.medico)) {
                    console.error('A resposta não contém um array "medico".', data);
                    return;
                }
    
                // Processa as consultas para agrupar por data e por mês
                const consultasMap = {};
                const consultasMesMap = {};
    
                data.medico.forEach(consulta => {
                    const dataConsulta = new Date(consulta.dias_consulta);
                    const dataStr = dataConsulta.toLocaleDateString('pt-BR'); // Formata a data para o horário local
                    const mesStr = `${dataConsulta.getFullYear()}-${dataConsulta.getMonth() + 1}`; // Chave do mês
    
                    // Agrupamento por data
                    if (!consultasMap[dataStr]) {
                        consultasMap[dataStr] = [];
                    }
                    consultasMap[dataStr].push({
                        id: consulta.id_consulta,
                        descricao: consulta.detalhes_consulta,
                        data: consulta.dias_consulta,
                        hora: consulta.horas_consulta,
                        paciente: consulta.nome_medico,
                        especialidade: consulta.nome_especialidade,
                    });
    
                    // Agrupamento por mês
                    if (!consultasMesMap[mesStr]) {
                        consultasMesMap[mesStr] = [];
                    }
                    consultasMesMap[mesStr].push(consulta);
                });
    
                setConsultasPorData(consultasMap);
                setConsultasPorMes(consultasMesMap);
            } catch (error) {
                console.error('Erro ao buscar as consultas:', error);
            }
        };
    
        fetchConsultas();
    }, []);
    
    const renderCalendario = () => {
        const firstDayOfMonth = new Date(anoAtual, mesAtual, 1);
        const lastDayOfMonth = new Date(anoAtual, mesAtual + 1, 0);
        const diasNoMes = lastDayOfMonth.getDate();
        const primeiroDiaSemana = firstDayOfMonth.getDay();
    
        const dias = [];
        for (let i = 0; i < primeiroDiaSemana; i++) {
            dias.push(<div key={`empty-${i}`} className="w-16 h-16"></div>);
        }
        for (let day = 1; day <= diasNoMes; day++) {
            const diaAtual = new Date(anoAtual, mesAtual, day); // Alterado para horário local
            const dateKey = diaAtual.toLocaleDateString('pt-BR'); // Ajuste para usar horário local
            const quantidadeConsultas = consultasPorData[dateKey] ? consultasPorData[dateKey].length : 0;
    
            dias.push(
                <div
                    key={day}
                    onClick={() => setDataSelecionada(diaAtual)}
                    className="flex flex-col items-center justify-center border rounded-lg w-24 h-20 m-1 cursor-pointer hover:bg-gray-200 transition"
                >
                    <span className="font-semibold">{day}</span>
                    <span className="text-gray-600">{quantidadeConsultas} {quantidadeConsultas === 1 ? 'consulta' : 'consultas'}</span>
                </div>
            );
        }
    
        return (
            <div className="grid grid-cols-7 ">
                <div className="font-bold text-center">Dom</div>
                <div className="font-bold text-center">Seg</div>
                <div className="font-bold text-center">Ter</div>
                <div className="font-bold text-center">Qua</div>
                <div className="font-bold text-center">Qui</div>
                <div className="font-bold text-center">Sex</div>
                <div className="font-bold text-center">Sab</div>
                {dias}
            </div>
        );
    };

    const handlePreviousMonth = () => {
        if (mesAtual === 0) {
            setMesAtual(11);
            setAnoAtual(anoAtual - 1);
        } else {
            setMesAtual(mesAtual - 1);
        }
    };

    const handleNextMonth = () => {
        if (mesAtual === 11) {
            setMesAtual(0);
            setAnoAtual(anoAtual + 1);
        } else {
            setMesAtual(mesAtual + 1);
        }
    };



    const handleIniciar = (idConsulta) => {
        router.push(`/videochamada/${idConsulta}`); // Direciona para a tela de videochamada passando o ID da consulta
    };

    // Agrupamento das consultas por mês para exibição
    const consultasDoMes = consultasPorMes[`${anoAtual}-${mesAtual + 1}`] || [];

    return (
        <NavBarLayout>
            <div className="flex p-4 space-x-10 items-center justify-center">
                {/* Card do Calendário */}
                <div className="bg-white shadow-md rounded-lg p-4 w-[100vh]">
                    {/* Controles de mês */}
                    <div className="flex items-center mb-4 justify-between">
                        <button onClick={handlePreviousMonth} className="bg-gray-200 p-1 rounded">
                            &#9664; {/* Seta para esquerda */}
                        </button>
                        <span className="px-2">{new Date(anoAtual, mesAtual).toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}</span>
                        <button onClick={handleNextMonth} className="bg-gray-200 p-1 rounded">
                            &#9654; {/* Seta para direita */}
                        </button>
                    </div>

                    <div className="mb-4">
                        {renderCalendario()}
                    </div>
                </div>

                {/* Card de Consultas do Dia Selecionado */}
                <div className="bg-white shadow-md rounded-lg p-4 w-[40vh]">
                    <h2 className="text-md font-semibold mb-2">Consultas em {dataSelecionada.toLocaleDateString()}:</h2>
                    {consultasPorData[dataSelecionada.toLocaleDateString('pt-BR')] ? (
                        consultasPorData[dataSelecionada.toLocaleDateString('pt-BR')].map((consulta) => (
                            <div key={consulta.id} className="border rounded-lg p-2 mb-2 w-64">
                                <p className="text-sm"><strong>Detalhes:</strong> {consulta.descricao}</p>
                                <p className="text-sm"><strong>Data:</strong> {new Date(consulta.data).toLocaleDateString()}</p>
                                <p className="text-sm"><strong>Hora:</strong> {new Date(consulta.hora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                <p className="text-sm"><strong>Médico:</strong> {consulta.paciente}</p>
                                <p className="text-sm"><strong>Especialidade:</strong> {consulta.especialidade}</p>
                               
                               {/* Botao para iniciar a consulta de video  */}
                                <button 
                                    onClick={() => handleIniciar(consulta.id)} 
                                    className="mt-2 bg-blue-500 text-white rounded px-2 py-1 text-sm"
                                >
                                    Iniciar
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>Não há consultas agendadas</p>
                    )}
                </div>
            </div>

            {/* Card com Todas as Consultas do Mês */}
            <div className="bg-white shadow-md rounded-lg p-4 mt-4">
                <h2 className="text-md font-semibold mb-2">Todas as Consultas do Mês:</h2>
                {consultasDoMes.length > 0 ? (
                    consultasDoMes.map((consulta) => (
                        <div key={consulta.id_consulta} className="border rounded-lg p-2 mb-2 w-64">
                            <p className="text-sm"><strong>Detalhes:</strong> {consulta.detalhes_consulta}</p>
                            <p className="text-sm"><strong>Data:</strong> {new Date(consulta.dias_consulta).toLocaleDateString()}</p>
                            <p className="text-sm"><strong>Hora:</strong> {new Date(consulta.horas_consulta).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            <p className="text-sm"><strong>Médico:</strong> {consulta.nome_medico}</p>
                            <p className="text-sm"><strong>Especialidade:</strong> {consulta.nome_especialidade}</p>
                        </div>
                    ))
                ) : (
                    <p>Não há consultas para este mês.</p>
                )}
            </div>
        </NavBarLayout>
    );
};

export default ConsultaDiaria;
