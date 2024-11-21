'use client';
import React, { useEffect, useState } from 'react';
import { getEspecialidade, getMedico } from '@/js/info.js';

// Componente Modal
const Modal = ({ isOpen, setModalOpen, especialidades, medicos, handleCadastro }) => {
  if (!isOpen) return null; // Não renderiza se o modal não estiver aberto

  return (
    <div id="modal" className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-2/4 h-2/5">
        <h2 className="font-bold text-3xl text-blue-950 font-sans mb-4 flex items-center justify-center">
          CADASTRAR CONSULTA
        </h2>

        <div className="flex">
          <div className="ml-10 mt-1">
            <label
              htmlFor="especialidade"
              className="block text-stone-500 text-base font-sans mb-2 text-lg"
            >
              Especialidade*
            </label>
            <select
              id="especialidade"
              className="shadow-2xl w-96 h-12 text-base border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {especialidades.map((especialidade) => (
                <option key={especialidade.nome_especialidade} value={especialidade.nome_especialidade}>
                  {especialidade.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="ml-12 mt-1">
            <label
              htmlFor="medico"
              className="block text-stone-500 text-base font-sans mb-2 text-lg"
            >
              Médico*
            </label>
            <select
              id="medico"
              className="shadow-2xl w-96 h-12 text-base border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {medicos.map((medico) => (
                <option key={medico.nome_medico} value={medico.nome_medico}>
                  {medico.nome_medico}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex">
          <div className="ml-10 mt-1">
            <label
              htmlFor="date"
              className="block text-stone-500 text-base font-sans mb-2 text-lg"
            >
              Dia de consultas*
            </label>
            <input
              type="date"
              id="date"
              className="shadow-2xl w-96 h-12 text-base border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="ml-14 mt-1">
            <label
              htmlFor="detalhes"
              className="block text-stone-500 text-base font-sans mb-2 text-lg"
            >
              Detalhes da consulta*
            </label>
            <input
              type="text"
              id="detalhes"
              className="shadow-2xl w-96 h-12 text-base border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex">
          <div className="ml-10 mt-1">
            <label
              htmlFor="horario"
              className="block text-stone-500 text-base font-sans mb-2 text-lg"
            >
              Horários*
            </label>
            <input
              type="time"
              id="horario"
              className="shadow-2xl w-96 h-12 text-base border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="ml-20 mt-10">
            <button
              id="cadastro"
              onClick={handleCadastro}
              className="bg-blue-300 w-72 text-blue-950 font-bold px-4 py-2 rounded-lg hover:bg-blue-900"
            >
              CADASTRAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente Principal CadastroConsultas
const CadastroConsultas = () => {
  const [especialidades, setEspecialidades] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false); // Controle do estado do modal

  // Função para preencher as especialidades e médicos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const listaEspecialidade = await getEspecialidade();
        setEspecialidades(listaEspecialidade);

        const listaMedico = await getMedico();
        setMedicos(listaMedico);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []); // Executa uma vez ao montar o componente

  // Função de cadastro de consulta
  const handleCadastro = async () => {
    const p_nome_medico = document.getElementById('medico').value;
    const p_nome_especialidade = document.getElementById('especialidade').value;
    const p_detalhes_consulta = document.getElementById('detalhes').value;
    const p_dias_consulta = document.getElementById('date').value;
    const p_horas_consulta = document.getElementById('horario').value;

    // Verificação básica para garantir que todos os campos estejam preenchidos
    if (!p_nome_medico || !p_nome_especialidade || !p_detalhes_consulta || !p_dias_consulta || !p_horas_consulta) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    const userData = {
      p_nome_medico,
      p_nome_especialidade,
      p_detalhes_consulta,
      p_dias_consulta,
      p_horas_consulta,
    };

    try {
      const response = await fetch('https://vital-back-geh2haera4f5hzfb.brazilsouth-01.azurewebsites.net/v2/vital/consulta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        redirect: 'manual',
      });

      if (response.ok) {
        alert('Consulta cadastrada com sucesso!');
        window.location.href = '/consultas';
      } else {
        const result = await response.json();
        alert(`Erro: ${result.message}`);
      }
    } catch (error) {
      console.error('Erro ao cadastrar consulta:', error);
      alert('Erro ao cadastrar consulta. Tente novamente.');
    }
  };

  return (
    <div>
      <button className='bg-[--font] w-[25vh] h-[5vh] rounded-full ml-[130vh] mt-[10vh] text-white font-bold' onClick={() => setModalOpen(true)}>CADASTRAR CONSULTA +  </button>
      <Modal 
        isOpen={isModalOpen} 
        setModalOpen={setModalOpen} 
        especialidades={especialidades} 
        medicos={medicos} 
        handleCadastro={handleCadastro}
      />
    </div>
  );
};

export default CadastroConsultas;
